import type { CategoryId } from '../constants/categories';

export interface Tour {
  id: string;
  title: string;
  location: string;
  country: string;
  description: string;
  shortDescription: string;
  images: string[];
  price: number;
  originalPrice?: number;
  currency: string;
  rating: number;
  reviewCount: number;
  duration: string;
  maxPeople: number;
  category: CategoryId;
  availableDates: string[];
  includes: string[];
  excludes: string[];
  highlights: string[];
  cancellationPolicy: string;
}

export interface Review {
  id: string;
  tourId: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface CartItem {
  id: string;
  tour: Tour;
  people: number;
  date: string;
  totalPrice: number;
}

export interface Voucher {
  id: string;
  code: string;
  description: string;
  value: number;
  currency: string;
  expiryDate: string;
  isUsed: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  ccPoints: number;
  walletBalance: number;
  vouchers: Voucher[];
  tierUuid: string | null;
}

export interface SearchFilters {
  query: string;
  location: string;
  dateFrom: string;
  dateTo: string;
  people: number;
  categories: CategoryId[];
  sortBy: 'price_asc' | 'rating_desc' | 'default';
}

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  subtotal: number;
  total: number;
  paymentMethod: 'cc_points' | 'voucher' | 'wallet';
  paymentDetails: string;
  status: 'confirmed' | 'pending' | 'failed';
  createdAt: string;
  emailSent: boolean;
}
