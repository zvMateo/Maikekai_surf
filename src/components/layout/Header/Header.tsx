'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Waves, User, LogOut } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { Button } from '@/components/ui/Button'
import { useResponsive } from '@/hooks/useResponsive'
import { ANIMATION_DEFAULTS, APP_CONFIG } from '@/lib/constants'

interface NavItem {
  href: string
  label: string
  isExternal?: boolean
}

const navigationItems: NavItem[] = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#planes', label: 'Planes de Surf' },
  { href: '#reservas', label: 'Reservas' },
  { href: '#reseñas', label: 'Reseñas' },
  { href: '#contacto', label: 'Contacto' },
]

interface NavigationLinkProps {
  href: string
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

function NavigationLink({ href, children, onClick, className = '' }: NavigationLinkProps) {
  const baseClasses = "text-gray-700 hover:text-primary-600 transition-colors font-medium"
  
  return (
    <Link 
      href={href}
      className={`${baseClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </Link>
  )
}

interface UserMenuProps {
  isOpen: boolean
  onClose: () => void
}

function UserMenu({ isOpen, onClose }: UserMenuProps) {
  const { user, signOut, profile } = useAuth()

  if (!user) return null

  const userMenuItems = [
    { href: '/dashboard', label: 'Mi Dashboard' },
    { href: '/profile', label: 'Mi Perfil' },
    { href: '/bookings', label: 'Mis Reservas' },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: ANIMATION_DEFAULTS.duration }}
          className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
        >
          {userMenuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={onClose}
            >
              {item.label}
            </Link>
          ))}
          
          {profile?.role === 'admin' && (
            <Link
              href="/admin"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={onClose}
            >
              Administración
            </Link>
          )}
          
          <hr className="my-2" />
          
          <button
            onClick={() => {
              signOut()
              onClose()
            }}
            className="flex items-center space-x-2 w-full px-4 py-2 text-red-600 hover:bg-red-50 transition-colors text-left"
          >
            <LogOut className="h-4 w-4" />
            <span>Cerrar Sesión</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { user, signOut, profile } = useAuth()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: ANIMATION_DEFAULTS.duration }}
          className="md:hidden mt-4 bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div className="py-4 space-y-4">
            {navigationItems.map((item) => (
              <NavigationLink
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="block px-4 py-2 hover:bg-primary-50"
              >
                {item.label}
              </NavigationLink>
            ))}
            
            {/* Mobile User Section */}
            {user ? (
              <>
                <div className="border-t border-gray-200 my-2"></div>
                <div className="px-4 py-2 text-sm text-gray-500">
                  {profile?.full_name || user.email}
                </div>
                
                <NavigationLink
                  href="/dashboard"
                  onClick={onClose}
                  className="block px-4 py-2 hover:bg-primary-50"
                >
                  Mi Dashboard
                </NavigationLink>
                
                <NavigationLink
                  href="/profile"
                  onClick={onClose}
                  className="block px-4 py-2 hover:bg-primary-50"
                >
                  Mi Perfil
                </NavigationLink>
                
                <NavigationLink
                  href="/bookings"
                  onClick={onClose}
                  className="block px-4 py-2 hover:bg-primary-50"
                >
                  Mis Reservas
                </NavigationLink>
                
                {profile?.role === 'admin' && (
                  <NavigationLink
                    href="/admin"
                    onClick={onClose}
                    className="block px-4 py-2 hover:bg-primary-50"
                  >
                    Administración
                  </NavigationLink>
                )}
                
                <button
                  onClick={() => {
                    signOut()
                    onClose()
                  }}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors font-medium"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <div className="px-4">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full"
                  onClick={() => {
                    window.location.href = '/auth'
                    onClose()
                  }}
                >
                  Iniciar Sesión
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <motion.div 
        whileHover={{ scale: 1.05 }}
        className="bg-primary-500 p-2 rounded-full"
      >
        <Waves className="h-6 w-6 text-white" />
      </motion.div>
      <span className="text-2xl font-display font-bold bg-gradient-to-r from-primary-800 to-primary-600 bg-clip-text text-transparent">
        {APP_CONFIG.name}
      </span>
    </Link>
  )
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { user, profile } = useAuth()
  const { isMobile } = useResponsive()

  const closeMenus = () => {
    setIsMenuOpen(false)
    setIsUserMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-100">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <NavigationLink key={item.href} href={item.href}>
                {item.label}
              </NavigationLink>
            ))}
            
            {/* User Authentication */}
            {user ? (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 bg-primary-100 hover:bg-primary-200 text-primary-700"
                >
                  <User className="h-4 w-4" />
                  <span className="max-w-[120px] truncate">
                    {profile?.full_name || user.email}
                  </span>
                </Button>
                
                <UserMenu 
                  isOpen={isUserMenuOpen} 
                  onClose={() => setIsUserMenuOpen(false)} 
                />
              </div>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={() => window.location.href = '/auth'}
              >
                Iniciar Sesión
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <MobileMenu isOpen={isMenuOpen} onClose={closeMenus} />
      </nav>
    </header>
  )
}
