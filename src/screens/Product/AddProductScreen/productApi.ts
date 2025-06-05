import axios from 'axios';
import analytics from '@react-native-firebase/analytics';
import {ProductForm, AssetType} from './productTypes';
import {useAuthStore} from '../../../zustand/AuthStore';

export const submitProduct = async (data: ProductForm, images: AssetType[]) => {
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
    const response = await axios.post(
      'https://backend-practice.eurisko.me/api/products',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    await analytics().logEvent('product_added', {
      product_name: data.name,
      price: parseFloat(data.price),
      currency: 'USD',
    });

    // Trigger Firebase Cloud Function to notify users
    try {
      console.log('Calling notification function...');
      await axios.get('https://notifynewproduct-7mzrpjj6bq-uc.a.run.app');
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
