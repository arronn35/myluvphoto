import type { Photo } from '@/types'

export const INITIAL_PHOTOS: Photo[] = [
  { id: 'photo-01', url: '/photos/01.png', timestamp: Date.now() - 100000, favorite: true },
  { id: 'photo-02', url: '/photos/02.png', timestamp: Date.now() - 200000 },
  { id: 'photo-03', url: '/photos/03.png', timestamp: Date.now() - 300000, favorite: true },
  { id: 'photo-04', url: '/photos/04.png', timestamp: Date.now() - 400000 },
  { id: 'photo-05', url: '/photos/05.png', timestamp: Date.now() - 500000, favorite: true },
  { id: 'photo-06', url: '/photos/06.png', timestamp: Date.now() - 600000 },
  { id: 'photo-07', url: '/photos/07.png', timestamp: Date.now() - 700000 },
  { id: 'photo-08', url: '/photos/08.png', timestamp: Date.now() - 800000, favorite: true },
  { id: 'photo-09', url: '/photos/09.png', timestamp: Date.now() - 900000 },
  { id: 'photo-10', url: '/photos/10.png', timestamp: Date.now() - 1000000 },
  { id: 'photo-11', url: '/photos/11.png', timestamp: Date.now() - 1100000, favorite: true },
  { id: 'photo-12', url: '/photos/12.png', timestamp: Date.now() - 1200000 },
  { id: 'photo-13', url: '/photos/13.png', timestamp: Date.now() - 1300000 },
]
