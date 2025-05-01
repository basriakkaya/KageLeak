# ![logo](https://github.com/user-attachments/assets/0ed2f403-b850-4d94-af69-4b7d450f3e1b)
KageLeak - Email Leak Checker

[English](#english) | [Türkçe](#türkçe)

## English

KageLeak is a modern web application that allows users to check if their email addresses have been compromised in data breaches. The application is built with React, TypeScript, and Tailwind CSS, featuring a beautiful UI and multilingual support.

### Features

- 🔍 Real-time email leak checking
- 🌐 Multilingual support (English/Turkish)
- 📱 Responsive design
- 🎨 Modern UI with Tailwind CSS
- 📊 Detailed breach information
- 🔒 Secure API integration
- 📄 PDF report generation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Discord account (for webhook integration)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/kageleak.git
cd kageleak
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Configure environment variables:
Create a `.env` file in the root directory and add:
```env
VITE_API_KEY=your_api_key_here
VITE_DISCORD_WEBHOOK=your_discord_webhook_url
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

### Configuration

1. **Discord Webhook Setup**
   - Create a new Discord server or use an existing one
   - Go to Server Settings > Integrations > Webhooks
   - Create a new webhook
   - Copy the webhook URL and paste it in your `.env` file

2. **API Configuration**
   - Sign up for an API key at [HaveIBeenPwned](https://haveibeenpwned.com/API/Key)
   - Add your API key to the `.env` file

### Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Türkçe

KageLeak, kullanıcıların e-posta adreslerinin veri ihlallerinde sızdırılıp sızdırılmadığını kontrol etmelerini sağlayan modern bir web uygulamasıdır. Uygulama React, TypeScript ve Tailwind CSS ile geliştirilmiş olup, güzel bir kullanıcı arayüzü ve çok dilli destek sunmaktadır.

### Özellikler

- 🔍 Gerçek zamanlı e-posta sızıntı kontrolü
- 🌐 Çok dilli destek (İngilizce/Türkçe)
- 📱 Duyarlı tasarım
- 🎨 Tailwind CSS ile modern arayüz
- 📊 Detaylı ihlal bilgileri
- 🔒 Güvenli API entegrasyonu
- 📄 PDF rapor oluşturma

### Gereksinimler

- Node.js (v14 veya üzeri)
- npm veya yarn
- Discord hesabı (webhook entegrasyonu için)

### Kurulum

1. Depoyu klonlayın:
```bash
git clone https://github.com/yourusername/kageleak.git
cd kageleak
```

2. Bağımlılıkları yükleyin:
```bash
npm install
# veya
yarn install
```

3. Ortam değişkenlerini yapılandırın:
Kök dizinde `.env` dosyası oluşturun ve ekleyin:
```env
VITE_API_KEY=api_anahtarınız
VITE_DISCORD_WEBHOOK=discord_webhook_url_adresiniz
```

4. Geliştirme sunucusunu başlatın:
```bash
npm run dev
# veya
yarn dev
```

### Yapılandırma

1. **Discord Webhook Kurulumu**
   - Yeni bir Discord sunucusu oluşturun veya mevcut birini kullanın
   - Sunucu Ayarları > Entegrasyonlar > Webhooks'a gidin
   - Yeni bir webhook oluşturun
   - Webhook URL'sini kopyalayın ve `.env` dosyanıza yapıştırın

2. **API Yapılandırması**
   - [HaveIBeenPwned](https://haveibeenpwned.com/API/Key) adresinden bir API anahtarı alın
   - API anahtarınızı `.env` dosyasına ekleyin

### Katkıda Bulunma

1. Depoyu fork edin
2. Özellik dalınızı oluşturun (`git checkout -b feature/HarikaOzellik`)
3. Değişikliklerinizi commit edin (`git commit -m 'Harika bir özellik ekle'`)
4. Dalınıza push yapın (`git push origin feature/HarikaOzellik`)
5. Bir Pull Request açın

### Lisans

Bu proje MIT Lisansı altında lisanslanmıştır - detaylar için [LICENSE](LICENSE) dosyasına bakın.  
