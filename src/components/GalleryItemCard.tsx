'use client';

import { useState } from 'react';
import Image from 'next/image';
import { GalleryItem } from '@/types/gallery';

const NEUTRAL_PLACEHOLDER_IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400' fill='none'%3E%3Crect width='600' height='400' fill='%23F1F5F9'/%3E%3Crect x='240' y='140' width='120' height='90' rx='10' stroke='%23CBD5E1' stroke-width='2' stroke-dasharray='4 4' fill='%23FFFFFF'/%3E%3Cpath d='M275 185h50M275 197h35' stroke='%2394A3B8' stroke-width='2' stroke-linecap='round'/%3E%3Ctext x='50%25' y='270' text-anchor='middle' font-family='sans-serif' font-size='14' font-weight='600' fill='%2394A3B8'%3ENo Image Available%3C/text%3E%3C/svg%3E";

export interface GalleryItemCardProps {
  item: GalleryItem;
  onClick?: () => void;
}

/**
 * Pure presentational GalleryItemCard component.
 * Features:
 * - Next.js Image with lazy loading and fill layout.
 * - Graceful fallback to neutral placeholder if image fails to load.
 * - Clean subtle zoom on hover and category pill badge.
 * - Clean static display with no image popup on click.
 */
export default function GalleryItemCard({ item }: GalleryItemCardProps) {
  const [imgSrc, setImgSrc] = useState(item.image || NEUTRAL_PLACEHOLDER_IMG);

  return (
    <article
      className="gallery-card h-100 d-flex flex-column"
      aria-label={item.title || item.alt}
    >
      {/* Media Box with Next/Image and Category Badge */}
      <div className="gallery-image-box position-relative overflow-hidden">
        <Image
          src={imgSrc}
          alt={item.alt || item.title || 'Comfort Aircon Gallery Item'}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
          className="gallery-card-img"
          onError={() => setImgSrc(NEUTRAL_PLACEHOLDER_IMG)}
          unoptimized={typeof imgSrc === 'string' && (imgSrc.startsWith('data:') || imgSrc.startsWith('http'))}
        />

        {/* Category Pill Tag */}
        <span className="gallery-category-badge">{item.category}</span>
      </div>

      {/* Meta Caption (optional title) */}
      {item.title && (
        <div className="gallery-meta mt-auto">
          <h4 className="gallery-title" title={item.title}>
            {item.title}
          </h4>
        </div>
      )}
    </article>
  );
}
