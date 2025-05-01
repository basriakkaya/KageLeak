import { ShieldCheckIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'

export default function About() {
  const { t } = useTranslation()

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-12 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent text-center">
          {t('about.title')}
        </h1>

        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-purple-500/50">
              <img
                src="/profil.png"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Basri Akkaya</h2>
                <p className="text-white/80">{t('about.role')}</p>
                <a
                  href="https://www.linkedin.com/in/basriakkaya/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors mt-4"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  {t('about.linkedin')}
                </a>
              </div>
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-lg mb-6">{t('about.description')}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/5 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <ShieldCheckIcon className="w-6 h-6 text-purple-500" />
                  {t('about.mission.title')}
                </h3>
                <p className="text-white/80">{t('about.mission.description')}</p>
              </div>

              <div className="bg-white/5 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <ShieldCheckIcon className="w-6 h-6 text-purple-500" />
                  {t('about.vision.title')}
                </h3>
                <p className="text-white/80">{t('about.vision.description')}</p>
              </div>
            </div>

            <h3 className="text-2xl font-semibold mb-4">{t('about.expertise.title')}</h3>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              <li className="bg-white/5 p-4 rounded-lg">{t('about.expertise.areas.cybersecurity')}</li>
              <li className="bg-white/5 p-4 rounded-lg">{t('about.expertise.areas.webdev')}</li>
              <li className="bg-white/5 p-4 rounded-lg">{t('about.expertise.areas.dataanalysis')}</li>
              <li className="bg-white/5 p-4 rounded-lg">{t('about.expertise.areas.apidev')}</li>
              <li className="bg-white/5 p-4 rounded-lg">{t('about.expertise.areas.securitytesting')}</li>
              <li className="bg-white/5 p-4 rounded-lg">{t('about.expertise.areas.cloud')}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 