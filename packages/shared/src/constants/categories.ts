export const CATEGORIES = [
  { id: 'museums', label: 'Museums', icon: '🏛️' },
  { id: 'cruises', label: 'Cruises', icon: '🚢' },
  { id: 'adventure', label: 'Adventure', icon: '🧗' },
  { id: 'food', label: 'Food & Wine', icon: '🍷' },
  { id: 'cultural', label: 'Cultural', icon: '🎭' },
  { id: 'nature', label: 'Nature', icon: '🌿' },
  { id: 'city', label: 'City Tours', icon: '🏙️' },
  { id: 'beaches', label: 'Beaches', icon: '🏖️' },
  { id: 'sports', label: 'Sports', icon: '⚽' },
  { id: 'wellness', label: 'Wellness', icon: '🧘' },
  { id: 'photography', label: 'Photography', icon: '📸' },
  { id: 'nightlife', label: 'Nightlife', icon: '🌙' },
] as const;

export type CategoryId = typeof CATEGORIES[number]['id'];
