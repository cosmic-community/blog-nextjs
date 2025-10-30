// app/authors/[slug]/page.tsx
import { getAuthorBySlug, getPostsByAuthor } from '@/lib/cosmic'
import { Author, Post } from '@/types'
import { notFound } from 'next/navigation'
import PostCard from '@/components/PostCard'
import Link from 'next/link'

export const revalidate = 60

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug) as Author | null

  if (!author) {
    return {
      title: 'Author Not Found',
    }
  }

  return {
    title: `${author.metadata.name} - Author`,
    description: author.metadata?.bio || `Posts by ${author.metadata.name}`,
  }
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug) as Author | null

  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthor(author.id) as Post[]
  const avatar = author.metadata?.avatar

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

      <div className="max-w-4xl mx-auto mb-12">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {avatar && (
            <img
              src={`${avatar.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
              alt={author.metadata.name}
              width={200}
              height={200}
              className="rounded-full w-32 h-32 md:w-48 md:h-48 object-cover"
            />
          )}
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{author.metadata.name}</h1>
            
            {author.metadata?.bio && (
              <p className="text-lg text-gray-600 mb-6">{author.metadata.bio}</p>
            )}
            
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              {author.metadata?.twitter && (
                <a
                  href={`https://twitter.com/${author.metadata.twitter.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-dark flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                  </svg>
                  Twitter
                </a>
              )}
              
              {author.metadata?.website && (
                <a
                  href={author.metadata.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-dark flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  Website
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-8">Posts by {author.metadata.name}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">No posts yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}