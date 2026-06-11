import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SplitText from '../animations/SplitText'
import BlurText from '../animations/BlurText'

export default function PageHero({ label, title, subtitle, breadcrumb }) {
  return (
    <section className="relative pt-36 pb-16 lg:pt-44 lg:pb-20 overflow-hidden" style={{ background: 'linear-gradient(to right, #f84d07, #ffa881)' }}>
      {/* Texture overlay */}
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* Top row — breadcrumb + label */}
        <div className="flex items-center justify-between mb-12">
          <motion.nav
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-[10px] font-bold tracking-[0.24em] uppercase text-white/50"
          >
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>—</span>
            <span className="text-white/80">{breadcrumb || title}</span>
          </motion.nav>

          {label && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="text-[10px] font-bold tracking-[0.28em] uppercase text-white/60"
            >
              {label}
            </motion.p>
          )}
        </div>

        {/* Heading */}
        <h1 className="text-[clamp(3rem,8vw,6rem)] font-black text-white leading-[1.0] uppercase tracking-tight mb-8">
          <SplitText text={title} delay={0.15} stagger={0.03} once={false} />
        </h1>

        {/* Bottom row — subtitle + rule */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          {subtitle && (
            <p className="text-sm text-white/70 leading-relaxed max-w-md">
              <BlurText text={subtitle} delay={0.55} stagger={0.03} once={false} />
            </p>
          )}

          {/* Rule */}
          <div className="flex items-center gap-0 sm:min-w-[160px]">
            <div className="h-[2px] w-8 bg-white/40" />
            <div className="h-[2px] flex-1 bg-white/10" />
          </div>
        </div>

      </div>
      {/* Texture overlay — right side only */}
      <img
        src="/overlay.webp"
        alt=""
        className="absolute bottom-0 right-0 h-full w-[60%] object-contain object-right object-bottom pointer-events-none"
        style={{ mixBlendMode: 'overlay' }}
      />
    </section>
  )
}

