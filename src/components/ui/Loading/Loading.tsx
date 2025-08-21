import * as React from 'react'
import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  color?: 'primary' | 'white' | 'gray'
}

const sizeClasses = {
  sm: 'w-4 h-4 border-2',
  md: 'w-8 h-8 border-2',
  lg: 'w-12 h-12 border-4',
}

const colorClasses = {
  primary: 'border-blue-600 border-t-transparent',
  white: 'border-white border-t-transparent',
  gray: 'border-gray-300 border-t-transparent',
}

export function LoadingSpinner({ 
  size = 'md', 
  className,
  color = 'primary' 
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        'animate-spin rounded-full',
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}

interface LoadingOverlayProps {
  isLoading: boolean
  children: React.ReactNode
  className?: string
  spinnerSize?: 'sm' | 'md' | 'lg'
  message?: string
}

export function LoadingOverlay({
  isLoading,
  children,
  className,
  spinnerSize = 'lg',
  message = 'Cargando...'
}: LoadingOverlayProps) {
  return (
    <div className={cn('relative', className)}>
      {children}
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
          <LoadingSpinner size={spinnerSize} />
          {message && (
            <p className="mt-4 text-sm text-gray-600 font-medium">
              {message}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

interface LoadingDotsProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const dotSizeClasses = {
  sm: 'w-1 h-1',
  md: 'w-2 h-2',
  lg: 'w-3 h-3',
}

export function LoadingDots({ className, size = 'md' }: LoadingDotsProps) {
  return (
    <div className={cn('flex space-x-1', className)} role="status" aria-label="Loading">
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className={cn(
            'bg-current rounded-full animate-pulse',
            dotSizeClasses[size]
          )}
          style={{
            animationDelay: `${index * 0.15}s`,
            animationDuration: '0.6s',
          }}
        />
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  )
}

interface LoadingSkeletonProps {
  className?: string
  lines?: number
  height?: string
  width?: string
}

export function LoadingSkeleton({ 
  className, 
  lines = 1, 
  height = 'h-4',
  width = 'w-full'
}: LoadingSkeletonProps) {
  return (
    <div className={cn('animate-pulse', className)} role="status" aria-label="Loading content">
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={cn(
            'bg-gray-200 rounded',
            height,
            width,
            index > 0 && 'mt-2'
          )}
        />
      ))}
      <span className="sr-only">Loading content...</span>
    </div>
  )
}
