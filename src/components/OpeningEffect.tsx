import { motion, AnimatePresence } from 'motion/react'
import { useEffect, useState, useCallback, useMemo } from 'react'

interface OpeningEffectProps {
  onComplete: () => void
}

function LilySVG({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 120 160"
      fill="none"
      className={className}
      style={style}
    >
      {/* Stem */}
      <path
        d="M60 160 C60 120, 58 100, 60 75"
        stroke="url(#stemGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Leaf left */}
      <path
        d="M60 120 C45 115, 30 108, 28 100 C30 105, 48 110, 60 112"
        fill="url(#leafGrad)"
        opacity="0.7"
      />
      {/* Leaf right */}
      <path
        d="M60 105 C72 98, 85 88, 88 82 C84 88, 70 96, 60 100"
        fill="url(#leafGrad)"
        opacity="0.6"
      />
      {/* Back petals */}
      <path
        d="M60 75 C40 60, 18 30, 25 8 C35 25, 48 50, 60 65"
        fill="url(#petalBack)"
        opacity="0.5"
      />
      <path
        d="M60 75 C80 60, 102 30, 95 8 C85 25, 72 50, 60 65"
        fill="url(#petalBack)"
        opacity="0.5"
      />
      {/* Main petals */}
      <path
        d="M60 75 C45 55, 22 25, 30 5 C40 20, 52 48, 60 65"
        fill="url(#petalGrad)"
        opacity="0.9"
      />
      <path
        d="M60 75 C75 55, 98 25, 90 5 C80 20, 68 48, 60 65"
        fill="url(#petalGrad)"
        opacity="0.9"
      />
      {/* Center petal */}
      <path
        d="M60 70 C55 48, 50 20, 60 2 C70 20, 65 48, 60 70"
        fill="url(#petalCenter)"
        opacity="0.95"
      />
      {/* Stamen dots */}
      <circle cx="55" cy="40" r="1.5" fill="#e8c56a" opacity="0.8" />
      <circle cx="60" cy="35" r="1.5" fill="#e8c56a" opacity="0.9" />
      <circle cx="65" cy="40" r="1.5" fill="#e8c56a" opacity="0.8" />
      <circle cx="58" cy="45" r="1" fill="#d4a843" opacity="0.6" />
      <circle cx="63" cy="44" r="1" fill="#d4a843" opacity="0.6" />
      <defs>
        <linearGradient id="petalGrad" x1="0" y1="1" x2="0.3" y2="0">
          <stop offset="0%" stopColor="#fce4ec" />
          <stop offset="40%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#fdf5f7" />
        </linearGradient>
        <linearGradient id="petalBack" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#f3e5f5" />
          <stop offset="100%" stopColor="#fce4ec" />
        </linearGradient>
        <linearGradient id="petalCenter" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#f8e8ef" />
          <stop offset="50%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#fffafa" />
        </linearGradient>
        <linearGradient id="stemGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#81c784" />
          <stop offset="100%" stopColor="#4caf50" />
        </linearGradient>
        <linearGradient id="leafGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#66bb6a" />
          <stop offset="100%" stopColor="#43a047" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function PetalSVG({ variant = 0 }: { variant?: number }) {
  const paths = [
    'M10 0 C4 3, 0 10, 2 18 C5 14, 8 8, 10 0Z',
    'M8 0 C3 4, 0 12, 3 20 C6 14, 8 6, 8 0Z',
    'M12 0 C6 5, 1 14, 4 22 C7 15, 10 7, 12 0Z',
  ]
  return (
    <svg viewBox="0 0 20 24" fill="none" className="w-full h-full">
      <path
        d={paths[variant % 3]}
        fill="url(#fallingPetal)"
        opacity="0.85"
      />
      <defs>
        <linearGradient id="fallingPetal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#fce4ec" />
        </linearGradient>
      </defs>
    </svg>
  )
}

interface FloatingLily {
  id: number
  x: number
  y: number
  scale: number
  rotation: number
  rotateY: number
  rotateX: number
  delay: number
  duration: number
  z: number
}

interface FallingPetal {
  id: number
  startX: number
  endX: number
  delay: number
  duration: number
  rotation: number
  size: number
  variant: number
  swayAmount: number
}

interface GlowOrb {
  id: number
  x: number
  y: number
  size: number
  color: string
  delay: number
  duration: number
}

export function OpeningEffect({ onComplete }: OpeningEffectProps) {
  const [phase, setPhase] = useState<'intro' | 'bloom' | 'exit'>('intro')

  const handleSkip = useCallback(() => {
    setPhase('exit')
  }, [])

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('bloom'), 600)
    const t2 = setTimeout(() => setPhase('exit'), 5500)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  useEffect(() => {
    if (phase === 'exit') {
      const timer = setTimeout(onComplete, 1000)
      return () => clearTimeout(timer)
    }
  }, [phase, onComplete])

  const lilies = useMemo<FloatingLily[]>(
    () => [
      { id: 0, x: -35, y: -20, scale: 0.7, rotation: -15, rotateY: 25, rotateX: 10, delay: 0.3, duration: 4, z: 100 },
      { id: 1, x: 30, y: -15, scale: 0.85, rotation: 12, rotateY: -20, rotateX: -5, delay: 0.5, duration: 4.5, z: 200 },
      { id: 2, x: -15, y: 25, scale: 0.6, rotation: 25, rotateY: 15, rotateX: 15, delay: 0.8, duration: 4, z: -100 },
      { id: 3, x: 25, y: 20, scale: 0.55, rotation: -20, rotateY: -30, rotateX: -10, delay: 1.0, duration: 4.2, z: 50 },
      { id: 4, x: -40, y: 5, scale: 0.5, rotation: 30, rotateY: 20, rotateX: 5, delay: 0.6, duration: 3.8, z: -200 },
      { id: 5, x: 42, y: 0, scale: 0.45, rotation: -8, rotateY: -10, rotateX: 12, delay: 1.2, duration: 4.3, z: -150 },
      { id: 6, x: 0, y: -35, scale: 0.75, rotation: 5, rotateY: 8, rotateX: -8, delay: 0.4, duration: 4.1, z: 150 },
      { id: 7, x: -5, y: 35, scale: 0.5, rotation: -25, rotateY: -15, rotateX: 20, delay: 1.1, duration: 3.9, z: -50 },
    ],
    [],
  )

  const fallingPetals = useMemo<FallingPetal[]>(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        startX: Math.random() * 100,
        endX: Math.random() * 100,
        delay: 1.0 + Math.random() * 2.5,
        duration: 3 + Math.random() * 3,
        rotation: Math.random() * 720 - 360,
        size: 10 + Math.random() * 18,
        variant: i % 3,
        swayAmount: 20 + Math.random() * 40,
      })),
    [],
  )

  const glowOrbs = useMemo<GlowOrb[]>(
    () => [
      { id: 0, x: 20, y: 30, size: 300, color: 'rgba(252,228,236,0.4)', delay: 0, duration: 6 },
      { id: 1, x: 75, y: 60, size: 250, color: 'rgba(243,229,245,0.35)', delay: 0.5, duration: 7 },
      { id: 2, x: 50, y: 20, size: 350, color: 'rgba(255,245,247,0.3)', delay: 0.3, duration: 5.5 },
      { id: 3, x: 30, y: 70, size: 200, color: 'rgba(225,190,231,0.2)', delay: 1, duration: 6.5 },
    ],
    [],
  )

  return (
    <AnimatePresence>
      {phase !== 'exit' ? (
        <motion.div
          key="opening"
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden cursor-pointer select-none"
          style={{
            background: 'linear-gradient(135deg, #fefcfd 0%, #fdf5f7 30%, #f8ecf0 60%, #f5eef8 100%)',
            perspective: '1200px',
          }}
          onClick={handleSkip}
        >
          {/* Ambient glow orbs */}
          {glowOrbs.map((orb) => (
            <motion.div
              key={`orb-${orb.id}`}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: `${orb.x}%`,
                top: `${orb.y}%`,
                width: orb.size,
                height: orb.size,
                background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
                transform: 'translate(-50%, -50%)',
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: [0, 0.8, 0.6, 0.8],
                scale: [0.5, 1.2, 1.0, 1.15],
              }}
              transition={{
                duration: orb.duration,
                delay: orb.delay,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* Radial light burst behind center */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              width: '150vmax',
              height: '150vmax',
              background: 'conic-gradient(from 0deg, transparent, rgba(255,228,236,0.15), transparent, rgba(243,229,245,0.1), transparent, rgba(255,228,236,0.15), transparent)',
            }}
            initial={{ opacity: 0, rotate: 0, scale: 0 }}
            animate={{ opacity: 1, rotate: 180, scale: 1 }}
            transition={{ duration: 8, ease: 'linear' }}
          />

          {/* 3D Floating Lilies */}
          {lilies.map((lily) => (
            <motion.div
              key={`lily-${lily.id}`}
              className="absolute pointer-events-none"
              style={{
                left: '50%',
                top: '50%',
                transformStyle: 'preserve-3d',
              }}
              initial={{
                x: '-50%',
                y: '-50%',
                scale: 0,
                opacity: 0,
                rotateZ: 0,
                rotateY: 0,
                rotateX: 0,
                z: 0,
              }}
              animate={{
                x: `calc(-50% + ${lily.x}vw)`,
                y: `calc(-50% + ${lily.y}vh)`,
                scale: lily.scale,
                opacity: [0, 0.9, 0.85, 0.9],
                rotateZ: [0, lily.rotation, lily.rotation + 5, lily.rotation],
                rotateY: [0, lily.rotateY, lily.rotateY + 8, lily.rotateY],
                rotateX: [0, lily.rotateX, lily.rotateX - 5, lily.rotateX],
                z: lily.z,
              }}
              transition={{
                duration: lily.duration,
                delay: lily.delay,
                ease: [0.25, 0.46, 0.45, 0.94],
                opacity: { times: [0, 0.3, 0.7, 1] },
                rotateZ: { duration: lily.duration + 2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
                rotateY: { duration: lily.duration + 1.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
                rotateX: { duration: lily.duration + 1, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
              }}
            >
              <motion.div
                animate={{ y: [0, -8, 0, 6, 0] }}
                transition={{
                  duration: 4 + lily.id * 0.3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <LilySVG
                  className="drop-shadow-lg"
                  style={{
                    width: `${80 + lily.scale * 60}px`,
                    filter: `drop-shadow(0 10px 20px rgba(219,39,119,0.15)) drop-shadow(0 4px 8px rgba(0,0,0,0.06))`,
                  }}
                />
              </motion.div>
            </motion.div>
          ))}

          {/* Falling petals */}
          {fallingPetals.map((petal) => (
            <motion.div
              key={`petal-${petal.id}`}
              className="absolute pointer-events-none"
              style={{
                width: petal.size,
                height: petal.size * 1.2,
                left: `${petal.startX}%`,
                top: '-5%',
                transformStyle: 'preserve-3d',
              }}
              initial={{ opacity: 0, y: 0, rotateZ: 0, rotateX: 0 }}
              animate={{
                opacity: [0, 0.7, 0.6, 0],
                y: ['0vh', '110vh'],
                x: [
                  '0px',
                  `${petal.swayAmount}px`,
                  `-${petal.swayAmount * 0.6}px`,
                  `${petal.swayAmount * 0.3}px`,
                ],
                rotateZ: [0, petal.rotation],
                rotateX: [0, 180, 360],
                rotateY: [0, 90, 180],
              }}
              transition={{
                duration: petal.duration,
                delay: petal.delay,
                ease: 'linear',
                opacity: { times: [0, 0.1, 0.8, 1] },
                x: { duration: petal.duration, ease: 'easeInOut', repeat: Infinity },
              }}
            >
              <PetalSVG variant={petal.variant} />
            </motion.div>
          ))}

          {/* Sparkle particles */}
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i / 24) * Math.PI * 2
            const radius = 120 + Math.random() * 200
            return (
              <motion.div
                key={`spark-${i}`}
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: 2 + Math.random() * 3,
                  height: 2 + Math.random() * 3,
                  background: i % 2 === 0 ? 'rgba(255,255,255,0.9)' : 'rgba(244,143,177,0.7)',
                  boxShadow: i % 2 === 0
                    ? '0 0 6px 2px rgba(255,255,255,0.5)'
                    : '0 0 6px 2px rgba(244,143,177,0.3)',
                  left: '50%',
                  top: '50%',
                }}
                initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                animate={{
                  x: Math.cos(angle) * radius,
                  y: Math.sin(angle) * radius,
                  opacity: [0, 1, 0.8, 0],
                  scale: [0, 1.5, 1, 0],
                }}
                transition={{
                  duration: 3,
                  delay: 1.5 + i * 0.08,
                  ease: 'easeOut',
                }}
              />
            )
          })}

          {/* Central text */}
          <motion.div
            className="absolute z-20 text-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Ornamental line top */}
            <motion.div
              className="flex items-center justify-center gap-3 mb-8"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 0.5 }}
              transition={{ duration: 1.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-pink-300" />
              <motion.svg
                className="w-5 h-5 text-pink-400"
                viewBox="0 0 24 24"
                fill="currentColor"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 1.2, type: 'spring', stiffness: 200 }}
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </motion.svg>
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-pink-300" />
            </motion.div>

            {/* Title with staggered letter reveal */}
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl leading-tight mb-5"
              style={{
                fontFamily: 'var(--font-script)',
                background: 'linear-gradient(180deg, #4a1942 0%, #8e244d 40%, #c2185b 70%, #e57398 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 2px 10px rgba(194,24,91,0.15))',
              }}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 1.4,
                delay: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              Carissime amoris mei
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-xl md:text-2xl lg:text-3xl italic max-w-lg mx-auto"
              style={{
                fontFamily: 'var(--font-serif)',
                color: 'rgba(136, 58, 100, 0.7)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1.2, ease: 'easeOut' }}
            >
              A Gallery of Romance
            </motion.p>

            {/* Ornamental line bottom */}
            <motion.div
              className="flex items-center justify-center gap-3 mt-8"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 0.4 }}
              transition={{ duration: 1.8, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-300" />
              <div className="w-1.5 h-1.5 rounded-full bg-purple-300/60" />
              <div className="h-px w-8 bg-purple-300/40" />
              <div className="w-1 h-1 rounded-full bg-purple-300/40" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-300" />
            </motion.div>
          </motion.div>

          {/* Bottom prompt */}
          <motion.p
            className="absolute bottom-8 z-20 text-sm tracking-[0.25em] uppercase"
            style={{
              fontFamily: 'var(--font-serif)',
              color: 'rgba(194, 24, 91, 0.35)',
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 1.2 }}
          >
            <motion.span
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              Click anywhere to enter
            </motion.span>
          </motion.p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
