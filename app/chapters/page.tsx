import { getChapters } from '@/lib/cosmic'
import ChapterCard from '@/components/ChapterCard'

export const metadata = {
  title: 'Chapters — Chapter One',
  description: 'Read chapters from our collection of books.',
}

export default async function ChaptersPage() {
  const chapters = await getChapters()

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <header className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold text-ink mb-3" style={{ fontFamily: 'Lora, Georgia, serif' }}>
          All Chapters
        </h1>
        <p className="text-sepia">Dive into individual chapters from across our library.</p>
      </header>

      {chapters.length === 0 ? (
        <p className="text-center text-sepia py-20">No chapters available yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {chapters.map((chapter) => (
            <ChapterCard key={chapter.id} chapter={chapter} />
          ))}
        </div>
      )}
    </div>
  )
}