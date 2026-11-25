import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { accentClasses, type Book } from '@/lib/content/books'
import { cn } from '@/lib/utils'

export function BookCover({ book, className, priority }: { book: Book; className?: string; priority?: boolean }) {
  return (
    <Image
      src={book.cover}
      alt={book.coverAlt}
      width={430}
      height={754}
      priority={priority}
      sizes="(min-width: 1024px) 22vw, (min-width: 640px) 40vw, 80vw"
      className={cn('h-auto w-full shadow-[0_24px_48px_-16px_rgba(0,0,0,0.6)]', className)}
    />
  )
}

export function BookCard({ book, tone = 'dark' }: { book: Book; tone?: 'dark' | 'light' }) {
  const accent = accentClasses[book.accent]
  return (
    <article className="group flex flex-col">
      <Link href={`/books/${book.slug}`} className="block" tabIndex={-1} aria-hidden="true">
        <BookCover book={book} className="transition-transform duration-300 group-hover:-translate-y-1" />
      </Link>
      <div className={cn('mt-6 border-t-2 pt-4', accent.border)}>
        <p className={cn('eyebrow', tone === 'light' ? 'text-gold-soft' : 'text-gold')}>{`Book ${book.numeral}`}</p>
        <h3 className={cn('mt-2 text-2xl font-semibold', tone === 'light' ? 'text-ivory' : 'text-ink')}>
          <Link href={`/books/${book.slug}`} className="hover:underline">
            {book.title}
          </Link>
        </h3>
        <p className={cn('mt-2 text-base', tone === 'light' ? 'text-ivory/70' : 'text-muted-foreground')}>
          {book.tagline}
        </p>
        <Link
          href={`/books/${book.slug}`}
          className={cn(
            'mt-4 inline-flex items-center gap-2 text-sm font-medium',
            tone === 'light' ? 'text-gold-soft' : 'text-ink',
          )}
        >
          {`Read about Book ${book.numeral}`}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}
