import { motion } from 'framer-motion'
import SplitText from '../animations/SplitText'
import BlurText from '../animations/BlurText'
import RevealText from '../animations/RevealText'

const milestones = [
  { year: '2009', event: 'Founded in Dubai with a 5-person team' },
  { year: '2014', event: 'Expanded to Europe — first London project delivered' },
  { year: '2019', event: 'Achieved ISO 9001 & LEED accreditation' },
  { year: '2024', event: '50+ projects completed across 12 countries' },
]

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-8%' },
    transition: { duration: 0.6, delay, ease: [0.215, 0.61, 0.355, 1] },
  }
}

export default function About() {
  return (
    <section className="bg-white py-20 lg:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* Section label — RevealText */}
        <div className="mb-4">
          <RevealText>
            <p className="text-sm font-semibold tracking-widest uppercase text-[#f84d07]">
              Who We Are
            </p>
          </RevealText>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">

          {/* Left */}
          <div>
            {/* Heading — SplitText */}
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight uppercase mb-6">
              <SplitText text="Global Builder &" stagger={0.025} duration={0.5} />
              <br />
              <SplitText text="Construction Partner" stagger={0.025} duration={0.5} delay={0.35} />
            </h2>

            {/* Body — BlurText */}
            <p className="text-gray-500 leading-relaxed mb-6">
              <BlurText
                text="Founded in 2009, BuildLine has grown from a regional contractor into a globally recognised construction partner. With expertise spanning residential towers, commercial complexes, and critical infrastructure, we bring precision and craftsmanship to every project."
                stagger={0.04}
                duration={0.55}
              />
            </p>
            <p className="text-gray-500 leading-relaxed mb-8">
              <BlurText
                text="Our multidisciplinary teams operate across 12 countries, combining local regulatory knowledge with internationally certified processes to deliver on time, every time."
                stagger={0.04}
                duration={0.55}
                delay={0.2}
              />
            </p>

            <motion.div {...fadeUp(0.4)}>
              <a
                href="#contact"
                className="inline-flex items-center gap-3 rounded-full bg-[#f84d07] px-7 py-3.5 text-sm font-semibold text-white hover:bg-[#d94206] transition-colors shadow group"
              >
                Work With Us
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white">
                  <svg className="h-3.5 w-3.5 text-[#f84d07]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </span>
              </a>
            </motion.div>
          </div>

          {/* Right — image collage */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
            className="relative grid grid-cols-2 gap-4 h-[360px] sm:h-[420px]"
          >
            <div className="rounded-2xl overflow-hidden row-span-2">
              <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&h=700&fit=crop&q=80" alt="Construction site" className="h-full w-full object-cover" />
            </div>
            <div className="rounded-2xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=500&h=300&fit=crop&q=80" alt="Engineers planning" className="h-full w-full object-cover" />
            </div>
            <div className="rounded-2xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=500&h=300&fit=crop&q=80" alt="Building exterior" className="h-full w-full object-cover" />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5, type: 'spring', stiffness: 200 }}
              className="absolute -bottom-4 -left-4 rounded-2xl bg-[#f84d07] px-6 py-4 shadow-xl"
            >
              <p className="text-3xl font-black text-white">15+</p>
              <p className="text-xs text-white/80 font-medium">Years of expertise</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="border-t border-gray-100 pt-14">
          <motion.p {...fadeUp()} className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-8">
            Our Journey
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.1)}
                className="relative pl-5 border-l-2 border-[#f84d07]/30"
              >
                <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-[#f84d07]" />
                <p className="text-lg font-black text-[#f84d07] mb-1">{m.year}</p>
                <p className="text-sm text-gray-600 leading-snug">{m.event}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
