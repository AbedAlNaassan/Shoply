import React, {useState} from 'react';
import {View, Text, Modal, SafeAreaView, ScrollView, Alert} from 'react-native';
import {useTheme} from '../../../context/ThemeContext';
import {lightStyles} from '../../../styles/AddProduct.light';
import {darkStyles} from '../../../styles/AddProduct.dark';
import SpinnerScreen from '../../../components/organisms/SpinnerScreen';
import {MarkerType, AssetType, ProductForm} from './productTypes';
import BlueButtons from '../../../components/atoms/BlueButtons';
import {useProductForm} from './useProductForm';
import {ImagePickerSection} from './ImagePickerSection';
import {LocationPicker} from './LocationPicker';
import {ProductFormFields} from './ProductFormFields';
import {submitProduct} from './productApi';
import {MapPressEvent} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../types/types';

const initialMarker: MarkerType = {
  name: 'Beirut',
  latitude: 33.8938,
  longitude: 35.5018,
};

const AddProduct = () => {
  const {theme} = useTheme();
  const [images, setImages] = useState<AssetType[]>([]);
  const [loading, setLoading] = useState(false);
  const [marker, setMarker] = useState<MarkerType>(initialMarker);
  const styles = theme === 'dark' ? darkStyles : lightStyles;
  const {control, handleSubmit, errors, setValue} =
    useProductForm(initialMarker);
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'AddProduct'>>();

  const handleMapPress = (e: MapPressEvent) => {
    const {latitude, longitude} = e.nativeEvent.coordinate;
    const newMarker = {
      latitude,
      longitude,
      name: 'Selected Location',
    };
    setMarker(newMarker);
    setValue('location', newMarker);
  };

  const handleSearchSelect = (selectedLocation: MarkerType) => {
    const newMarker = {
      ...selectedLocation,
      name: selectedLocation.name || 'Searched Location',
    };
    setMarker(newMarker);
    setValue('location', newMarker);
  };

  const onSubmit = async (data: ProductForm) => {
    setLoading(true);
    const result = await submitProduct(data, images, navigation);
    setLoading(false);

    if (result.success) {
      Alert.alert('Success', 'Product added successfully');
      setImages([]);
      setMarker(initialMarker);
    } else {
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
          <ProductFormFields
            control={control}
            errors={errors}
            styles={styles}
          />

          <ImagePickerSection
            images={images}
            setImages={setImages}
            styles={styles}
          />

          <LocationPicker
            marker={marker}
            onMapPress={handleMapPress}
            onSearchSelect={handleSearchSelect}
            styles={styles}
          />

          <BlueButtons name="Add Product" onPress={handleSubmit(onSubmit)} />
        </View>
      </ScrollView>

      <Modal visible={loading} transparent animationType="fade">
        <SpinnerScreen />
      </Modal>
    </SafeAreaView>
  );
};

export default AddProduct;
