'use client'

import { useAuth } from '@/features/auth/hooks/useAuth'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  Users, 
  Calendar, 
  Star, 
  TrendingUp, 
  Waves,
  ArrowLeft,
  Settings
} from 'lucide-react'
import Link from 'next/link'

export default function DashboardClient() {
  const { user, profile, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link 
              href="/profile"
              className="flex items-center text-primary-600 hover:text-primary-700 transition-colors mr-4"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Volver al perfil
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Bienvenido, {profile?.full_name || user.primaryEmailAddress?.emailAddress}</p>
            </div>
          </div>
          <Settings className="h-6 w-6 text-gray-400" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Reservas Totales</p>
                <p className="text-2xl font-bold text-primary-700">0</p>
              </div>
              <Calendar className="h-8 w-8 text-primary-600" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Clases Tomadas</p>
                <p className="text-2xl font-bold text-secondary-700">0</p>
              </div>
              <Waves className="h-8 w-8 text-secondary-600" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Reseñas Dejadas</p>
                <p className="text-2xl font-bold text-sand-700">0</p>
              </div>
              <Star className="h-8 w-8 text-sand-600" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Nivel Actual</p>
                <p className="text-2xl font-bold text-green-700">Principiante</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-primary-600" />
              Actividad Reciente
            </h2>
            <div className="space-y-4">
              <div className="text-center py-8 text-gray-500">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No hay actividad reciente</p>
                <p className="text-sm">¡Haz tu primera reserva para comenzar!</p>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-4">Acciones Rápidas</h2>
            <div className="space-y-4">
              <Link
                href="/#planes"
                className="block w-full bg-primary-600 text-white text-center py-3 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Reservar Clases de Surf
              </Link>
              <Link
                href="/bookings"
                className="block w-full bg-secondary-600 text-white text-center py-3 rounded-lg hover:bg-secondary-700 transition-colors"
              >
                Ver Mis Reservas
              </Link>
              <Link
                href="/#contacto"
                className="block w-full bg-sand-600 text-white text-center py-3 rounded-lg hover:bg-sand-700 transition-colors"
              >
                Contactar Soporte
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Future Features Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-gradient-to-r from-primary-600 to-secondary-600 text-white p-6 rounded-xl"
        >
          <h3 className="text-lg font-semibold mb-2">🚀 Próximamente</h3>
          <p className="text-primary-100">
            Sistema de puntos, certificaciones de surf, calendario de eventos especiales y mucho más.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
