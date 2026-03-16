import { motion } from 'motion/react'
import { Heart, Trash2, Expand } from 'lucide-react'
import type { Photo } from '@/types'

interface PhotoGridProps {
  photos: Photo[]
  onToggleFavorite: (id: string) => void
  onDelete: (id: string) => void
  onSelect: (photo: Photo) => void
}

export function PhotoGrid({ photos, onToggleFavorite, onDelete, onSelect }: PhotoGridProps) {
  if (photos.length === 0) {
    return (
      <div className="text-center py-24 px-4">
        <p
          className="text-2xl text-pink-400/60 italic"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          Your gallery awaits its first memory...
        </p>
      </div>
    )
  }

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 max-w-7xl mx-auto px-4 sm:px-6">
      {photos.map((photo, index) => (
        <motion.div
          key={photo.id}
          layout
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: index % 3 * 0.08 }}
          className="break-inside-avoid relative group inline-block w-full mb-5"
        >
          <div className="relative p-2 bg-white/80 backdrop-blur-sm shadow-[0_8px_30px_-12px_rgba(236,192,204,0.4)] border border-pink-100/40 rounded-xl overflow-hidden transition-shadow duration-300 hover:shadow-[0_16px_50px_-12px_rgba(236,192,204,0.5)]">
            <div className="relative overflow-hidden rounded-lg">
              <motion.img
                src={photo.url}
                alt="Gallery photo"
                className="w-full h-auto object-cover cursor-pointer"
                loading="lazy"
                onClick={() => onSelect(photo)}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.4 }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onToggleFavorite(photo.id)
                  }}
                  className="p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white transition-colors"
                  aria-label={photo.favorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      photo.favorite ? 'fill-pink-500 text-pink-500' : 'text-gray-600'
                    }`}
                  />
                </button>

                <div className="flex gap-1.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onSelect(photo)
                    }}
                    className="p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white transition-colors"
                    aria-label="View full size"
                  >
                    <Expand className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onDelete(photo.id)
                    }}
                    className="p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-red-50 transition-colors"
                    aria-label="Delete photo"
                  >
                    <Trash2 className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
