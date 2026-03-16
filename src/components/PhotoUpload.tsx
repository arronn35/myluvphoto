import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion } from 'motion/react'
import { Upload, ImagePlus, Loader2 } from 'lucide-react'

interface PhotoUploadProps {
  onUpload: (file: File) => void
  uploading?: boolean
}

export function PhotoUpload({ onUpload, uploading }: PhotoUploadProps) {
  const [isHovering, setIsHovering] = useState(false)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file) => onUpload(file))
    },
    [onUpload],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: true,
  })

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6">
      <div {...getRootProps()} className="relative">
        <input {...getInputProps()} />
        <motion.div
          onHoverStart={() => setIsHovering(true)}
          onHoverEnd={() => setIsHovering(false)}
          className={`relative overflow-hidden cursor-pointer border-2 border-dashed rounded-2xl p-10 sm:p-14 text-center transition-colors duration-300 ${
            isDragActive
              ? 'border-pink-500 bg-pink-50/60'
              : 'border-pink-200/60 hover:border-pink-400/80 bg-white/40'
          }`}
          style={{
            backdropFilter: 'blur(8px)',
            boxShadow: isHovering
              ? '0 25px 60px -15px rgba(236,192,204,0.4)'
              : '0 8px 30px -15px rgba(236,192,204,0.2)',
          }}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        >

        <motion.div
          animate={{ y: isDragActive ? -6 : 0 }}
          className="flex flex-col items-center justify-center gap-4"
        >
          <div className="relative p-5 bg-gradient-to-br from-pink-50 to-purple-50 rounded-full border border-pink-100/80 shadow-sm">
            <motion.div
              animate={{ rotate: isHovering ? 12 : 0 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {uploading ? (
                <Loader2 className="w-8 h-8 text-pink-600 animate-spin" />
              ) : isDragActive ? (
                <ImagePlus className="w-8 h-8 text-pink-600" />
              ) : (
                <Upload className="w-8 h-8 text-pink-600" />
              )}
            </motion.div>
          </div>

          <div>
            <h3
              className="text-2xl sm:text-3xl font-semibold text-purple-900 tracking-wide mb-2"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {uploading ? 'Uploading...' : isDragActive ? 'Release to add...' : 'Share a Memory'}
            </h3>
            <p
              className="text-base sm:text-lg text-pink-800/60 max-w-md mx-auto italic leading-relaxed"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Drop your photographs here, and they will be elegantly framed in the gallery.
            </p>
          </div>

          <div className="flex items-center gap-2 mt-2 text-xs text-pink-500/70 uppercase tracking-[0.2em] font-medium">
            <ImagePlus className="w-3.5 h-3.5" />
            <span>Click or drag and drop</span>
          </div>
        </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
