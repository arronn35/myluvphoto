import { motion } from 'motion/react'
import { Heart, LayoutGrid, SlidersHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'

export type FilterMode = 'all' | 'favorites'
export type SortMode = 'newest' | 'oldest'

interface GalleryToolbarProps {
  filter: FilterMode
  sort: SortMode
  totalCount: number
  favoriteCount: number
  onFilterChange: (filter: FilterMode) => void
  onSortChange: (sort: SortMode) => void
}

export function GalleryToolbar({
  filter,
  sort,
  totalCount,
  favoriteCount,
  onFilterChange,
  onSortChange,
}: GalleryToolbarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 mb-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onFilterChange('all')}
            className={cn(
              'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm transition-all duration-200',
              filter === 'all'
                ? 'bg-pink-100 text-pink-800 shadow-sm'
                : 'text-pink-600/70 hover:text-pink-800 hover:bg-pink-50',
            )}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>All</span>
            <span className="text-xs opacity-60">({totalCount})</span>
          </button>
          <button
            onClick={() => onFilterChange('favorites')}
            className={cn(
              'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm transition-all duration-200',
              filter === 'favorites'
                ? 'bg-pink-100 text-pink-800 shadow-sm'
                : 'text-pink-600/70 hover:text-pink-800 hover:bg-pink-50',
            )}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Favorites</span>
            <span className="text-xs opacity-60">({favoriteCount})</span>
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <SlidersHorizontal className="w-3.5 h-3.5 text-pink-400" />
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortMode)}
            className="text-sm text-pink-700 bg-transparent border-none outline-none cursor-pointer appearance-none pr-4"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </div>
      </div>
    </motion.div>
  )
}
