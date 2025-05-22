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
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types/types';
import {fetchProducts} from '../../api/GetProducts';
import {useAuthStore} from '../../zustand/AuthStore';
import SpinnerScreen from './SpinnerScreen';
import axios from 'axios';

const width = Dimensions.get('screen').width;
const pixel = PixelRatio.getFontScale();
const API_URL = 'https://backend-practice.eurisko.me';

type NavigationProp = StackNavigationProp<RootStackParamList, 'ProductDetails'>;

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: {url: string}[];
  user: {
    _id: string;
    email: string;
    username?: string;
  };
}

interface ProductListProps {
  scrollEnabled?: boolean;
}

const ProductList: React.FC<ProductListProps> = ({scrollEnabled = true}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const accessToken = useAuthStore(state => state.accessToken);
  const userEmail = useAuthStore(state => state.email);
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
          1000,
          undefined,
          undefined,
          accessToken,
        );

        console.log('API products:', response.data);
        console.log('User Email:', userEmail);

        if (response.success) {
          const newProducts = response.data.filter(
            (product: Product) => product.user?.email === userEmail,
          );
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
    [accessToken, userEmail],
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

  const handleProductPress = (productId: string) => {
    navigation.navigate('ProductDetails', {id: productId});
  };

  const handleEdit = (id: string) => {
    navigation.navigate('EditProduct', {id});
  };

  const handleDelete = async (id: string) => {
    Alert.alert('Delete', 'Are you sure you want to delete this product?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await axios.delete(
              `https://backend-practice.eurisko.me/api/products/${id}`,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`, // Replace with real token
                },
              },
            );

            Alert.alert('Success', 'Product deleted successfully');
            loadProducts();
            // Optional: refresh data or navigate back
          } catch (error: any) {
            console.error('Delete failed:', error);
            Alert.alert('Error', 'Failed to delete product.');
          }
        },
      },
    ]);
  };

  const renderItem = ({item}: {item: Product}) => (
    <View key={item._id} style={styles.infoContainer}>
      <Pressable
        onPress={() => handleProductPress(item._id)}
        style={styles.imageList}>
        <Image
          source={
            item.images && item.images.length > 0 && item.images[0].url
              ? {uri: `${API_URL}${item.images[0].url}`}
              : require('../../assets/PhoneImage.png')
          }
          style={styles.images}
          resizeMode="contain"
        />
      </Pressable>
      <View style={styles.textList}>
        <Text style={styles.textLists}>{item.title}</Text>
        <Text style={styles.textLists}>{item.price}$</Text>
        <View style={styles.buttonContainer}>
          <Button title="Edit" onPress={() => handleEdit(item._id)} />
          <Button
            title="Delete"
            onPress={() => handleDelete(item._id)}
            color="red"
          />
        </View>
      </View>
    </View>
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
    return <SpinnerScreen />;
  }

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={item => item._id}
      contentContainerStyle={styles.list}
      numColumns={2}
      scrollEnabled={scrollEnabled}
      ListEmptyComponent={
        loading ? null : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No products found.</Text>
          </View>
        )
      }
      ListFooterComponent={
        products.length === 0 ? null : loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : hasNextPage ? (
          <View style={styles.loadMoreButton}>
            <Button title="Load More" onPress={handleLoadMore} />
          </View>
        ) : null
      }
    />
  );
};

export default ProductList;

const styles = StyleSheet.create({
  list: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    gap: 10,
    paddingBottom: 80,
  },
  infoContainer: {
    width: width / 2,

    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  imageList: {
    width: '100%',
    height: 120,
  },
  images: {
    width: '100%',
    height: '100%',
  },
  textList: {
    alignItems: 'center',
    marginTop: 10,
  },
  textLists: {
    fontSize: pixel * 15,
    fontFamily: 'Roboto',
    color: '#3A59D1',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 10,
  },
  loadMoreButton: {
    marginVertical: 20,
    alignItems: 'center',
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
  },
});
