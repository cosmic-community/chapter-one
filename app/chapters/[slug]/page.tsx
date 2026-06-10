// app/chapters/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getChapter, getMetafieldValue } from '@/lib/cosmic'

export default async function ChapterDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const chapter = await getChapter(slug)

  if (!chapter) {
    notFound()
  }

  const chapterTitle = getMetafieldValue(chapter.metadata?.chapter_title) || chapter.title
  const number = chapter.metadata?.chapter_number
  const content = getMetafieldValue(chapter.metadata?.content)
  const readingTime = chapter.metadata?.reading_time
  const book = chapter.metadata?.book

  return (
    <article className="max-w-prose mx-auto px-6 py-12">
      {book && (
        <Link
          href={`/books/${book.slug}`}
          className="inline-block text-sm text-accent hover:text-accent-dark font-medium mb-6"
        >
          ← {getMetafieldValue(book.metadata?.title) || book.title}
        </Link>
      )}

      <header className="mb-10 text-center border-b border-sepia/15 pb-8">
        {number !== undefined && number !== null && (
          <p className="text-sm uppercase tracking-widest text-accent font-medium mb-3">
            Chapter {number}
          </p>
        )}
        <h1 className="text-3xl md:text-4xl font-semibold text-ink leading-tight" style={{ fontFamily: 'Lora, Georgia, serif' }}>
          {chapterTitle}
        </h1>
        {readingTime !== undefined && readingTime !== null && (
          <p className="mt-4 text-sm text-sepia/70">{readingTime} min read</p>
        )}
      </header>

      {content ? (
        <div
          className="reading-content text-lg text-ink/90 leading-relaxed"
          style={{ fontFamily: 'Lora, Georgia, serif' }}
        >
          {content.split('\n').filter((line) => line.trim() !== '').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      ) : (
        <p className="text-sepia text-center py-12">This chapter has no content yet.</p>
      )}
    </article>
  )
}