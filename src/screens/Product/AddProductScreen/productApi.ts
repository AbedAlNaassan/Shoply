import axios from 'axios';
import {getAnalytics, logEvent} from '@react-native-firebase/analytics';
import {getApp} from '@react-native-firebase/app';
import {ProductForm, AssetType} from './productTypes';
import {useAuthStore} from '../../../zustand/AuthStore';
import {API_URL} from '../../../api/constants';
import {RootStackParamList} from '../../../types/types';
import {StackNavigationProp} from '@react-navigation/stack';

type NavigationProp = StackNavigationProp<RootStackParamList, 'ProductList'>;

export const submitProduct = async (
  data: ProductForm,
  images: AssetType[],
  navigation: NavigationProp,
) => {
  const accessToken = useAuthStore.getState().accessToken;
  const formData = new FormData();

  formData.append('title', data.name);
  formData.append('description', data.description);
  formData.append('price', data.price);
  formData.append('location', JSON.stringify(data.location));

  images.forEach((img, index) => {
    formData.append('images', {
      uri: img.uri,
      type: img.type || 'image/jpeg',
      name: img.fileName || `image_${index}.jpg`,
    } as any);
  });

  try {
    const response = await axios.post(`${API_URL}/api/products`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const analytics = getAnalytics(getApp());
    await logEvent(analytics, 'product_added', {
      product_name: data.name,
      price: parseFloat(data.price),
      currency: 'USD',
    });

    // Trigger Firebase Cloud Function to notify users
    try {
      console.log('Calling notification function...');

      await axios.get('https://notifynewproduct-7mzrpjj6bq-uc.a.run.app');
      navigation.navigate({
        name: 'ProductList',
        params: {screen: 'ProductList'},
      });
      console.log('Notification function call completed.');
    } catch (notifyError) {
      console.error('Failed to send new product notification:', notifyError);
    }

    return {success: true, data: response.data};
  } catch (error) {
    console.error('Product submission error:', error);
    return {success: false, error};
  }
};
