import { useState, useRef } from 'react'
import { NavLink, Link } from 'react-router-dom'
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from 'framer-motion'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Gallery', to: '/gallery' },
]

function Logo({ scrolled }) {
  return (
    <Link to="/" className="flex items-center gap-2 shrink-0">
      <img
        src="/logo.svg"
        alt="TAYB Logo"
        className="object-contain transition-all duration-300"
        style={{
          width: scrolled ? '70px' : '120px',
          height: scrolled ? '70px' : '120px',
          filter: scrolled ? 'none' : 'brightness(0) invert(1)'
        }}
      />
    </Link>
  )
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 60)
    if (y > lastY.current + 4 && y > 150) setHidden(true)
    else if (y < lastY.current - 4) setHidden(false)
    lastY.current = y
  })

  const activeLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-200 ${isActive
      ? scrolled ? 'text-[#f84d07]' : 'text-white font-semibold underline underline-offset-4 decoration-white/50'
      : scrolled ? 'text-gray-700 hover:text-[#f84d07]' : 'text-white/85 hover:text-white'
    }`

  const mobileActiveLinkClass = ({ isActive }) =>
    `block py-2.5 border-b border-gray-100 text-sm font-medium transition-colors ${isActive ? 'text-[#f84d07] font-semibold' : 'text-gray-800 hover:text-[#f84d07]'
    }`

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      animate={{ y: hidden ? '-100%' : '0%' }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundColor: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0)',
          backdropFilter: scrolled ? 'blur(14px)' : 'blur(0px)',
          boxShadow: scrolled ? '0 1px 24px rgba(0,0,0,0.09)' : '0 0 0 rgba(0,0,0,0)',
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />

      <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8 py-4 lg:py-5">
        <Logo scrolled={scrolled} />

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map(({ label, to }) => (
            <li key={to}>
              <NavLink to={to} end={to === '/'} className={activeLinkClass}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right */}
        <div className="flex items-center gap-3">

          <Link
            to="/contact"
            className={`hidden sm:flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${scrolled
              ? 'bg-[#f84d07] text-white hover:bg-[#d94206] shadow'
              : 'bg-white text-gray-900 hover:bg-orange-50 shadow'
              }`}
          >
            Contact Us
            <span className={`flex h-5 w-5 items-center justify-center rounded-full transition-colors duration-300 ${scrolled ? 'bg-white' : 'bg-gray-900'}`}>
              <svg className={`h-3 w-3 transition-colors duration-300 ${scrolled ? 'text-[#f84d07]' : 'text-white'}`} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </span>
          </Link>

          <button
            className={`lg:hidden p-1 transition-colors duration-200 ${scrolled ? 'text-gray-800' : 'text-white'}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.path key="close" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <motion.path key="open" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </AnimatePresence>
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden bg-white/97 backdrop-blur-xl border-t border-gray-100"
          >
            <div className="px-5 pb-6 pt-3 space-y-1">
              {navLinks.map(({ label, to }, i) => (
                <motion.div
                  key={to}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.06, duration: 0.25 }}
                >
                  <NavLink
                    to={to}
                    end={to === '/'}
                    className={mobileActiveLinkClass}
                    onClick={() => setMobileOpen(false)}
                  >
                    {label}
                  </NavLink>
                </motion.div>
              ))}
              <div className="pt-3">
                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center gap-2 rounded-full bg-[#f84d07] px-5 py-2.5 text-sm font-semibold text-white"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
