import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import axios from 'axios';
import {useAuthStore} from '../../zustand/AuthStore';
import {RootStackParamList} from '../../types/types';
import {useProfileImage} from './useProfileImage';
import {Alert} from 'react-native';
import {API_URL} from '../../api/constants';

const profileSchema = z.object({
  firstName: z
    .string()
    .min(1, {message: 'First name is required'})
    .max(50, {message: 'First name must be less than 50 characters'})
    .regex(/^[A-Za-z\s'-]+$/, {
      message:
        'First name must contain only letters, spaces, apostrophes, or hyphens',
    }),
  lastName: z
    .string()
    .min(1, {message: 'Last name is required'})
    .max(50, {message: 'Last name must be less than 50 characters'})
    .regex(/^[A-Za-z\s'-]+$/, {
      message:
        'Last name must contain only letters, spaces, apostrophes, or hyphens',
    }),
});

type ProfileFormData = z.infer<typeof profileSchema>;
type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Profile'
>;

export const useProfile = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const {accessToken} = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const {handleImagePick} = useProfileImage(navigation, setProfileImage);

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  const showRetryAlert = (onRetry: () => void) => {
    Alert.alert(
      'Connection Error',
      'Failed to connect. Please check your internet connection or try again later.',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Retry', onPress: onRetry},
      ],
      {cancelable: false},
    );
  };

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/api/user/profile`, {
          headers: {Authorization: `Bearer ${accessToken}`},
        });
        const user = response.data.data.user;

        setValue('firstName', user.firstName);
        setValue('lastName', user.lastName);

        const imageUrl = user.profileImage?.url
          ? user.profileImage.url.startsWith('http')
            ? user.profileImage.url
            : `${API_URL}${user.profileImage.url}`
          : null;

        setProfileImage(imageUrl);
      } catch (err: any) {
        console.error('Failed to fetch profile:', err);
        if (!err.response || err.response.status === 521) {
          showRetryAlert(fetchProfile); // retry fetchProfile on error
        }
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      fetchProfile();
    }
  }, [accessToken, setValue]);

  const submitProfile = async (data: ProfileFormData) => {
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('firstName', data.firstName);
      formData.append('lastName', data.lastName);
      if (profileImage && profileImage.startsWith('file')) {
        formData.append('profileImage', {
          uri: profileImage,
          name: 'profile.jpg',
          type: 'image/jpeg',
        } as any);
      }

      await axios.put(
        'https://backend-practice.eurisko.me/api/user/profile',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      Alert.alert('Success', 'Profile updated successfully.', [{text: 'OK'}]);
    } catch (err: any) {
      console.error('Error updating profile:', err);
      if (!err.response || err.response.status === 521) {
        showRetryAlert(() => submitProfile(data)); // retry submit
      }
    } finally {
      setSubmitting(false);
    }
  };
  return {
    control,
    handleSubmit,
    errors,
    profileImage,
    handleImagePick,
    submitProfile,
    loading,
    submitting,
    navigation,
  };
};
