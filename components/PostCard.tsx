import Link from 'next/link'
import { Post } from '@/types'
import CategoryBadge from './CategoryBadge'

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const featuredImage = post.metadata?.featured_image
  const author = post.metadata?.author
  const categories = post.metadata?.categories || []
  const excerpt = post.metadata?.excerpt

  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
      {featuredImage && (
        <Link href={`/posts/${post.slug}`} className="block overflow-hidden">
          <img
            src={`${featuredImage.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`}
            alt={post.title}
            width={400}
            height={200}
            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
          />
        </Link>
      )}
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex flex-wrap gap-2 mb-3">
          {categories.map((category) => (
            <CategoryBadge key={category.id} category={category} />
          ))}
        </div>
        
        <Link href={`/posts/${post.slug}`}>
          <h2 className="text-2xl font-bold mb-3 hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h2>
        </Link>
        
        {excerpt && (
          <p className="text-gray-600 mb-4 flex-1 line-clamp-3">{excerpt}</p>
        )}
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200">
          {author && (
            <Link 
              href={`/authors/${author.slug}`}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              {author.metadata?.avatar && (
                <img
                  src={`${author.metadata.avatar.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                  alt={author.metadata.name}
                  width={40}
                  height={40}
                  className="rounded-full w-10 h-10 object-cover"
                />
              )}
              <span className="font-medium text-gray-900">{author.metadata.name}</span>
            </Link>
          )}
          
          <Link
            href={`/posts/${post.slug}`}
            className="text-primary hover:text-primary-dark font-medium"
          >
            Read more →
          </Link>
        </div>
      </div>
    </article>
  )
}