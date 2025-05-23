import {View, Text, Image, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import ProductList from '../../components/organisms/ProductList';
import {ScrollView} from 'react-native-gesture-handler';
import {RootStackParamList} from '../../types/types';
import {useTheme} from '../../context/ThemeContext';
import {lightStyles} from '../../styles/Home.light';
import LogoutIcon from '../../assets/Logout.svg';
import {darkStyles} from '../../styles/Home.dark';
import Moon from '../../assets/moon.svg';
import {useAuthStore} from '../../zustand/AuthStore';
import Profile from '../../assets/profile.svg';
import BlueButtons from '../../components/atoms/BlueButtons';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const {theme, toggleTheme} = useTheme();
  const {logout} = useAuthStore();

  const styles = theme === 'dark' ? darkStyles : lightStyles;

  const handleLogout = () => {
    logout();
  };

  const handleProfile = () => {
    navigation.navigate('Profile');
  };

  const onSearch = () => {
    navigation.navigate('Search');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.shoply}>Shoply</Text>
          <View style={styles.icon}>
            <Pressable>
              <Profile width={30} height={30} onPress={handleProfile} />
            </Pressable>
            <Moon width={30} height={30} onPress={toggleTheme} />
            <Pressable onPress={handleLogout}>
              <LogoutIcon width={24} height={24} />
            </Pressable>
          </View>
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/saleImage.png')}
            style={styles.image}
          />
        </View>

        <View style={styles.searchContainer}>
          <BlueButtons name="Search" onPress={onSearch} />
          <BlueButtons
            name="AddItem"
            onPress={() => navigation.navigate('AddProduct')}
          />
        </View>

        <View style={styles.bestSeller}>
          <Text style={styles.shoply}>All Products</Text>
          <Pressable
            onPress={() =>
              navigation.navigate('ProductList', {screen: 'ProductList'})
            }>
            <Text style={styles.seeAll}>Owner Product</Text>
          </Pressable>
        </View>
        <ProductList scrollEnabled={false} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
