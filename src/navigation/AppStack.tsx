import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import ProductDetailScreen from '../screens/Product/ProductDetails/ProductDetailScreen';
import ProductListScreen from '../screens/Product/ProductListScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import Camera from '../components/camera/Camera';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import AddProductScreen from '../screens/Product/AddProductScreen/AddProductScreen';
import {RootStackParamList} from '../types/types';
import EditProductScreen from '../screens/Product/EditProduct/EditProduct';
import SearchScreen from '../screens/Product/SearchScreen';
import CartScreen from '../screens/Cart/CarScreen';

const Stack = createStackNavigator<RootStackParamList>();

export default function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ProductList" component={ProductListScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetailScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Camera" component={Camera} />
      <Stack.Screen name="AddProduct" component={AddProductScreen} />
      <Stack.Screen name="EditProduct" component={EditProductScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );
}
