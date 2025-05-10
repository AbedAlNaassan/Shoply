import {View, Text, StyleSheet, Dimensions, PixelRatio} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import RegisterForm from '../../components/organisms/RegisterForm';
import {useTheme} from '../../context/ThemeContext';

const {width, height} = Dimensions.get('window');
const pixel = PixelRatio.getFontScale();

const RegisterScreen = () => {
  const {theme} = useTheme();

  const styles = theme === 'dark' ? darkStyles : lightStyles;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>SignUp</Text>
      </View>
      <RegisterForm />
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
    height: height * 0.2,
    justifyContent: 'flex-end',
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
    height: height,
    width: width,
    backgroundColor: '#12141C',
  },
  header: {
    width: width,
    height: height * 0.2,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title: {
    fontSize: pixel * 40,
    fontFamily: 'Roboto',
    color: '#3A59D1',
  },
});

export default RegisterScreen;
