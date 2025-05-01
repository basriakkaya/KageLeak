import jsPDF from 'jspdf';
import i18next from 'i18next';

interface ReportData {
  email: string;
  found: boolean;
  totalBreaches: number;
  sources: Array<{ name: string; date: string }>;
  fields: string[];
  checkDate: string;
}

export const generateReport = (data: ReportData) => {
  const doc = new jsPDF();
  const currentLang = i18next.language;

  const translations = {
    tr: {
      title: 'KageLeak Güvenlik Raporu',
      email: 'E-posta Adresi',
      status: 'Durum',
      safe: 'Güvende',
      breached: 'Risk Altında',
      totalBreaches: 'Toplam Sızıntı',
      checkDate: 'Kontrol Tarihi',
      sources: 'Sızdırılan Platformlar',
      fields: 'Sızdırılan Bilgiler',
      recommendations: 'Öneriler',
      recommendationsList: [
        '• Tüm hesaplarınızın şifrelerini değiştirin',
        '• İki faktörlü doğrulama kullanın',
        '• Güçlü ve benzersiz şifreler oluşturun',
        '• Şüpheli aktiviteleri takip edin'
      ]
    },
    en: {
      title: 'KageLeak Security Report',
      email: 'Email Address',
      status: 'Status',
      safe: 'Safe',
      breached: 'At Risk',
      totalBreaches: 'Total Breaches',
      checkDate: 'Check Date',
      sources: 'Compromised Platforms',
      fields: 'Leaked Information',
      recommendations: 'Recommendations',
      recommendationsList: [
        '• Change passwords for all your accounts',
        '• Enable two-factor authentication',
        '• Create strong and unique passwords',
        '• Monitor for suspicious activities'
      ]
    }
  };

  const t = translations[currentLang as keyof typeof translations];

  // Başlık
  doc.setFontSize(24);
  doc.setTextColor(85, 60, 154);
  doc.text(t.title, 105, 20, { align: 'center' });

  // Ana Bilgiler
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  
  const yStart = 40;
  const lineHeight = 10;
  
  doc.text(`${t.email}: ${data.email}`, 20, yStart);
  doc.text(`${t.status}: ${data.found ? t.breached : t.safe}`, 20, yStart + lineHeight);
  doc.text(`${t.totalBreaches}: ${data.totalBreaches}`, 20, yStart + lineHeight * 2);
  doc.text(`${t.checkDate}: ${data.checkDate}`, 20, yStart + lineHeight * 3);

  // Sızdırılan Platformlar
  if (data.found && data.sources.length > 0) {
    doc.setFontSize(14);
    doc.setTextColor(85, 60, 154);
    doc.text(t.sources, 20, yStart + lineHeight * 5);
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    data.sources.forEach((source, index) => {
      doc.text(`• ${source.name} (${source.date})`, 25, yStart + lineHeight * (6 + index));
    });
  }

  // Sızdırılan Bilgiler
  if (data.found && data.fields.length > 0) {
    const fieldsStartY = yStart + lineHeight * (6 + data.sources.length + 2);
    
    doc.setFontSize(14);
    doc.setTextColor(85, 60, 154);
    doc.text(t.fields, 20, fieldsStartY);
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    data.fields.forEach((field, index) => {
      doc.text(`• ${field}`, 25, fieldsStartY + lineHeight * (1 + index));
    });
  }

  // Öneriler
  const recommendationsY = data.found ? 
    yStart + lineHeight * (9 + data.sources.length + data.fields.length) : 
    yStart + lineHeight * 5;

  doc.setFontSize(14);
  doc.setTextColor(85, 60, 154);
  doc.text(t.recommendations, 20, recommendationsY);

  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  t.recommendationsList.forEach((rec, index) => {
    doc.text(rec, 20, recommendationsY + lineHeight * (1 + index));
  });

  return doc;
}; 