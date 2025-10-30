import { getAllPosts, getAllCategories } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import CategoryFilter from '@/components/CategoryFilter'
import { Post, Category } from '@/types'

export const revalidate = 60

export default async function HomePage() {
  const posts = await getAllPosts() as Post[]
  const categories = await getAllCategories() as Category[]

  return (
    <div className="container-custom py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">Welcome to Our Blog</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover insights, stories, and ideas from our talented writers
        </p>
      </div>

      <CategoryFilter categories={categories} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-xl text-gray-600">No posts found. Check back soon!</p>
        </div>
      )}
    </div>
  )
}