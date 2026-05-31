'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CreditCard, Wallet, Tag, AlertCircle, ChevronDown } from 'lucide-react';
import { MOCK_USER, CC_POINTS_RATE } from '@bankx/shared';
import { useCartStore } from '@/store/cart';

type PaymentMethod = 'wallet' | 'cc_points' | 'voucher';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCartStore();
  const [method, setMethod] = useState<PaymentMethod>('wallet');
  const [selectedVouchers, setSelectedVouchers] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const total = totalPrice();
  const availableVouchers = MOCK_USER.vouchers.filter(v => !v.isUsed);
  const ccValue = MOCK_USER.ccPoints * CC_POINTS_RATE;

  const voucherTotal = availableVouchers
    .filter(v => selectedVouchers.includes(v.id))
    .reduce((sum, v) => sum + v.value, 0);

  const toggleVoucher = (id: string) => {
    setSelectedVouchers(prev =>
      prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]
    );
  };

  const canPay = () => {
    if (items.length === 0) return false;
    if (method === 'wallet') return MOCK_USER.walletBalance >= total;
    if (method === 'cc_points') return ccValue >= total;
    if (method === 'voucher') return selectedVouchers.length > 0 && voucherTotal >= total;
    return false;
  };

  const handlePay = async () => {
    if (!canPay()) return;
    setIsProcessing(true);
    await new Promise(r => setTimeout(r, 1800));
    const orderId = `ORD-${Date.now().toString(36).toUpperCase()}`;
    clearCart();
    router.push(`/order/${orderId}`);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-[#4A5568]">Your cart is empty.</p>
        <Link href="/" className="mt-4 text-[#1E3A5F] underline">Browse tours</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link href="/cart" className="flex items-center gap-1 text-sm text-[#4A5568] hover:text-[#1E3A5F] transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />Back to cart
        </Link>

        <h1 className="text-2xl font-bold text-[#1A1A2E] mb-6">Checkout</h1>

        <div className="grid md:grid-cols-5 gap-6">
          {/* Payment */}
          <div className="md:col-span-3 space-y-4">
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
              <h2 className="font-semibold text-[#1A1A2E] mb-4">Payment Method</h2>

              {/* Wallet */}
              <label className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition mb-3 ${method === 'wallet' ? 'border-[#1E3A5F] bg-[#F8F9FA]' : 'border-[#E2E8F0] hover:border-[#2A4E7F]'}`}>
                <input type="radio" name="method" value="wallet" checked={method === 'wallet'} onChange={() => setMethod('wallet')} className="accent-[#1E3A5F]" />
                <Wallet className="w-5 h-5 text-[#1E3A5F]" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#1A1A2E]">Wallet</p>
                  <p className="text-xs text-[#718096]">Balance: ${MOCK_USER.walletBalance.toFixed(2)}</p>
                </div>
                {MOCK_USER.walletBalance < total && <span className="text-xs text-[#C0392B] font-medium">Insufficient</span>}
              </label>

              {/* CC Points */}
              <label className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition mb-3 ${method === 'cc_points' ? 'border-[#1E3A5F] bg-[#F8F9FA]' : 'border-[#E2E8F0] hover:border-[#2A4E7F]'}`}>
                <input type="radio" name="method" value="cc_points" checked={method === 'cc_points'} onChange={() => setMethod('cc_points')} className="accent-[#1E3A5F]" />
                <CreditCard className="w-5 h-5 text-[#1E3A5F]" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#1A1A2E]">CC Points</p>
                  <p className="text-xs text-[#718096]">{MOCK_USER.ccPoints.toLocaleString()} pts = ${ccValue.toFixed(2)}</p>
                </div>
                {ccValue < total && <span className="text-xs text-[#C0392B] font-medium">Insufficient</span>}
              </label>

              {/* Voucher */}
              <label className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition ${method === 'voucher' ? 'border-[#1E3A5F] bg-[#F8F9FA]' : 'border-[#E2E8F0] hover:border-[#2A4E7F]'}`}>
                <input type="radio" name="method" value="voucher" checked={method === 'voucher'} onChange={() => setMethod('voucher')} className="accent-[#1E3A5F]" />
                <Tag className="w-5 h-5 text-[#1E3A5F]" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#1A1A2E]">Voucher</p>
                  <p className="text-xs text-[#718096]">{availableVouchers.length} available</p>
                </div>
              </label>

              {/* Voucher selector */}
              {method === 'voucher' && (
                <div className="mt-3 space-y-2">
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-800">
                      <strong>Note:</strong> Vouchers cannot be partially redeemed. The full value of each selected voucher will be used.
                    </p>
                  </div>
                  {availableVouchers.map(v => (
                    <label key={v.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition ${selectedVouchers.includes(v.id) ? 'border-[#1E3A5F] bg-white' : 'border-[#E2E8F0] hover:border-[#2A4E7F]'}`}>
                      <input type="checkbox" checked={selectedVouchers.includes(v.id)} onChange={() => toggleVoucher(v.id)} className="accent-[#1E3A5F]" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#1A1A2E]">{v.description}</p>
                        <p className="text-xs text-[#718096]">Code: {v.code} · Expires {v.expiryDate}</p>
                      </div>
                      <span className="text-sm font-bold text-[#27AE60]">+${v.value}</span>
                    </label>
                  ))}
                  {selectedVouchers.length > 0 && (
                    <div className="flex justify-between text-sm px-1">
                      <span className="text-[#4A5568]">Vouchers total:</span>
                      <span className={`font-semibold ${voucherTotal >= total ? 'text-[#27AE60]' : 'text-[#C0392B]'}`}>
                        ${voucherTotal.toFixed(2)} {voucherTotal < total && `(need $${(total - voucherTotal).toFixed(2)} more)`}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Order summary */}
          <div className="md:col-span-2">
            <div className="sticky top-20 bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-5 space-y-4">
              <h2 className="font-semibold text-[#1A1A2E]">Summary</h2>
              <div className="space-y-2 text-sm">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between text-[#4A5568]">
                    <span className="line-clamp-1 flex-1 mr-2">{item.tour.title} ×{item.people}</span>
                    <span className="shrink-0">${item.totalPrice.toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#E2E8F0] pt-3 flex justify-between items-center">
                <span className="font-semibold text-[#1A1A2E]">Total</span>
                <span className="text-xl font-bold text-[#1E3A5F]">${total.toFixed(2)}</span>
              </div>

              <button
                onClick={handlePay}
                disabled={!canPay() || isProcessing}
                className={`w-full py-3 rounded-xl font-semibold text-sm transition-colors ${
                  !canPay() || isProcessing
                    ? 'bg-[#E2E8F0] text-[#718096] cursor-not-allowed'
                    : 'bg-[#C9A84C] hover:bg-[#D4BA6E] text-[#1A1A2E]'
                }`}
              >
                {isProcessing ? 'Processing…' : `Pay $${total.toFixed(2)}`}
              </button>
              <p className="text-xs text-[#718096] text-center">🔒 Secure & encrypted payment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
