// ProductList/ProductListHeader.tsx
import React from 'react';
import {View, Button} from 'react-native';
import {styles} from './styles';
import {SortOrder} from './types';

interface ProductListHeaderProps {
  sortOrder: SortOrder;
  onToggleSort: () => void;
}

const ProductListHeader: React.FC<ProductListHeaderProps> = React.memo(
  ({sortOrder, onToggleSort}) => {
    return (
      <View style={styles.sortButtonContainer} testID="sort-header">
        <Button
          title={`Sort by price (${sortOrder.toUpperCase()})`}
          onPress={onToggleSort}
          testID="sort-button"
        />
      </View>
    );
  },
);

export default ProductListHeader;
