import { Link } from 'react-router-dom'

const nav = {
  Company: [
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about' },
    { label: 'Projects', to: '/projects' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'Contact', to: '/contact' },
  ],
  Services: [
    { label: 'Building Construction', to: '/contact' },
    { label: 'Renovation', to: '/contact' },
    { label: 'Interior Design', to: '/contact' },
    { label: 'Project Management', to: '/contact' },
    { label: 'Land Survey', to: '/contact' },
  ],
}

const socials = [
  {
    name: 'Instagram',
    href: '#',
    icon: (
      <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: '#',
    icon: (
      <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'Twitter / X',
    href: '#',
    icon: (
      <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="bg-white text-gray-900">

      {/* Orange top rule */}
      <div className="h-[1px] bg-[#e3e3e3]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Row 1 — Brand + contact info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-14 border-b border-gray-100">
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <img src="/logo.svg" alt="TayB Logo" className="w-28 object-contain" />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Global construction partner delivering durable, high-quality builds across 12 countries since 2009.
            </p>
          </div>

          <div className="flex flex-col gap-6 lg:items-end">
            <div className="grid grid-cols-2 gap-6 lg:gap-16 w-full lg:max-w-md">
              <div>
                <p className="text-[10px] font-bold tracking-[0.24em] uppercase text-[#f84d07] mb-3">
                  Location
                </p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Tayb Contracting L.L.C. <br />
                  Office No: 207, 2nd Floor,<br />
                  The Light 1 Commercial Towers,<br />
                  Arjan, Dubai, UAE
                </p>
              </div>
              <div className="flex flex-col gap-6">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.24em] uppercase text-[#f84d07] mb-3">
                    Contact
                  </p>
                  <p className="text-sm text-gray-500 leading-relaxed font-mono">
                    taybcontracting@gmail.com<br />
                    (04) 575 9029<br />
                    +971 54 756 6000
                  </p>
                </div>

                {/* Social icons */}
                <div className="flex flex-col gap-2.5">
                  <p className="text-[10px] font-bold tracking-[0.24em] uppercase text-[#f84d07]">
                    Follow Us
                  </p>
                  <div className="flex items-center gap-2">
                    {socials.map((s) => (
                      <a
                        key={s.name}
                        href={s.href}
                        aria-label={s.name}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:text-white hover:bg-[#f84d07] border border-gray-100 transition-all duration-300"
                      >
                        {s.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2 — Nav columns */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-12 border-b border-gray-100">
          {Object.entries(nav).map(([group, items]) => (
            <div key={group}>
              <p className="text-[10px] font-bold tracking-[0.24em] uppercase text-[#f84d07] mb-5">
                {group}
              </p>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Start a project */}
          <div className="col-span-2">
            <p className="text-[10px] font-bold tracking-[0.24em] uppercase text-[#f84d07] mb-5">
              Ready to Build?
            </p>
            <p className="text-sm text-gray-400 leading-relaxed mb-5 max-w-xs">
              Tell us about your project and we'll get back to you within 24 hours.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 border-b border-[#f84d07] pb-0.5 hover:text-[#f84d07] transition-colors"
            >
              Start a conversation
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Row 3 — Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-5">
          <p className="text-xs text-gray-400 uppercase tracking-widest">
            © {new Date().getFullYear()} Tayb Contracting L.L.C.
          </p>

          <div className="text-xs text-gray-400 uppercase tracking-widest">
            Designed by{' '}
            <a
              href="https://www.instagram.com/rabbitoxcommunity/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 transition-colors font-semibold"
            >
              Rabbitox Community
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}
