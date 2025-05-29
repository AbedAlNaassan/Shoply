import messaging from '@react-native-firebase/messaging';
import {useEffect} from 'react';
import {Alert} from 'react-native';

export const useMessagingListener = () => {
  useEffect(() => {
    // Foreground messages
    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      console.log('FCM Message Data:', remoteMessage.data);

      setTimeout(() => {
        Alert.alert(
          remoteMessage.notification?.title ?? 'Notification',
          remoteMessage.notification?.body ?? 'You have a new message',
        );
      }, 9000); // delay by 5 seconds
    });

    // When app is opened from a background state (notification tap)
    const unsubscribeNotificationOpened = messaging().onNotificationOpenedApp(
      remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage,
        );
      },
    );

    // When app is opened from quit state (cold start)
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage,
          );
        }
      });

    return () => {
      unsubscribeOnMessage();
      unsubscribeNotificationOpened();
    };
  }, []);
};
