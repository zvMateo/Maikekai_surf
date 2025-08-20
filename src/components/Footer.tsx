'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube, Waves } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="contacto" className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <div className="bg-primary-500 p-2 rounded-full">
                <Waves className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-display font-bold">
                Maikekai Surf
              </span>
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Tu destino perfecto para aprender surf y hospedarte en Costa Rica. 
              Vive la experiencia tropical completa con nosotros.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/maikekaisurf"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-primary-600 p-2 rounded-lg transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com/maikekaisurf"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-primary-600 p-2 rounded-lg transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com/maikekaisurf"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-primary-600 p-2 rounded-lg transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-display font-semibold mb-6">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#inicio" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="#planes" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Planes de Surf
                </Link>
              </li>
              <li>
                <Link href="#reservas" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Reservas
                </Link>
              </li>
              <li>
                <Link href="#reseñas" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Reseñas
                </Link>
              </li>
              <li>
                <Link href="/auth" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Iniciar Sesión
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-display font-semibold mb-6">Servicios</h3>
            <ul className="space-y-3">
              <li>
                <span className="text-gray-300">Clases de Surf</span>
              </li>
              <li>
                <span className="text-gray-300">Hospedaje</span>
              </li>
              <li>
                <span className="text-gray-300">Alquiler de Equipos</span>
              </li>
              <li>
                <span className="text-gray-300">Tours de Playa</span>
              </li>
              <li>
                <span className="text-gray-300">Certificaciones</span>
              </li>
              <li>
                <span className="text-gray-300">Fotografía de Surf</span>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-display font-semibold mb-6">Contacto</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-300">
                    Playa Tamarindo<br />
                    Guanacaste, Costa Rica
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-400 flex-shrink-0" />
                <a 
                  href="tel:+50612345678" 
                  className="text-gray-300 hover:text-primary-400 transition-colors"
                >
                  +506 1234-5678
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-400 flex-shrink-0" />
                <a 
                  href="mailto:info@maikekaisurf.com" 
                  className="text-gray-300 hover:text-primary-400 transition-colors"
                >
                  info@maikekaisurf.com
                </a>
              </div>
            </div>

            {/* WhatsApp Button */}
            <div className="mt-6">
              <a
                href="https://wa.me/50612345678?text=¡Hola! Me interesa conocer más sobre Maikekai Surf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
              >
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.109"/>
                </svg>
                Contactar por WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Maikekai Surf. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">
                Política de Privacidad
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">
                Términos de Servicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
