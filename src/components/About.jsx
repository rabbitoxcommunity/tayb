import { motion } from 'framer-motion'
import SplitText from '../animations/SplitText'
import BlurText from '../animations/BlurText'
import RevealText from '../animations/RevealText'

const pillars = [
  {
    label: 'Our Vision',
    heading: 'Quality Beyond Profit',
    body: 'At TayB, we have strived towards living up to our name by providing superior quality building construction at highly competitive prices. Construction for us is beyond mere profit; it is our social responsibility.',
  },
  {
    label: 'Our Mission',
    heading: 'Zero Tolerance Policy',
    body: 'Our zero tolerance policy and value engineering help us offer optimal value to our clients at unmatched turnaround times. Through our highly scalable building solutions, we cater to a diverse clientele across every sector.',
  },
  {
    label: 'Why Choose Us',
    heading: 'Collaborative Excellence',
    body: 'Our openness to collaborations, international alliances for superior technology transfer, and vast experience help us truly bring goodness to our clients.',
  },
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
    <section className="relative bg-white py-20 lg:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* Who We Are — top section */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 lg:gap-20 items-start mb-20">

          {/* Left */}
          <div>
            <RevealText>
              <p className="text-[10px] font-bold tracking-[0.26em] uppercase text-[#f84d07] mb-8">
                Who We Are
              </p>
            </RevealText>

            <h2 className="text-5xl sm:text-6xl font-black text-gray-900 leading-[1.0] tracking-tight uppercase mb-10">
              <SplitText text="Global Builder &" stagger={0.025} duration={0.5} />
              <br />
              <SplitText text="Construction Partner" stagger={0.025} duration={0.5} delay={0.35} />
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <p className="text-sm text-gray-400 leading-relaxed">
                <BlurText
                  text="Started in the year 2024, we are a Dubai-based construction firm specializing in the execution of comprehensive building contracts. We provide end-to-end construction solutions for developers, institutional builders, and private clients looking to bring sophisticated architectural visions to life."
                  stagger={0.035}
                  duration={0.5}
                />
              </p>
              <p className="text-sm text-gray-400 leading-relaxed">
                <BlurText
                  text="We maintain a robust supply chain by partnering with leading trading companies and specialized vendors. Sourcing high-grade materials and latest construction technologies ensures every project is built to the highest standards of durability."
                  stagger={0.035}
                  duration={0.5}
                  delay={0.15}
                />
              </p>
            </div>

            <motion.div {...fadeUp(0.4)}>
              <a
                href="#contact"
                className="inline-flex items-center gap-3 rounded-full bg-[#f84d07] px-7 py-3.5 text-sm font-semibold text-white hover:bg-[#d94206] transition-colors group"
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

          {/* Right — single tall image */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: 0.9, ease: [0.215, 0.61, 0.355, 1] }}
            className="rounded-2xl overflow-hidden"
            style={{ height: '480px' }}
          >
            <img
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=960&fit=crop&q=80"
              alt="Construction site"
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>

        {/* Vision / Mission / Values */}
        <div className="mt-16 border-t border-gray-100">
          {pillars.map((p, i) => (
            <motion.div
              key={p.label}
              {...fadeUp(i * 0.1)}
              className="grid grid-cols-1 md:grid-cols-[200px_1fr_1.2fr] gap-6 md:gap-12 py-10 border-b border-gray-100 group"
            >
              {/* Label */}
              <p className="text-[10px] font-bold tracking-[0.26em] uppercase text-[#f84d07] md:pt-1">
                {p.label}
              </p>

              {/* Heading */}
              <h3 className="text-2xl font-black text-gray-900 leading-snug">
                {p.heading}
              </h3>

              {/* Body */}
              <p className="text-sm text-gray-400 leading-relaxed">
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
