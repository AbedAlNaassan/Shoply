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
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import ProductData from '../../data/Products.json';
import BackIcon from '../../assets/back.svg';
import {RootStackParamList} from '../../types/types';
import ProductList from '../../components/organisms/ProductList';
import {useTheme} from '../../context/ThemeContext';

type NavigationProp = StackNavigationProp<RootStackParamList, 'ProductDetails'>;

const {width, height} = Dimensions.get('window');
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
        <Text style={styles.title}>Phones List</Text>
      </View>

      <ProductList data={ProductData.data} scrollEnabled={true} />
    </SafeAreaView>
  );
};

export default ProductListScreen;

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleContainer: {
    width: width,
    height: height * 0.1, // Adjusted height for title section
    flexDirection: 'row',
    alignItems: 'center',
    gap: 70,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: pixel * 30,
    fontWeight: 'bold',
    color: '#3A59D1',
  },
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#12141C',
  },
  titleContainer: {
    width: width,
    height: height * 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 70,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: pixel * 30,
    fontFamily: 'Roboto',
    color: '#3A59D1',
  },
});
