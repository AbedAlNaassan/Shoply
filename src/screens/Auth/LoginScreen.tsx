import React from 'react';
import {View, Text, StyleSheet, PixelRatio, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LoginForm from '../../components/organisms/LoginForm';
import {useTheme} from '../../context/ThemeContext';
import {useWindowDimensions} from 'react-native';

const pixel = PixelRatio.getFontScale();

const LoginScreen = () => {
  const {theme} = useTheme();

  const {width, height} = useWindowDimensions(); // Automatically get screen dimensions

  const styles =
    theme === 'dark' ? darkStyles(width, height) : lightStyles(width, height);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
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
      flex: 1, // Use flex to take the full available space
      justifyContent: 'center',
      alignItems: 'center',
    },
    scrollViewContainer: {
      flexGrow: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingBottom: 20,
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

const darkStyles = (width: number, height: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#12141C',
      justifyContent: 'center',
      alignItems: 'center',
    },
    scrollViewContainer: {
      flexGrow: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingBottom: 20,
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
