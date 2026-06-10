# Chapter One

![App Preview](https://imgix.cosmicjs.com/c72de150-649a-11f1-90e0-f3b2a742330f-autopilot-photo-1474487548417-781cb71495f3-1781075135450.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A beautiful, modern reading platform for discovering books, authors, and chapters. Built with Next.js and powered by [Cosmic](https://www.cosmicjs.com), Chapter One offers an immersive reading experience with elegant typography and a calm, literary aesthetic.

## Features

- 📚 **Book Library** — Browse a curated collection of books with cover art, genres, and descriptions
- 📖 **Chapter Reader** — Distraction-free reading experience with reading time estimates
- ✍️ **Author Profiles** — Discover the writers behind the stories with bios and portraits
- 🎨 **Beautiful, Responsive Design** — Elegant typography and a warm, literary theme that works on any device
- ⚡ **Fast & SEO-Optimized** — Server-rendered pages powered by Next.js App Router
- 🔗 **Fully Dynamic** — All content driven by your Cosmic bucket

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a290c81ffa7d774497ee263&clone_repository=6a290d5effa7d774497ee285)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for: # Chapter One
>
> ## The Return
>
> My mother died on a Tuesday afternoon. The doctor said it gently, as though softness could somehow alter reality. As though death, hearing kindness in his voice, might reconsider and leave. It didn't. Three weeks later, I was sitting on a train heading back to the town I had spent ten years trying to escape..."

### Code Generation Prompt

> Build a Next.js application for a website called "Chapter One". The content is managed in Cosmic CMS with the following object types: authors, books, chapters. Create a beautiful, modern, responsive design with a homepage and pages for each content type.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- [Next.js 16](https://nextjs.org) — App Router architecture
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Cosmic](https://www.cosmicjs.com/docs) — Headless CMS

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) or Node.js 18+
- A Cosmic account with a bucket containing `authors`, `books`, and `chapters` object types

### Installation

1. Clone this repository
2. Install dependencies:

```bash
bun install
```

3. Set the following environment variables (provided automatically when cloning in Cosmic):

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:

```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Cosmic SDK Examples

```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch all books with their authors (depth 1 includes connected objects)
const { objects: books } = await cosmic.objects
  .find({ type: 'books' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Fetch a single chapter with its book
const { object: chapter } = await cosmic.objects
  .findOne({ type: 'chapters', slug: 'the-return' })
  .depth(1)

// Fetch chapters for a specific book by ID
const { objects: chapters } = await cosmic.objects
  .find({ type: 'chapters', 'metadata.book': bookId })
  .depth(1)
```

## Cosmic CMS Integration

This application leverages three connected content types from your Cosmic bucket:

- **Authors** — `name`, `bio`, `portrait`
- **Books** — `title`, `description`, `cover_image`, `genre`, `author` (connected to Authors)
- **Chapters** — `chapter_title`, `chapter_number`, `excerpt`, `content`, `reading_time`, `book` (connected to Books)

All data fetching happens server-side using the [Cosmic SDK](https://www.cosmicjs.com/docs) with the `depth` parameter to resolve connected objects in a single query.

## Deployment Options

### Vercel

1. Push your code to a Git repository
2. Import the project into [Vercel](https://vercel.com)
3. Add the `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, and `COSMIC_WRITE_KEY` environment variables
4. Deploy

### Netlify

1. Push your code to a Git repository
2. Import the project into [Netlify](https://netlify.com)
3. Add environment variables in Site Settings
4. Deploy
<!-- README_END -->