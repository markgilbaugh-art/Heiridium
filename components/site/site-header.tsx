'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'
import { CONSULT_CTA, mainNav } from '@/lib/site'
import { cn } from '@/lib/utils'
import { Logo } from './logo'
import { buttonClasses } from './button-link'

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href.split('/').slice(0, 2).join('/'))

  return (
    <header className="sticky top-0 z-40 border-b border-ivory/10 bg-ink/95 text-ivory backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-5 lg:px-8">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-sm">
            {mainNav.map((item) =>
              'children' in item ? (
                <li key={item.label} className="group relative">
                  <button
                    type="button"
                    className={cn(
                      'flex items-center gap-1 py-2 transition-colors hover:text-gold-soft',
                      pathname.startsWith('/industries') && 'text-gold-soft',
                    )}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <ChevronDown className="size-3.5" aria-hidden="true" />
                  </button>
                  <ul className="invisible absolute left-1/2 top-full w-56 -translate-x-1/2 border border-ivory/10 bg-ink py-2 opacity-0 shadow-xl transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="block px-5 py-2.5 hover:bg-ivory/5 hover:text-gold-soft"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'py-2 transition-colors hover:text-gold-soft',
                      isActive(item.href) && 'text-gold-soft',
                    )}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link href={CONSULT_CTA.href} className={buttonClasses('gold', 'hidden md:inline-flex')}>
            {CONSULT_CTA.label}
          </Link>
          <button
            type="button"
            className="inline-flex size-12 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-ivory/10 bg-ink lg:hidden">
          <ul className="flex flex-col px-5 py-4 text-lg">
            {mainNav.map((item) =>
              'children' in item ? (
                <li key={item.label} className="py-2">
                  <span className="eyebrow text-ivory/60">{item.label}</span>
                  <ul className="mt-1">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link href={child.href} className="block py-2 pl-3 hover:text-gold-soft">
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.href}>
                  <Link href={item.href} className="block py-3 hover:text-gold-soft">
                    {item.label}
                  </Link>
                </li>
              ),
            )}
            <li className="pt-4">
              <Link href={CONSULT_CTA.href} className={buttonClasses('gold', 'w-full')}>
                {CONSULT_CTA.label}
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
