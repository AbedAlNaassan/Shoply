import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  Animated,
  Easing,
  Pressable,
  ScrollView,
  Dimensions,
  PixelRatio,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types/types';
import {useTheme} from '../../context/ThemeContext';
import {getLightStyles} from '../../styles/Welcome.light';
import {getDarkStyles} from '../../styles/Welcome.dark';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const WelcomeScreen = () => {
  const slideAnim = useRef(new Animated.Value(300)).current;
  const navigation = useNavigation<NavigationProp>();
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const pixel = PixelRatio.getFontScale();
  const {theme} = useTheme();

  const styles =
    theme === 'dark'
      ? getDarkStyles(width, height, pixel)
      : getLightStyles(width, height, pixel);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 800,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
            style={({pressed}) => [
              styles.login,
              {opacity: pressed ? 0.5 : 1}, // this line adds the feedback
            ]}>
            <View style={styles.button}>
              <Text style={styles.textButton}>Login</Text>
            </View>
          </Pressable>

          <Pressable
            onPress={() =>
              navigation.navigate('Register', {screen: 'Register'})
            }
            style={({pressed}) => [
              styles.register,
              {opacity: pressed ? 0.5 : 1}, // this line adds the feedback
            ]}>
            <View style={styles.button}>
              <Text style={styles.textButton}>SignUp</Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
