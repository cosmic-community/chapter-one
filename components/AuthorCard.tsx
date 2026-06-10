import Link from 'next/link'
import type { Author } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function AuthorCard({ author }: { author: Author }) {
  const portrait = author.metadata?.portrait
  const name = getMetafieldValue(author.metadata?.name) || author.title
  const bio = getMetafieldValue(author.metadata?.bio)

  return (
    <Link
      href={`/authors/${author.slug}`}
      className="group block bg-paper rounded-xl p-6 border border-sepia/10 shadow-sm hover:shadow-md transition-all duration-300 text-center"
    >
      <div className="w-24 h-24 mx-auto rounded-full overflow-hidden bg-sepia/5 mb-4">
        {portrait ? (
          <img
            src={`${portrait.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
            alt={name}
            width={96}
            height={96}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-3xl">✍️</div>
        )}
      </div>
      <h3 className="text-lg font-semibold text-ink group-hover:text-accent transition-colors" style={{ fontFamily: 'Lora, Georgia, serif' }}>
        {name}
      </h3>
      {bio && <p className="mt-2 text-sm text-sepia leading-relaxed line-clamp-3">{bio}</p>}
    </Link>
  )
}