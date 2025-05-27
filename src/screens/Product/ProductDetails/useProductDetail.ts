import {useEffect, useState} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import {
  Share,
  Alert,
  Linking,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import RNFS from 'react-native-fs';
import axios from 'axios';
import {useAuthStore} from '../../../zustand/AuthStore';
import {useCartStore} from '../../../zustand/Cart';

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

const API_BASE_URL = 'https://backend-practice.eurisko.me/api';
const API_BASE_URL_UPLOAD = 'https://backend-practice.eurisko.me';

const useProductDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const accessToken = useAuthStore(state => state.accessToken);
  const addToCart = useCartStore(state => state.addToCart);
  const {id} = route.params as {id: string};

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await axios.get(`${API_BASE_URL}/products/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setProduct(response.data.data);
      } catch (err: any) {
        console.error(err);
        let status = err?.response?.status;

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
  }, [id, accessToken]);

  const handleShare = async () => {
    if (!product) return;

    const url = `myapp://product/${product._id}`;
    try {
      await Share.share({
        message: `${product.title} - ${product.price}$\nCheck it out here: ${url}`,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      const imageUrl = `${API_BASE_URL_UPLOAD}${product.images[0]?.url}`;
      const productForCart = {
        id: product._id,
        name: product.title,
        price: product.price,
        description: product.description,
        image: imageUrl,
        location: product.location,
        user: product.user,
        quantity: 1,
      };
      addToCart(productForCart);
      navigation.navigate('Cart');
    }
  };

  const handleEmailOwner = () => {
    if (product?.user?.email) {
      const emailUrl = `mailto:${product.user.email}`;
      Linking.openURL(emailUrl).catch(() => {
        Alert.alert('Error', 'No email client available');
      });
    }
  };

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

  return {
    product,
    loading,
    error,
    handleShare,
    handleAddToCart,
    handleEmailOwner,
    saveImage,
    navigation,
  };
};

export default useProductDetail;
