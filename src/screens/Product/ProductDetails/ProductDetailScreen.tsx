import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Text,
  View,
  Modal,
  StyleSheet,
} from 'react-native';
import {useTheme} from '../../../context/ThemeContext';
import {lightStyles} from '../../../styles/ProductDetails.light';
import {darkStyles} from '../../../styles/ProductDetails.dark';
import useProductDetail from './useProductDetail';
import ProductDetailHeader from './ProductDetailHeader';
import ProductImageSlider from './ProductImageSlider';
import ProductInfo from './ProductInfo';
import ProductLocationMap from './ProductLocationMap';
import ProductActionButtons from './ProductActionButtons';
import ProductOwnerInfo from './ProductOwnerInfo';

interface Styles {
  safearea: object;
  errorContainer: object;
  error: object;
}

const ProductDetailScreen = () => {
  const {theme} = useTheme();
  const styles: Styles = theme === 'dark' ? darkStyles : lightStyles;
  const {
    product,
    loading,
    error,
    handleShare,
    handleAddToCart,
    handleEmailOwner,
    navigation,
    saveImage,
    isSaving,
  } = useProductDetail();

  if (loading) {
    return (
      <View style={styles.safearea}>
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{marginTop: 50}}
        />
      </View>
    );
  }

  if (error || !product) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.error}>{error || 'Product not found'}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safearea}>
      {/* Full-screen loading modal when saving image */}
      <Modal transparent visible={isSaving}>
        <View style={localStyles.spinnerContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={localStyles.loadingText}>Saving image...</Text>
        </View>
      </Modal>

      <ScrollView>
        <ProductDetailHeader navigation={navigation} styles={styles} />

        <ProductImageSlider images={product.images} onSaveImage={saveImage} />

        <ProductInfo product={product} styles={styles} />

        {product.location && (
          <ProductLocationMap
            location={product.location}
            title={product.title}
            description={product.description}
          />
        )}

        <ProductActionButtons
          onAddToCart={handleAddToCart}
          onShare={handleShare}
          styles={styles}
        />

        {product.user && (
          <ProductOwnerInfo
            user={product.user}
            onEmailOwner={handleEmailOwner}
            styles={styles}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

// Local styles for the loading modal
const localStyles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  loadingText: {
    color: 'white',
    marginTop: 10,
    fontSize: 16,
  },
});

export default ProductDetailScreen;
