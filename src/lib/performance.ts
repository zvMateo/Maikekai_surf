/**
 * Performance monitoring utilities for Maikekai Surf
 * Tracks Core Web Vitals and custom metrics
 */

import React from 'react'

export interface PerformanceMetric {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  timestamp: number
}

export interface WebVitalsScore {
  lcp: PerformanceMetric | null // Largest Contentful Paint
  fid: PerformanceMetric | null // First Input Delay
  cls: PerformanceMetric | null // Cumulative Layout Shift
  fcp: PerformanceMetric | null // First Contentful Paint
  ttfb: PerformanceMetric | null // Time to First Byte
}

class PerformanceMonitor {
  private metrics: Map<string, PerformanceMetric> = new Map()
  private vitals: WebVitalsScore = {
    lcp: null,
    fid: null,
    cls: null,
    fcp: null,
    ttfb: null,
  }

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeWebVitals()
    }
  }

  private initializeWebVitals() {
    // Only track basic performance metrics for now
    // TODO: Add web-vitals library when needed
    if ('performance' in window) {
      // Track LCP using PerformanceObserver
      try {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'largest-contentful-paint') {
              const lcp = entry.startTime
              this.vitals.lcp = this.createMetric('LCP', lcp, this.getLCPRating(lcp))
              this.reportMetric(this.vitals.lcp)
            }
          }
        })
        observer.observe({ entryTypes: ['largest-contentful-paint'] })
      } catch (e) {
        console.warn('Performance Observer not supported')
      }
    }
  }

  private onCLS(metric: any) {
    this.vitals.cls = this.createMetric('CLS', metric.value, this.getCLSRating(metric.value))
    this.reportMetric(this.vitals.cls)
  }

  private onFCP(metric: any) {
    this.vitals.fcp = this.createMetric('FCP', metric.value, this.getFCPRating(metric.value))
    this.reportMetric(this.vitals.fcp)
  }

  private onFID(metric: any) {
    this.vitals.fid = this.createMetric('FID', metric.value, this.getFIDRating(metric.value))
    this.reportMetric(this.vitals.fid)
  }

  private onLCP(metric: any) {
    this.vitals.lcp = this.createMetric('LCP', metric.value, this.getLCPRating(metric.value))
    this.reportMetric(this.vitals.lcp)
  }

  private onTTFB(metric: any) {
    this.vitals.ttfb = this.createMetric('TTFB', metric.value, this.getTTFBRating(metric.value))
    this.reportMetric(this.vitals.ttfb)
  }

  private createMetric(name: string, value: number, rating: 'good' | 'needs-improvement' | 'poor'): PerformanceMetric {
    return {
      name,
      value,
      rating,
      timestamp: Date.now(),
    }
  }

  // Rating thresholds based on Google's Core Web Vitals
  private getLCPRating(value: number): 'good' | 'needs-improvement' | 'poor' {
    if (value <= 2500) return 'good'
    if (value <= 4000) return 'needs-improvement'
    return 'poor'
  }

  private getFIDRating(value: number): 'good' | 'needs-improvement' | 'poor' {
    if (value <= 100) return 'good'
    if (value <= 300) return 'needs-improvement'
    return 'poor'
  }

  private getCLSRating(value: number): 'good' | 'needs-improvement' | 'poor' {
    if (value <= 0.1) return 'good'
    if (value <= 0.25) return 'needs-improvement'
    return 'poor'
  }

  private getFCPRating(value: number): 'good' | 'needs-improvement' | 'poor' {
    if (value <= 1800) return 'good'
    if (value <= 3000) return 'needs-improvement'
    return 'poor'
  }

  private getTTFBRating(value: number): 'good' | 'needs-improvement' | 'poor' {
    if (value <= 800) return 'good'
    if (value <= 1800) return 'needs-improvement'
    return 'poor'
  }

  private reportMetric(metric: PerformanceMetric) {
    // Store metric
    this.metrics.set(metric.name, metric)

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`📊 Performance: ${metric.name}`, {
        value: metric.value,
        rating: metric.rating,
        unit: this.getMetricUnit(metric.name),
      })
    }

    // In production, you could send to analytics service
    if (process.env.NODE_ENV === 'production') {
      this.sendToAnalytics(metric)
    }
  }

  private getMetricUnit(metricName: string): string {
    switch (metricName) {
      case 'CLS':
        return 'score'
      case 'FCP':
      case 'LCP':
      case 'FID':
      case 'TTFB':
        return 'ms'
      default:
        return ''
    }
  }

  private sendToAnalytics(metric: PerformanceMetric) {
    // Example: Send to Google Analytics 4 (only if available)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'web_vital', {
        event_category: 'Performance',
        event_label: metric.name,
        value: Math.round(metric.value),
        custom_parameter_1: metric.rating,
      })
    }

    // Example: Send to custom endpoint
    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      const data = JSON.stringify({
        metric: metric.name,
        value: metric.value,
        rating: metric.rating,
        timestamp: metric.timestamp,
        url: window.location.href,
        userAgent: navigator.userAgent,
      })

      navigator.sendBeacon('/api/analytics/performance', data)
    }
  }

  // Custom performance tracking
  public trackCustomMetric(name: string, value: number, unit: string = 'ms') {
    const metric: PerformanceMetric = {
      name,
      value,
      rating: 'good', // Custom metrics don't have predefined ratings
      timestamp: Date.now(),
    }

    this.metrics.set(name, metric)

    if (process.env.NODE_ENV === 'development') {
      console.log(`📊 Custom Metric: ${name}`, { value, unit })
    }
  }

  // Measure component render time
  public measureComponent(componentName: string, callback: () => void) {
    const startTime = performance.now()
    callback()
    const endTime = performance.now()
    const renderTime = endTime - startTime

    this.trackCustomMetric(`${componentName}_render_time`, renderTime)
  }

  // Get current performance summary
  public getPerformanceSummary(): {
    vitals: WebVitalsScore
    customMetrics: PerformanceMetric[]
    overall: 'good' | 'needs-improvement' | 'poor'
  } {
    const customMetrics = Array.from(this.metrics.values()).filter(
      metric => !['LCP', 'FID', 'CLS', 'FCP', 'TTFB'].includes(metric.name)
    )

    // Calculate overall rating based on Core Web Vitals
    const vitalsArray = Object.values(this.vitals).filter(Boolean) as PerformanceMetric[]
    const poorCount = vitalsArray.filter(v => v.rating === 'poor').length
    const needsImprovementCount = vitalsArray.filter(v => v.rating === 'needs-improvement').length

    let overall: 'good' | 'needs-improvement' | 'poor' = 'good'
    if (poorCount > 0) {
      overall = 'poor'
    } else if (needsImprovementCount > 0) {
      overall = 'needs-improvement'
    }

    return {
      vitals: this.vitals,
      customMetrics,
      overall,
    }
  }
}

// Singleton instance
const performanceMonitor = new PerformanceMonitor()

export default performanceMonitor

// Utility functions for React components
export const withPerformanceTracking = <T extends Record<string, any>>(
  Component: React.ComponentType<T>,
  componentName: string
) => {
  const WrappedComponent = (props: T) => {
    React.useEffect(() => {
      const startTime = performance.now()
      return () => {
        const endTime = performance.now()
        performanceMonitor.trackCustomMetric(`${componentName}_lifecycle`, endTime - startTime)
      }
    }, [])

    return React.createElement(Component, props)
  }

  WrappedComponent.displayName = `withPerformanceTracking(${componentName})`
  return WrappedComponent
}

export const usePerformanceTracking = (componentName: string) => {
  React.useEffect(() => {
    const startTime = performance.now()
    return () => {
      const endTime = performance.now()
      performanceMonitor.trackCustomMetric(`${componentName}_mount_time`, endTime - startTime)
    }
  }, [componentName])

  return {
    trackCustomMetric: performanceMonitor.trackCustomMetric.bind(performanceMonitor),
    measureComponent: performanceMonitor.measureComponent.bind(performanceMonitor),
  }
}
