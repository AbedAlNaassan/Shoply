import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainerRef, ParamListBase} from '@react-navigation/native';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import VerificationScreen from '../screens/Auth/VerificationScreen';
import {useAuthStore} from '../zustand/AuthStore';
import {Linking} from 'react-native';

const RootStack = createStackNavigator();

type RootNavigatorProps = {
  navigationRef: React.RefObject<NavigationContainerRef<ParamListBase> | null>;
};

export default function RootNavigator({navigationRef}: RootNavigatorProps) {
  const user = useAuthStore(state => state.user);
  const isNewUser = useAuthStore(state => state.isNewUser);
  const isVerified = useAuthStore(state => state.isVerified);
  const accessToken = useAuthStore(state => state.accessToken);

  useEffect(() => {
    const handleDeepLink = (url?: string) => {
      if (!url) return;
      const route = url.replace(/.*?:\/\//g, '');
      const [screen, id] = route.split('/');

      if (screen === 'product' && id) {
        navigationRef.current?.navigate('App', {
          screen: 'ProductDetails',
          params: {id},
        });
      }
    };

    Linking.getInitialURL().then(url => {
      if (url) {
        handleDeepLink(url);
      }
    });

    const subscription = Linking.addEventListener('url', ({url}) => {
      handleDeepLink(url);
    });

    return () => subscription.remove();
  }, [navigationRef]);

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {!user && <RootStack.Screen name="Auth" component={AuthStack} />}
      {isNewUser && !isVerified && (
        <RootStack.Screen name="Verification" component={VerificationScreen} />
      )}
      {accessToken && isVerified && (
        <RootStack.Screen name="App" component={AppStack} />
      )}
    </RootStack.Navigator>
  );
}
