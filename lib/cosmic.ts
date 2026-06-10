import { createBucketClient } from '@cosmicjs/sdk'
import type { Author, Book, Chapter } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Simple error helper for Cosmic SDK
export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

// Safely render metafield values that might be objects
export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') return String(field)
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}

export async function getBooks(): Promise<Book[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'books' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    return response.objects as Book[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch books')
  }
}

export async function getBook(slug: string): Promise<Book | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'books', slug })
      .depth(1)
    return response.object as Book
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch book')
  }
}

export async function getChapters(): Promise<Chapter[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'chapters' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    const chapters = response.objects as Chapter[]
    return chapters.sort((a, b) => {
      const numA = a.metadata?.chapter_number ?? 0
      const numB = b.metadata?.chapter_number ?? 0
      return numA - numB
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch chapters')
  }
}

export async function getChapter(slug: string): Promise<Chapter | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'chapters', slug })
      .depth(1)
    return response.object as Chapter
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch chapter')
  }
}

export async function getChaptersByBook(bookId: string): Promise<Chapter[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'chapters', 'metadata.book': bookId })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    const chapters = response.objects as Chapter[]
    return chapters.sort((a, b) => {
      const numA = a.metadata?.chapter_number ?? 0
      const numB = b.metadata?.chapter_number ?? 0
      return numA - numB
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch chapters by book')
  }
}

export async function getAuthors(): Promise<Author[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'authors' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    return response.objects as Author[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch authors')
  }
}

export async function getAuthor(slug: string): Promise<Author | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'authors', slug })
      .depth(1)
    return response.object as Author
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch author')
  }
}

export async function getBooksByAuthor(authorId: string): Promise<Book[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'books', 'metadata.author': authorId })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    return response.objects as Book[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch books by author')
  }
}