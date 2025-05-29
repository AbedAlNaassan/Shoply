// useNotification.ts
import {useEffect} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';
import {jwtDecode} from 'jwt-decode';
import {useAuthStore} from '../zustand/AuthStore';

const saveTokenToFirestore = async (token: string) => {
  try {
    const accessToken = useAuthStore.getState().accessToken;
    if (!accessToken) {
      console.log('No accessToken, token not saved');
      return;
    }

    const decoded = jwtDecode<{userId?: string}>(accessToken);
    const userId = decoded?.userId;

    if (!userId) {
      console.log('No userId found in token');
      return;
    }

    console.log('Saving token for userId:', userId);
    await firestore().collection('fcmTokens').doc(userId).set({
      token,
      lastUpdated: firestore.FieldValue.serverTimestamp(),
    });
  } catch (error) {
    console.error('Error saving FCM token:', error);
  }
};

const requestUserPermission = async () => {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } else if (Platform.OS === 'ios') {
    const authStatus = await messaging().requestPermission();
    return (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    );
  }
  return true; // Assume permission granted on other platforms
};

const getToken = async () => {
  try {
    const token = await messaging().getToken();
    console.log('FCM Token:', token);
    if (token) {
      await saveTokenToFirestore(token);
    }
  } catch (error) {
    console.log('Error getting FCM token:', error);
  }
};

export const useNotification = () => {
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const setup = async () => {
      const hasPermission = await requestUserPermission();
      if (hasPermission) {
        await getToken();

        // Listen for token refresh
        unsubscribe = messaging().onTokenRefresh(newToken => {
          saveTokenToFirestore(newToken);
        });
      } else {
        console.log('User denied notification permissions');
      }
    };

    setup();

    // Cleanup function to unsubscribe from token refresh
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);
};
