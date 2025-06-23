import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainerRef, ParamListBase} from '@react-navigation/native';
import {Linking} from 'react-native';
import {CommonActions} from '@react-navigation/native';

import AuthStack from './AuthStack';
import AppStack from './AppStack';
import VerificationScreen from '../screens/Auth/VerificationScreen';
import {useAuthStore} from '../zustand/AuthStore';
import Config from 'react-native-config';

const RootStack = createStackNavigator();

console.log('Environment:', Config.APP_ENV);
console.log('API URL:', Config.API_URL);
type RootNavigatorProps = {
  navigationRef: React.RefObject<NavigationContainerRef<ParamListBase> | null>;
};

export default function RootNavigator({navigationRef}: RootNavigatorProps) {
  const {user, accessToken, isNewUser, isVerified, loadStoredTokens} =
    useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      await loadStoredTokens(); // Ensure tokens are loaded before render
      setIsLoading(false);
    };

    initializeAuth();
  }, [loadStoredTokens]);

  useEffect(() => {
    const handleDeepLink = (url?: string) => {
      if (!url) return;

      try {
        // Strip the scheme (e.g., myapp://product/123)
        const route = url.replace(/.*?:\/\//g, ''); // → product/123
        const parts = route.split('/'); // ['product', '123']
        const screen = parts[0];
        const id = parts[1];

        if (screen === 'product' && id) {
          navigationRef.current?.dispatch(
            CommonActions.navigate({
              name: 'App',
              params: {
                screen: 'ProductDetails',
                params: {id},
              },
            }),
          );
        }
      } catch (err) {
        console.warn('Invalid deep link URL:', url);
      }
    };

    const setupDeepLinking = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) handleDeepLink(initialUrl);

      const subscription = Linking.addEventListener('url', ({url}) =>
        handleDeepLink(url),
      );

      return () => subscription.remove();
    };

    setupDeepLinking();
  }, [navigationRef]);

  // Prevent navigation rendering before loading tokens
  if (isLoading) return null;

  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      {!user && <RootStack.Screen name="Auth" component={AuthStack} />}
      {user && isNewUser && !isVerified && (
        <RootStack.Screen name="Verification" component={VerificationScreen} />
      )}
      {accessToken && isVerified && (
        <RootStack.Screen name="App" component={AppStack} />
      )}
    </RootStack.Navigator>
  );
}
