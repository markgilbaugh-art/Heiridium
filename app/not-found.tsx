import { ButtonLink } from '@/components/site/button-link'
import { Container } from '@/components/site/sections'

export default function NotFound() {
  return (
    <section className="bg-graphite py-28 text-ivory">
      <Container className="max-w-2xl text-center">
        <p className="eyebrow text-gold-soft">Page not found</p>
        <h1 className="mt-4 text-5xl font-semibold">This route is off the map</h1>
        <p className="mt-4 text-ivory/70">The page you are looking for has moved or does not exist.</p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/">Return home</ButtonLink>
          <ButtonLink href="/academy" variant="outline-light">
            Browse the Academy
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}
