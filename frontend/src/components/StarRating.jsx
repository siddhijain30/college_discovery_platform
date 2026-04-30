import React from 'react';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';

export default function StarRating({ rating }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      {[...Array(fullStars)].map((_, i) => (
        <StarSolid key={`full-${i}`} className="h-5 w-5 text-primary" />
      ))}
      {hasHalfStar && (
        <div className="relative h-5 w-5">
          <StarOutline className="absolute h-5 w-5 text-primary" />
          <div className="absolute overflow-hidden w-[50%] h-full">
            <StarSolid className="h-5 w-5 text-primary" />
          </div>
        </div>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <StarOutline key={`empty-${i}`} className="h-5 w-5 text-primary" />
      ))}
      <span className="ml-1 text-sm font-semibold text-text-primary">{rating}</span>
    </div>
  );
}
