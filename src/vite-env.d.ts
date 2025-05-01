/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_HIBP_API_KEY: string
  readonly VITE_TELEGRAM_BOT_TOKEN: string
  readonly VITE_TELEGRAM_CHAT_ID: string
  readonly VITE_DISCORD_WEBHOOK_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 