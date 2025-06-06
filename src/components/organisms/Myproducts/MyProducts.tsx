// import React, {useCallback, useState} from 'react';
// import {
//   View,
//   StyleSheet,
//   FlatList,
//   ActivityIndicator,
//   Alert,
//   Button,
// } from 'react-native';
// import {useFocusEffect} from '@react-navigation/native';
// import {fetchProducts} from '../../../api/GetProducts';
// import {useAuthStore} from '../../../zustand/AuthStore';
// import SkeletonProductCard from '../SkeletonProductCard';
// import ProductItem from './ProductItem';
// import ListEmptyComponent from './ListEmptyComponent';
// import NotLoggedInComponent from './NotLoggedInComponent';
// import {Products} from '../../../types/types';

// interface ProductListProps {
//   scrollEnabled?: boolean;
//   item: Products;
//   onDeleteSuccess: () => void;
// }

// const ProductList: React.FC<ProductListProps> = ({scrollEnabled = true}) => {
//   const [products, setProducts] = useState<Products[]>([]);
//   const [page, setPage] = useState(1);
//   const [hasNextPage, setHasNextPage] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [initialLoading, setInitialLoading] = useState(true);
//   const accessToken = useAuthStore(state => state.accessToken);
//   const userEmail = useAuthStore(state => state.email);
//   const loadingRef = React.useRef(false);
//   const [deleting, setDeleting] = useState(false);

//   const loadProducts = useCallback(
//     async (pageToLoad = 1, reset = false) => {
//       if (!accessToken) {
//         setInitialLoading(false);
//         return;
//       }

//       if (loadingRef.current) return;
//       loadingRef.current = true;

//       try {
//         if (pageToLoad === 1) setInitialLoading(true);
//         setLoading(true);

//         const response = await fetchProducts(
//           pageToLoad,
//           1000,
//           undefined,
//           undefined,
//           accessToken,
//         );

//         if (response.success) {
//           const newProducts = response.data.filter(
//             (product: Products) => product.user?.email === userEmail,
//           );
//           setProducts(prev =>
//             reset ? newProducts : [...prev, ...newProducts],
//           );
//           setHasNextPage(response.pagination.hasNextPage);
//           setPage(response.pagination.currentPage);
//         }
//       } catch (err) {
//         Alert.alert(
//           'Error',
//           'Failed to fetch products. Please check your internet connection.',
//           [
//             {
//               text: 'Retry',
//               onPress: () => {
//                 if (accessToken) {
//                   loadProducts(pageToLoad, reset);
//                 } else {
//                   Alert.alert(
//                     'Unauthorized',
//                     'You are logged out. Please log in again.',
//                   );
//                 }
//               },
//             },
//           ],
//         );
//       } finally {
//         loadingRef.current = false;
//         setInitialLoading(false);
//         setLoading(false);
//       }
//     },
//     [accessToken, userEmail],
//   );

//   useFocusEffect(
//     useCallback(() => {
//       if (accessToken) {
//         loadProducts(1, true);
//       }
//     }, [accessToken, loadProducts]),
//   );

//   const handleLoadMore = () => {
//     if (hasNextPage) {
//       loadProducts(page + 1);
//     }
//   };

//   if (!accessToken) {
//     return <NotLoggedInComponent />;
//   }

//   if (initialLoading) {
//     return (
//       <FlatList
//         data={Array.from({length: 6})}
//         keyExtractor={(_, index) => index.toString()}
//         renderItem={() => <SkeletonProductCard />}
//         contentContainerStyle={styles.list}
//         scrollEnabled={scrollEnabled}
//         numColumns={2}
//       />
//     );
//   }

//   return (
//     <FlatList
//       data={products}
//       renderItem={({item}) => (
//         <ProductItem
//           item={item}
//           onDeleteSuccess={() => loadProducts(1, true)}
//           setDeleting={setDeleting}
//         />
//       )}
//       keyExtractor={item => item._id}
//       contentContainerStyle={styles.list}
//       numColumns={2}
//       scrollEnabled={scrollEnabled}
//       ListEmptyComponent={
//         loading ? null : <ListEmptyComponent text="No products found." />
//       }
//       ListFooterComponent={
//         products.length === 0 ? null : loading ? (
//           <ActivityIndicator size="large" color="#0000ff" />
//         ) : hasNextPage ? (
//           <View style={styles.loadMoreButton}>
//             <Button title="Load More" onPress={handleLoadMore} />
//           </View>
//         ) : null
//       }
//     />
//   );
// };

// const styles = StyleSheet.create({
//   list: {
//     width: '100%',
//     flexGrow: 1,
//     alignItems: 'center',
//     gap: 10,
//     paddingBottom: 80,
//   },
//   loadMoreButton: {
//     marginVertical: 20,
//     alignItems: 'center',
//   },
// });

// export default ProductList;

import React, {useCallback, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
  Button,
  Modal,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {fetchProducts} from '../../../api/GetProducts';
import {useAuthStore} from '../../../zustand/AuthStore';
import SkeletonProductCard from '../SkeletonProductCard';
import ProductItem from './ProductItem';
import ListEmptyComponent from './ListEmptyComponent';
import NotLoggedInComponent from './NotLoggedInComponent';
import {Products} from '../../../types/types';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false); // 👈 Spinner for delete
  const accessToken = useAuthStore(state => state.accessToken);
  const userEmail = useAuthStore(state => state.email);
  const loadingRef = useRef(false);

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
          const filtered = response.data.filter(
            (product: Products) => product.user?.email === userEmail,
          );
          setProducts(prev => (reset ? filtered : [...prev, ...filtered]));
          setHasNextPage(response.pagination.hasNextPage);
          setPage(response.pagination.currentPage);
        }
      } catch (err) {
        Alert.alert(
          'Error',
          'Failed to fetch products. Please check your internet connection.',
          [{text: 'Retry', onPress: () => loadProducts(pageToLoad, reset)}],
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
    if (hasNextPage) loadProducts(page + 1);
  };

  if (!accessToken) return <NotLoggedInComponent />;

  if (initialLoading) {
    return (
      <FlatList
        data={Array.from({length: 6})}
        keyExtractor={(_, index) => index.toString()}
        renderItem={() => <SkeletonProductCard />}
        contentContainerStyle={styles.list}
        numColumns={2}
      />
    );
  }

  return (
    <>
      <FlatList
        data={products}
        renderItem={({item}) => (
          <ProductItem
            item={item}
            onDeleteSuccess={() => loadProducts(1, true)}
            setDeleteLoading={setDeleteLoading} // 👈 Pass spinner control
          />
        )}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.list}
        numColumns={2}
        ListEmptyComponent={
          !loading ? <ListEmptyComponent text="No products found." /> : null
        }
        ListFooterComponent={
          loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : hasNextPage ? (
            <View style={styles.loadMoreButton}>
              <Button title="Load More" onPress={handleLoadMore} />
            </View>
          ) : null
        }
      />

      {/* Spinner Modal when deleting */}
      <Modal transparent visible={deleteLoading}>
        <View style={styles.modalBackground}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </Modal>
    </>
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
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductList;
