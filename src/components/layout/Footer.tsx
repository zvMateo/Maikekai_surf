'use client'

import Link from 'next/link'
import { Waves, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { ANIMATION_DEFAULTS, APP_CONFIG } from '@/lib/constants'

interface FooterLink {
  href: string
  label: string
  isExternal?: boolean
}

interface FooterSection {
  title: string
  links: FooterLink[]
}

const footerSections: FooterSection[] = [
  {
    title: 'Servicios',
    links: [
      { href: '#planes', label: 'Planes de Surf' },
      { href: '#clases', label: 'Clases de Surf' },
      { href: '#equipos', label: 'Alquiler de Equipos' },
      { href: '#guias', label: 'Guías de Playa' },
    ]
  },
  {
    title: 'Información',
    links: [
      { href: '/about', label: 'Sobre Nosotros' },
      { href: '/faq', label: 'Preguntas Frecuentes' },
      { href: '/blog', label: 'Blog' },
      { href: '/conditions', label: 'Condiciones del Mar' },
    ]
  },
  {
    title: 'Soporte',
    links: [
      { href: '/contact', label: 'Contacto' },
      { href: '/help', label: 'Ayuda' },
      { href: '/policies', label: 'Políticas' },
      { href: '/terms', label: 'Términos y Condiciones' },
    ]
  }
]

interface ContactInfo {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  href?: string
}

const contactInfo: ContactInfo[] = [
  {
    icon: Phone,
    label: 'Teléfono',
    value: '+507 6123-4567',
    href: 'tel:+50761234567'
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'info@maikekaisurf.com',
    href: 'mailto:info@maikekaisurf.com'
  },
  {
    icon: MapPin,
    label: 'Ubicación',
    value: 'Playa Venao, Los Santos, Panamá',
    href: 'https://maps.google.com/?q=Playa+Venao+Los+Santos+Panama'
  }
]

interface SocialLink {
  icon: React.ComponentType<{ className?: string }>
  href: string
  label: string
  color: string
}

const socialLinks: SocialLink[] = [
  {
    icon: Facebook,
    href: 'https://facebook.com/maikekaisurf',
    label: 'Facebook',
    color: 'hover:text-blue-600'
  },
  {
    icon: Instagram,
    href: 'https://instagram.com/maikekaisurf',
    label: 'Instagram',
    color: 'hover:text-pink-600'
  },
  {
    icon: Twitter,
    href: 'https://twitter.com/maikekaisurf',
    label: 'Twitter',
    color: 'hover:text-blue-400'
  },
  {
    icon: Youtube,
    href: 'https://youtube.com/@maikekaisurf',
    label: 'YouTube',
    color: 'hover:text-red-600'
  }
]

function FooterLogo() {
  return (
    <div className="flex items-center space-x-3 mb-6">
      <div className="bg-primary-500 p-3 rounded-full">
        <Waves className="h-8 w-8 text-white" />
      </div>
      <div>
        <h3 className="text-2xl font-display font-bold text-white">
          {APP_CONFIG.name}
        </h3>
        <p className="text-primary-300 text-sm">
          Tu aventura de surf comienza aquí
        </p>
      </div>
    </div>
  )
}

function NewsletterSection() {
  return (
    <div className="bg-primary-700 rounded-lg p-6 mb-8 overflow-hidden">
      <h3 className="text-xl font-bold text-white mb-3">
        🌊 Suscríbete a nuestro Newsletter
      </h3>
      <p className="text-primary-300 mb-4 text-sm">
        Recibe las mejores ofertas y consejos de surf directamente en tu email
      </p>
      <div className="flex flex-col lg:flex-row gap-3 lg:items-end">
        <div className="flex-1">
          <input
            type="email"
            placeholder="tu@email.com"
            className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-primary-300 border border-primary-600 focus:border-white focus:outline-none transition-colors"
          />
        </div>
        <div className="lg:flex-shrink-0">
          <Button 
            variant="secondary" 
            size="md" 
            className="w-full lg:w-auto py-3 px-6 font-semibold hover:bg-white hover:text-primary-700 transition-all duration-300 whitespace-nowrap"
          >
            Suscribirse
          </Button>
        </div>
      </div>
    </div>
  )
}

function ContactSection() {
  return (
    <div className="mb-8">
      <h4 className="text-lg font-semibold text-white mb-4">Contacto</h4>
      <div className="space-y-3">
        {contactInfo.map((contact) => {
          const Icon = contact.icon
          const content = (
            <div className="flex items-center space-x-3 text-primary-300 hover:text-white transition-colors">
              <Icon className="h-5 w-5 flex-shrink-0" />
              <div>
                <div className="text-sm font-medium">{contact.label}</div>
                <div className="text-sm">{contact.value}</div>
              </div>
            </div>
          )

          return contact.href ? (
            <Link key={contact.label} href={contact.href} target="_blank" rel="noopener noreferrer">
              {content}
            </Link>
          ) : (
            <div key={contact.label}>{content}</div>
          )
        })}
      </div>
    </div>
  )
}

function SocialLinksSection() {
  return (
    <div className="mb-8">
      <h4 className="text-lg font-semibold text-white mb-4">Síguenos</h4>
      <div className="flex space-x-4">
        {socialLinks.map((social) => {
          const Icon = social.icon
          return (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`p-3 bg-primary-700 rounded-full text-primary-300 transition-colors ${social.color}`}
              aria-label={social.label}
            >
              <Icon className="h-5 w-5" />
            </motion.a>
          )
        })}
      </div>
    </div>
  )
}

interface FooterSectionComponentProps {
  section: FooterSection
}

function FooterSectionComponent({ section }: FooterSectionComponentProps) {
  return (
    <div>
      <h4 className="text-lg font-semibold text-white mb-4">{section.title}</h4>
      <ul className="space-y-2">
        {section.links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-primary-300 hover:text-white transition-colors"
              {...(link.isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function FooterBottom() {
  const currentYear = new Date().getFullYear()
  
  return (
    <div className="border-t border-primary-700 pt-8 mt-8">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="text-primary-400 text-sm">
          © {currentYear} {APP_CONFIG.name}. Todos los derechos reservados.
        </div>
        
        <div className="flex flex-wrap gap-6 text-sm">
          <Link href="/privacy" className="text-primary-400 hover:text-white transition-colors">
            Política de Privacidad
          </Link>
          <Link href="/terms" className="text-primary-400 hover:text-white transition-colors">
            Términos de Uso
          </Link>
          <Link href="/cookies" className="text-primary-400 hover:text-white transition-colors">
            Política de Cookies
          </Link>
        </div>
      </div>
      
      <div className="mt-4 text-center text-primary-400 text-xs">
        Desarrollado con ❤️ para la comunidad del surf en Panamá
      </div>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-primary-800 via-primary-900 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          <div className="lg:col-span-4">
            <FooterLogo />
            <NewsletterSection />
            <ContactSection />
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            {footerSections.map((section) => (
              <FooterSectionComponent key={section.title} section={section} />
            ))}
          </div>

          <div className="lg:col-span-2">
            <SocialLinksSection />
            
            <div className="bg-primary-700/50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white">1000+</div>
              <div className="text-primary-300 text-sm">Surfistas Felices</div>
            </div>
          </div>
        </div>

        <FooterBottom />
      </div>
    </footer>
  )
}
