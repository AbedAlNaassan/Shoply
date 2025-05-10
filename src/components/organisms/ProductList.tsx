import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Pressable,
  Dimensions,
  PixelRatio,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types/types';
const {width, height} = Dimensions.get('window');
const pixel = PixelRatio.getFontScale();
type NavigationProp = StackNavigationProp<RootStackParamList, 'ProductDetails'>;
interface Product {
  _id: string;
  title: string;
  price: number;
  images: {url: string}[];
}

interface Props {
  data: Product[];
  limit?: number; // Optional slice limit
}

const ProductList: React.FC<Props> = ({data, limit}) => {
  const slicedData = limit ? data.slice(0, limit) : data;
  const navigation = useNavigation<NavigationProp>();

  const handleProductPress = (productId: string) => {
    navigation.navigate('ProductDetails', {id: productId});
  };

  const renderItem = ({item}: {item: Product}) => (
    <Pressable
      key={item._id}
      onPress={() => handleProductPress(item._id)}
      style={styles.infoContainer}>
      <View style={styles.imageList}>
        <Image
          source={{uri: item.images[0].url}}
          style={styles.images}
          resizeMode="contain"
        />
      </View>

      <View style={styles.textList}>
        <Text style={styles.textLists}>{item.title}</Text>
        <Text style={styles.textLists}>{item.price}$</Text>
      </View>
    </Pressable>
  );

  return (
    <FlatList
      data={slicedData}
      renderItem={renderItem}
      keyExtractor={item => item._id}
      contentContainerStyle={styles.list}
      numColumns={2}
    />
  );
};

export default ProductList;

const styles = StyleSheet.create({
  list: {
    width: width,
    justifyContent: 'center',
    paddingLeft: width * 0.02,
  },
  infoContainer: {
    width: width * 0.45,
    height: height * 0.21,
    margin: 6,
  },
  images: {
    width: '100%',
    height: '100%',
    marginBottom: 16,
  },
  imageList: {
    width: '100%',
    height: '70%',
  },
  textList: {
    width: '100%',
    height: '30%',
    marginTop: 15,
    marginLeft: 10,
  },
  textLists: {
    fontSize: pixel * 15,
    fontFamily: 'Roboto',
    color: '#3A59D1',
    marginLeft: 20,
  },
});
