"use client";
import Link from "next/link";
import { track } from "@vercel/analytics";
export function ConsultationLink({
  slug,
  children,
  className,
}: {
  slug: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      className={className}
      href={`/contact?source=academy&article=${encodeURIComponent(slug)}`}
      onClick={() => track("academy_consultation_click", { article: slug })}
    >
      {children}
    </Link>
  );
}
