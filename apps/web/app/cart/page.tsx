'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Trash2, ArrowLeft, ShoppingBag, RefreshCw } from 'lucide-react';
import { useCartStore } from '@/store/cart';

export default function CartPage() {
  const { items, removeItem, updatePeople, totalPrice } = useCartStore();
  const router = useRouter();

  // Local state for pending people changes (confirmed only on button click)
  const [pendingPeople, setPendingPeople] = useState<Record<string, number>>({});

  const getPeople = (id: string, current: number) =>
    pendingPeople[id] !== undefined ? pendingPeople[id] : current;

  const handlePeopleChange = (id: string, value: number) =>
    setPendingPeople(p => ({ ...p, [id]: value }));

  const handleUpdate = (id: string) => {
    if (pendingPeople[id] !== undefined) {
      updatePeople(id, pendingPeople[id]);
      setPendingPeople(p => { const n = { ...p }; delete n[id]; return n; });
    }
  };

  const isPending = (id: string) => pendingPeople[id] !== undefined;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center px-4">
        <ShoppingBag className="w-16 h-16 text-[#E2E8F0] mb-4" />
        <h2 className="text-xl font-semibold text-[#1A1A2E] mb-2">Your cart is empty</h2>
        <p className="text-[#718096] text-sm mb-6">Explore experiences and add them to your cart</p>
        <Link href="/" className="px-6 py-2.5 bg-[#C9A84C] hover:bg-[#D4BA6E] text-[#1A1A2E] font-semibold rounded-xl text-sm transition-colors">
          Browse Tours
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button onClick={() => router.back()} className="flex items-center gap-1 text-sm text-[#4A5568] hover:text-[#1E3A5F] transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />Continue shopping
        </button>

        <h1 className="text-2xl font-bold text-[#1A1A2E] mb-6">Your Cart <span className="text-[#718096] font-normal text-lg">({items.length} {items.length === 1 ? 'item' : 'items'})</span></h1>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Items */}
          <div className="md:col-span-2 space-y-4">
            {items.map(item => {
              const people = getPeople(item.id, item.people);
              const lineTotal = item.tour.price * people;
              const changed = isPending(item.id);

              return (
                <div key={item.id} className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-sm">
                  <div className="flex gap-4 p-4">
                    {/* Image */}
                    <Link href={`/tour/${item.tour.id}`} className="shrink-0">
                      <img src={item.tour.images[0]} alt={item.tour.title} className="w-24 h-20 rounded-xl object-cover" />
                    </Link>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <Link href={`/tour/${item.tour.id}`}>
                        <h3 className="font-semibold text-[#1A1A2E] text-sm hover:text-[#1E3A5F] transition-colors line-clamp-2">{item.tour.title}</h3>
                      </Link>
                      <p className="text-xs text-[#718096] mt-0.5">📍 {item.tour.location} · 📅 {item.date}</p>
                      <p className="text-xs text-[#4A5568] mt-1">${item.tour.price} / person</p>
                    </div>

                    {/* Price + remove */}
                    <div className="flex flex-col items-end justify-between shrink-0">
                      <button onClick={() => removeItem(item.id)}
                        className="p-1.5 text-[#718096] hover:text-[#C0392B] hover:bg-[#FEF2F2] rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <p className="text-base font-bold text-[#1E3A5F]">${lineTotal.toFixed(2)}</p>
                    </div>
                  </div>

                  {/* People control */}
                  <div className="border-t border-[#E2E8F0] px-4 py-3 flex items-center justify-between bg-[#F8F9FA]">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-[#4A5568]">People:</span>
                      <button onClick={() => handlePeopleChange(item.id, Math.max(1, people - 1))}
                        className="w-7 h-7 rounded-full border border-[#E2E8F0] hover:border-[#1E3A5F] flex items-center justify-center text-sm font-bold text-[#1A1A2E] transition">–</button>
                      <span className="w-6 text-center text-sm font-semibold text-[#1A1A2E]">{people}</span>
                      <button onClick={() => handlePeopleChange(item.id, Math.min(item.tour.maxPeople, people + 1))}
                        className="w-7 h-7 rounded-full border border-[#E2E8F0] hover:border-[#1E3A5F] flex items-center justify-center text-sm font-bold text-[#1A1A2E] transition">+</button>
                    </div>
                    {changed && (
                      <button onClick={() => handleUpdate(item.id)}
                        className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-[#1E3A5F] hover:bg-[#2A4E7F] text-white rounded-lg transition-colors">
                        <RefreshCw className="w-3 h-3" />Update
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="md:col-span-1">
            <div className="sticky top-20 bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-5 space-y-4">
              <h2 className="font-semibold text-[#1A1A2E] text-base">Order Summary</h2>

              <div className="space-y-2 text-sm">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between text-[#4A5568]">
                    <span className="line-clamp-1 flex-1 mr-2">{item.tour.title}</span>
                    <span className="shrink-0">${item.totalPrice.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#E2E8F0] pt-3 flex justify-between items-center">
                <span className="font-semibold text-[#1A1A2E]">Total</span>
                <span className="text-xl font-bold text-[#1E3A5F]">${totalPrice().toFixed(2)}</span>
              </div>

              <Link href="/checkout"
                className="block w-full text-center py-3 bg-[#C9A84C] hover:bg-[#D4BA6E] text-[#1A1A2E] font-semibold rounded-xl text-sm transition-colors">
                Proceed to Checkout
              </Link>

              <p className="text-xs text-[#718096] text-center">🔒 Secure checkout</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
