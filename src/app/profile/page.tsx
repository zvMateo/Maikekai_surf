'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { User, Calendar, Star, Settings, LogOut } from 'lucide-react'
import Link from 'next/link'

export default function ProfilePage() {
  const { user, profile, loading, signOut } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Link 
            href="/"
            className="flex items-center text-primary-600 hover:text-primary-700 transition-colors"
          >
            <User className="h-5 w-5 mr-2" />
            Volver al inicio
          </Link>
          <button
            onClick={handleSignOut}
            className="flex items-center text-red-600 hover:text-red-700 transition-colors"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Cerrar sesión
          </button>
        </div>

        {/* Profile Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <div className="flex items-center mb-6">
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="h-10 w-10 text-primary-600" />
            </div>
            <div className="ml-6">
              <h1 className="text-2xl font-bold text-gray-900">
                {profile?.full_name || user.email}
              </h1>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-500">
                Miembro desde {new Date(user.created_at).toLocaleDateString('es-ES')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-primary-50 rounded-lg">
              <Calendar className="h-8 w-8 text-primary-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-primary-700">0</p>
              <p className="text-sm text-gray-600">Reservas totales</p>
            </div>
            <div className="text-center p-4 bg-secondary-50 rounded-lg">
              <Star className="h-8 w-8 text-secondary-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-secondary-700">0</p>
              <p className="text-sm text-gray-600">Reseñas dejadas</p>
            </div>
            <div className="text-center p-4 bg-sand-50 rounded-lg">
              <Settings className="h-8 w-8 text-sand-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-sand-700">Activo</p>
              <p className="text-sm text-gray-600">Estado de cuenta</p>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <Link
            href="/bookings"
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow group"
          >
            <Calendar className="h-8 w-8 text-primary-600 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-semibold mb-2">Mis Reservas</h3>
            <p className="text-gray-600">Ver y gestionar tus reservas de surf</p>
          </Link>

          <Link
            href="/dashboard"
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow group"
          >
            <Settings className="h-8 w-8 text-secondary-600 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-semibold mb-2">Dashboard</h3>
            <p className="text-gray-600">Panel de control personal</p>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
