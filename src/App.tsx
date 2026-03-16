import { useState } from 'react'
import { OpeningEffect } from './components/OpeningEffect'
import { GalleryMain } from './components/GalleryMain'

export default function App() {
  const [showGallery, setShowGallery] = useState(false)

  return showGallery ? (
    <GalleryMain />
  ) : (
    <OpeningEffect onComplete={() => setShowGallery(true)} />
  )
}
