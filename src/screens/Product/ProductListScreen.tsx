import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  PixelRatio,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

import {RootStackParamList} from '../../types/types';
import {useTheme} from '../../context/ThemeContext';
import BackIcon from '../../assets/back.svg';
import MyProducts from '../../components/organisms/Myproducts/MyProducts';

type NavigationProp = StackNavigationProp<RootStackParamList, 'ProductDetails'>;

const {height} = Dimensions.get('screen');
const pixel = PixelRatio.getFontScale();

const ProductListScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const {theme} = useTheme();

  const styles = theme === 'dark' ? darkStyles : lightStyles;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <BackIcon width={30} height={30} />
        </Pressable>
        <Text style={styles.title}>Owner List</Text>
      </View>
      <MyProducts />
    </SafeAreaView>
  );
};

export default ProductListScreen;

const lightStyles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  titleContainer: {
    width: '100%',
    height: height * 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    justifyContent: 'space-evenly',
  },
  title: {
    fontSize: pixel * 30,
    fontFamily: 'Roboto',
    color: '#3A59D1',
  },
});

const darkStyles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#12141C',
  },
  titleContainer: {
    width: '100%',
    height: height * 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    justifyContent: 'space-evenly',
  },
  title: {
    fontSize: pixel * 30,
    fontFamily: 'Roboto',
    color: '#3A59D1',
  },
});
