import { Suspense } from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Booking Confirmed — Christian Property Management',
  description: 'Your reservation has been confirmed.',
  robots: { index: false },
}

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <SuccessContent />
    </Suspense>
  )
}

function LoadingState() {
  return (
    <main className="min-h-screen bg-[#0A0906] flex items-center justify-center">
      <div className="w-8 h-8 border border-[#C9A650]/30 border-t-[#C9A650] rounded-full animate-spin" />
    </main>
  )
}

function SuccessContent() {
  return (
    <main className="min-h-screen bg-[#0A0906] flex items-center justify-center px-6 py-24">
      {/* Background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,166,80,0.04)_0%,_transparent_60%)]" aria-hidden />

      <div className="relative max-w-lg w-full text-center">
        {/* Check icon */}
        <div
          className="w-20 h-20 rounded-full border border-[#C9A650]/30 flex items-center justify-center mx-auto mb-10"
          style={{ background: 'radial-gradient(circle, rgba(201,166,80,0.08) 0%, transparent 70%)' }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C9A650" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 border border-[#C9A650]/20 px-4 py-2 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A650]" />
          <span className="text-[#C9A650] text-xs tracking-[0.2em] uppercase">Reservation Confirmed</span>
        </div>

        <h1
          className="text-5xl font-light text-white mb-5 leading-tight"
          style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
        >
          You&apos;re all set
        </h1>

        <p className="text-white/50 text-lg leading-relaxed mb-4 max-w-md mx-auto">
          Your booking is confirmed. A full receipt and check-in details have been sent to your email.
        </p>

        <p className="text-white/30 text-sm mb-12">
          Didn&apos;t receive an email? Check your spam folder or&nbsp;
          <a href="tel:8005550199" className="text-[#C9A650]/70 hover:text-[#C9A650] transition-colors">
            call us
          </a>.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-[#C9A650] text-black px-8 py-4 text-sm tracking-[0.2em] uppercase font-medium hover:bg-[#b8943f] transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="border border-white/10 text-white/60 px-8 py-4 text-sm tracking-[0.15em] uppercase hover:border-white/30 hover:text-white/90 transition-colors"
          >
            Contact Us
          </Link>
        </div>

        <p className="mt-16 text-white/20 text-xs tracking-wider">
          Licensed &middot; Insured &middot; CalDRE #02XXXXXX
        </p>
      </div>
    </main>
  )
}
