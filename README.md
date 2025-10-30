# Modern Blog Platform

![App Preview](https://imgix.cosmicjs.com/3458f1a0-b52f-11f0-84b8-c1eed342c5b6-photo-1555066931-4365d14bab8c-1761787476821.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A beautiful, modern blog platform built with Next.js 16 and powered by Cosmic CMS. Features dynamic content display, category filtering, author profiles, and markdown rendering.

## Features

- 📝 Dynamic blog post display with featured images
- 👤 Author profiles with bio and social links
- 🏷️ Category-based filtering and navigation
- 📱 Fully responsive mobile-first design
- 🎨 Modern UI with Tailwind CSS
- 🚀 Built with Next.js 16 App Router
- 🔍 SEO-optimized with dynamic metadata
- 📊 Markdown content rendering
- 🖼️ Automatic image optimization with imgix
- ⚡ Server-side rendering for optimal performance

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6902be10271316ad9f4cccd1&clone_repository=6902bffb271316ad9f4cccfa)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> Create a content model for a blog with posts, authors, and categories

### Code Generation Prompt

> Based on the content model I created for "Create a content model for a blog with posts, authors, and categories", now build a complete web application using Next.js that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- [Next.js 16](https://nextjs.org/) - React framework with App Router
- [Cosmic](https://www.cosmicjs.com) - Headless CMS for content management
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe development
- [React Markdown](https://github.com/remarkjs/react-markdown) - Markdown rendering
- [Imgix](https://www.imgix.com/) - Image optimization and delivery

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account and bucket with blog content

### Installation

1. Clone this repository
2. Install dependencies:

```bash
bun install
```

3. Create a `.env.local` file with your Cosmic credentials:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
```

4. Run the development server:

```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Cosmic SDK Examples

### Fetching All Posts

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: posts } = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a Single Post by Slug

```typescript
const { object: post } = await cosmic.objects
  .findOne({
    type: 'posts',
    slug: 'your-post-slug'
  })
  .depth(1)
```

### Filtering Posts by Category

```typescript
const { objects: posts } = await cosmic.objects
  .find({
    type: 'posts',
    'metadata.categories': categoryId
  })
  .depth(1)
```

### Fetching Author with Posts

```typescript
const { object: author } = await cosmic.objects
  .findOne({
    type: 'authors',
    slug: 'author-slug'
  })

const { objects: authorPosts } = await cosmic.objects
  .find({
    type: 'posts',
    'metadata.author': author.id
  })
  .depth(1)
```

## Cosmic CMS Integration

This application uses Cosmic's headless CMS to manage all content. The content model includes:

### Posts
- Title and slug
- Markdown content
- Featured image
- Author (object relationship)
- Categories (objects relationship)
- Excerpt

### Authors
- Name
- Bio
- Avatar image
- Twitter handle
- Website URL

### Categories
- Title and slug
- Description

All relationships are loaded using the `depth(1)` parameter for efficient data fetching. Images are automatically optimized using Cosmic's imgix integration.

## Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the button above
2. Connect your Git repository
3. Add your environment variables:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
4. Deploy!

### Environment Variables

Make sure to set these environment variables in your deployment platform:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
```

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with navigation
│   ├── page.tsx            # Home page with all posts
│   ├── posts/
│   │   └── [slug]/
│   │       └── page.tsx    # Individual post pages
│   ├── authors/
│   │   └── [slug]/
│   │       └── page.tsx    # Author profile pages
│   └── categories/
│       └── [slug]/
│           └── page.tsx    # Category filtered posts
├── components/
│   ├── Header.tsx          # Site header with navigation
│   ├── PostCard.tsx        # Post card component
│   ├── AuthorInfo.tsx      # Author information display
│   ├── CategoryBadge.tsx   # Category badge component
│   └── CosmicBadge.tsx     # "Built with Cosmic" badge
├── lib/
│   └── cosmic.ts           # Cosmic SDK configuration
└── types.ts                # TypeScript type definitions
```

## Learn More

- [Cosmic Documentation](https://www.cosmicjs.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

<!-- README_END -->