import { useState } from 'react'
import { ShieldCheckIcon, LockClosedIcon, CreditCardIcon, UserIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import CountUp from 'react-countup'
import { generateReport } from '../services/report'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../components/LanguageSwitcher'

interface Source {
  name: string;
  date: string;
}

interface APIResponse {
  success: boolean;
  found: number;
  fields: string[];
  sources: Source[];
  error?: string;
  status?: number;
}

interface Result {
  found: boolean;
  sources?: Source[];
  fields?: string[];
  totalBreaches?: number;
  error?: string;
}

const getApiErrorMessage = (status: number): string => {
  const errorMessages: { [key: number]: string } = {
    400: 'Geçersiz istek. Lütfen e-posta adresinizi kontrol edin.',
    401: 'API anahtarı geçersiz veya eksik. Lütfen API anahtarınızı kontrol edin.',
    403: 'API erişim izniniz yok. API anahtarınızın doğru olduğundan ve aktif olduğundan emin olun.',
    404: 'API endpoint bulunamadı.',
    429: 'API istek limiti aşıldı. Ücretsiz planda günlük 4 istek hakkınız var. Lütfen 24 saat sonra tekrar deneyin.',
    500: 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.',
    502: 'API sunucusu geçici olarak kullanılamıyor.',
    503: 'API servisi bakımda. Lütfen daha sonra tekrar deneyin.',
    504: 'API sunucusu yanıt vermiyor. Lütfen daha sonra tekrar deneyin.'
  };

  return errorMessages[status] || `Bilinmeyen API hatası (${status})`;
};

export default function Home() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<Result | null>(null)
  const [apiError, setApiError] = useState<string | null>(null)
  
  // localStorage'dan başlangıç değerlerini al
  const [stats, setStats] = useState(() => {
    try {
      const savedStats = localStorage.getItem('kageleak_stats')
      return savedStats ? JSON.parse(savedStats) : {
        searchCount: 0,
        breachCount: 0,
        lastSearchTime: 0
      }
    } catch {
      return {
        searchCount: 0,
        breachCount: 0,
        lastSearchTime: 0
      }
    }
  })

  // stats değiştiğinde localStorage'a kaydet
  const updateStats = (newStats: typeof stats) => {
    try {
      setStats(newStats)
      localStorage.setItem('kageleak_stats', JSON.stringify(newStats))
    } catch (error) {
      console.error('İstatistikler kaydedilemedi:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setResult(null)
    setApiError(null)

    const startTime = performance.now()

    try {
      const response = await fetch(`https://leaksapi.p.rapidapi.com/api/public?check=${encodeURIComponent(email)}`, {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'leaksapi.p.rapidapi.com',
          'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY
        }
      })

      const endTime = performance.now()
      const searchTime = (endTime - startTime) / 1000

      // API limit kontrolü
      if (response.status === 429) {
        throw new Error(getApiErrorMessage(429))
      }

      if (!response.ok) {
        throw new Error(getApiErrorMessage(response.status))
      }

      const data: APIResponse = await response.json()
      console.log('API Response:', data)

      // İstatistikleri güncelle
      const newStats = {
        searchCount: stats.searchCount + 1,
        breachCount: data.success ? stats.breachCount + (data.found > 0 ? 1 : 0) : stats.breachCount,
        lastSearchTime: searchTime
      }
      updateStats(newStats)

      if (data.success) {
        setResult({
          found: data.found > 0,
          sources: data.sources,
          fields: data.fields,
          totalBreaches: data.found
        })
      } else {
        throw new Error(data.error || 'API yanıtı başarısız')
      }
    } catch (error) {
      console.error('API Hatası:', error)
      setApiError(error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu')
      setResult({
        found: false,
        error: error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGenerateReport = () => {
    if (!result) return;

    const reportData = {
      email,
      found: result.found,
      totalBreaches: result.totalBreaches || 0,
      sources: result.sources || [],
      fields: result.fields || [],
      checkDate: new Date().toLocaleString('tr-TR')
    };

    const doc = generateReport(reportData);
    doc.save(`kageleak-rapor-${email}.pdf`);
  };

  return (
    <div className="flex-1">
      <LanguageSwitcher />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center relative z-10 mb-12">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent inline-block leading-normal">
              {t('app.title')}
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mt-6">
              {t('app.description')}
            </p>
          </div>

          {/* İstatistikler */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">
                <CountUp end={stats.searchCount} duration={1} separator="," preserveValue={true} />
              </div>
              <p className="text-white/60">{t('stats.checkedEmails')}</p>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">
                <CountUp end={stats.breachCount} duration={1} separator="," preserveValue={true} />
              </div>
              <p className="text-white/60">{t('stats.detectedBreaches')}</p>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">
                ~{stats.lastSearchTime.toFixed(2)}s
              </div>
              <p className="text-white/60">{t('stats.analysisTime')}</p>
            </div>
          </div>

          {/* Ana Form */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/10 mb-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                  {t('app.emailPlaceholder')}
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-purple-500 focus:outline-none text-white placeholder-white/40"
                  placeholder={t('app.emailPlaceholder')}
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl font-medium transition-all shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? t('app.loading') : t('app.checkButton')}
                </button>
              </div>
            </form>
            <p className="text-center text-white/60 mt-4">
              {t('app.testEmail')}
            </p>
          </div>

          {/* API Hata Mesajı */}
          {apiError && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6">
              <p className="text-red-400">{apiError}</p>
            </div>
          )}

          {/* Sonuç */}
          {result && (
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/10 mb-12">
              <div className="flex items-center gap-3 mb-6">
                {result.error ? (
                  <div className="flex items-center gap-3 text-red-400">
                    <ExclamationTriangleIcon className="w-6 h-6" />
                    <h2 className="text-xl font-semibold">{t('results.error')}</h2>
                  </div>
                ) : result.found ? (
                  <div className="flex items-center gap-3 text-red-400">
                    <ExclamationTriangleIcon className="w-6 h-6" />
                    <h2 className="text-xl font-semibold">
                      {t('results.breached', { count: result.totalBreaches })}
                    </h2>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 text-green-400">
                    <ShieldCheckIcon className="w-6 h-6" />
                    <h2 className="text-xl font-semibold">{t('results.safe')}</h2>
                  </div>
                )}
              </div>

              {result.found && result.sources && result.fields && (
                <div className="space-y-4">
                  <div className="bg-white/5 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold mb-4">{t('results.platforms')}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {result.sources.slice(0, 9).map((source, index) => (
                        <div key={index} className="bg-white/5 p-3 rounded-lg">
                          <div className="font-medium">{source.name}</div>
                          {source.date && <div className="text-sm text-white/60">{source.date}</div>}
                        </div>
                      ))}
                    </div>
                    {result.sources.length > 9 && (
                      <div className="mt-3 text-center text-white/60">
                        {t('results.andMore', { count: result.sources.length - 9 })}
                      </div>
                    )}
                  </div>

                  <div className="bg-white/5 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold mb-4">{t('results.leakedInfo')}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {result.fields.map((field, index) => (
                        <div key={index} className="bg-white/5 p-3 rounded-lg text-sm">
                          {field}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                    <p className="text-red-400">
                      {t('results.warning')}
                    </p>
                  </div>
                </div>
              )}

              {/* PDF Rapor Butonu */}
              {!result.error && (
                <div className="mt-6">
                  <button
                    onClick={handleGenerateReport}
                    className="w-full px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl font-medium transition-all shadow-lg hover:shadow-purple-500/25"
                  >
                    {t('buttons.generatePDF')}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Özellikler */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <LockClosedIcon className="w-6 h-6 text-purple-400" />
                <h3 className="text-lg font-semibold">{t('features.passwordLeak.title')}</h3>
              </div>
              <p className="text-white/60">{t('features.passwordLeak.description')}</p>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <CreditCardIcon className="w-6 h-6 text-purple-400" />
                <h3 className="text-lg font-semibold">{t('features.creditCard.title')}</h3>
              </div>
              <p className="text-white/60">{t('features.creditCard.description')}</p>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <UserIcon className="w-6 h-6 text-purple-400" />
                <h3 className="text-lg font-semibold">{t('features.personalInfo.title')}</h3>
              </div>
              <p className="text-white/60">{t('features.personalInfo.description')}</p>
            </div>
          </div>

          {/* Avantajlar */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6">
              <div className="flex items-center gap-3">
                <CheckCircleIcon className="w-6 h-6 text-green-400" />
                <span className="text-white/80">{t('advantages.free')}</span>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6">
              <div className="flex items-center gap-3">
                <CheckCircleIcon className="w-6 h-6 text-green-400" />
                <span className="text-white/80">{t('advantages.reliable')}</span>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6">
              <div className="flex items-center gap-3">
                <CheckCircleIcon className="w-6 h-6 text-green-400" />
                <span className="text-white/80">{t('advantages.noRegistration')}</span>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6">
              <div className="flex items-center gap-3">
                <CheckCircleIcon className="w-6 h-6 text-green-400" />
                <span className="text-white/80">{t('advantages.instant')}</span>
              </div>
            </div>
          </div>

          {/* Geliştirici Bilgisi */}
          <div className="flex items-center justify-between bg-white/5 backdrop-blur-lg rounded-xl p-6">
            <div className="flex items-center gap-4">
              <img
                src="/profil.png"
                alt="Basri Akkaya"
                className="w-16 h-16 rounded-full border-2 border-purple-500/50"
              />
              <div>
                <h3 className="font-semibold">{t('developer.title')}</h3>
                <p className="text-white/60">{t('developer.description')}</p>
              </div>
            </div>
            <a
              href="https://www.linkedin.com/in/basriakkaya/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              {t('buttons.linkedin')}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
} 