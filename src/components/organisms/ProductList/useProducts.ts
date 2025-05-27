// hooks/useProducts.ts
import {useCallback, useState, useRef} from 'react';
import {Alert} from 'react-native';
import {fetchProducts} from '../../../api/GetProducts';
import {useAuthStore} from '../../../zustand/AuthStore';
import {PRODUCTS_PER_PAGE} from '../../../api/constants';
import {Product, SortOrder} from './types';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const accessToken = useAuthStore(state => state.accessToken);
  const loadingRef = useRef(false);

  const loadProducts = useCallback(
    async (pageToLoad = 1, sortOrder: SortOrder = 'asc', reset = false) => {
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
          PRODUCTS_PER_PAGE,
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
                  loadProducts(pageToLoad, sortOrder, reset);
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
        throw err; // Re-throw for error boundary
      } finally {
        loadingRef.current = false;
        setInitialLoading(false);
        setLoading(false);
      }
    },
    [accessToken],
  );

  return {
    products,
    page,
    hasNextPage,
    loading,
    initialLoading,
    loadProducts,
    setProducts,
  };
};
