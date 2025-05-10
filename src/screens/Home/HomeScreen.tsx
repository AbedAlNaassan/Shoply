import {View, Text, TextInput, Image, Pressable} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useForm, Controller} from 'react-hook-form';
import productData from '../../data/Products.json';

import {RootStackParamList} from '../../types/types';
import {useAuth} from '../../context/AuthContext';
import LogoutIcon from '../../assets/Logout.svg';
import Moon from '../../assets/moon.svg';
import ProductList from '../../components/organisms/ProductList';
import {useTheme} from '../../context/ThemeContext';
import {lightStyles} from '../../styles/Home.light';
import {darkStyles} from '../../styles/Home.dark';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const {logout} = useAuth();
  const {theme, toggleTheme} = useTheme();

  const styles = theme === 'dark' ? darkStyles : lightStyles;

  const {control, handleSubmit} = useForm({
    defaultValues: {
      search: '',
    },
  });

  const handleLogout = () => {
    logout();
  };

  const onSearchSubmit = (data: {search: string}) => {
    console.log('Search Term:', data.search);
    // You can add actual search logic here
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.shoply}>Shoply</Text>
        <View style={styles.icon}>
          <Moon width={30} height={30} onPress={toggleTheme} />
          <Pressable onPress={handleLogout}>
            <LogoutIcon width={24} height={24} />
          </Pressable>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <Controller
          control={control}
          name="search"
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              placeholder="Search"
              placeholderTextColor="gray"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              returnKeyType="search"
              onSubmitEditing={handleSubmit(onSearchSubmit)}
            />
          )}
        />
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/saleImage.png')}
          style={styles.image}
        />
      </View>

      <View style={styles.bestSeller}>
        <Text style={styles.shoply}>Best Sellers</Text>
        <Pressable
          onPress={() =>
            navigation.navigate('ProductList', {screen: 'ProductList'})
          }>
          <Text style={styles.seeAll}>See All</Text>
        </Pressable>
      </View>
      <ProductList data={productData.data} limit={4} />
    </SafeAreaView>
  );
};

export default HomeScreen;
