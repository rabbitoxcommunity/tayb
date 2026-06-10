import { motion } from 'framer-motion'
import SplitText from '../animations/SplitText'
import BlurText from '../animations/BlurText'
import RevealText from '../animations/RevealText'

const avatars = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
]

const stats = [
  { value: '50+', label: 'Project complete' },
  { value: '100+', label: 'Expert teams' },
  { value: '$3.5M', label: 'Project value' },
]

function StarRating() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.svg
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 + i * 0.08, duration: 0.3, type: 'spring', stiffness: 300 }}
          className="h-4 w-4 text-yellow-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </motion.svg>
      ))}
    </div>
  )
}

function AvatarStack() {
  return (
    <div className="flex -space-x-3">
      {avatars.map((src, i) => (
        <motion.img
          key={i}
          src={src}
          alt={`User ${i + 1}`}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
          className="h-9 w-9 rounded-full ring-2 ring-white object-cover"
        />
      ))}
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#f84d07]">
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay pointer-events-none" />

      {/* Decorative large faded text */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.2 }}
        className="absolute inset-x-0 top-0 flex justify-center pointer-events-none select-none overflow-hidden"
      >
        <span className="text-[22vw] font-black text-white/[0.06] leading-none tracking-tighter whitespace-nowrap">
          TAYB
        </span>
      </motion.div>

      {/* ── Right-aligned building image (absolute) ── */}
      <motion.img
        src="/bg.png"
        alt="Modern building"
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.25, duration: 1.2, ease: [0.215, 0.61, 0.355, 1] }}
        className="absolute right-0 bottom-0 pointer-events-none"
        style={{ height: '80vh', width: 'auto' }}
      />
      {/* White gradient — blends into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '55%',
          background: 'linear-gradient(to top, #ffffff 0%, rgba(255,255,255,0.85) 25%, rgba(255,255,255,0.4) 55%, transparent 100%)',
        }}
      />

      {/* ── Foreground content ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 pt-28 sm:pt-32 lg:pt-36 pb-0 min-h-screen flex flex-col">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between flex-1 gap-10 lg:gap-0">

          {/* Left content */}
          <div className="max-w-xl lg:pb-20 xl:pb-28">

            {/* Social proof */}
            <div className="mb-6 flex items-center gap-3">
              <AvatarStack />
              <div>
                <StarRating />
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.4 }}
                  className="text-xs text-white/80 mt-0.5 font-medium"
                >
                  Over 1k+ happy users
                </motion.p>
              </div>
            </div>

            {/* Headline — SplitText (char by char) */}
            <h1 className="text-[clamp(2.6rem,6.5vw,4.75rem)] font-black text-white leading-[1.0] tracking-tight mb-6 uppercase">
              <SplitText text="Building Strong" delay={0.15} stagger={0.032} once={false} />
              <br />
              <SplitText text="Foundation" delay={0.55} stagger={0.042} once={false} />
            </h1>

            {/* Subtitle — BlurText (word by word) */}
            <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-10 max-w-sm">
              <BlurText
                text="We deliver durable, high-quality construction services designed to meet your project goals on time."
                delay={0.9}
                stagger={0.055}
                duration={0.6}
                once={false}
              />
            </p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
            >
              <a
                href="#"
                className="inline-flex items-center gap-3 rounded-full bg-[#f84d07] border-2 border-white/30 px-6 sm:px-7 py-3 sm:py-3.5 text-sm font-semibold text-white hover:bg-white hover:text-[#f84d07] hover:border-[#f84d07] transition-all duration-200 shadow-lg group"
              >
                Explore Service
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white group-hover:bg-[#f84d07] transition-colors">
                  <svg
                    className="h-3.5 w-3.5 text-[#f84d07] group-hover:text-white transition-colors"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </span>
              </a>
            </motion.div>
          </div>

          {/* Right: stats only */}
          <div className="relative flex flex-col items-start lg:items-end lg:pb-20 xl:pb-28">
            <div className="flex gap-8 sm:gap-10 lg:gap-14">
              {stats.map(({ value, label }, i) => (
                <div key={label}>
                  <p className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#f84d07]">
                    <RevealText delay={0.5 + i * 0.14}>{value}</RevealText>
                  </p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.0 + i * 0.14, duration: 0.5 }}
                    className="text-xs sm:text-sm text-[#f84d07] mt-1 font-medium"
                  >
                    {label}
                  </motion.p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
