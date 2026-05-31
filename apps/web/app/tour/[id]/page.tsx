'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Star, Clock, Users, ChevronLeft, ChevronRight, Check, X, ShoppingCart, ArrowLeft } from 'lucide-react';
import { MOCK_TOURS, getReviewsForTour } from '@bankx/shared';
import { useCartStore } from '@/store/cart';

export default function TourDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const tour = MOCK_TOURS.find(t => t.id === id);
  const reviews = getReviewsForTour(id);
  const addItem = useCartStore(s => s.addItem);
  const totalItems = useCartStore(s => s.totalItems());

  const [imageIndex, setImageIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [people, setPeople] = useState(1);
  const [added, setAdded] = useState(false);

  if (!tour) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-xl text-[#4A5568]">Tour not found</p>
        <Link href="/" className="mt-4 text-[#1E3A5F] underline">Back to search</Link>
      </div>
    );
  }

  const hasDiscount = tour.originalPrice && tour.originalPrice > tour.price;
  const discountPct = hasDiscount ? Math.round((1 - tour.price / tour.originalPrice!) * 100) : 0;

  const handleAddToCart = () => {
    if (!selectedDate) return;
    addItem(tour, people, selectedDate);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Back */}
      <div className="max-w-5xl mx-auto px-4 pt-6 pb-2">
        <button onClick={() => router.back()} className="flex items-center gap-1 text-sm text-[#4A5568] hover:text-[#1E3A5F] transition-colors">
          <ArrowLeft className="w-4 h-4" />Back to results
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-3 gap-8">

          {/* Left — main content */}
          <div className="md:col-span-2 space-y-6">
            {/* Image carousel */}
            <div className="relative rounded-2xl overflow-hidden bg-[#E2E8F0] aspect-video">
              <img src={tour.images[imageIndex]} alt={tour.title} className="w-full h-full object-cover" />
              {tour.images.length > 1 && (
                <>
                  <button onClick={() => setImageIndex(i => (i - 1 + tour.images.length) % tour.images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow transition">
                    <ChevronLeft className="w-5 h-5 text-[#1A1A2E]" />
                  </button>
                  <button onClick={() => setImageIndex(i => (i + 1) % tour.images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow transition">
                    <ChevronRight className="w-5 h-5 text-[#1A1A2E]" />
                  </button>
                  {/* Dot indicators */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {tour.images.map((_, i) => (
                      <button key={i} onClick={() => setImageIndex(i)}
                        className={`w-2 h-2 rounded-full transition-colors ${i === imageIndex ? 'bg-white' : 'bg-white/50'}`} />
                    ))}
                  </div>
                </>
              )}
              {hasDiscount && (
                <span className="absolute top-3 left-3 bg-[#C0392B] text-white text-xs font-bold px-2 py-0.5 rounded-full">-{discountPct}% OFF</span>
              )}
            </div>

            {/* Thumbnail strip */}
            {tour.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {tour.images.map((img, i) => (
                  <button key={i} onClick={() => setImageIndex(i)}
                    className={`shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition ${i === imageIndex ? 'border-[#1E3A5F]' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Title + meta */}
            <div>
              <p className="text-sm text-[#718096] mb-1">📍 {tour.location}, {tour.country}</p>
              <h1 className="text-2xl font-bold text-[#1A1A2E] mb-3">{tour.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-[#4A5568] mb-4">
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{tour.duration}</span>
                <span className="flex items-center gap-1"><Users className="w-4 h-4" />Up to {tour.maxPeople} people</span>
                <span className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-[#C9A84C] text-[#C9A84C]" />
                  <span className="font-semibold text-[#1A1A2E]">{tour.rating}</span>
                  <span className="text-[#718096]">({reviews.length} reviews)</span>
                </span>
              </div>
              <p className="text-[#4A5568] leading-relaxed">{tour.description}</p>
            </div>

            {/* Highlights */}
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-5">
              <h2 className="text-base font-semibold text-[#1A1A2E] mb-3">Highlights</h2>
              <ul className="space-y-2">
                {tour.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#4A5568]">
                    <span className="text-[#C9A84C] font-bold mt-0.5">✦</span>{h}
                  </li>
                ))}
              </ul>
            </div>

            {/* Includes / Excludes */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl border border-[#E2E8F0] p-5">
                <h2 className="text-base font-semibold text-[#1A1A2E] mb-3">Included</h2>
                <ul className="space-y-2">
                  {tour.includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#4A5568]">
                      <Check className="w-4 h-4 text-[#27AE60] shrink-0 mt-0.5" />{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-xl border border-[#E2E8F0] p-5">
                <h2 className="text-base font-semibold text-[#1A1A2E] mb-3">Not included</h2>
                <ul className="space-y-2">
                  {tour.excludes.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#4A5568]">
                      <X className="w-4 h-4 text-[#C0392B] shrink-0 mt-0.5" />{item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Reviews */}
            {reviews.length > 0 && (
              <div>
                <h2 className="text-base font-semibold text-[#1A1A2E] mb-4">Reviews</h2>
                <div className="space-y-4">
                  {reviews.map(review => (
                    <div key={review.id} className="bg-white rounded-xl border border-[#E2E8F0] p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-9 h-9 bg-[#1E3A5F] text-white rounded-full flex items-center justify-center text-xs font-bold">
                          {review.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#1A1A2E]">{review.author}</p>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-[#C9A84C] text-[#C9A84C]' : 'fill-[#E2E8F0] text-[#E2E8F0]'}`} />
                            ))}
                            <span className="text-xs text-[#718096] ml-1">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-[#4A5568]">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right — booking panel */}
          <div className="md:col-span-1">
            <div className="sticky top-20 bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-5 space-y-4">
              {/* Price */}
              <div>
                {hasDiscount && (
                  <p className="text-sm text-[#718096] line-through">${tour.originalPrice} / person</p>
                )}
                <p className="text-3xl font-bold text-[#1E3A5F]">${tour.price}
                  <span className="text-sm font-normal text-[#718096]"> / person</span>
                </p>
              </div>

              {/* Date */}
              <div>
                <label className="block text-xs font-semibold text-[#4A5568] uppercase tracking-wide mb-1.5">Select Date</label>
                <select value={selectedDate} onChange={e => setSelectedDate(e.target.value)}
                  className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1E3A5F] focus:ring-1 focus:ring-[#1E3A5F] bg-white text-[#1A1A2E]">
                  <option value="">Choose a date</option>
                  {tour.availableDates.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              {/* People */}
              <div>
                <label className="block text-xs font-semibold text-[#4A5568] uppercase tracking-wide mb-1.5">Number of People</label>
                <div className="flex items-center gap-3">
                  <button onClick={() => setPeople(p => Math.max(1, p - 1))}
                    className="w-9 h-9 rounded-full border border-[#E2E8F0] hover:border-[#1E3A5F] flex items-center justify-center text-[#1A1A2E] font-bold transition">–</button>
                  <span className="flex-1 text-center font-semibold text-[#1A1A2E]">{people}</span>
                  <button onClick={() => setPeople(p => Math.min(tour.maxPeople, p + 1))}
                    className="w-9 h-9 rounded-full border border-[#E2E8F0] hover:border-[#1E3A5F] flex items-center justify-center text-[#1A1A2E] font-bold transition">+</button>
                </div>
              </div>

              {/* Total */}
              <div className="bg-[#F8F9FA] rounded-lg px-4 py-3 flex justify-between items-center">
                <span className="text-sm text-[#4A5568]">Total</span>
                <span className="text-xl font-bold text-[#1E3A5F]">${(tour.price * people).toFixed(2)}</span>
              </div>

              {/* Add to cart */}
              <button
                onClick={handleAddToCart}
                disabled={!selectedDate}
                className={`w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors ${
                  !selectedDate
                    ? 'bg-[#E2E8F0] text-[#718096] cursor-not-allowed'
                    : added
                    ? 'bg-[#27AE60] text-white'
                    : 'bg-[#C9A84C] hover:bg-[#D4BA6E] text-[#1A1A2E]'
                }`}
              >
                {added ? <><Check className="w-4 h-4" />Added to Cart!</> : <><ShoppingCart className="w-4 h-4" />Add to Cart</>}
              </button>

              {totalItems > 0 && (
                <Link href="/cart" className="block text-center text-sm text-[#1E3A5F] hover:underline">
                  View cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                </Link>
              )}

              {/* Cancellation */}
              <p className="text-xs text-[#718096] text-center">{tour.cancellationPolicy}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
