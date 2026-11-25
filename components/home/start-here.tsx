'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type Path = {
  id: string
  situation: string
  book: { numeral: string; title: string; slug: string; cover: string }
  service: { label: string; href: string }
  guide: { label: string; href: string }
  why: string
}

export function StartHere({ paths }: { paths: Path[] }) {
  const [activeId, setActiveId] = useState(paths[0].id)
  const active = paths.find((p) => p.id === activeId) ?? paths[0]

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
      <fieldset>
        <legend className="eyebrow mb-5 text-muted-foreground">Which sounds most like you?</legend>
        <div className="flex flex-col gap-3">
          {paths.map((p) => (
            <label
              key={p.id}
              className={cn(
                'flex min-h-16 cursor-pointer items-center gap-4 border px-5 py-4 text-lg transition-colors',
                p.id === activeId ? 'border-ink bg-ink text-ivory' : 'border-border bg-card text-ink hover:border-ink/40',
              )}
            >
              <input
                type="radio"
                name="situation"
                value={p.id}
                checked={p.id === activeId}
                onChange={() => setActiveId(p.id)}
                className="size-4 accent-[var(--gold)]"
              />
              {p.situation}
            </label>
          ))}
        </div>
      </fieldset>

      <div aria-live="polite" className="flex flex-col gap-8 border border-border bg-card p-8 sm:flex-row">
        <Image
          src={active.book.cover}
          alt={`Cover of ${active.book.title}`}
          width={430}
          height={754}
          className="h-auto w-36 shrink-0 self-start shadow-xl sm:w-44"
        />
        <div className="flex flex-col">
          <p className="eyebrow text-gold">{`Start with Book ${active.book.numeral}`}</p>
          <h3 className="mt-2 text-3xl font-semibold text-ink">{active.book.title}</h3>
          <p className="mt-3 text-muted-foreground">{active.why}</p>
          <ul className="mt-6 flex flex-col gap-3 text-base">
            <li>
              <Link href={`/books/${active.book.slug}`} className="inline-flex items-center gap-2 font-medium text-ink hover:text-gold">
                {`About Book ${active.book.numeral}`}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </li>
            <li>
              <Link href={active.service.href} className="inline-flex items-center gap-2 font-medium text-ink hover:text-gold">
                {active.service.label}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </li>
            <li>
              <Link href={active.guide.href} className="inline-flex items-center gap-2 font-medium text-ink hover:text-gold">
                {`Read: ${active.guide.label}`}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
