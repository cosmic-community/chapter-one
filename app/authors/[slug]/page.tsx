// app/authors/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getAuthor, getBooksByAuthor, getMetafieldValue } from '@/lib/cosmic'
import BookCard from '@/components/BookCard'

export default async function AuthorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const author = await getAuthor(slug)

  if (!author) {
    notFound()
  }

  const books = await getBooksByAuthor(author.id)
  const portrait = author.metadata?.portrait
  const name = getMetafieldValue(author.metadata?.name) || author.title
  const bio = getMetafieldValue(author.metadata?.bio)

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <header className="text-center mb-14">
        <div className="w-32 h-32 mx-auto rounded-full overflow-hidden bg-sepia/5 mb-6 shadow-md">
          {portrait ? (
            <img
              src={`${portrait.imgix_url}?w=256&h=256&fit=crop&auto=format,compress`}
              alt={name}
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl">✍️</div>
          )}
        </div>
        <h1 className="text-3xl md:text-4xl font-semibold text-ink mb-4" style={{ fontFamily: 'Lora, Georgia, serif' }}>
          {name}
        </h1>
        {bio && (
          <p className="max-w-xl mx-auto text-sepia leading-relaxed text-lg">{bio}</p>
        )}
      </header>

      <section>
        <h2 className="text-2xl font-semibold text-ink mb-6 text-center" style={{ fontFamily: 'Lora, Georgia, serif' }}>
          Books by {name}
        </h2>
        {books.length === 0 ? (
          <p className="text-center text-sepia">No books by this author yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}