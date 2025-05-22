import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  PixelRatio,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  Platform,
} from 'react-native';
import {
  PERMISSIONS,
  request,
  check,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import MapView, {Marker, MapPressEvent} from 'react-native-maps';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import {Controller, useForm} from 'react-hook-form';
import SpinnerScreen from '../../components/organisms/SpinnerScreen';
import BlueButtons from '../../components/atoms/BlueButtons';
import {RootStackParamList} from '../../types/types';
import {useTheme} from '../../context/ThemeContext';
import {useAuthStore} from '../../zustand/AuthStore';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import axios from 'axios';

const {height, width} = Dimensions.get('window');
const pixel = PixelRatio.getFontScale();

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

const AddProductScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {theme} = useTheme();
  const [images, setImages] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(false);
  const accessToken = useAuthStore(state => state.accessToken);
  const styles = theme === 'dark' ? darkStyles : lightStyles;
  const [marker, setMarker] = useState({
    name: 'Beirut',
    latitude: 33.8938,
    longitude: 35.5018,
  });

  const {
    control,
    handleSubmit,
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

  const requestGalleryPermission = async () => {
    const permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.PHOTO_LIBRARY
        : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;

    const result = await check(permission);
    if (result === RESULTS.GRANTED) return true;

    if (result === RESULTS.DENIED) {
      const req = await request(permission);
      return req === RESULTS.GRANTED;
    }

    if (result === RESULTS.BLOCKED) {
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
      }
    });
  };

  const handleOpenCamera = () => {
    const permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA;

    check(permission).then(result => {
      if (result === RESULTS.GRANTED) {
        navigation.navigate('Camera', {
          onPhotoTaken: (photoUri: string) => {
            const newAsset: Asset = {
              uri: photoUri,
              fileName: photoUri.split('/').pop() || 'photo.jpg',
              type: 'image/jpeg',
              width: 0,
              height: 0,
            };
            setImages(prev => [...prev, newAsset]);
          },
        });
      } else if (result === RESULTS.DENIED) {
        request(permission).then(req => {
          if (req === RESULTS.GRANTED) {
            handleOpenCamera();
          }
        });
      } else if (result === RESULTS.BLOCKED) {
        Alert.alert(
          'Permission Required',
          'Please allow camera access from settings.',
          [
            {text: 'Open Settings', onPress: () => openSettings()},
            {text: 'Cancel', style: 'cancel'},
          ],
        );
      }
    });
  };

  const handleMapPress = (e: MapPressEvent) => {
    const {latitude, longitude} = e.nativeEvent.coordinate;
    setMarker({
      latitude,
      longitude,
      name: 'Selected Location',
    });
  };

  const submitProduct = async (data: ProductForm) => {
    setLoading(true);

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

    try {
      await axios.post(
        'https://backend-practice.eurisko.me/api/products',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      setLoading(false);
      Alert.alert('Success', 'Product added successfully');
    } catch (error) {
      setLoading(false);
      Alert.alert('Failed', 'Error submitting product. Try again later.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Add Product</Text>
        </View>

        <View style={styles.main}>
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

          <View style={styles.imagePickerButtons}>
            <TouchableOpacity onPress={handlePickImage}>
              <Text style={styles.link}>Pick from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleOpenCamera}>
              <Text style={styles.link}>Open Camera</Text>
            </TouchableOpacity>
          </View>

          {images.length > 0 && (
            <ScrollView horizontal style={{marginVertical: 10}}>
              {images.map((img, idx) => (
                <Image key={idx} source={{uri: img.uri}} style={styles.image} />
              ))}
            </ScrollView>
          )}

          <Text style={styles.mapInstruction}>
            Tap on map to choose location:
          </Text>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: marker.latitude,
              longitude: marker.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            onPress={handleMapPress}>
            <Marker coordinate={marker} title={marker.name} />
          </MapView>

          <BlueButtons
            name="Add Product"
            onPress={handleSubmit(submitProduct)}
          />
        </View>
      </ScrollView>

      <Modal visible={loading} transparent animationType="fade">
        <SpinnerScreen />
      </Modal>
    </SafeAreaView>
  );
};

export default AddProductScreen;

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    height: height * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: pixel * 35,
    fontFamily: 'Roboto',
    color: '#3A59D1',
  },
  main: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 30,
  },
  input: {
    width: 330,
    padding: 15,
    marginTop: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 50,
    color: '#3A59D1',
  },
  error: {
    color: 'red',
    marginTop: 5,
    marginLeft: 30,
    width: width * 0.8,
    textAlign: 'left',
  },
  imagePickerButtons: {
    flexDirection: 'row',
    marginTop: 15,
    gap: 10,
  },
  link: {
    color: '#3A59D1',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 10,
  },
  mapInstruction: {
    marginTop: 15,
    fontWeight: 'bold',
    color: '#3A59D1',
  },
  map: {
    width: width * 0.9,
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#12141C',
  },
  header: {
    width: '100%',
    height: height * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: pixel * 35,
    fontFamily: 'Roboto',
    color: '#3A59D1',
  },
  main: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 30,
  },
  input: {
    width: 330,
    padding: 15,
    marginTop: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 50,
    color: '#3A59D1',
  },
  error: {
    color: 'red',
    marginTop: 5,
    marginLeft: 30,
    width: width * 0.8,
    textAlign: 'left',
  },
  imagePickerButtons: {
    flexDirection: 'row',
    marginTop: 15,
    gap: 10,
  },
  link: {
    color: '#3A59D1',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 10,
  },
  mapInstruction: {
    marginTop: 15,
    fontWeight: 'bold',
    color: '#3A59D1',
  },
  map: {
    width: width * 0.9,
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
});
