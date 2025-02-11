import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from './productsSlice';

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const getCartFromLocalStorage = (): CartItem[] => {
  try {
    const userId = localStorage.getItem('userId') || 'defaultUser'; // Уникальный ключ для пользователя
    const data = localStorage.getItem(`cart_${userId}`);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Ошибка загрузки корзины:', error);
    return [];
  }
};

const saveCartToLocalStorage = (items: CartItem[]) => {
  try {
    const userId = localStorage.getItem('userId') || 'defaultUser';
    localStorage.setItem(`cart_${userId}`, JSON.stringify(items));
  } catch (error) {
    console.error('Ошибка сохранения корзины:', error);
  }
};

const initialState: CartState = {
  items: getCartFromLocalStorage(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
			saveCartToLocalStorage(state.items);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
			saveCartToLocalStorage(state.items); 
    },
    changeQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        if (quantity > 0) {
          item.quantity = quantity;
        } else {
          state.items = state.items.filter(item => item.id !== id);
        }
      }
      saveCartToLocalStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];
			saveCartToLocalStorage(state.items);
    },
  },
});

export const { addToCart, removeFromCart, changeQuantity, clearCart } = cartSlice.actions;

export const getTotalCount = (state: { cart: CartState }) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export default cartSlice.reducer;