import type { User } from '../types';

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Sarah Cohen',
  email: 'sarah.cohen@bankx.com',
  ccPoints: 12500,
  walletBalance: 340.00,
  tierUuid: 'bankx-tier-uuid-gold',
  vouchers: [
    {
      id: 'v1',
      code: 'SUMMER100',
      description: 'Summer Travel Voucher',
      value: 100,
      currency: 'USD',
      expiryDate: '2026-08-31',
      isUsed: false,
    },
    {
      id: 'v2',
      code: 'LOYALTY50',
      description: 'Gold Member Reward',
      value: 50,
      currency: 'USD',
      expiryDate: '2026-12-31',
      isUsed: false,
    },
    {
      id: 'v3',
      code: 'WELCOME25',
      description: 'Welcome Bonus',
      value: 25,
      currency: 'USD',
      expiryDate: '2026-07-15',
      isUsed: false,
    },
  ],
};

export const CC_POINTS_RATE = 0.01; // 1 point = $0.01
