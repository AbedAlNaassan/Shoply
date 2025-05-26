// screens/CartScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ListRenderItemInfo,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {useCartStore} from '../../zustand/Cart';
import {useTheme} from '../../context/ThemeContext';
import {CartItem} from '../../types/types';

const CartScreen = () => {
  const cart = useCartStore(state => state.cart);
  const removeFromCart = useCartStore(state => state.removeFromCart);
  const increaseQty = useCartStore(state => state.increaseQty);
  const decreaseQty = useCartStore(state => state.decreaseQty);
  const {theme} = useTheme();

  const styles = theme === 'dark' ? darkStyles : lightStyles;

  const renderItem = (rowData: ListRenderItemInfo<CartItem>) => {
    const item = rowData.item;
    console.log(item);
    return (
      <View style={styles.item}>
        <View style={{flex: 1}}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.name}>Qty: {item.quantity}</Text>
          <Text style={styles.name}>
            Total: ${(item.quantity * item.price).toFixed(2)}
          </Text>

          <View style={styles.qtyButtons}>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => decreaseQty(item.id)}>
              <Text style={styles.qtyBtnText}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => increaseQty(item.id)}>
              <Text style={styles.qtyBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {item.image ? (
          <Image source={{uri: item.image}} style={styles.image} />
        ) : null}
      </View>
    );
  };

  const renderHiddenItem = (rowData: ListRenderItemInfo<CartItem>) => {
    const item = rowData.item;

    return (
      <View style={styles.deleteBox}>
        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              'Delete Item',
              `Are you sure you want to remove ${item.name}?`,
              [
                {text: 'Cancel', style: 'cancel'},
                {text: 'Remove', onPress: () => removeFromCart(item.id)},
              ],
            )
          }>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SwipeListView
      data={cart}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
      renderHiddenItem={renderHiddenItem}
      rightOpenValue={-75}
      contentContainerStyle={styles.container}
      disableRightSwipe
    />
  );
};

const lightStyles = StyleSheet.create({
  container: {
    padding: 16,
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 2,
    alignItems: 'center',
  },
  name: {
    fontFamily: 'Roboto',
    color: '#3A59D1',
    fontSize: 16,
    marginBottom: 8,
  },
  qtyButtons: {
    flexDirection: 'row',
    marginTop: 10,
  },
  qtyBtn: {
    backgroundColor: '#3A59D1',
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginHorizontal: 5,
  },
  qtyBtnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginLeft: 15,
  },
  deleteBox: {
    backgroundColor: 'red',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginVertical: 8,
    borderRadius: 10,
    flex: 1,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

const darkStyles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: '#12141C',
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#1E1F2B',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 2,
    alignItems: 'center',
  },
  name: {
    fontFamily: 'Roboto',
    color: '#3A59D1',
    fontSize: 16,
    marginBottom: 8,
  },
  qtyButtons: {
    flexDirection: 'row',
    marginTop: 10,
  },
  qtyBtn: {
    backgroundColor: '#3A59D1',
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginHorizontal: 5,
  },
  qtyBtnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginLeft: 15,
  },
  deleteBox: {
    backgroundColor: 'red',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginVertical: 8,
    borderRadius: 10,
    flex: 1,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CartScreen;
