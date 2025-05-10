import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  Share,
  Pressable,
  Dimensions,
  PixelRatio,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRoute, useNavigation} from '@react-navigation/native';

import productData from '../../data/Products.json';
import BackIcon from '../../assets/back.svg';
import ShareIcon from '../../assets/share.svg';
import {useTheme} from '../../context/ThemeContext';

const {height} = Dimensions.get('window');
const pixel = PixelRatio.getFontScale();

const ProductDetailScreen = () => {
  const {width} = useWindowDimensions();
  const route = useRoute();
  const navigation = useNavigation();
  const {id} = route.params as {id: string};
  const {theme} = useTheme();

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
        contentContainerStyle={[styles.container, {padding: width * 0.05}]}>
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

const lightStyles = StyleSheet.create({
  safearea: {
    height: height,
    backgroundColor: '#fff',
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  back: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  title: {
    fontFamily: 'Roboto',
    color: '#3A59D1',
    marginBottom: 10,
    textAlign: 'center',
  },
  price: {
    fontWeight: '600',
    color: '#000',
    marginBottom: 10,
  },
  description: {
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: '#3A59D1',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    fontSize: pixel * 18,
    color: 'red',
    fontFamily: 'Roboto',
  },
});

const darkStyles = StyleSheet.create({
  safearea: {
    height: height,
    backgroundColor: '#12141C',
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#12141C',
  },
  back: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  title: {
    fontFamily: 'Roboto',
    color: '#3A59D1',
    marginBottom: 10,
    textAlign: 'center',
  },
  price: {
    fontWeight: '600',
    color: '#3A59D1',
    marginBottom: 10,
  },
  description: {
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: '#3A59D1',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  buttonText: {
    color: '#fff',
    fontFamily: 'Roboto',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    fontSize: pixel * 18,
    color: 'red',
    fontWeight: 'bold',
  },
});
