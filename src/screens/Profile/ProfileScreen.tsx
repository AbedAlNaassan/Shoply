import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  Dimensions,
  View,
  PixelRatio,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useForm, Controller} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import BlueButtons from '../../components/atoms/BlueButtons';
import {launchImageLibrary} from 'react-native-image-picker';
import {useAuthStore} from '../../zustand/AuthStore';
import {useTheme} from '../../context/ThemeContext';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types/types';
import SpinnerScreen from '../../components/organisms/SpinnerScreen';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import axios from 'axios';

const pixel = PixelRatio.getFontScale();
type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Profile'
>;
const height = Dimensions.get('window').height;

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

const ProfileScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const {accessToken} = useAuthStore();
  const {theme} = useTheme();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const styles = theme === 'dark' ? darkStyles : lightStyles;

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          'https://backend-practice.eurisko.me/api/user/profile',
          {
            headers: {Authorization: `Bearer ${accessToken}`},
          },
        );
        const user = response.data.data.user;

        setValue('firstName', user.firstName);
        setValue('lastName', user.lastName);

        const imageUrl = user.profileImage?.url
          ? user.profileImage.url.startsWith('http')
            ? user.profileImage.url
            : `https://backend-practice.eurisko.me${user.profileImage.url}`
          : null;

        setProfileImage(imageUrl);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
        Alert.alert('Error', 'Failed to fetch profile data.', [
          {text: 'Retry', onPress: fetchProfile},
          {text: 'Cancel', style: 'cancel'},
        ]);
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
    const trySubmit = async () => {
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

        Alert.alert('Success', 'Profile updated successfully!');
      } catch (err) {
        console.error('Error updating profile:', err);
        Alert.alert('Update Failed', 'Retry update?', [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => setSubmitting(false),
          },
          {text: 'Retry', onPress: trySubmit},
        ]);
        return;
      }
      setSubmitting(false);
    };
    trySubmit();
  };

  const requestGalleryPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES ||
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      const res = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
      return res === RESULTS.GRANTED;
    }
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      const res = await request(PERMISSIONS.IOS.CAMERA);
      return res === RESULTS.GRANTED;
    }
  };

  const handleImagePick = () => {
    Alert.alert('Select Image', 'Choose an option', [
      {
        text: 'Camera Vision',
        onPress: async () => {
          const hasPermission = await requestCameraPermission();
          if (hasPermission) {
            navigation.navigate('Camera', {
              onPhotoTaken: (uri: string) => {
                setProfileImage(uri);
              },
            });
          } else {
            Alert.alert('Permission denied', 'Camera permission is required.');
          }
        },
      },
      {
        text: 'Gallery',
        onPress: async () => {
          const hasPermission = await requestGalleryPermission();
          if (hasPermission) {
            launchImageLibrary({mediaType: 'photo', quality: 0.7}, response => {
              if (response.assets && response.assets.length > 0) {
                setProfileImage(response.assets[0].uri || null);
              }
            });
          } else {
            Alert.alert('Permission denied', 'Gallery access is required.');
          }
        },
      },
      {text: 'Cancel', style: 'cancel'},
    ]);
  };

  if (loading || submitting) return <SpinnerScreen />;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.profile}>Profile</Text>
          <TouchableOpacity onPress={handleImagePick}>
            {profileImage ? (
              <Image source={{uri: profileImage}} style={styles.avatar} />
            ) : (
              <View style={styles.placeholderImage}>
                <Text style={{color: '#888'}}>Pick Image</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.main}>
          <Controller
            control={control}
            name="firstName"
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.input}
                placeholder="First Name"
                placeholderTextColor="gray"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="words"
              />
            )}
          />
          {errors.firstName && (
            <Text style={styles.error}>{errors.firstName.message}</Text>
          )}

          <Controller
            control={control}
            name="lastName"
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.input}
                placeholder="Last Name"
                placeholderTextColor="gray"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="words"
              />
            )}
          />
          {errors.lastName && (
            <Text style={styles.error}>{errors.lastName.message}</Text>
          )}

          <BlueButtons name="Save" onPress={handleSubmit(submitProfile)} />
          <BlueButtons name="Back" onPress={() => navigation.goBack()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const lightStyles = StyleSheet.create({
  container: {flex: 1, width: '100%'},
  header: {
    width: '100%',
    height: height * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profile: {
    fontFamily: 'Roboto',
    fontSize: pixel * 40,
    color: '#3A59D1',
    marginBottom: 15,
  },
  avatar: {width: 120, height: 120, borderRadius: 60},
  placeholderImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderColor: '#ccc',
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    width: '100%',
    height: height * 0.6,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: 320,
    padding: 15,
    marginTop: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 50,
    color: '#3A59D1',
  },
  error: {color: 'red', alignSelf: 'flex-start', paddingLeft: 15, marginTop: 5},
});

const darkStyles = {
  ...lightStyles,
  container: {...lightStyles.container, backgroundColor: '#12141C'},
};
