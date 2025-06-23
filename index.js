//this is metadata for some tools and formatters (like Prettier or Metro bundler).
/**
 * @format
 */
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {getMessaging} from '@react-native-firebase/messaging';
import {getCrashlytics, recordError} from '@react-native-firebase/crashlytics';

//  runs when a push notification is received while the app is in the background or killed
getMessaging().setBackgroundMessageHandler(async remoteMessage => {
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
//This tells React Native to start the app using the App component.
AppRegistry.registerComponent(appName, () => App);
