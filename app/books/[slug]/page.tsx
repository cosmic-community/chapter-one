// app/books/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getBook, getChaptersByBook, getMetafieldValue } from '@/lib/cosmic'
import ChapterCard from '@/components/ChapterCard'

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const book = await getBook(slug)

  if (!book) {
    notFound()
  }

  const chapters = await getChaptersByBook(book.id)
  const cover = book.metadata?.cover_image
  const title = getMetafieldValue(book.metadata?.title) || book.title
  const description = getMetafieldValue(book.metadata?.description)
  const genre = getMetafieldValue(book.metadata?.genre)
  const author = book.metadata?.author

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-1">
          <div className="aspect-[3/4] rounded-xl overflow-hidden bg-sepia/5 shadow-md">
            {cover ? (
              <img
                src={`${cover.imgix_url}?w=800&h=1066&fit=crop&auto=format,compress`}
                alt={title}
                width={400}
                height={533}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-6xl">📖</div>
            )}
          </div>
        </div>

        <div className="md:col-span-2">
          {genre && (
            <span className="inline-block text-xs uppercase tracking-wider text-accent font-medium mb-3">
              {genre}
            </span>
          )}
          <h1 className="text-3xl md:text-4xl font-semibold text-ink mb-4" style={{ fontFamily: 'Lora, Georgia, serif' }}>
            {title}
          </h1>
          {author && (
            <Link
              href={`/authors/${author.slug}`}
              className="inline-flex items-center gap-2 text-sepia hover:text-accent transition-colors mb-6"
            >
              {author.metadata?.portrait && (
                <img
                  src={`${author.metadata.portrait.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                  alt={getMetafieldValue(author.metadata?.name) || author.title}
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full object-cover"
                />
              )}
              <span>by {getMetafieldValue(author.metadata?.name) || author.title}</span>
            </Link>
          )}
          {description && (
            <p className="text-sepia leading-relaxed text-lg">{description}</p>
          )}
        </div>
      </div>

      {/* Chapters */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-ink mb-6" style={{ fontFamily: 'Lora, Georgia, serif' }}>
          Chapters
        </h2>
        {chapters.length === 0 ? (
          <p className="text-sepia">No chapters available for this book yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {chapters.map((chapter) => (
              <ChapterCard key={chapter.id} chapter={chapter} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}