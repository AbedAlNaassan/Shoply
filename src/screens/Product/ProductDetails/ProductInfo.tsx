import React from 'react';
import {Text} from 'react-native';
import {Dimensions} from 'react-native';

interface ProductInfoProps {
  product: {
    title: string;
    price: number;
    description: string;
  };
  styles: any;
}

const ProductInfo: React.FC<ProductInfoProps> = ({product, styles}) => {
  const width = Dimensions.get('window').width;

  return (
    <>
      <Text style={[styles.title, {fontSize: width * 0.06}]}>
        {product.title}
      </Text>
      <Text style={[styles.price, {fontSize: width * 0.05}]}>
        {product.price}$
      </Text>
      <Text style={[styles.description, {fontSize: width * 0.045}]}>
        {product.description}
      </Text>
    </>
  );
};

export default ProductInfo;
