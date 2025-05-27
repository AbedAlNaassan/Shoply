// ProductList/ProductListEmpty.tsx
import React from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {styles} from './styles';

interface ProductListEmptyProps {
  message?: string;
}

const ProductListEmpty: React.FC<ProductListEmptyProps> = React.memo(
  ({message = 'No products found.'}) => {
    return (
      <View style={styles.emptyContainer} testID="product-list-empty">
        <Text style={styles.emptyText}>{message}</Text>
      </View>
    );
  },
);

ProductListEmpty.propTypes = {
  message: PropTypes.string,
};

export default ProductListEmpty;
