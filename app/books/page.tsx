import { getBooks } from '@/lib/cosmic'
import BookCard from '@/components/BookCard'

export const metadata = {
  title: 'Books — Chapter One',
  description: 'Browse our full collection of books.',
}

export default async function BooksPage() {
  const books = await getBooks()

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <header className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold text-ink mb-3" style={{ fontFamily: 'Lora, Georgia, serif' }}>
          Our Books
        </h1>
        <p className="text-sepia">A curated collection of stories waiting to be read.</p>
      </header>

      {books.length === 0 ? (
        <p className="text-center text-sepia py-20">No books available yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  )
}