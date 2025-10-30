import Link from 'next/link'
import { getAllCategories } from '@/lib/cosmic'
import { Category } from '@/types'

export default async function Header() {
  const categories = await getAllCategories() as Category[]

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <nav className="container-custom py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-primary transition-colors">
            Modern Blog
          </Link>
          
          <div className="flex items-center gap-6">
            <Link 
              href="/" 
              className="text-gray-600 hover:text-primary transition-colors font-medium"
            >
              All Posts
            </Link>
            
            {categories.slice(0, 3).map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="hidden md:block text-gray-600 hover:text-primary transition-colors font-medium"
              >
                {category.title}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}