import { Link } from 'react-router-dom'

const links = {
  Company: [
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about' },
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
  Projects: [
    { label: 'All Projects', to: '/projects' },
    { label: 'Residential', to: '/projects' },
    { label: 'Commercial', to: '/projects' },
    { label: 'Infrastructure', to: '/projects' },
    { label: 'Renovation', to: '/projects' },
  ],
}

const socials = [
  {
    name: 'LinkedIn',
    href: '#',
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'Twitter / X',
    href: '#',
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: '#',
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: '#',
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand */}
        <div className="lg:col-span-2">
          <Link to="/" className="flex items-center gap-2 mb-5">
            <span className="flex h-7 w-7 items-center justify-center rounded bg-[#f84d07]">
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                <polygon points="12,2 22,12 12,22 2,12" fill="white" />
                <polygon points="12,6 18,12 12,18 6,12" fill="#f84d07" />
              </svg>
            </span>
            <span className="text-xl font-bold text-white tracking-tight">BuildLine</span>
          </Link>
          <p className="text-sm leading-relaxed mb-6 max-w-xs">
            Global construction partner delivering durable, high-quality builds that stand the test of time.
          </p>

          {/* Newsletter */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex rounded-xl overflow-hidden border border-gray-700 max-w-xs"
          >
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 bg-transparent px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none min-w-0"
            />
            <button
              type="submit"
              className="shrink-0 bg-[#f84d07] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#d94206] transition-colors"
            >
              Subscribe
            </button>
          </form>
          <p className="text-xs mt-2 text-gray-600">Stay updated with our latest projects and news.</p>
        </div>

        {/* Nav columns */}
        {Object.entries(links).map(([group, items]) => (
          <div key={group}>
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-4">{group}</h4>
            <ul className="space-y-2.5">
              {items.map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="text-sm hover:text-[#f84d07] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} BuildLine Construction. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                aria-label={s.name}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-700 text-gray-500 hover:border-[#f84d07] hover:text-[#f84d07] transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>
          <div className="flex gap-4 text-xs text-gray-600">
            <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
