import {createStackNavigator} from '@react-navigation/stack';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import VerificationScreen from '../screens/Auth/VerificationScreen';
import {useAuthStore} from '../zustand/AuthStore';

const RootStack = createStackNavigator();

export default function RootNavigator() {
  const user = useAuthStore(state => state.user);
  const isNewUser = useAuthStore(state => state.isNewUser);
  const isVerified = useAuthStore(state => state.isVerified);
  const accessToken = useAuthStore(state => state.accessToken);

  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
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
