/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import {getCrashlytics, recordError} from '@react-native-firebase/crashlytics';

// Register background message handler for Firebase Messaging
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

// Setup global JS error handler for Crashlytics
const defaultHandler = ErrorUtils.getGlobalHandler();

ErrorUtils.setGlobalHandler((error, isFatal) => {
  const crashlytics = getCrashlytics();

  // Log the error to Crashlytics
  recordError(crashlytics, error);
  crashlytics.log(`Global JS error caught: ${error.message}`);

  // Call the default handler so app shows red screen or crash normally
  defaultHandler(error, isFatal);
});

AppRegistry.registerComponent(appName, () => App);
