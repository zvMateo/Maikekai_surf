'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Waves, User, LogOut } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { user, signOut, profile } = useAuth()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-primary-500 p-2 rounded-full">
              <Waves className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-display font-bold text-primary-800">
              Maikekai Surf
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="#inicio" 
              className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
            >
              Inicio
            </Link>
            <Link 
              href="#planes" 
              className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
            >
              Planes de Surf
            </Link>
            <Link 
              href="#reservas" 
              className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
            >
              Reservas
            </Link>
            <Link 
              href="#reseñas" 
              className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
            >
              Reseñas
            </Link>
            <Link 
              href="#contacto" 
              className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
            >
              Contacto
            </Link>
            
            {/* User Authentication */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 bg-primary-100 hover:bg-primary-200 text-primary-700 px-4 py-2 rounded-lg transition-colors font-medium"
                >
                  <User className="h-4 w-4" />
                  <span>{profile?.full_name || user.email}</span>
                </button>
                
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                    >
                      <Link 
                        href="/dashboard" 
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Mi Dashboard
                      </Link>
                      <Link 
                        href="/profile" 
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Mi Perfil
                      </Link>
                      <Link 
                        href="/bookings" 
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Mis Reservas
                      </Link>
                      {profile?.role === 'admin' && (
                        <Link 
                          href="/admin" 
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Administración
                        </Link>
                      )}
                      <hr className="my-2" />
                      <button
                        onClick={() => {
                          signOut()
                          setIsUserMenuOpen(false)
                        }}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-red-600 hover:bg-red-50 transition-colors text-left"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Cerrar Sesión</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link 
                href="/auth" 
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                Iniciar Sesión
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-primary-600 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="py-4 space-y-4">
                <Link 
                  href="#inicio" 
                  className="block px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Inicio
                </Link>
                <Link 
                  href="#planes" 
                  className="block px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Planes de Surf
                </Link>
                <Link 
                  href="#reservas" 
                  className="block px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Reservas
                </Link>
                <Link 
                  href="#reseñas" 
                  className="block px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Reseñas
                </Link>
                <Link 
                  href="#contacto" 
                  className="block px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contacto
                </Link>
                
                {/* Mobile User Menu */}
                {user ? (
                  <>
                    <div className="border-t border-gray-200 my-2"></div>
                    <div className="px-4 py-2 text-sm text-gray-500">
                      {profile?.full_name || user.email}
                    </div>
                    <Link 
                      href="/dashboard" 
                      className="block px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Mi Dashboard
                    </Link>
                    <Link 
                      href="/profile" 
                      className="block px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Mi Perfil
                    </Link>
                    <Link 
                      href="/bookings" 
                      className="block px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Mis Reservas
                    </Link>
                    {profile?.role === 'admin' && (
                      <Link 
                        href="/admin" 
                        className="block px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors font-medium"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Administración
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        signOut()
                        setIsMenuOpen(false)
                      }}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors font-medium"
                    >
                      Cerrar Sesión
                    </button>
                  </>
                ) : (
                  <Link 
                    href="/auth" 
                    className="block mx-4 text-center bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Iniciar Sesión
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
