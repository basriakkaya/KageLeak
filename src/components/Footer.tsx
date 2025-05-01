function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 backdrop-blur-lg border-t border-white/10">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center gap-4">
          <img src="/logo.png" alt="KageLeak Logo" className="h-12" />
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} KageLeak. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 