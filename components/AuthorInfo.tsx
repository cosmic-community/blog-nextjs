import Link from 'next/link'
import { Author } from '@/types'

interface AuthorInfoProps {
  author: Author;
  showBio?: boolean;
}

export default function AuthorInfo({ author, showBio = false }: AuthorInfoProps) {
  const avatar = author.metadata?.avatar

  return (
    <Link 
      href={`/authors/${author.slug}`}
      className="flex items-center gap-4 hover:opacity-80 transition-opacity"
    >
      {avatar && (
        <img
          src={`${avatar.imgix_url}?w=120&h=120&fit=crop&auto=format,compress`}
          alt={author.metadata.name}
          width={60}
          height={60}
          className="rounded-full w-12 h-12 md:w-16 md:h-16 object-cover"
        />
      )}
      
      <div>
        <p className="font-semibold text-lg">{author.metadata.name}</p>
        {showBio && author.metadata?.bio && (
          <p className="text-gray-600 mt-1">{author.metadata.bio}</p>
        )}
      </div>
    </Link>
  )
}