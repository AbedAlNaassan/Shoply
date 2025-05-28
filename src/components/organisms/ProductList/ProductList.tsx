import React, {useState, useCallback} from 'react';
import {View, FlatList, Text} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useProducts} from './useProducts';
import ProductCard from './ProductCard';
import ProductListSkeleton from './ProductListSkeleton';
import ProductListEmpty from './ProductListEmpty';
import ProductListFooter from './ProductListFooter';
import ProductListHeader from './ProductListHeader';
import {styles} from './styles';
import {ProductListProps, SortOrder} from './types';
import ProductListErrorBoundary from './ProductListErrorBoundary';
import {useAuthStore} from '../../../zustand/AuthStore';

const ProductList: React.FC<ProductListProps> = ({scrollEnabled = true}) => {
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const {products, page, hasNextPage, loading, initialLoading, loadProducts} =
    useProducts();
  const accessToken = useAuthStore(state => state.accessToken);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      if (accessToken) {
        loadProducts(1, sortOrder, true);
      }
    }, [accessToken, loadProducts, sortOrder]),
  );

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !loading) {
      loadProducts(page + 1, sortOrder);
    }
  }, [hasNextPage, loading, page, loadProducts, sortOrder]);

  const toggleSortOrder = useCallback(() => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    loadProducts(1, newSortOrder, true);
  }, [sortOrder, loadProducts]);

  const handleProductPress = useCallback(
    (productId: string) => {
      navigation.navigate('ProductDetails', {id: productId});
    },
    [navigation],
  );

  if (!accessToken) {
    return (
      <View style={styles.notLoggedIn} testID="not-logged-in-view">
        <Text style={styles.notLoggedInText}>
          You are logged out. Please log in to view products.
        </Text>
      </View>
    );
  }

  if (initialLoading) {
    return <ProductListSkeleton scrollEnabled={scrollEnabled} />;
  }

  return (
    <ProductListErrorBoundary>
      <View testID="product-list-container">
        <ProductListHeader
          sortOrder={sortOrder}
          onToggleSort={toggleSortOrder}
        />
        <FlatList
          data={products}
          renderItem={({item}) => (
            <ProductCard product={item} onPress={handleProductPress} />
          )}
          keyExtractor={item => `product-${item._id}`}
          contentContainerStyle={[
            styles.list,
            products.length === 0 && {flex: 1, justifyContent: 'center'},
          ]}
          numColumns={2}
          scrollEnabled={scrollEnabled}
          onRefresh={() => loadProducts(1, sortOrder, true)}
          refreshing={loading && page === 1}
          ListEmptyComponent={
            <ProductListEmpty
              loading={loading && page > 1}
              hasNextPage={hasNextPage}
              productsLength={products.length}
              onLoadMore={handleLoadMore}
            />
          }
          ListFooterComponent={
            <ProductListFooter
              loading={loading && page > 1}
              hasNextPage={hasNextPage}
              productsLength={products.length}
              onLoadMore={handleLoadMore}
            />
          }
          testID="products-flatlist"
        />
      </View>
    </ProductListErrorBoundary>
  );
};

export default React.memo(ProductList);
