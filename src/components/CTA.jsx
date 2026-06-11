import { motion } from 'framer-motion'
import SplitText from '../animations/SplitText'
import BlurText from '../animations/BlurText'
import RevealText from '../animations/RevealText'

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-gray-900 py-20 lg:py-28">
      <img
        src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&h=600&fit=crop&q=60"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-20"
      />

      <div className="relative mx-auto max-w-4xl px-5 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-4">
          <RevealText>
            <p className="text-sm font-semibold tracking-widest uppercase text-[#f84d07]">
              Let's Build Together
            </p>
          </RevealText>
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight uppercase mb-6">
          <SplitText text="Your Vision Deserves" stagger={0.025} />
          <br />
          <SplitText text="a Strong Foundation" stagger={0.025} delay={0.4} />
        </h2>

        <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
          <BlurText
            text="Whether you have detailed plans or just a dream, our team is ready to guide you from concept through completion. Get a no-obligation consultation today."
            stagger={0.04}
            duration={0.5}
          />
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-3 rounded-full bg-[#f84d07] px-8 py-4 text-sm font-semibold text-white hover:bg-[#d94206] transition-colors shadow-lg group"
          >
            Start Your Project
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white">
              <svg className="h-3 w-3 text-[#f84d07]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </span>
          </a>
          <a
            href="tel:+18005550100"
            className="inline-flex items-center gap-2 rounded-full border-2 border-white/20 px-8 py-4 text-sm font-semibold text-white hover:border-white/50 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            +1 800 555 0100
          </a>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-6 sm:gap-8"
        >
          {['ISO 9001 Certified', 'LEED Accredited', '15+ Years Experience', 'Licensed & Insured'].map((badge) => (
            <div key={badge} className="flex items-center gap-2 text-sm text-gray-400">
              <svg className="h-4 w-4 text-[#f84d07] shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
              </svg>
              {badge}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
