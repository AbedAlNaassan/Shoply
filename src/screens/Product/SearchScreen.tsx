import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  Image,
  Pressable,
  ActivityIndicator,
  Dimensions,
  PixelRatio,
  Alert,
} from 'react-native';
import axios from 'axios';
import {useAuthStore} from '../../zustand/AuthStore';
import {useTheme} from '../../context/ThemeContext';

const API_URL = 'https://backend-practice.eurisko.me';
const width = Dimensions.get('screen').width;
const pixel = PixelRatio.getFontScale();

interface Product {
  _id: string;
  title: string;
  price?: number;
  images?: {url: string}[];
}

interface SearchResponse {
  data: Product[];
}

const SearchScreen = () => {
  const accessToken = useAuthStore(state => state.accessToken);
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {theme} = useTheme();
  const styles = theme === 'dark' ? darkStyles : lightStyles;
  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get<SearchResponse>(
        `${API_URL}/api/products/search`,
        {
          params: {query},
          headers: {Authorization: `Bearer ${accessToken}`},
        },
      );
      console.log('response', response.data);
      setProducts(response.data.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        // No response means network error
        if (!err.response) {
          Alert.alert(
            'Connection Error',
            'Server or connection is down. Would you like to retry?',
            [
              {text: 'Cancel', style: 'cancel'},
              {
                text: 'Retry',
                onPress: () => {
                  handleSearch();
                },
              },
            ],
            {cancelable: false},
          );
        } else if (err.response.status >= 500 && err.response.status < 600) {
          // Server error (5xx)
          Alert.alert(
            'Server Error',
            `Server returned error ${err.response.status}. Would you like to retry?`,
            [
              {text: 'Cancel', style: 'cancel'},
              {
                text: 'Retry',
                onPress: () => {
                  handleSearch();
                },
              },
            ],
            {cancelable: false},
          );
        } else {
          // Other HTTP errors
          setError(`Error: ${err.response.status} ${err.response.statusText}`);
        }
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({item}: {item: Product}) => (
    <Pressable style={styles.infoContainer} onPress={() => {}}>
      <View style={styles.imageList}>
        <Image
          source={
            item.images && item.images.length > 0 && item.images[0].url
              ? {uri: `${API_URL}${item.images[0].url}`}
              : require('../../assets/PhoneImage.png')
          }
          style={styles.images}
          resizeMode="contain"
        />
      </View>
      <View style={styles.textList}>
        <Text style={styles.textLists}>{item.title}</Text>
        {item.price !== undefined && (
          <Text style={styles.textLists}>{item.price}$</Text>
        )}
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search products..."
          placeholderTextColor="#808080"
          value={query}
          onChangeText={setQuery}
          style={styles.searchInput}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <Button title="Search" onPress={handleSearch} />
      </View>

      <View style={styles.listContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#3A59D1" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : products.length === 0 ? (
          <Text style={styles.noResultsText}>No products found.</Text>
        ) : (
          <FlatList
            data={products}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            numColumns={2}
            contentContainerStyle={styles.list}
          />
        )}
      </View>
    </View>
  );
};

export default SearchScreen;

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    marginVertical: 15,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  listContainer: {
    flex: 1,
  },
  list: {
    paddingBottom: 80,
    gap: 10,
    alignItems: 'center',
  },
  infoContainer: {
    width: width / 2 - 20,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
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
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#3A59D1',
  },
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#12141C',
  },
  searchContainer: {
    flexDirection: 'row',
    marginVertical: 15,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    color: '#3A59D1',
  },
  listContainer: {
    flex: 1,
  },
  list: {
    paddingBottom: 80,
    gap: 10,
    alignItems: 'center',
  },
  infoContainer: {
    width: width / 2 - 20,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
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
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#3A59D1',
  },
});
