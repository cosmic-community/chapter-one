import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-sepia/15 bg-paper/80 backdrop-blur sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl">📖</span>
          <span className="text-xl font-semibold tracking-tight text-ink group-hover:text-accent transition-colors" style={{ fontFamily: 'Lora, Georgia, serif' }}>
            Chapter One
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/books" className="text-sepia hover:text-accent transition-colors">
            Books
          </Link>
          <Link href="/chapters" className="text-sepia hover:text-accent transition-colors">
            Chapters
          </Link>
          <Link href="/authors" className="text-sepia hover:text-accent transition-colors">
            Authors
          </Link>
        </nav>
      </div>
    </header>
  )
}