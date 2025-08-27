'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Waves } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { ANIMATION_DEFAULTS, APP_CONFIG } from '@/lib/constants'
import { useTranslations, useLocale } from 'next-intl'
import LanguageSwitcher from './LanguageSwitcher'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

interface NavItem {
  href: string
  label: string // translation key
  isExternal?: boolean
}

const navigationItems: NavItem[] = [
  { href: '#inicio', label: 'navigation.home' },
  { href: '#planes', label: 'navigation.surfPlans' },
  { href: '#reservas', label: 'navigation.bookings' },
  { href: '#reseñas', label: 'navigation.reviews' },
  { href: '#contacto', label: 'navigation.contact' },
]

interface NavigationLinkProps {
  href: string
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

function NavigationLink({
  href,
  children,
  onClick,
  className = '',
}: NavigationLinkProps) {
  const baseClasses =
    'text-gray-700 hover:text-primary-600 transition-colors font-medium'

  const handleClick = (e: React.MouseEvent) => {
    if (href && href.startsWith('#')) {
      e.preventDefault()
      const targetId = href.substring(1)
      const targetElement = document.getElementById(targetId)
      if (targetElement) {
        const headerHeight = 80
        const elementPosition = targetElement.offsetTop - headerHeight
        window.scrollTo({ top: elementPosition, behavior: 'smooth' })
      }
    }
    onClick?.()
  }

  return (
    <Link
      href={href}
      className={`${baseClasses} ${className}`}
      onClick={handleClick}
    >
      {children}
    </Link>
  )
}

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const t = useTranslations('common')
  const locale = useLocale()

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
            <div className="px-4">
              <LanguageSwitcher />
            </div>
            {navigationItems.map((item) => (
              <NavigationLink
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="block px-4 py-2 hover:bg-primary-50"
              >
                {t(item.label)}
              </NavigationLink>
            ))}
            <SignedOut>
              <div className="px-4">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full"
                  onClick={() => {
                    window.location.href = `/${locale}/auth`
                    onClose()
                  }}
                >
                  {t('auth.signIn')}
                </Button>
              </div>
            </SignedOut>
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
  const t = useTranslations('common')
  const locale = useLocale()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-100">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Logo />

          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <NavigationLink key={item.href} href={item.href}>
                {t(item.label)}
              </NavigationLink>
            ))}

            <LanguageSwitcher />

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>

            <SignedOut>
              <Button
                variant="primary"
                size="sm"
                onClick={() => (window.location.href = `/${locale}/auth`)}
              >
                {t('auth.signIn')}
              </Button>
            </SignedOut>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </nav>
    </header>
  )
}
