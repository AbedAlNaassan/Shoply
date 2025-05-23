import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import axios from 'axios';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import MapView, {Marker, MapPressEvent} from 'react-native-maps';
import BlueButtons from '../../components/atoms/BlueButtons';
import {useAuthStore} from '../../zustand/AuthStore';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import SpinnerScreen from '../../components/organisms/SpinnerScreen';
import {RootStackParamList} from '../../types/types';
import {useTheme} from '../../context/ThemeContext';
import {lightStyles} from '../../styles/EditProduct.light';
import {darkStyles} from '../../styles/EditProduct.dark';
import {
  PERMISSIONS,
  request,
  check,
  RESULTS,
  openSettings,
} from 'react-native-permissions';

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

  // Local state
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

  // Fetch product data on component mount
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

  // Handle picking images from gallery
  const handlePickImage = async () => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) return;

    launchImageLibrary({mediaType: 'photo', selectionLimit: 5}, response => {
      if (response.assets) {
        setImages(response.assets);
        setExistingImageUrls([]); // Clear existing images when replaced
      }
    });
  };

  // Handle map press to update marker location
  const handleMapPress = (event: MapPressEvent) => {
    const {latitude, longitude} = event.nativeEvent.coordinate;
    setMarker({
      latitude,
      longitude,
      name: 'Selected Location',
    });
  };

  // Submit updated product data
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
          {/* Product Name */}
          <Controller
            name="name"
            control={control}
            render={({field: {onChange, value}}) => (
              <TextInput
                style={styles.input}
                placeholder="Product Name"
                placeholderTextColor="gray"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.name && (
            <Text style={styles.error}>{errors.name.message}</Text>
          )}

          {/* Description */}
          <Controller
            name="description"
            control={control}
            render={({field: {onChange, value}}) => (
              <TextInput
                style={styles.input}
                placeholder="Description"
                placeholderTextColor="gray"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.description && (
            <Text style={styles.error}>{errors.description.message}</Text>
          )}

          {/* Price */}
          <Controller
            name="price"
            control={control}
            render={({field: {onChange, value}}) => (
              <TextInput
                style={styles.input}
                placeholder="Price"
                placeholderTextColor="gray"
                onChangeText={onChange}
                value={value}
                keyboardType="numeric"
              />
            )}
          />
          {errors.price && (
            <Text style={styles.error}>{errors.price.message}</Text>
          )}

          {/* Image Picker */}
          <View style={styles.imagePickerButtons}>
            <TouchableOpacity onPress={handlePickImage}>
              <Text style={styles.link}>Pick from Gallery</Text>
            </TouchableOpacity>
          </View>

          {/* Existing Images */}
          {existingImageUrls.length > 0 && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.imagesContainer}>
              {existingImageUrls.map((url, idx) => (
                <Image key={idx} source={{uri: url}} style={styles.image} />
              ))}
            </ScrollView>
          )}

          {/* Newly Picked Images */}
          {images.length > 0 && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.imagesContainer}>
              {images.map((img, idx) => (
                <Image key={idx} source={{uri: img.uri}} style={styles.image} />
              ))}
            </ScrollView>
          )}

          {/* Map View */}
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: marker.latitude,
                longitude: marker.longitude,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
              }}
              onPress={handleMapPress}
              showsUserLocation
              zoomEnabled
              zoomControlEnabled
              loadingEnabled>
              <Marker
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                title={marker.name}
              />
            </MapView>
          </View>

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
