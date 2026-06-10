import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-sepia/15 bg-paper mt-20">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">📖</span>
          <span className="font-semibold text-ink" style={{ fontFamily: 'Lora, Georgia, serif' }}>
            Chapter One
          </span>
        </div>
        <nav className="flex items-center gap-6 text-sm text-sepia">
          <Link href="/books" className="hover:text-accent transition-colors">
            Books
          </Link>
          <Link href="/chapters" className="hover:text-accent transition-colors">
            Chapters
          </Link>
          <Link href="/authors" className="hover:text-accent transition-colors">
            Authors
          </Link>
        </nav>
        <p className="text-xs text-sepia/70">
          © {new Date().getFullYear()} Chapter One. A place for stories.
        </p>
      </div>
    </footer>
  )
}