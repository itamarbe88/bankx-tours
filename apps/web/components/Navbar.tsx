'use client';

import Link from 'next/link';
import { ShoppingCart, MapPin, User } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { MOCK_USER } from '@bankx/shared';

export function Navbar() {
  const totalItems = useCartStore(s => s.totalItems());

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1E3A5F] shadow-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-[#C9A84C] rounded-full flex items-center justify-center">
            <MapPin className="w-4 h-4 text-[#1E3A5F]" />
          </div>
          <span className="text-white font-bold text-lg tracking-tight">
            Bank<span className="text-[#C9A84C]">X</span> Tours
          </span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* User greeting */}
          <div className="hidden md:flex items-center gap-2 text-white/80 text-sm">
            <User className="w-4 h-4" />
            <span>{MOCK_USER.name}</span>
            <span className="text-[#C9A84C] font-medium">
              {MOCK_USER.ccPoints.toLocaleString()} pts
            </span>
          </div>

          {/* Cart */}
          <Link
            href="/cart"
            className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Shopping cart"
          >
            <ShoppingCart className="w-5 h-5 text-white" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#C9A84C] text-[#1A1A2E] text-xs font-bold rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
