import Link from 'next/link'
import { getBooks, getChapters, getAuthors } from '@/lib/cosmic'
import BookCard from '@/components/BookCard'
import ChapterCard from '@/components/ChapterCard'

export default async function HomePage() {
  const [books, chapters, authors] = await Promise.all([
    getBooks(),
    getChapters(),
    getAuthors(),
  ])

  const featuredBooks = books.slice(0, 4)
  const latestChapters = chapters.slice(0, 3)

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 text-center">
          <span className="text-5xl mb-6 inline-block">📖</span>
          <h1
            className="text-4xl md:text-6xl font-semibold text-ink mb-6 leading-tight"
            style={{ fontFamily: 'Lora, Georgia, serif' }}
          >
            Where Every Story
            <br />
            Begins
          </h1>
          <p className="max-w-xl mx-auto text-lg text-sepia leading-relaxed mb-8">
            Discover books, meet the authors behind them, and lose yourself in
            beautifully crafted chapters — one page at a time.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/books"
              className="px-6 py-3 rounded-full bg-accent text-white font-medium hover:bg-accent-dark transition-colors"
            >
              Browse Books
            </Link>
            <Link
              href="/chapters"
              className="px-6 py-3 rounded-full border border-sepia/30 text-ink font-medium hover:border-accent hover:text-accent transition-colors"
            >
              Read Chapters
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Books */}
      {featuredBooks.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-ink" style={{ fontFamily: 'Lora, Georgia, serif' }}>
              Featured Books
            </h2>
            <Link href="/books" className="text-sm text-accent hover:text-accent-dark font-medium">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featuredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>
      )}

      {/* Latest Chapters */}
      {latestChapters.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-ink" style={{ fontFamily: 'Lora, Georgia, serif' }}>
              Latest Chapters
            </h2>
            <Link href="/chapters" className="text-sm text-accent hover:text-accent-dark font-medium">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestChapters.map((chapter) => (
              <ChapterCard key={chapter.id} chapter={chapter} />
            ))}
          </div>
        </section>
      )}

      {/* Authors CTA */}
      {authors.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-12">
          <div className="bg-paper rounded-2xl border border-sepia/10 p-10 text-center">
            <h2 className="text-2xl font-semibold text-ink mb-3" style={{ fontFamily: 'Lora, Georgia, serif' }}>
              Meet the Authors
            </h2>
            <p className="text-sepia mb-6 max-w-md mx-auto">
              Behind every great story is a storyteller. Discover the writers shaping our library.
            </p>
            <Link
              href="/authors"
              className="inline-block px-6 py-3 rounded-full bg-ink text-white font-medium hover:bg-ink/90 transition-colors"
            >
              Explore Authors
            </Link>
          </div>
        </section>
      )}
    </div>
  )
}