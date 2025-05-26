import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Pressable,
  Dimensions,
  PixelRatio,
  Button,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types/types';
import {fetchProducts} from '../../api/GetProducts';
import {useAuthStore} from '../../zustand/AuthStore';
import SkeletonProductCard from './SkeletonProductCard';

const width = Dimensions.get('screen').width;
const pixel = PixelRatio.getFontScale();
const API_URL = 'https://backend-practice.eurisko.me';

type NavigationProp = StackNavigationProp<RootStackParamList, 'ProductDetails'>;

interface Product {
  _id: string;
  title: string;
  price: number;
  images: {url: string}[];
}

interface ProductListProps {
  scrollEnabled?: boolean;
}

const ProductList: React.FC<ProductListProps> = ({scrollEnabled = true}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [initialLoading, setInitialLoading] = useState(true);
  const accessToken = useAuthStore(state => state.accessToken);
  const navigation = useNavigation<NavigationProp>();
  const loadingRef = React.useRef(false);

  const loadProducts = useCallback(
    async (pageToLoad = 1, reset = false) => {
      if (!accessToken) {
        setInitialLoading(false);
        return;
      }

      if (loadingRef.current) return;
      loadingRef.current = true;

      try {
        if (pageToLoad === 1) setInitialLoading(true);
        setLoading(true);

        const response = await fetchProducts(
          pageToLoad,
          8,
          'price',
          sortOrder,
          accessToken,
        );

        if (response.success) {
          const newProducts = response.data;
          setProducts(prev =>
            reset ? newProducts : [...prev, ...newProducts],
          );
          setHasNextPage(response.pagination.hasNextPage);
          setPage(response.pagination.currentPage);
        }
      } catch (err) {
        Alert.alert(
          'Error',
          'Failed to fetch products. Please check your internet connection.',
          [
            {
              text: 'Retry',
              onPress: () => {
                if (accessToken) {
                  loadProducts(pageToLoad, reset);
                } else {
                  Alert.alert(
                    'Unauthorized',
                    'You are logged out. Please log in again.',
                  );
                }
              },
            },
          ],
        );
      } finally {
        loadingRef.current = false;
        setInitialLoading(false);
        setLoading(false);
      }
    },
    [sortOrder, accessToken],
  );

  useFocusEffect(
    useCallback(() => {
      if (accessToken) {
        loadProducts(1, true);
      }
    }, [accessToken, loadProducts]),
  );

  const handleLoadMore = () => {
    if (hasNextPage) {
      loadProducts(page + 1);
    }
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const handleProductPress = (productId: string) => {
    navigation.navigate('ProductDetails', {id: productId});
  };

  const renderItem = ({item}: {item: Product}) => (
    <Pressable
      key={item._id}
      onPress={() => handleProductPress(item._id)}
      style={styles.infoContainer}>
      <View style={styles.imageList}>
        <Image
          source={
            item.images && item.images.length > 0 && item.images[0].url
              ? {uri: `${API_URL}${item.images[0].url}`}
              : require('../../assets/PhoneImage.png')
          }
          style={styles.images}
          resizeMode="contain"
        />
      </View>
      <View style={styles.textList}>
        <Text style={styles.textLists}>{item.title}</Text>
        <Text style={styles.textLists}>{item.price}$</Text>
      </View>
    </Pressable>
  );

  if (!accessToken) {
    return (
      <View style={styles.notLoggedIn}>
        <Text style={styles.notLoggedInText}>
          You are logged out. Please log in to view products.
        </Text>
      </View>
    );
  }

  if (initialLoading) {
    console.log('Rendering SkeletonProductCard...');
    return (
      <FlatList
        data={Array.from({length: 6})} // Show 6 skeletons
        keyExtractor={(_, index) => index.toString()}
        renderItem={() => <SkeletonProductCard />}
        contentContainerStyle={styles.list}
        scrollEnabled={scrollEnabled}
        numColumns={2}
      />
    );
  }

  return (
    <View>
      <View style={styles.sortButtonContainer}>
        <Button
          title={`Sort by price (${sortOrder.toUpperCase()})`}
          onPress={toggleSortOrder}
        />
      </View>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        contentContainerStyle={[
          styles.list,
          products.length === 0 && {flex: 1, justifyContent: 'center'},
        ]}
        numColumns={2}
        scrollEnabled={scrollEnabled}
        onRefresh={() => loadProducts(1, true)}
        refreshing={loading && page === 1}
        ListEmptyComponent={
          !initialLoading && (
            <View style={{alignItems: 'center'}}>
              <Text style={{fontSize: 16, color: '#999'}}>
                No products found.
              </Text>
            </View>
          )
        }
        ListFooterComponent={
          loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : hasNextPage && products.length > 0 ? (
            <View style={styles.loadMoreButton}>
              <Button title="Load More" onPress={handleLoadMore} />
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  list: {
    width: '100%',
    alignItems: 'center',
    gap: 10,
    paddingBottom: 80,
  },
  infoContainer: {
    width: width / 2,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  imageList: {
    width: '100%',
    height: '60%',
  },
  images: {
    width: '100%',
    height: '100%',
  },
  textList: {
    height: '30%',
    justifyContent: 'center',
    marginTop: 15,
    alignItems: 'center',
  },
  textLists: {
    width: '100%',
    flex: 1,
    fontSize: pixel * 15,
    fontFamily: 'Roboto',
    color: '#3A59D1',
  },
  loadMoreButton: {
    marginVertical: 20,
    alignItems: 'center',
  },
  sortButtonContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  notLoggedIn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop: 100,
  },
  notLoggedInText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
});
