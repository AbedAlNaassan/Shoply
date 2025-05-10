import {View, Text, StyleSheet, Dimensions, PixelRatio} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import LoginForm from '../../components/organisms/LoginForm';
import {useTheme} from '../../context/ThemeContext';

const {width, height} = Dimensions.get('window');
const pixel = PixelRatio.getFontScale();

const LoginScreen = () => {
  const {theme} = useTheme();

  const styles = theme === 'dark' ? darkStyles : lightStyles;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Login Page</Text>
      </View>
      <LoginForm />
    </SafeAreaView>
  );
};

const lightStyles = StyleSheet.create({
  container: {
    width: width,
    height: height,
  },
  header: {
    width: width,
    height: height * 0.35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: pixel * 40,
    fontFamily: 'Roboto',
    color: '#3A59D1',
  },
});

const darkStyles = StyleSheet.create({
  container: {
    width: '100%',
    height: height,
    backgroundColor: '#12141C',
  },
  header: {
    width: width,
    height: height * 0.35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: pixel * 40,
    fontFamily: 'Roboto',
    color: '#3A59D1',
  },
});

export default LoginScreen;
