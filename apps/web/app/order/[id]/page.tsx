'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Mail, MapPin, Calendar, Users } from 'lucide-react';
import { MOCK_TOURS, MOCK_USER } from '@bankx/shared';

// Simulate a confirmed order using mock tour data
const DEMO_ITEMS = [
  { tour: MOCK_TOURS[0], people: 2, date: '2026-06-05', totalPrice: MOCK_TOURS[0].price * 2 },
  { tour: MOCK_TOURS[3], people: 1, date: '2026-06-07', totalPrice: MOCK_TOURS[3].price },
];

export default function OrderConfirmationPage() {
  const { id } = useParams<{ id: string }>();
  const total = DEMO_ITEMS.reduce((s, i) => s + i.totalPrice, 0);

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Success header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-[#E8F8EE] rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-[#27AE60]" />
          </div>
          <h1 className="text-2xl font-bold text-[#1A1A2E] mb-2">Booking Confirmed!</h1>
          <p className="text-[#4A5568] text-sm">Your experiences are booked and ready to go.</p>
        </div>

        {/* Order number */}
        <div className="bg-[#1E3A5F] text-white rounded-2xl p-4 text-center mb-5">
          <p className="text-xs text-white/70 uppercase tracking-wide mb-1">Order Number</p>
          <p className="text-2xl font-bold tracking-widest">{id}</p>
        </div>

        {/* Email notice */}
        <div className="flex items-center gap-3 bg-white border border-[#E2E8F0] rounded-xl p-4 mb-5">
          <div className="w-9 h-9 bg-[#EBF5FB] rounded-full flex items-center justify-center shrink-0">
            <Mail className="w-4 h-4 text-[#2980B9]" />
          </div>
          <div>
            <p className="text-sm font-medium text-[#1A1A2E]">Confirmation email sent</p>
            <p className="text-xs text-[#718096]">A detailed receipt has been sent to {MOCK_USER.email}</p>
          </div>
        </div>

        {/* Items */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden mb-5">
          <div className="px-5 py-4 border-b border-[#E2E8F0]">
            <h2 className="font-semibold text-[#1A1A2E]">Booked Experiences</h2>
          </div>
          <div className="divide-y divide-[#E2E8F0]">
            {DEMO_ITEMS.map((item, i) => (
              <div key={i} className="flex gap-4 p-4">
                <img src={item.tour.images[0]} alt={item.tour.title} className="w-16 h-14 rounded-lg object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#1A1A2E] line-clamp-1">{item.tour.title}</p>
                  <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1">
                    <span className="text-xs text-[#718096] flex items-center gap-1"><MapPin className="w-3 h-3" />{item.tour.location}</span>
                    <span className="text-xs text-[#718096] flex items-center gap-1"><Calendar className="w-3 h-3" />{item.date}</span>
                    <span className="text-xs text-[#718096] flex items-center gap-1"><Users className="w-3 h-3" />{item.people} {item.people === 1 ? 'person' : 'people'}</span>
                  </div>
                </div>
                <p className="text-sm font-bold text-[#1E3A5F] shrink-0">${item.totalPrice.toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="px-5 py-4 bg-[#F8F9FA] flex justify-between items-center">
            <span className="font-semibold text-[#1A1A2E]">Total Paid</span>
            <span className="text-xl font-bold text-[#1E3A5F]">${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/" className="flex-1 text-center py-3 border-2 border-[#1E3A5F] text-[#1E3A5F] hover:bg-[#1E3A5F] hover:text-white font-semibold rounded-xl text-sm transition-colors">
            Book More Tours
          </Link>
          <button className="flex-1 py-3 bg-[#C9A84C] hover:bg-[#D4BA6E] text-[#1A1A2E] font-semibold rounded-xl text-sm transition-colors">
            Download Vouchers
          </button>
        </div>
      </div>
    </div>
  );
}
