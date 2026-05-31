'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SearchFilters, Tour } from '@bankx/shared';

interface SearchStore {
  filters: SearchFilters;
  results: Tour[];
  savedTours: string[];
  previousSearches: SearchFilters[];
  setFilters: (filters: Partial<SearchFilters>) => void;
  setResults: (tours: Tour[]) => void;
  toggleSaved: (tourId: string) => void;
  isSaved: (tourId: string) => boolean;
  saveSearch: (filters: SearchFilters) => void;
}

const defaultFilters: SearchFilters = {
  query: '',
  location: '',
  dateFrom: '',
  dateTo: '',
  people: 1,
  categories: [],
  sortBy: 'default',
};

export const useSearchStore = create<SearchStore>()(
  persist(
    (set, get) => ({
      filters: defaultFilters,
      results: [],
      savedTours: [],
      previousSearches: [],

      setFilters: (filters) =>
        set(state => ({ filters: { ...state.filters, ...filters } })),

      setResults: (tours) => set({ results: tours }),

      toggleSaved: (tourId) =>
        set(state => ({
          savedTours: state.savedTours.includes(tourId)
            ? state.savedTours.filter(id => id !== tourId)
            : [...state.savedTours, tourId],
        })),

      isSaved: (tourId) => get().savedTours.includes(tourId),

      saveSearch: (filters) =>
        set(state => ({
          previousSearches: [
            filters,
            ...state.previousSearches.filter(
              s => JSON.stringify(s) !== JSON.stringify(filters)
            ),
          ].slice(0, 5),
        })),
    }),
    { name: 'bankx-search' }
  )
);
