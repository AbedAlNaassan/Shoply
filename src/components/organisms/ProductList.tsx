import React from 'react';
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
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types/types';

const {width} = Dimensions.get('window');
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
  limit?: number;
  scrollEnabled?: boolean;
}

const ProductList: React.FC<Props> = ({data, limit, scrollEnabled = true}) => {
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
      scrollEnabled={scrollEnabled} // Control scrolling based on scrollEnabled prop
    />
  );
};

export default ProductList;

const styles = StyleSheet.create({
  list: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
    marginTop: 20,
  },
  infoContainer: {
    width: width / 2,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageList: {
    width: '100%',
    height: '60%',
  },
  images: {
    width: '100%',
    height: '100%',
  },
  textList: {
    height: '30%',
    justifyContent: 'center',
    marginTop: 15,
    alignItems: 'center',
  },
  textLists: {
    width: '100%',
    flex: 1,
    fontSize: pixel * 15,
    fontFamily: 'Roboto',
    color: '#3A59D1',
  },
});
