import { useState, useEffect, useCallback } from 'react'
import type { Photo } from '@/types'
import { isFirebaseConfigured } from '@/lib/firebase'
import {
  subscribeToPhotos,
  uploadPhoto,
  deletePhoto,
  toggleFavorite,
} from '@/lib/photo-service'
import { INITIAL_PHOTOS } from '@/data/photos'

export function usePhotos() {
  const [photos, setPhotos] = useState<Photo[]>(isFirebaseConfigured ? [] : INITIAL_PHOTOS)
  const [loading, setLoading] = useState(isFirebaseConfigured)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (!isFirebaseConfigured) return

    const unsubscribe = subscribeToPhotos((updatedPhotos) => {
      setPhotos(updatedPhotos)
      setLoading(false)
    })
    return unsubscribe ?? undefined
  }, [])

  const handleUpload = useCallback(async (file: File) => {
    if (!isFirebaseConfigured) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const newPhoto: Photo = {
          id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          url: reader.result as string,
          timestamp: Date.now(),
        }
        setPhotos((prev) => [newPhoto, ...prev])
      }
      reader.readAsDataURL(file)
      return
    }

    setUploading(true)
    try {
      await uploadPhoto(file)
    } finally {
      setUploading(false)
    }
  }, [])

  const handleDelete = useCallback(async (id: string) => {
    if (!isFirebaseConfigured) {
      setPhotos((prev) => prev.filter((p) => p.id !== id))
      return
    }
    const photo = photos.find((p) => p.id === id)
    if (photo) await deletePhoto(photo)
  }, [photos])

  const handleToggleFavorite = useCallback(async (id: string) => {
    if (!isFirebaseConfigured) {
      setPhotos((prev) =>
        prev.map((p) => (p.id === id ? { ...p, favorite: !p.favorite } : p)),
      )
      return
    }
    const photo = photos.find((p) => p.id === id)
    if (photo) await toggleFavorite(photo)
  }, [photos])

  return {
    photos,
    loading,
    uploading,
    upload: handleUpload,
    remove: handleDelete,
    toggleFavorite: handleToggleFavorite,
  }
}
