import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Dish {
  id: string;
  name: string;
  type: string;
  price: number; // Changed to number for calculations
  rating: number;
  image: any;
  customizations?: string[];
}

interface CartItem extends Dish {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
  totalItems: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Dish>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      }
      
      state.totalItems += 1;
      state.totalAmount += action.payload.price;
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const itemIndex = state.items.findIndex(item => item.id === action.payload);
      
      if (itemIndex >= 0) {
        const item = state.items[itemIndex];
        state.totalItems -= item.quantity;
        state.totalAmount -= item.price * item.quantity;
        state.items.splice(itemIndex, 1);
      }
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      
      if (item) {
        const quantityDiff = action.payload.quantity - item.quantity;
        
        if (action.payload.quantity <= 0) {
          // Remove item if quantity is 0 or less
          const itemIndex = state.items.findIndex(i => i.id === action.payload.id);
          if (itemIndex >= 0) {
            state.totalItems -= item.quantity;
            state.totalAmount -= item.price * item.quantity;
            state.items.splice(itemIndex, 1);
          }
        } else {
          item.quantity = action.payload.quantity;
          state.totalItems += quantityDiff;
          state.totalAmount += item.price * quantityDiff;
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalItems = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
export type { CartItem, Dish };