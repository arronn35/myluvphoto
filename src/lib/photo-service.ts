import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  type Timestamp,
} from 'firebase/firestore'
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage'
import { db, storage, isFirebaseConfigured } from './firebase'
import type { Photo } from '@/types'

const COLLECTION = 'photos'

interface FirestorePhoto {
  url: string
  storagePath: string
  favorite: boolean
  createdAt: Timestamp
}

function toPhoto(id: string, data: FirestorePhoto): Photo {
  return {
    id,
    url: data.url,
    storagePath: data.storagePath,
    timestamp: data.createdAt?.toMillis?.() ?? Date.now(),
    favorite: data.favorite ?? false,
  }
}

export function subscribeToPhotos(callback: (photos: Photo[]) => void): (() => void) | null {
  if (!isFirebaseConfigured || !db) return null

  const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'))
  return onSnapshot(q, (snapshot) => {
    const photos = snapshot.docs.map((d) =>
      toPhoto(d.id, d.data() as FirestorePhoto),
    )
    callback(photos)
  })
}

export async function uploadPhoto(file: File): Promise<Photo> {
  if (!isFirebaseConfigured || !db || !storage) {
    throw new Error('Firebase is not configured. Add your credentials to .env')
  }

  const filename = `${Date.now()}-${file.name}`
  const storageRef = ref(storage, `photos/${filename}`)

  await uploadBytes(storageRef, file)
  const url = await getDownloadURL(storageRef)

  const docRef = await addDoc(collection(db, COLLECTION), {
    url,
    storagePath: `photos/${filename}`,
    favorite: false,
    createdAt: serverTimestamp(),
  })

  return {
    id: docRef.id,
    url,
    storagePath: `photos/${filename}`,
    timestamp: Date.now(),
    favorite: false,
  }
}

export async function deletePhoto(photo: Photo): Promise<void> {
  if (!isFirebaseConfigured || !db || !storage) {
    throw new Error('Firebase is not configured. Add your credentials to .env')
  }

  await deleteDoc(doc(db, COLLECTION, photo.id))
  if (photo.storagePath) {
    try {
      await deleteObject(ref(storage, photo.storagePath))
    } catch {
      // File may already be deleted from storage
    }
  }
}

export async function toggleFavorite(photo: Photo): Promise<void> {
  if (!isFirebaseConfigured || !db) {
    throw new Error('Firebase is not configured. Add your credentials to .env')
  }

  await updateDoc(doc(db, COLLECTION, photo.id), {
    favorite: !photo.favorite,
  })
}
