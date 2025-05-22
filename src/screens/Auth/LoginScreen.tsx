import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  PixelRatio,
  ScrollView,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LoginForm from '../../components/organisms/LoginForm';
import {useTheme} from '../../context/ThemeContext';

const pixel = PixelRatio.getFontScale();

const LoginScreen = () => {
  const {theme} = useTheme();

  const width = Dimensions.get('screen').width;
  const height = Dimensions.get('screen').height; // Automatically get screen dimensions

  const styles =
    theme === 'dark' ? darkStyles(width, height) : lightStyles(width, height);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Login Page</Text>
        </View>
        <LoginForm />
      </ScrollView>
    </SafeAreaView>
  );
};

const lightStyles = (width: number, height: number) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
    },
    header: {
      width: '100%',
      height: height * 0.3,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: pixel * 40,
      fontFamily: 'Roboto',
      color: '#3A59D1',
    },
  });

const darkStyles = (width: number, height: number) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: '#12141C',
    },
    header: {
      width: '100%',
      height: height * 0.3,
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
