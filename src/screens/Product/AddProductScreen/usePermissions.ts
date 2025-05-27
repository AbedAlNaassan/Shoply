import {
  PERMISSIONS,
  request,
  check,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
import {Platform, Alert} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {AssetType} from './productTypes';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../types/types';

export const usePermissions = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

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

  const handlePickImage = async (setImages: (images: AssetType[]) => void) => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) return;

    launchImageLibrary({mediaType: 'photo', selectionLimit: 5}, response => {
      if (response.assets) {
        setImages(response.assets);
      }
    });
  };

  const handleOpenCamera = (onPhotoTaken: (photoUri: string) => void) => {
    const permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA;

    check(permission).then(result => {
      if (result === RESULTS.GRANTED) {
        navigation.navigate('Camera', {onPhotoTaken});
      } else if (result === RESULTS.DENIED) {
        request(permission).then(req => {
          if (req === RESULTS.GRANTED) {
            navigation.navigate('Camera', {onPhotoTaken});
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

  return {handlePickImage, handleOpenCamera};
};
