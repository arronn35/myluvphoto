import { motion } from 'motion/react'
import { Ornament } from './Ornament'

export function GalleryHeader() {
  return (
    <header className="relative text-center overflow-hidden">
      {/* Heart background image */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.img
          src="/heart-bg.png"
          alt=""
          className="w-[500px] sm:w-[600px] md:w-[700px] max-w-none opacity-60 select-none"
          draggable={false}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </div>

      {/* Text content on top */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 max-w-4xl mx-auto flex flex-col items-center pt-28 pb-20 px-4"
      >
        <Ornament color="pink" className="mb-6" />

        <h1
          className="text-5xl sm:text-6xl md:text-8xl mb-4 leading-tight text-pink-700 drop-shadow-sm"
          style={{ fontFamily: 'var(--font-script)' }}
        >
          Carissime amoris mei
        </h1>

        <p
          className="text-xl sm:text-2xl md:text-3xl text-pink-900/70 italic font-light max-w-2xl mx-auto leading-relaxed"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          To experience our love timelessly and symbolize our love for one another...
        </p>

        <Ornament color="purple" className="mt-8" />
      </motion.div>
    </header>
  )
}
