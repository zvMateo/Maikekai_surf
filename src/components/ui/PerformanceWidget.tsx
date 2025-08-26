'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, X, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import performanceMonitor, { type PerformanceMetric, type WebVitalsScore } from '@/lib/performance'

interface PerformanceWidgetProps {
  enabled?: boolean
}

export function PerformanceWidget({ enabled = process.env.NODE_ENV === 'development' }: PerformanceWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [summary, setSummary] = useState<{
    vitals: WebVitalsScore
    customMetrics: PerformanceMetric[]
    overall: 'good' | 'needs-improvement' | 'poor'
  } | null>(null)

  useEffect(() => {
    if (!enabled) return

    const interval = setInterval(() => {
      setSummary(performanceMonitor.getPerformanceSummary())
    }, 2000)

    return () => clearInterval(interval)
  }, [enabled])

  if (!enabled || !summary) return null

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'good':
        return 'text-green-600 bg-green-100'
      case 'needs-improvement':
        return 'text-yellow-600 bg-yellow-100'
      case 'poor':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getRatingIcon = (rating: string) => {
    switch (rating) {
      case 'good':
        return <TrendingUp className="h-3 w-3" />
      case 'needs-improvement':
        return <Minus className="h-3 w-3" />
      case 'poor':
        return <TrendingDown className="h-3 w-3" />
      default:
        return null
    }
  }

  const formatValue = (metric: PerformanceMetric | null) => {
    if (!metric) return 'N/A'
    
    if (metric.name === 'CLS') {
      return metric.value.toFixed(3)
    }
    
    return `${Math.round(metric.value)}ms`
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`p-3 rounded-full shadow-lg border-2 transition-colors ${
          summary.overall === 'good' 
            ? 'bg-green-500 border-green-400 text-white' 
            : summary.overall === 'needs-improvement'
            ? 'bg-yellow-500 border-yellow-400 text-white'
            : 'bg-red-500 border-red-400 text-white'
        }`}
      >
        <Activity className="h-5 w-5" />
      </motion.button>

      {/* Performance Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Performance Metrics
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Overall Score */}
            <div className={`p-2 rounded-lg mb-4 ${getRatingColor(summary.overall)}`}>
              <div className="flex items-center justify-between">
                <span className="font-medium">Overall Score</span>
                <div className="flex items-center gap-1">
                  {getRatingIcon(summary.overall)}
                  <span className="text-sm font-medium capitalize">
                    {summary.overall.replace('-', ' ')}
                  </span>
                </div>
              </div>
            </div>

            {/* Core Web Vitals */}
            <div className="space-y-2 mb-4">
              <h4 className="text-sm font-medium text-gray-700">Core Web Vitals</h4>
              
              {Object.entries(summary.vitals).map(([key, metric]) => (
                <div key={key} className="flex items-center justify-between py-1">
                  <span className="text-sm text-gray-600 uppercase">{key}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      {formatValue(metric)}
                    </span>
                    {metric && (
                      <div className={`px-2 py-1 rounded text-xs flex items-center gap-1 ${getRatingColor(metric.rating)}`}>
                        {getRatingIcon(metric.rating)}
                        <span>{metric.rating === 'needs-improvement' ? 'OK' : metric.rating}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Custom Metrics */}
            {summary.customMetrics.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700">Custom Metrics</h4>
                <div className="max-h-32 overflow-y-auto space-y-1">
                  {summary.customMetrics.slice(-5).map((metric, index) => (
                    <div key={`${metric.name}-${index}`} className="flex items-center justify-between py-1 text-xs">
                      <span className="text-gray-600 truncate">{metric.name}</span>
                      <span className="font-medium">{formatValue(metric)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="mt-4 pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                🏄‍♂️ Maikekai Surf Performance Monitor
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
