import { useState, useMemo } from 'react'
import type { Photo } from '@/types'
import { usePhotos } from '@/hooks/usePhotos'
import { GalleryHeader } from './GalleryHeader'
import { GalleryToolbar, type FilterMode, type SortMode } from './GalleryToolbar'
import { PhotoGrid } from './PhotoGrid'
import { PhotoUpload } from './PhotoUpload'
import { Lightbox } from './Lightbox'
import { Loader2 } from 'lucide-react'
import { Toaster, toast } from 'sonner'

export function GalleryMain() {
  const { photos, loading, uploading, upload, remove, toggleFavorite } = usePhotos()
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [filter, setFilter] = useState<FilterMode>('all')
  const [sort, setSort] = useState<SortMode>('newest')

  const handleUpload = async (file: File) => {
    try {
      await upload(file)
      toast.success('Memory added to gallery', {
        style: { fontFamily: 'var(--font-serif)' },
      })
    } catch (err) {
      toast.error('Failed to upload photo', {
        style: { fontFamily: 'var(--font-serif)' },
      })
    }
  }

  const handleDelete = async (id: string) => {
    try {
      if (selectedPhoto?.id === id) setSelectedPhoto(null)
      await remove(id)
      toast('Photo removed', {
        style: { fontFamily: 'var(--font-serif)' },
      })
    } catch {
      toast.error('Failed to delete photo', {
        style: { fontFamily: 'var(--font-serif)' },
      })
    }
  }

  const handleToggleFavorite = async (id: string) => {
    try {
      await toggleFavorite(id)
    } catch {
      toast.error('Failed to update favorite', {
        style: { fontFamily: 'var(--font-serif)' },
      })
    }
  }

  const favoriteCount = useMemo(() => photos.filter((p) => p.favorite).length, [photos])

  const displayedPhotos = useMemo(() => {
    const filtered = filter === 'favorites' ? photos.filter((p) => p.favorite) : photos
    return sort === 'newest'
      ? [...filtered].sort((a, b) => b.timestamp - a.timestamp)
      : [...filtered].sort((a, b) => a.timestamp - b.timestamp)
  }, [photos, filter, sort])

  return (
    <div
      className="min-h-screen bg-[#FDFBF7] text-gray-800 selection:bg-pink-200"
      style={{
        backgroundImage:
          'radial-gradient(circle at 50% -100%, #ffeaf1 0%, transparent 60%), radial-gradient(circle at 100% 100%, #fae6fa 0%, transparent 50%)',
      }}
    >
      <GalleryHeader />

      <main className="relative pb-24">
        <section className="mb-10 relative z-20">
          <PhotoUpload onUpload={handleUpload} uploading={uploading} />
        </section>

        <section className="relative z-10">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <Loader2 className="w-8 h-8 text-pink-400 animate-spin" />
              <p
                className="text-lg text-pink-400/70 italic"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                Loading your memories...
              </p>
            </div>
          ) : (
            <>
              <GalleryToolbar
                filter={filter}
                sort={sort}
                totalCount={photos.length}
                favoriteCount={favoriteCount}
                onFilterChange={setFilter}
                onSortChange={setSort}
              />
              <PhotoGrid
                photos={displayedPhotos}
                onToggleFavorite={handleToggleFavorite}
                onDelete={handleDelete}
                onSelect={setSelectedPhoto}
              />
            </>
          )}
        </section>
      </main>

      <Lightbox
        photo={selectedPhoto}
        photos={displayedPhotos}
        onClose={() => setSelectedPhoto(null)}
        onNavigate={setSelectedPhoto}
        onToggleFavorite={handleToggleFavorite}
        onDelete={handleDelete}
      />

      <div className="fixed top-0 left-0 w-64 h-64 bg-pink-300 rounded-full blur-[120px] opacity-15 pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-purple-300 rounded-full blur-[150px] opacity-15 pointer-events-none -z-10" />

      <Toaster
        position="bottom-center"
        toastOptions={{
          className: 'bg-white/90 backdrop-blur-sm border-pink-100',
        }}
      />
    </div>
  )
}
