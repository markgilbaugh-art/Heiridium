import Link from 'next/link'
import { cn } from '@/lib/utils'

type Variant = 'gold' | 'outline-light' | 'outline-dark' | 'ink'

const variants: Record<Variant, string> = {
  gold: 'bg-gold text-ink hover:bg-gold-soft',
  'outline-light': 'border border-ivory/40 text-ivory hover:border-gold-soft hover:text-gold-soft',
  'outline-dark': 'border border-ink/30 text-ink hover:border-gold hover:text-gold',
  ink: 'bg-ink text-ivory hover:bg-graphite',
}

export function buttonClasses(variant: Variant = 'gold', className?: string) {
  return cn(
    'inline-flex min-h-12 items-center justify-center gap-2 px-6 py-3 text-sm font-medium tracking-wide transition-colors',
    variants[variant],
    className,
  )
}

export function ButtonLink({
  href,
  children,
  variant = 'gold',
  className,
}: {
  href: string
  children: React.ReactNode
  variant?: Variant
  className?: string
}) {
  return (
    <Link href={href} className={buttonClasses(variant, className)}>
      {children}
    </Link>
  )
}
