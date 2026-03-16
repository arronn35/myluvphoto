import { cn } from '@/lib/utils'

interface OrnamentProps {
  className?: string
  color?: 'pink' | 'purple'
}

export function Ornament({ className, color = 'pink' }: OrnamentProps) {
  const lineColor = color === 'pink' ? 'from-transparent via-pink-400 to-transparent' : 'from-transparent via-purple-300 to-transparent'
  const iconColor = color === 'pink' ? 'text-pink-300' : 'text-purple-300'

  return (
    <div className={cn('flex items-center gap-4 opacity-50 w-full max-w-xs mx-auto', className)}>
      <div className={`h-px bg-gradient-to-r ${lineColor} flex-1`} />
      <svg className={`w-4 h-4 ${iconColor}`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
      <div className={`h-px bg-gradient-to-r ${lineColor} flex-1`} />
    </div>
  )
}
