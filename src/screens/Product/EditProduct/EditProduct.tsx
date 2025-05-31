import {
  PERMISSIONS,
  request,
  check,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {View, Text, ScrollView, Alert, Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import {useAuthStore} from '../../../zustand/AuthStore';
import {RootStackParamList} from '../../../types/types';
import {MapPressEvent} from 'react-native-maps';
import {useTheme} from '../../../context/ThemeContext';
import {lightStyles} from '../../../styles/EditProduct.light';
import {darkStyles} from '../../../styles/EditProduct.dark';
import BlueButtons from '../../../components/atoms/BlueButtons';
import SpinnerScreen from '../../../components/organisms/SpinnerScreen';
import ProductFormFields from './ProductFormFields';
import ImagePickerSection from './ImagePickerSection';
import MapSection from './MapSection';
import {z} from 'zod';
import axios from 'axios';

const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.string().min(1, 'Price is required'),
  location: z.object({
    name: z.string(),
    latitude: z.number(),
    longitude: z.number(),
  }),
});

type ProductForm = z.infer<typeof productSchema>;
type EditProductScreenRouteProp = RouteProp<RootStackParamList, 'EditProduct'>;

const EditProductScreen = () => {
  const route = useRoute<EditProductScreenRouteProp>();
  const navigation = useNavigation();
  const {id} = route.params;
  const {theme} = useTheme();
  const styles = theme === 'dark' ? darkStyles : lightStyles;
  const accessToken = useAuthStore(state => state.accessToken);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<Asset[]>([]);
  const [existingImageUrls, setExistingImageUrls] = useState<string[]>([]);
  const [marker, setMarker] = useState({
    name: 'Beirut',
    latitude: 33.8938,
    longitude: 35.5018,
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      price: '',
      location: marker,
    },
  });

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://backend-practice.eurisko.me/api/products/${id}`,
          {headers: {Authorization: `Bearer ${accessToken}`}},
        );

        const product = response.data.data;
        const loc = product.location ?? {
          name: 'Beirut',
          latitude: 33.8938,
          longitude: 35.5018,
        };

        setMarker(loc);

        reset({
          name: product.title ?? '',
          description: product.description ?? '',
          price: product.price ? String(product.price) : '',
          location: loc,
        });

        setExistingImageUrls(product.images ?? []);
      } catch (error) {
        Alert.alert(
          'Error',
          'Failed to load product data.',
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'Retry', onPress: () => fetchProduct()},
          ],
          {cancelable: false},
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, accessToken, reset]);

  const requestGalleryPermission = async (): Promise<boolean> => {
    const permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.PHOTO_LIBRARY
        : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;

    const status = await check(permission);

    if (status === RESULTS.GRANTED) return true;

    if (status === RESULTS.DENIED) {
      const reqResult = await request(permission);
      return reqResult === RESULTS.GRANTED;
    }

    if (status === RESULTS.BLOCKED) {
      Alert.alert(
        'Permission Required',
        'Please allow gallery access from settings.',
        [
          {text: 'Open Settings', onPress: () => openSettings()},
          {text: 'Cancel', style: 'cancel'},
        ],
      );
      return false;
    }

    return false;
  };

  const handlePickImage = async () => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) return;

    launchImageLibrary({mediaType: 'photo', selectionLimit: 5}, response => {
      if (response.assets) {
        setImages(response.assets);
        setExistingImageUrls([]); // clear old images on new pick
      }
    });
  };

  const handleMapPress = (event: MapPressEvent) => {
    const {latitude, longitude} = event.nativeEvent.coordinate;
    setMarker({
      latitude,
      longitude,
      name: 'Selected Location',
    });
  };

  const submitProduct = async (data: ProductForm) => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('title', data.name);
      formData.append('description', data.description);
      formData.append('price', data.price);
      formData.append('location', JSON.stringify(marker));

      images.forEach((img, index) => {
        formData.append('images', {
          uri: img.uri!,
          type: img.type || 'image/jpeg',
          name: img.fileName || `image_${index}.jpg`,
        } as any);
      });

      await axios.put(
        `https://backend-practice.eurisko.me/api/products/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      Alert.alert('Success', 'Product updated successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Failed', 'Error updating product. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <SpinnerScreen />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.title}>Edit Product</Text>
        </View>

        <View style={styles.main}>
          <ProductFormFields
            control={control}
            errors={errors}
            styles={styles}
          />

          <ImagePickerSection
            images={images}
            existingImageUrls={existingImageUrls}
            onPickImage={handlePickImage}
            styles={styles}
          />

          <MapSection
            marker={marker}
            onMapPress={handleMapPress}
            styles={styles}
          />

          <BlueButtons
            name="Update Product"
            onPress={handleSubmit(submitProduct)}
          />
          <BlueButtons name="cancel" onPress={() => navigation.goBack()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProductScreen;
