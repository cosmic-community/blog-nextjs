import Link from 'next/link'
import { Category } from '@/types'

interface CategoryBadgeProps {
  category: Category;
}

export default function CategoryBadge({ category }: CategoryBadgeProps) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full hover:bg-primary hover:text-white transition-colors"
    >
      {category.title}
    </Link>
  )
}