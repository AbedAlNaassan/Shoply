import {View, Text, Animated, Easing, Pressable} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../types/types';
import {StackNavigationProp} from '@react-navigation/stack';
// import phoneImage from './PhoneImage.png';
import {useTheme} from '../../context/ThemeContext';
import {LightStyles} from '../../styles/Welcome.light';
import {DarkStyles} from '../../styles/Welcome.dark';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
const WelcomeScreen = () => {
  const slideAnim = useRef(new Animated.Value(300)).current; // Start from right (off-screen)
  const navigation = useNavigation<NavigationProp>();
  const {theme} = useTheme();

  const styles = theme === 'dark' ? DarkStyles : LightStyles;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0, // End at original position
      duration: 800,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textandImageContainer}>
        <View style={styles.textContainer}>
          <Text style={[styles.shoply]}>Shoply</Text>
          <Text style={styles.welcome}>Welcome to Shoply</Text>
          <Text style={styles.text}>Sign in or create an account</Text>
        </View>
        <View style={styles.ImageContainer}>
          <Animated.Image
            source={require('../../assets/PhoneImage.png')}
            style={[
              styles.animateImage,
              {transform: [{translateX: slideAnim}]},
            ]}
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={() => navigation.navigate('Login', {screen: 'Login'})}
          style={styles.login}>
          <View style={styles.button}>
            <Text style={styles.textButton}>Login</Text>
          </View>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate('Register', {screen: 'Register'})}
          style={styles.register}>
          <View style={styles.button}>
            <Text style={styles.textButton}>SignUp</Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

// as ReactNativePublicAPI;
