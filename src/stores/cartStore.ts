import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
  maxQuantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  toggleCart: () => void;
  clearCart: () => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
}

const useCartStore = create(
  persist<CartState>(
    (set) => ({
      items: [],
      isOpen: false,
      isLoading: false,
      error: null,

      addItem: (newItem) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === newItem.id && item.size === newItem.size
          );

          if (existingItem) {
            const newQuantity = Math.min(
              existingItem.quantity + newItem.quantity,
              existingItem.maxQuantity
            );

            return {
              ...state,
              items: state.items.map((item) =>
                item.id === newItem.id && item.size === newItem.size
                  ? { ...item, quantity: newQuantity }
                  : item
              )
            };
          }

          return {
            ...state,
            items: [...state.items, newItem]
          };
        });
      },

      removeItem: (itemId) => {
        set((state) => ({
          ...state,
          items: state.items.filter((item) => item.id !== itemId)
        }));
      },

      updateQuantity: (itemId, quantity) => {
        set((state) => ({
          ...state,
          items: state.items.map((item) =>
            item.id === itemId
              ? { ...item, quantity: Math.min(Math.max(1, quantity), item.maxQuantity) }
              : item
          )
        }));
      },

      toggleCart: () => {
        set((state) => ({ ...state, isOpen: !state.isOpen }));
      },

      clearCart: () => {
        set((state) => ({ ...state, items: [] }));
      },

      setError: (error) => {
        set((state) => ({ ...state, error }));
      },

      setLoading: (isLoading) => {
        set((state) => ({ ...state, isLoading }));
      }
    }),
    {
      name: 'cart-storage',
      storage: localStorage
    }
  )
);

export default useCartStore; 