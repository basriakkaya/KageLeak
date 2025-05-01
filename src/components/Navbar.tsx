import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function Navbar() {
  const { t } = useTranslation()

  return (
    <nav className="bg-[#0C1221] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              KageLeak
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-white/80 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/about"
              className="text-white/80 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              {t('nav.about')}
            </Link>
            <Link
              to="/contact"
              className="text-white/80 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              {t('nav.contact')}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
} 