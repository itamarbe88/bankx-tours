'use client';

import Link from 'next/link';
import { Star, Clock, Users, Bookmark, BookmarkCheck, Share2 } from 'lucide-react';
import type { Tour } from '@bankx/shared';
import { useSearchStore } from '@/store/search';

interface Props { tour: Tour; }

export function TourCard({ tour }: Props) {
  const { toggleSaved, isSaved } = useSearchStore();
  const saved = isSaved(tour.id);
  const hasDiscount = tour.originalPrice && tour.originalPrice > tour.price;
  const discountPct = hasDiscount ? Math.round((1 - tour.price / tour.originalPrice!) * 100) : 0;

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    if (navigator.share) {
      navigator.share({ title: tour.title, text: tour.shortDescription, url: `/tour/${tour.id}` });
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/tour/${tour.id}`);
    }
  };

  return (
    <Link href={`/tour/${tour.id}`} className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-[#E2E8F0]">
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-[#E2E8F0]">
        <img
          src={tour.images[0]}
          alt={tour.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Discount badge */}
        {hasDiscount && (
          <span className="absolute top-2 left-2 bg-[#C0392B] text-white text-xs font-bold px-2 py-0.5 rounded-full">
            -{discountPct}%
          </span>
        )}
        {/* Actions */}
        <div className="absolute top-2 right-2 flex gap-1.5">
          <button
            onClick={e => { e.preventDefault(); toggleSaved(tour.id); }}
            className="w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow transition-colors"
            aria-label={saved ? 'Unsave' : 'Save'}
          >
            {saved
              ? <BookmarkCheck className="w-4 h-4 text-[#1E3A5F]" />
              : <Bookmark className="w-4 h-4 text-[#4A5568]" />}
          </button>
          <button
            onClick={handleShare}
            className="w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow transition-colors"
            aria-label="Share"
          >
            <Share2 className="w-4 h-4 text-[#4A5568]" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Location */}
        <p className="text-xs text-[#718096] mb-1 flex items-center gap-1">
          <span>📍</span>{tour.location}, {tour.country}
        </p>

        {/* Title */}
        <h3 className="text-sm font-semibold text-[#1A1A2E] leading-tight mb-2 line-clamp-2 group-hover:text-[#1E3A5F] transition-colors">
          {tour.title}
        </h3>

        {/* Short description */}
        <p className="text-xs text-[#4A5568] line-clamp-2 mb-3">{tour.shortDescription}</p>

        {/* Meta row */}
        <div className="flex items-center gap-3 text-xs text-[#718096] mb-3">
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{tour.duration}</span>
          <span className="flex items-center gap-1"><Users className="w-3 h-3" />Up to {tour.maxPeople}</span>
        </div>

        {/* Price + rating */}
        <div className="flex items-end justify-between">
          <div>
            {hasDiscount && (
              <span className="text-xs text-[#718096] line-through block">${tour.originalPrice}</span>
            )}
            <span className="text-lg font-bold text-[#1E3A5F]">${tour.price}</span>
            <span className="text-xs text-[#718096]"> / person</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-[#C9A84C] text-[#C9A84C]" />
            <span className="text-sm font-semibold text-[#1A1A2E]">{tour.rating}</span>
            <span className="text-xs text-[#718096]">({tour.reviewCount.toLocaleString()})</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
