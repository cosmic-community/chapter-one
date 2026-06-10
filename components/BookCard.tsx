import Link from 'next/link'
import type { Book } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function BookCard({ book }: { book: Book }) {
  const cover = book.metadata?.cover_image
  const genre = getMetafieldValue(book.metadata?.genre)
  const title = getMetafieldValue(book.metadata?.title) || book.title
  const author = book.metadata?.author

  return (
    <Link
      href={`/books/${book.slug}`}
      className="group block bg-paper rounded-xl overflow-hidden border border-sepia/10 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      <div className="aspect-[3/4] overflow-hidden bg-sepia/5">
        {cover ? (
          <img
            src={`${cover.imgix_url}?w=600&h=800&fit=crop&auto=format,compress`}
            alt={title}
            width={300}
            height={400}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl">📖</div>
        )}
      </div>
      <div className="p-5">
        {genre && (
          <span className="inline-block text-xs uppercase tracking-wider text-accent font-medium mb-2">
            {genre}
          </span>
        )}
        <h3 className="text-lg font-semibold text-ink mb-1 group-hover:text-accent transition-colors" style={{ fontFamily: 'Lora, Georgia, serif' }}>
          {title}
        </h3>
        {author && (
          <p className="text-sm text-sepia">
            by {getMetafieldValue(author.metadata?.name) || author.title}
          </p>
        )}
      </div>
    </Link>
  )
}