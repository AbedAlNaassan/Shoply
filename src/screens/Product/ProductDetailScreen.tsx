import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  Share,
  Pressable,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  Alert,
  Linking,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRoute, useNavigation} from '@react-navigation/native';
import MapView, {Marker} from 'react-native-maps';
import {darkStyles} from '../../styles/ProductDetails.dark';
import {lightStyles} from '../../styles/ProductDetails.light';
import {useTheme} from '../../context/ThemeContext';
import ShareIcon from '../../assets/share.svg';
import BackIcon from '../../assets/back.svg';
import {useAuthStore} from '../../zustand/AuthStore';
import RNFS from 'react-native-fs';
import Swiper from 'react-native-swiper';
import axios from 'axios';
interface ProductImage {
  url: string;
}

interface Product {
  _id: string;
  title: string;
  price: number;
  description: string;
  images: ProductImage[];
  location: {
    name: string;
    latitude: number;
    longitude: number;
  };
  user?: {
    _id: string;
    email: string;
  };
}

const ProductDetailScreen = () => {
  const {width} = useWindowDimensions();
  const route = useRoute();
  const navigation = useNavigation();
  const {theme} = useTheme();
  const accessToken = useAuthStore(state => state.accessToken);

  const {id} = route.params as {id: string};

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const styles = theme === 'dark' ? darkStyles : lightStyles;

  const API_BASE_URL = 'https://backend-practice.eurisko.me/api';
  const API_BASE_URL_UPLOAD = 'https://backend-practice.eurisko.me';

  const authToken = accessToken;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await axios.get(`${API_BASE_URL}/products/${id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        console.log(response.data.data);
        setProduct(response.data.data);
      } catch (err: any) {
        console.error(err);

        let status = err?.response?.status;

        // Handle 521 or other network errors
        if (status === 521 || !err.response) {
          Alert.alert(
            'Server Error',
            'Failed to load product. Server might be down.',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Retry',
                onPress: () => fetchProduct(),
              },
            ],
            {cancelable: true},
          );
        } else {
          setError('Failed to load product. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, authToken]);

  const handleShare = async () => {
    if (!product) return;

    try {
      await Share.share({
        message: `${product.title} - ${product.price}$\nCheck it out!`,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const handleAddToCart = () => {
    console.log(`Product "${product?.title}" added to cart.`);
  };

  const handleEmailOwner = () => {
    if (product?.user?.email) {
      const emailUrl = `mailto:${product.user.email}`;
      Linking.openURL(emailUrl).catch(() => {
        Alert.alert('Error', 'No email client available');
      });
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safearea}>
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{marginTop: 50}}
        />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.error}>{error}</Text>
      </SafeAreaView>
    );
  }

  if (!product) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.error}>Product not found</Text>
      </SafeAreaView>
    );
  }

  const saveImage = async (url: string) => {
    try {
      let hasPermission = false;

      if (Platform.OS === 'android') {
        const sdkVersion = Platform.Version;

        if (sdkVersion >= 33) {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          );
          hasPermission = granted === PermissionsAndroid.RESULTS.GRANTED;
        } else {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          );
          hasPermission = granted === PermissionsAndroid.RESULTS.GRANTED;
        }

        if (!hasPermission) {
          Alert.alert(
            'Permission Denied',
            'Cannot save image without permission',
          );
          return;
        }
      }

      const fileName = url.split('/').pop();
      const downloadDest = `${RNFS.PicturesDirectoryPath}/${fileName}`;

      const download = RNFS.downloadFile({
        fromUrl: url,
        toFile: downloadDest,
      });

      const result = await download.promise;

      if (result.statusCode === 200) {
        Alert.alert('Success', 'Image saved to gallery');
      } else {
        Alert.alert('Error', 'Failed to save image');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <SafeAreaView style={styles.safearea}>
      <ScrollView>
        <Pressable onPress={() => navigation.goBack()} style={styles.back}>
          <BackIcon width={30} height={30} />
        </Pressable>

        <Swiper
          style={{height: 300}}
          showsPagination
          loop
          autoplay
          dotStyle={{backgroundColor: '#ccc'}}
          activeDotStyle={{backgroundColor: '#000'}}>
          {product.images.map((image, index) => (
            <TouchableOpacity
              key={index}
              onLongPress={() =>
                saveImage(`${API_BASE_URL_UPLOAD}${image.url}`)
              }
              activeOpacity={0.9}>
              <Image
                source={{uri: `${API_BASE_URL_UPLOAD}${image.url}`}}
                style={{width: '100%', height: 300}}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ))}
        </Swiper>

        <Text style={[styles.title, {fontSize: width * 0.06}]}>
          {product.title}
        </Text>
        <Text style={[styles.price, {fontSize: width * 0.05}]}>
          {product.price}$
        </Text>
        <Text style={[styles.description, {fontSize: width * 0.045}]}>
          {product.description}
        </Text>

        {product.location && (
          <MapView
            style={{
              width: 350,
              height: 200,
              alignSelf: 'center',
              marginTop: 20,
            }}
            initialRegion={{
              latitude: product.location.latitude,
              longitude: product.location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}>
            <Marker
              coordinate={{
                latitude: product.location.latitude,
                longitude: product.location.longitude,
              }}
              title={product.title}
              description={product.description}
            />
          </MapView>
        )}

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShare}>
            <ShareIcon width={30} height={30} />
          </TouchableOpacity>
        </View>

        {product.user && (
          <View
            style={{
              padding: 15,
              borderTopWidth: 1,
              borderColor: '#ccc',
              marginTop: 20,
            }}>
            <Text style={[styles.title, {fontSize: width * 0.05}]}>
              Owner Details
            </Text>
            <Text
              style={[
                styles.description,
                {fontSize: width * 0.045, marginVertical: 5},
              ]}>
              Email: {product.user.email}
            </Text>
            <TouchableOpacity
              style={[
                styles.button,
                {backgroundColor: '#007AFF', marginTop: 10},
              ]}
              onPress={handleEmailOwner}>
              <Text style={[styles.buttonText, {color: 'white'}]}>
                Email Owner
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetailScreen;
