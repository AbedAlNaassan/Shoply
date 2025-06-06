import {Alert, Platform, PermissionsAndroid} from 'react-native';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {launchImageLibrary} from 'react-native-image-picker';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types/types';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Profile'
>;

export const useProfileImage = (
  navigation: ProfileScreenNavigationProp,
  setProfileImage: (uri: string | null) => void,
) => {
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

  return {handleImagePick};
};
