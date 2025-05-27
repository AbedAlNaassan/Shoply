import {useEffect} from 'react';
import {PermissionsAndroid} from 'react-native';
import messaging from '@react-native-firebase/messaging';

const requestUserPermission = async () => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  );
  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    console.log('User granted permission');
  } else {
    console.log('User denied permission');
  }
};

const getToken = async () => {
  try {
    const token = await messaging().getToken();
    console.log('FCM', token);
  } catch (error) {
    console.log(error);
  }
};

export const useNotification = () => {
  useEffect(() => {
    requestUserPermission();
    getToken();
  }, []);
};
