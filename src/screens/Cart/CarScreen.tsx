import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ListRenderItemInfo,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {useTheme} from '../../context/ThemeContext';
import {lightStyles} from '../../styles/Cart.light';
import {darkStyles} from '../../styles/Cart.dark';
import {useCartStore} from '../../zustand/Cart';
import {CartItem} from '../../types/types';

const CartScreen = () => {
  const removeFromCart = useCartStore(state => state.removeFromCart);
  const increaseQty = useCartStore(state => state.increaseQty);
  const decreaseQty = useCartStore(state => state.decreaseQty);
  const cart = useCartStore(state => state.cart);
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

export default CartScreen;
