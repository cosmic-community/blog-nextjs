// app/posts/[slug]/page.tsx
import { getPostBySlug, getAllPosts } from '@/lib/cosmic'
import { Post } from '@/types'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import AuthorInfo from '@/components/AuthorInfo'
import CategoryBadge from '@/components/CategoryBadge'
import Link from 'next/link'

export const revalidate = 60

export async function generateStaticParams() {
  const posts = await getAllPosts() as Post[]
  
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug) as Post | null

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    description: post.metadata?.excerpt || 'Read this article on our blog',
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug) as Post | null

  if (!post) {
    notFound()
  }

  const categories = post.metadata?.categories || []
  const author = post.metadata?.author
  const featuredImage = post.metadata?.featured_image

  return (
    <article className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/"
          className="inline-flex items-center text-primary hover:text-primary-dark mb-8"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Blog
        </Link>

        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((category) => (
              <CategoryBadge key={category.id} category={category} />
            ))}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
          
          {post.metadata?.excerpt && (
            <p className="text-xl text-gray-600 mb-6">{post.metadata.excerpt}</p>
          )}

          {author && <AuthorInfo author={author} />}
        </header>

        {featuredImage && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img
              src={`${featuredImage.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
              alt={post.title}
              width={1200}
              height={600}
              className="w-full h-auto"
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none markdown-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.metadata.content}
          </ReactMarkdown>
        </div>

        {author && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-2xl font-bold mb-4">About the Author</h3>
            <AuthorInfo author={author} showBio />
          </div>
        )}
      </div>
    </article>
  )
}