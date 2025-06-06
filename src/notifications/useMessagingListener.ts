import {
  getMessaging,
  onMessage,
  onNotificationOpenedApp,
  getInitialNotification,
} from '@react-native-firebase/messaging';
import {useEffect} from 'react';
import notifee, {AndroidImportance} from '@notifee/react-native';

export const useMessagingListener = () => {
  useEffect(() => {
    // Create channel once (for Android)
    const createChannel = async () => {
      await notifee.requestPermission();
      await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
      });
    };
    createChannel();

    // Get the messaging instance
    const messaging = getMessaging();

    // Foreground messages
    const unsubscribeOnMessage = onMessage(messaging, async remoteMessage => {
      console.log('FCM Message Data:', remoteMessage.data);

      // Replace Alert with Notifee
      await notifee.displayNotification({
        title: remoteMessage.notification?.title ?? 'Notification',
        body: remoteMessage.notification?.body ?? 'You have a new message',
        android: {
          channelId: 'default',
          smallIcon: 'ic_launcher', // Make sure this icon exists
        },
      });
    });

    const unsubscribeNotificationOpened = onNotificationOpenedApp(
      messaging,
      remoteMessage => {
        console.log(
          'Notification caused app to open from background:',
          remoteMessage,
        );
      },
    );

    getInitialNotification(messaging).then(remoteMessage => {
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
