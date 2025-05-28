import React, {useCallback, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
  Button,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {fetchProducts} from '../../../api/GetProducts';
import {useAuthStore} from '../../../zustand/AuthStore';
import SkeletonProductCard from '../SkeletonProductCard';
import ProductItem from './ProductItem';
import ListEmptyComponent from './ListEmptyComponent';
import NotLoggedInComponent from './NotLoggedInComponent';
import {Products} from '../../../types/types';

interface ProductListProps {
  scrollEnabled?: boolean;
}

const ProductList: React.FC<ProductListProps> = ({scrollEnabled = true}) => {
  const [products, setProducts] = useState<Products[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const accessToken = useAuthStore(state => state.accessToken);
  const userEmail = useAuthStore(state => state.email);
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

        if (response.success) {
          const newProducts = response.data.filter(
            (product: Products) => product.user?.email === userEmail,
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

  if (!accessToken) {
    return <NotLoggedInComponent />;
  }

  if (initialLoading) {
    return (
      <FlatList
        data={Array.from({length: 6})}
        keyExtractor={(_, index) => index.toString()}
        renderItem={() => <SkeletonProductCard />}
        contentContainerStyle={styles.list}
        scrollEnabled={scrollEnabled}
        numColumns={2}
      />
    );
  }

  return (
    <FlatList
      data={products}
      renderItem={({item}) => <ProductItem item={item} />}
      keyExtractor={item => item._id}
      contentContainerStyle={styles.list}
      numColumns={2}
      scrollEnabled={scrollEnabled}
      ListEmptyComponent={
        loading ? null : <ListEmptyComponent text="No products found." />
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

const styles = StyleSheet.create({
  list: {
    width: '100%',
    flexGrow: 1,
    alignItems: 'center',
    gap: 10,
    paddingBottom: 80,
  },
  loadMoreButton: {
    marginVertical: 20,
    alignItems: 'center',
  },
});

export default ProductList;
