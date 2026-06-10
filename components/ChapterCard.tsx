import Link from 'next/link'
import type { Chapter } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function ChapterCard({ chapter }: { chapter: Chapter }) {
  const chapterTitle = getMetafieldValue(chapter.metadata?.chapter_title) || chapter.title
  const number = chapter.metadata?.chapter_number
  const excerpt = getMetafieldValue(chapter.metadata?.excerpt)
  const readingTime = chapter.metadata?.reading_time
  const book = chapter.metadata?.book

  return (
    <Link
      href={`/chapters/${chapter.slug}`}
      className="group block bg-paper rounded-xl p-6 border border-sepia/10 shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-3">
        {number !== undefined && number !== null && (
          <span className="flex-shrink-0 w-9 h-9 rounded-full bg-accent/10 text-accent flex items-center justify-center text-sm font-semibold">
            {number}
          </span>
        )}
        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-ink group-hover:text-accent transition-colors truncate" style={{ fontFamily: 'Lora, Georgia, serif' }}>
            {chapterTitle}
          </h3>
          {book && (
            <p className="text-xs text-sepia truncate">
              {getMetafieldValue(book.metadata?.title) || book.title}
            </p>
          )}
        </div>
      </div>
      {excerpt && (
        <p className="text-sm text-sepia leading-relaxed line-clamp-3">{excerpt}</p>
      )}
      {readingTime !== undefined && readingTime !== null && (
        <p className="mt-4 text-xs text-sepia/70">{readingTime} min read</p>
      )}
    </Link>
  )
}