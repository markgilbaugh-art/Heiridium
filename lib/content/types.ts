import type { TopicSlug } from './topics'

export type Industry = 'hvac' | 'plumbing' | 'home-services'

export type ArticleStatus = 'draft' | 'in-review' | 'scheduled' | 'published'

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'checklist'; title: string; items: string[] }
  | { type: 'example'; title: string; text: string }
  | { type: 'callout'; text: string }

export type Person = { name: string; role: string }

export type Article = {
  slug: string
  title: string
  summary: string
  directAnswer: string
  topic: TopicSlug
  industries: Industry[]
  tags?: TopicSlug[]
  author: Person
  reviewer?: Person
  requiresProfessionalReview: boolean
  status: ArticleStatus
  publishAt: string
  revisedAt?: string
  cover?: { src: string; alt: string }
  body: Block[]
  sources?: { label: string; url: string }[]
  relatedBooks: string[]
  relatedArticles?: string[]
  week?: 1 | 2 | 3 | 4
  seo?: { title?: string; description?: string; ogImage?: string }
}
