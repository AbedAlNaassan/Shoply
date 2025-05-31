import {create} from 'zustand';

interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  image?: string; // add image url
}

interface CartState {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (id: string | number) => void;
  increaseQty: (id: string | number) => void;
  decreaseQty: (id: string | number) => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],

  addToCart: (newItem: CartItem) =>
    set(state => {
      const existingItem = state.cart.find(item => item.id === newItem.id);

      if (existingItem) {
        return {
          cart: state.cart.map(item =>
            item.id === newItem.id
              ? {...item, quantity: item.quantity + 1} // always just +1
              : item,
          ),
        };
      } else {
        return {
          cart: [...state.cart, {...newItem, quantity: 1}], // start with 1
        };
      }
    }),

  removeFromCart: id => {
    set({
      cart: get().cart.filter(item => item.id !== id),
    });
  },

  increaseQty: id => {
    set({
      cart: get().cart.map(item =>
        item.id === id ? {...item, quantity: item.quantity + 1} : item,
      ),
    });
  },

  decreaseQty: id => {
    set({
      cart: get()
        .cart.map(item =>
          item.id === id ? {...item, quantity: item.quantity - 1} : item,
        )
        .filter(item => item.quantity > 0),
    });
  },
}));
