import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  PixelRatio,
  ScrollView,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import RegisterForm from '../../components/organisms/RegisterForm/RegisterForm';
import {useTheme} from '../../context/ThemeContext';

const {height} = Dimensions.get('window');
const pixel = PixelRatio.getFontScale();

const RegisterScreen = () => {
  const {theme} = useTheme();
  const styles = theme === 'dark' ? darkStyles : lightStyles;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>SignUp</Text>
        </View>
        <RegisterForm />
      </ScrollView>
    </SafeAreaView>
  );
};

const lightStyles = StyleSheet.create({
  container: {
    width: '100%',
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

const darkStyles = StyleSheet.create({
  container: {
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

export default RegisterScreen;
