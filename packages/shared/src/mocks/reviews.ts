import type { Review } from '../types';

export const MOCK_REVIEWS: Review[] = [
  { id: 'r1', tourId: 't1', author: 'James T.', avatar: 'JT', rating: 5, date: '2026-04-12', comment: 'Absolutely incredible experience. Skip-the-line was a lifesaver — we walked straight to the Mona Lisa without waiting at all. The audio guide was detailed and engaging.' },
  { id: 'r2', tourId: 't1', author: 'Maria L.', avatar: 'ML', rating: 5, date: '2026-03-28', comment: 'Best museum visit of my life. The guide knew every corner of the Louvre. Highly recommend going early in the morning for fewer crowds.' },
  { id: 'r3', tourId: 't1', author: 'David K.', avatar: 'DK', rating: 4, date: '2026-03-15', comment: 'Great value. The map was helpful and the audio guide covered a lot of ground. Would have loved a live guide but the self-guided format worked well.' },
  { id: 'r4', tourId: 't2', author: 'Sophie R.', avatar: 'SR', rating: 5, date: '2026-05-01', comment: 'The most magical evening of our honeymoon. The sunset from the catamaran was absolutely breathtaking and the food was incredible.' },
  { id: 'r5', tourId: 't2', author: 'Alex M.', avatar: 'AM', rating: 5, date: '2026-04-20', comment: 'Worth every cent. The hot springs were a highlight and the crew was attentive and fun. Open bar was generous too!' },
  { id: 'r6', tourId: 't3', author: 'Chris P.', avatar: 'CP', rating: 5, date: '2026-02-14', comment: 'Life-changing trek. Arriving at the Sun Gate at sunrise with mist rolling over the ruins — I have no words. The guide was knowledgeable and encouraging.' },
  { id: 'r7', tourId: 't4', author: 'Yuki T.', avatar: 'YT', rating: 5, date: '2026-05-10', comment: 'Ate things I never would have found on my own. The guide knew every stall owner personally. A must-do in Tokyo.' },
  { id: 'r8', tourId: 't4', author: 'Emma W.', avatar: 'EW', rating: 5, date: '2026-04-30', comment: 'Eight tastings and every single one was delicious. The ramen stop was the highlight. Book this immediately.' },
  { id: 'r9', tourId: 't5', author: 'Carlos B.', avatar: 'CB', rating: 5, date: '2026-03-22', comment: 'The dancers were extraordinary. Sitting that close to the performers was overwhelming in the best way. The tapas were also fantastic.' },
  { id: 'r10', tourId: 't8', author: 'Priya N.', avatar: 'PN', rating: 5, date: '2026-05-05', comment: 'I swam alongside a turtle for ten minutes. The yoga at sunrise was peaceful and the breakfast was fresh and beautiful. Perfect morning.' },
];

export function getReviewsForTour(tourId: string): Review[] {
  return MOCK_REVIEWS.filter(r => r.tourId === tourId);
}
