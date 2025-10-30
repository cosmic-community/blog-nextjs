'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Category } from '@/types'

interface CategoryFilterProps {
  categories: Category[];
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const pathname = usePathname()

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <Link
        href="/"
        className={`px-4 py-2 rounded-full font-medium transition-colors ${
          pathname === '/'
            ? 'bg-primary text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        All Posts
      </Link>
      
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/categories/${category.slug}`}
          className={`px-4 py-2 rounded-full font-medium transition-colors ${
            pathname === `/categories/${category.slug}`
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {category.title}
        </Link>
      ))}
    </div>
  )
}