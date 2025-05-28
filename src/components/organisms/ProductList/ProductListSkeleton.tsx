import React from 'react';
import {FlatList} from 'react-native';
import {styles} from './styles';
import SkeletonProductCard from '../SkeletonProductCard';
import {SKELETON_ITEMS_COUNT} from '../../../api/constants';

interface ProductListSkeletonProps {
  scrollEnabled?: boolean;
}

const ProductListSkeleton: React.FC<ProductListSkeletonProps> = React.memo(
  ({scrollEnabled = true}) => {
    return (
      <FlatList
        data={Array.from({length: SKELETON_ITEMS_COUNT})}
        keyExtractor={(_, index) => `skeleton-${index}`}
        renderItem={() => <SkeletonProductCard />}
        contentContainerStyle={styles.list}
        scrollEnabled={scrollEnabled}
        numColumns={2}
        testID="product-list-skeleton"
      />
    );
  },
);

export default ProductListSkeleton;
