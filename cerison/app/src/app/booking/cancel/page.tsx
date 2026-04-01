import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Booking Cancelled — Christian Property Management',
  description: 'Your reservation attempt was cancelled.',
  robots: { index: false },
}

export default function BookingCancelPage() {
  return (
    <main className="min-h-screen bg-[#0A0906] flex items-center justify-center px-6 py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,166,80,0.03)_0%,_transparent_60%)]" aria-hidden />

      <div className="relative max-w-lg w-full text-center">
        {/* X icon */}
        <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center mx-auto mb-10">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#797876" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>

        <div className="inline-flex items-center gap-2 border border-white/10 px-4 py-2 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
          <span className="text-white/40 text-xs tracking-[0.2em] uppercase">Payment Cancelled</span>
        </div>

        <h1
          className="text-5xl font-light text-white mb-5 leading-tight"
          style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
        >
          Booking not completed
        </h1>

        <p className="text-white/50 text-lg leading-relaxed mb-4 max-w-md mx-auto">
          Your payment was not processed and no reservation has been made. The dates are still available.
        </p>

        <p className="text-white/30 text-sm mb-12">
          Changed your mind? You can try again or&nbsp;
          <a href="tel:8005550199" className="text-[#C9A650]/70 hover:text-[#C9A650] transition-colors">
            speak with our team
          </a>.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/properties"
            className="bg-[#C9A650] text-black px-8 py-4 text-sm tracking-[0.2em] uppercase font-medium hover:bg-[#b8943f] transition-colors"
          >
            Browse Properties
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
