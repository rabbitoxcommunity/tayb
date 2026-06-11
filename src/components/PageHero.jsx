import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SplitText from '../animations/SplitText'
import BlurText from '../animations/BlurText'

export default function PageHero({ label, title, subtitle, image, breadcrumb }) {
  return (
    <section className="relative min-h-[52vh] flex items-end overflow-hidden hero-gradient">
      {/* Optional background image */}
      {image && (
        <motion.img
          src={image}
          alt=""
          aria-hidden="true"
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.18 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 pt-36 pb-14 w-full">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="flex items-center gap-2 text-xs text-white/60 mb-5 font-medium"
        >
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white/90">{breadcrumb || title}</span>
        </motion.nav>

        {/* Label */}
        {label && (
          <p className="text-sm font-semibold tracking-widest uppercase text-white/60 mb-3">
            {label}
          </p>
        )}

        {/* Title */}
        <h1 className="text-[clamp(2.4rem,6vw,4.5rem)] font-black text-white leading-tight uppercase mb-4">
          <SplitText text={title} delay={0.15} stagger={0.03} once={false} />
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-white/70 text-base sm:text-lg max-w-xl leading-relaxed">
            <BlurText text={subtitle} delay={0.6} stagger={0.045} once={false} />
          </p>
        )}
      </div>
    </section>
  )
}
