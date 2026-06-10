// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface CosmicImage {
  url: string;
  imgix_url: string;
}

export interface Author extends CosmicObject {
  type: 'authors';
  metadata: {
    name?: string;
    bio?: string;
    portrait?: CosmicImage;
  };
}

export interface Book extends CosmicObject {
  type: 'books';
  metadata: {
    title?: string;
    description?: string;
    cover_image?: CosmicImage;
    genre?: string;
    author?: Author;
  };
}

export interface Chapter extends CosmicObject {
  type: 'chapters';
  metadata: {
    chapter_title?: string;
    chapter_number?: number;
    excerpt?: string;
    content?: string;
    reading_time?: number;
    book?: Book;
  };
}

export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Type guards
export function isBook(obj: CosmicObject): obj is Book {
  return obj.type === 'books';
}

export function isChapter(obj: CosmicObject): obj is Chapter {
  return obj.type === 'chapters';
}

export function isAuthor(obj: CosmicObject): obj is Author {
  return obj.type === 'authors';
}