import {getApp} from '@react-native-firebase/app';
import {useEffect} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import {jwtDecode} from 'jwt-decode';
import {useAuthStore} from '../zustand/AuthStore';

import {
  getMessaging,
  getToken,
  onTokenRefresh,
  requestPermission,
  AuthorizationStatus,
} from '@react-native-firebase/messaging';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  serverTimestamp,
} from '@react-native-firebase/firestore';

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

    const db = getFirestore(getApp());
    await setDoc(doc(collection(db, 'fcmTokens'), userId), {
      token,
      lastUpdated: serverTimestamp(),
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
    const messaging = getMessaging(getApp());
    const authStatus = await requestPermission(messaging);
    return (
      authStatus === AuthorizationStatus.AUTHORIZED ||
      authStatus === AuthorizationStatus.PROVISIONAL
    );
  }
  return true;
};

export const useNotification = (onPermissionDenied?: () => void) => {
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const setup = async () => {
      try {
        const hasPermission = await requestUserPermission();
        if (hasPermission) {
          const messaging = getMessaging();
          const fcmToken = await getToken(messaging);
          console.log('FCM Token:', fcmToken);

          if (fcmToken) {
            await saveTokenToFirestore(fcmToken);
          }

          unsubscribe = onTokenRefresh(messaging, async newToken => {
            await saveTokenToFirestore(newToken);
          });
        } else {
          if (onPermissionDenied) {
            onPermissionDenied();
          }
          console.log('User denied notification permissions');
        }
      } catch (error) {
        console.error('Error setting up notifications:', error);
      }
    };

    setup();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [onPermissionDenied]);
};
