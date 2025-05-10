import React from 'react';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import {useAuth} from '../context/AuthContext';

const RootNavigator = () => {
  const {user} = useAuth();

  return user ? <AppStack /> : <AuthStack />;
};

export default RootNavigator;
