import React, {useState, useCallback} from 'react';
import {View, Alert, PermissionsAndroid, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {launchImageLibrary} from 'react-native-image-picker';

import BlueButtons from '../../atoms/BlueButtons';
import {signupUser} from '../../../api/auth';
import SpinnerScreen from '../SpinnerScreen';
import {useAuthStore} from '../../../zustand/AuthStore';
import {registerSchema, RegisterType} from './validationSchema';
import {RegisterScreenNavigationProp} from './types';
import FormInput from './FormInput';
import ImagePickerButton from './ImagePickerButton';
import {styles} from './styles';

const RegisterForm: React.FC = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const {setUser, setIsNewUser, setEmail} = useAuthStore();
  const [profileImage, setProfileImage] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
    setError,
  } = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
  });
  const requestGalleryPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        let granted;
        if (Platform.Version >= 33) {
          granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
            {
              title: 'Gallery Permission',
              message: 'App needs access to your gallery to select images.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
        } else {
          granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
              title: 'Storage Permission',
              message: 'App needs access to your storage to select images.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
        }

        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }

    return true;
  };

  const pickImage = useCallback(async () => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) {
      Alert.alert(
        'Permission Denied',
        'Cannot access gallery without permission.',
      );
      return;
    }

    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.5,
      },
      response => {
        if (
          !response.didCancel &&
          !response.errorCode &&
          response.assets?.length
        ) {
          setProfileImage(response.assets[0]);
        }
      },
    );
  }, []);

  const onSubmit = useCallback(
    async (data: RegisterType) => {
      setLoading(true);

      const formData = new FormData();
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('firstName', data.firstName);
      formData.append('lastName', data.lastName);

      if (profileImage) {
        formData.append('profileImage', {
          uri: profileImage.uri,
          type: profileImage.type || 'image/jpeg',
          name: profileImage.fileName || 'profile.jpg',
        });
      }

      try {
        const response = await signupUser(formData);
        setLoading(false);
        Alert.alert('Success', response.message || 'Registration successful', [
          {
            text: 'OK',
            onPress: () => {
              setUser({email: data.email});
              setEmail(data.email);
              setIsNewUser(true);
            },
          },
        ]);
      } catch (error: any) {
        setLoading(false);
        console.log(error?.response?.data?.message || error.message);

        if (error?.response?.data?.field === 'email') {
          setError('email', {
            type: 'manual',
            message: error.response.data.message || 'Invalid email',
          });
        }

        Alert.alert(
          'Signup Failed',
          error?.response?.data?.message || error.message || 'Network error.',
          [
            {text: 'Cancel', style: 'cancel'},
            {
              text: 'Retry',
              onPress: () => handleSubmit(onSubmit)(),
            },
          ],
        );
      }
    },
    [profileImage, setError, setEmail, setIsNewUser, setUser, handleSubmit],
  );

  return (
    <View style={styles.formContainer}>
      {loading && <SpinnerScreen />}

      <FormInput
        control={control}
        name="email"
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        errors={errors}
      />

      <FormInput
        control={control}
        name="password"
        placeholder="Password"
        secureTextEntry
        errors={errors}
      />

      <FormInput
        control={control}
        name="firstName"
        placeholder="First Name"
        errors={errors}
      />

      <FormInput
        control={control}
        name="lastName"
        placeholder="Last Name"
        errors={errors}
      />

      <ImagePickerButton onPress={pickImage} profileImage={profileImage} />

      <BlueButtons name="SignUp" onPress={handleSubmit(onSubmit)} />
      <BlueButtons name="Back" onPress={navigation.goBack} />
    </View>
  );
};

export default RegisterForm;
