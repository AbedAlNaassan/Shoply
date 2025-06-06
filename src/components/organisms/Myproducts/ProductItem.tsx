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
import {Products, RootStackParamList} from '../../../types/types';
import axios from 'axios';
import {useAuthStore} from '../../../zustand/AuthStore';
import {API_URL} from '../../../api/constants';

const width = Dimensions.get('window').width;
const pixel = PixelRatio.getFontScale();

type NavigationProp = StackNavigationProp<RootStackParamList, 'ProductDetails'>;

const ProductItem = ({
  item,
  onDeleteSuccess,
  setDeleteLoading,
}: {
  item: Products;
  onDeleteSuccess: () => void;
  setDeleteLoading: (value: boolean) => void;
}) => {
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
            setDeleteLoading(true); // 👈 Start spinner
            await axios.delete(`${API_URL}/api/products/${id}`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
            Alert.alert('Success', 'Product deleted successfully');
            onDeleteSuccess();
          } catch (error) {
            console.error('Delete failed:', error);
            Alert.alert('Error', 'Failed to delete product.');
          } finally {
            setDeleteLoading(false); // 👈 Stop spinner
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.infoContainer}>
      <Pressable
        onPress={() => handleProductPress(item._id)}
        style={styles.imageList}>
        <Image
          source={
            item.images?.[0]?.url
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
