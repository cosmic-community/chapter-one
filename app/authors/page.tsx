import { getAuthors } from '@/lib/cosmic'
import AuthorCard from '@/components/AuthorCard'

export const metadata = {
  title: 'Authors — Chapter One',
  description: 'Meet the writers behind our stories.',
}

export default async function AuthorsPage() {
  const authors = await getAuthors()

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <header className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold text-ink mb-3" style={{ fontFamily: 'Lora, Georgia, serif' }}>
          Our Authors
        </h1>
        <p className="text-sepia">The storytellers shaping our library.</p>
      </header>

      {authors.length === 0 ? (
        <p className="text-center text-sepia py-20">No authors available yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {authors.map((author) => (
            <AuthorCard key={author.id} author={author} />
          ))}
        </div>
      )}
    </div>
  )
}