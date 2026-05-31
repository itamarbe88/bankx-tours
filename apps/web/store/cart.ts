'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Tour } from '@bankx/shared';

interface CartStore {
  items: CartItem[];
  addItem: (tour: Tour, people: number, date: string) => void;
  removeItem: (id: string) => void;
  updatePeople: (id: string, people: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

const CART_EXPIRY_HOURS = 24;

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (tour, people, date) => {
        const existing = get().items.find(i => i.tour.id === tour.id && i.date === date);
        if (existing) {
          set(state => ({
            items: state.items.map(i =>
              i.id === existing.id
                ? { ...i, people, totalPrice: tour.price * people }
                : i
            ),
          }));
        } else {
          const item: CartItem = {
            id: `${tour.id}-${date}-${Date.now()}`,
            tour,
            people,
            date,
            totalPrice: tour.price * people,
          };
          set(state => ({ items: [...state.items, item] }));
        }
      },

      removeItem: (id) =>
        set(state => ({ items: state.items.filter(i => i.id !== id) })),

      updatePeople: (id, people) =>
        set(state => ({
          items: state.items.map(i =>
            i.id === id
              ? { ...i, people, totalPrice: i.tour.price * people }
              : i
          ),
        })),

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.length,

      totalPrice: () =>
        get().items.reduce((sum, i) => sum + i.totalPrice, 0),
    }),
    {
      name: 'bankx-cart',
      // Expire cart after 24 hours
      partialize: (state) => ({
        items: state.items,
        _savedAt: Date.now(),
      }),
      onRehydrateStorage: () => (state) => {
        if (state && (state as any)._savedAt) {
          const age = Date.now() - (state as any)._savedAt;
          if (age > CART_EXPIRY_HOURS * 60 * 60 * 1000) {
            state.items = [];
          }
        }
      },
    }
  )
);
