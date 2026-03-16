import { motion, AnimatePresence } from 'motion/react'
import { ChevronLeft, ChevronRight, X, Heart, Download, Trash2 } from 'lucide-react'
import type { Photo } from '@/types'
import { useEffect, useCallback } from 'react'

interface LightboxProps {
  photo: Photo | null
  photos: Photo[]
  onClose: () => void
  onNavigate: (photo: Photo) => void
  onToggleFavorite: (id: string) => void
  onDelete: (id: string) => void
}

export function Lightbox({
  photo,
  photos,
  onClose,
  onNavigate,
  onToggleFavorite,
  onDelete,
}: LightboxProps) {
  const currentIndex = photo ? photos.findIndex((p) => p.id === photo.id) : -1

  const goNext = useCallback(() => {
    if (currentIndex < photos.length - 1) {
      onNavigate(photos[currentIndex + 1])
    }
  }, [currentIndex, photos, onNavigate])

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      onNavigate(photos[currentIndex - 1])
    }
  }, [currentIndex, photos, onNavigate])

  useEffect(() => {
    if (!photo) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowRight':
          goNext()
          break
        case 'ArrowLeft':
          goPrev()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [photo, onClose, goNext, goPrev])

  const handleDownload = () => {
    if (!photo) return
    const link = document.createElement('a')
    link.href = photo.url
    link.download = `photoluv-${photo.id}.jpg`
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
    link.click()
  }

  const handleDelete = () => {
    if (!photo) return
    const nextPhoto =
      currentIndex < photos.length - 1
        ? photos[currentIndex + 1]
        : currentIndex > 0
          ? photos[currentIndex - 1]
          : null

    onDelete(photo.id)
    if (nextPhoto) {
      onNavigate(nextPhoto)
    } else {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
          onClick={onClose}
        >
          {/* Top bar */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 z-10">
            <span
              className="text-white/60 text-sm tracking-widest uppercase"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {currentIndex + 1} / {photos.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onToggleFavorite(photo.id)
                }}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Toggle favorite"
              >
                <Heart
                  className={`w-5 h-5 ${
                    photo.favorite ? 'fill-pink-500 text-pink-500' : 'text-white/80'
                  }`}
                />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleDownload()
                }}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Download"
              >
                <Download className="w-5 h-5 text-white/80" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleDelete()
                }}
                className="p-2.5 rounded-full bg-white/10 hover:bg-red-500/30 transition-colors"
                aria-label="Delete"
              >
                <Trash2 className="w-5 h-5 text-white/80" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onClose()
                }}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors ml-2"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-white/80" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          {currentIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                goPrev()
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6 text-white/80" />
            </button>
          )}
          {currentIndex < photos.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                goNext()
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6 text-white/80" />
            </button>
          )}

          {/* Image */}
          <motion.img
            key={photo.id}
            src={photo.url}
            alt="Gallery photo"
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl select-none"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            draggable={false}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
