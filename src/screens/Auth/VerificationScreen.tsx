import {View, Text, StyleSheet, Dimensions, PixelRatio} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import VerificationForm from '../../components/organisms/VerificationForm';
import {useTheme} from '../../context/ThemeContext';

const {width, height} = Dimensions.get('window');
const pixel = PixelRatio.getFontScale();

const VerificationScreen = () => {
  // ✅ This defines the type
  const {theme} = useTheme();

  const styles = theme === 'dark' ? darkStyles : lightStyles;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textandCodeContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.shoply}>Shoply</Text>
          <Text style={styles.verification}>Verification</Text>
          <Text style={styles.text}>Enter the code we sent to your email</Text>
        </View>

        {/* Code Inputs */}
        <VerificationForm />
      </View>
    </SafeAreaView>
  );
};

const lightStyles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textandCodeContainer: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    width: '100%',
    height: '40%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  shoply: {
    fontSize: pixel * 40,
    fontWeight: 'bold',
    color: '#3A59D1',
  },
  verification: {
    fontSize: pixel * 40,
    fontWeight: 'bold',
  },
  text: {
    fontSize: pixel * 20,
    textAlign: 'center',
    marginTop: 10,
  },
});

const darkStyles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#12141C',
  },
  textandCodeContainer: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    width: '100%',
    height: '40%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  shoply: {
    fontSize: pixel * 40,
    fontWeight: 'bold',
    color: '#3A59D1',
  },
  verification: {
    fontSize: pixel * 40,
    fontWeight: 'bold',
    color: 'gray',
  },
  text: {
    fontSize: pixel * 20,
    textAlign: 'center',
    marginTop: 10,
    color: 'gray',
  },
});

export default VerificationScreen;
