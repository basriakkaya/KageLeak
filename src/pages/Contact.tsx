import { useState } from 'react'
import { EnvelopeIcon, UserIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'
import { Dialog } from '@headlessui/react'
import { useTranslation } from 'react-i18next'
import { handleApiError } from '../utils/errorHandler'

// Discord webhook URL'sini buraya ekleyin
const WEBHOOK_URL = ''

export default function Contact() {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isOpen, setIsOpen] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isWebhookError, setIsWebhookError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!WEBHOOK_URL) {
      setIsWebhookError(true)
      setIsSuccess(false)
      setIsOpen(true)
      return
    }

    try {
      // Discord webhook
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          embeds: [{
            title: '📬 ' + t('contact.form.message.label'),
            color: 0x7289DA,
            fields: [
              {
                name: '👤 ' + t('contact.form.name.label'),
                value: formData.name,
                inline: true
              },
              {
                name: '📧 ' + t('contact.form.email.label'),
                value: formData.email,
                inline: true
              },
              {
                name: '💬 ' + t('contact.form.message.label'),
                value: formData.message
              }
            ],
            timestamp: new Date().toISOString()
          }]
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      setIsSuccess(true)
      setIsWebhookError(false)
      setErrorMessage('')
      setIsOpen(true)
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('Error:', error)
      setIsSuccess(false)
      setIsWebhookError(false)
      setErrorMessage(handleApiError(error, t))
      setIsOpen(true)
    }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-12 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent text-center">
          {t('contact.title')}
        </h1>

        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                {t('contact.form.name.label')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-white/40" />
                </div>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="block w-full pl-10 pr-3 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-purple-500 focus:outline-none text-white placeholder-white/40"
                  placeholder={t('contact.form.name.placeholder')}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                {t('contact.form.email.label')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EnvelopeIcon className="h-5 w-5 text-white/40" />
                </div>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="block w-full pl-10 pr-3 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-purple-500 focus:outline-none text-white placeholder-white/40"
                  placeholder={t('contact.form.email.placeholder')}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
                {t('contact.form.message.label')}
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                  <ChatBubbleLeftRightIcon className="h-5 w-5 text-white/40" />
                </div>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  className="block w-full pl-10 pr-3 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-purple-500 focus:outline-none text-white placeholder-white/40 resize-none"
                  placeholder={t('contact.form.message.placeholder')}
                  required
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl font-medium transition-all shadow-lg hover:shadow-purple-500/25"
              >
                {t('contact.form.submit')}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-sm rounded-2xl bg-white/5 backdrop-blur-lg p-6 border border-white/10">
            <Dialog.Title className="text-xl font-semibold text-white mb-4">
              {isWebhookError ? '⚠️ ' + t('contact.dialog.error.title') :
               isSuccess ? t('contact.dialog.success.title') : t('contact.dialog.error.title')}
            </Dialog.Title>
            <Dialog.Description className="text-white/80 mb-6">
              {isWebhookError ? t('contact.dialog.error.webhook') :
               isSuccess ? t('contact.dialog.success.message') : errorMessage}
            </Dialog.Description>
            <button
              onClick={() => setIsOpen(false)}
              className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl font-medium transition-all"
            >
              {t('contact.dialog.close')}
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
} 