import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Logo({ className, tone = 'light' }: { className?: string; tone?: 'light' | 'dark' }) {
  return (
    <Link href="/" className={cn('flex items-center gap-3', className)} aria-label="Heiridium home">
      <Image
        src="/images/compass.png"
        alt=""
        width={40}
        height={40}
        className="size-10 rounded-full"
        priority
      />
      <span
        className={cn(
          'font-serif text-xl font-semibold tracking-[0.28em]',
          tone === 'light' ? 'text-ivory' : 'text-ink',
        )}
      >
        HEIRIDIUM
      </span>
    </Link>
  )
}
