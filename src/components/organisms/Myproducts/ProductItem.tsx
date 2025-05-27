import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Pressable,
  Button,
  Dimensions,
  PixelRatio,
  Alert,
  Text,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Product, RootStackParamList} from '../../../types/types';
import axios from 'axios';
import {useAuthStore} from '../../../zustand/AuthStore';

const width = Dimensions.get('window').width;
const pixel = PixelRatio.getFontScale();
const API_URL = 'https://backend-practice.eurisko.me';

type NavigationProp = StackNavigationProp<RootStackParamList, 'ProductDetails'>;

const ProductItem = ({item}: {item: Product}) => {
  const navigation = useNavigation<NavigationProp>();
  const accessToken = useAuthStore(state => state.accessToken);

  const handleProductPress = (productId: string) => {
    navigation.navigate('ProductDetails', {id: productId});
  };

  const handleEdit = (id: string) => {
    navigation.navigate('EditProduct', {id});
  };

  const handleDelete = async (id: string) => {
    Alert.alert('Delete', 'Are you sure you want to delete this product?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await axios.delete(
              `https://backend-practice.eurisko.me/api/products/${id}`,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              },
            );

            Alert.alert('Success', 'Product deleted successfully');
            // You might want to add a callback here to refresh the list
          } catch (error: any) {
            console.error('Delete failed:', error);
            Alert.alert('Error', 'Failed to delete product.');
          }
        },
      },
    ]);
  };

  return (
    <View key={item._id} style={styles.infoContainer}>
      <Pressable
        onPress={() => handleProductPress(item._id)}
        style={styles.imageList}>
        <Image
          source={
            item.images && item.images.length > 0 && item.images[0].url
              ? {uri: `${API_URL}${item.images[0].url}`}
              : require('../../../assets/Logout.svg')
          }
          style={styles.images}
          resizeMode="contain"
        />
      </Pressable>
      <View style={styles.textList}>
        <Text style={styles.textLists}>{item.title}</Text>
        <Text style={styles.textLists}>{item.price}$</Text>
        <View style={styles.buttonContainer}>
          <Button title="Edit" onPress={() => handleEdit(item._id)} />
          <Button
            title="Delete"
            onPress={() => handleDelete(item._id)}
            color="red"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    width: width / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  imageList: {
    width: '100%',
    height: 120,
  },
  images: {
    width: '100%',
    height: '100%',
  },
  textList: {
    alignItems: 'center',
    marginTop: 10,
  },
  textLists: {
    fontSize: pixel * 15,
    fontFamily: 'Roboto',
    color: '#3A59D1',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 10,
  },
});

export default ProductItem;
