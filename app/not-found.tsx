import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-prose mx-auto px-6 py-32 text-center">
      <span className="text-5xl mb-6 inline-block">📖</span>
      <h1 className="text-3xl font-semibold text-ink mb-4" style={{ fontFamily: 'Lora, Georgia, serif' }}>
        Page Not Found
      </h1>
      <p className="text-sepia mb-8">
        The page you&apos;re looking for seems to have turned to a blank page.
      </p>
      <Link
        href="/"
        className="inline-block px-6 py-3 rounded-full bg-accent text-white font-medium hover:bg-accent-dark transition-colors"
      >
        Return Home
      </Link>
    </div>
  )
}