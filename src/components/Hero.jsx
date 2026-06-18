import { motion } from 'framer-motion'
import SplitText from '../animations/SplitText'
import BlurText from '../animations/BlurText'
import RevealText from '../animations/RevealText'

const stats = [
  { value: '79', label: 'Lotus units' },
  { value: '200+', label: 'Labour force' },
  { value: 'AED 15M', label: 'Turnover target' },
]


export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source
          src="https://www.pexels.com/download/video/27607592/"
          type="video/mp4"
        />
      </video>

      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/30" />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay pointer-events-none opacity-20" />

      {/* Black gradient overlay */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '55%',
          background: 'linear-gradient(to top, #000000 0%, rgba(0,0,0,0.85) 25%, rgba(0,0,0,0.4) 55%, transparent 100%)',
        }}
      />

      {/* ── Foreground content ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 pt-28 sm:pt-32 lg:pt-36 pb-0 min-h-screen flex flex-col">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between flex-1 gap-10 lg:gap-0">

          {/* Left content */}
          <div className="max-w-2xl lg:pb-20 xl:pb-28">

            {/* Headline — SplitText (char by char) */}
            <h1 className="text-[clamp(2.6rem,6.5vw,4.75rem)] font-black text-white leading-[1.0] tracking-tight mb-6 uppercase">
              <SplitText text="Building Strong" delay={0.15} stagger={0.032} once={false} />
              <br />
              <SplitText text="Foundation" delay={0.55} stagger={0.042} once={false} />
            </h1>

            {/* Subtitle — BlurText (word by word) */}
            <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-10 max-w-lg">
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
