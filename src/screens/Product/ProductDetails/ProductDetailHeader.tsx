import React from 'react';
import {Pressable} from 'react-native';
import BackIcon from '../../../assets/back.svg';

interface ProductDetailHeaderProps {
  navigation: any;
  styles: any;
}

const ProductDetailHeader: React.FC<ProductDetailHeaderProps> = ({
  navigation,
  styles,
}) => {
  return (
    <Pressable onPress={() => navigation.goBack()} style={styles.back}>
      <BackIcon width={30} height={30} />
    </Pressable>
  );
};

export default ProductDetailHeader;
