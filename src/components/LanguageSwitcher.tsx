import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  return (
    <div className="fixed top-4 right-4 flex gap-2">
      <button
        onClick={() => changeLanguage('tr')}
        className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
          i18n.language === 'tr'
            ? 'bg-purple-500 text-white'
            : 'bg-white/10 text-white/60 hover:bg-white/20'
        }`}
      >
        🇹🇷 TR
      </button>
      <button
        onClick={() => changeLanguage('en')}
        className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
          i18n.language === 'en'
            ? 'bg-purple-500 text-white'
            : 'bg-white/10 text-white/60 hover:bg-white/20'
        }`}
      >
        🇬🇧 EN
      </button>
    </div>
  );
} 