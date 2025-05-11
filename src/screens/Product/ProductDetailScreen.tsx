import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  Share,
  Pressable,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRoute, useNavigation} from '@react-navigation/native';

import productData from '../../data/Products.json';
import BackIcon from '../../assets/back.svg';
import ShareIcon from '../../assets/share.svg';
import {useTheme} from '../../context/ThemeContext';
import {darkStyles} from '../../styles/ProductDetails.dark';
import {lightStyles} from '../../styles/ProductDetails.light';

const ProductDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {theme} = useTheme();

  const {width} = useWindowDimensions();

  const {id} = route.params as {id: string};
  const product = productData.data.find(item => item._id === id);

  const styles = theme === 'dark' ? darkStyles : lightStyles;
  const handleShare = async () => {
    try {
      await Share.share({
        message: `${product?.title} - ${product?.price}$\nCheck it out!`,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const handleAddToCart = () => {
    // Placeholder for cart logic
    console.log(`Product "${product?.title}" added to cart.`);
  };

  if (!product) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.error}>Product not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safearea}>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          {flexGrow: 1, padding: width * 0.05},
        ]}>
        <Pressable onPress={() => navigation.goBack()} style={styles.back}>
          <BackIcon width={30} height={30} />
        </Pressable>

        <Image
          source={{uri: product.images[0].url}}
          style={{
            width: width * 0.7,
            height: width * 0.7,
            marginVertical: width * 0.05,
          }}
          resizeMode="contain"
        />

        <Text style={[styles.title, {fontSize: width * 0.06}]}>
          {product.title}
        </Text>
        <Text style={[styles.price, {fontSize: width * 0.05}]}>
          {product.price}$
        </Text>
        <Text style={[styles.description, {fontSize: width * 0.045}]}>
          {product.description}
        </Text>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShare}>
            <ShareIcon width={30} height={30} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetailScreen;
