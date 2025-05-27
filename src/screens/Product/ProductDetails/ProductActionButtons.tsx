import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import ShareIcon from '../../../assets/share.svg';

interface ProductActionButtonsProps {
  onAddToCart: () => void;
  onShare: () => void;
  styles: any;
}

const ProductActionButtons: React.FC<ProductActionButtonsProps> = ({
  onAddToCart,
  onShare,
  styles,
}) => {
  return (
    <View style={styles.buttonsContainer}>
      <TouchableOpacity style={styles.button} onPress={onAddToCart}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onShare}>
        <ShareIcon width={30} height={30} />
      </TouchableOpacity>
    </View>
  );
};

export default ProductActionButtons;
