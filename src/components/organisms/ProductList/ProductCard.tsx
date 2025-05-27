// ProductList/ProductCard.tsx
import React from 'react';
import {Pressable, View, Text, Image} from 'react-native';
import {styles} from './styles';
import {Product} from './types';
import {API_URL} from '../../../api/constants';

interface ProductCardProps {
  product: Product;
  onPress: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = React.memo(
  ({product, onPress}) => {
    const imageSource = product.images?.[0]?.url
      ? {uri: `${API_URL}${product.images[0].url}`}
      : require('../../../assets/PhoneImage.png');

    return (
      <Pressable
        onPress={() => onPress(product._id)}
        style={styles.infoContainer}
        testID="product-card">
        <View style={styles.imageList}>
          <Image
            source={imageSource}
            style={styles.images}
            resizeMode="contain"
            accessibilityLabel={product.title}
          />
        </View>
        <View style={styles.textList}>
          <Text style={styles.textLists} numberOfLines={1} ellipsizeMode="tail">
            {product.title}
          </Text>
          <Text style={styles.textLists}>{product.price}$</Text>
        </View>
      </Pressable>
    );
  },
);

export default ProductCard;
