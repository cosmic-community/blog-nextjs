// app/categories/[slug]/page.tsx
import { getCategoryBySlug, getPostsByCategory, getAllCategories } from '@/lib/cosmic'
import { Category, Post } from '@/types'
import { notFound } from 'next/navigation'
import PostCard from '@/components/PostCard'
import Link from 'next/link'

export const revalidate = 60

export async function generateStaticParams() {
  const categories = await getAllCategories() as Category[]
  
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug) as Category | null

  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }

  return {
    title: `${category.title} - Blog Categories`,
    description: category.metadata?.description || `Posts about ${category.title}`,
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug) as Category | null

  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategory(category.id) as Post[]

  return (
    <div className="container-custom py-12">
      <Link 
        href="/"
        className="inline-flex items-center text-primary hover:text-primary-dark mb-8"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Blog
      </Link>

      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">{category.title}</h1>
        {category.metadata?.description && (
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {category.metadata.description}
          </p>
        )}
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-xl text-gray-600">No posts in this category yet.</p>
        </div>
      )}
    </div>
  )
}