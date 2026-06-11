import { motion } from 'framer-motion'
import PageHero from '../components/PageHero'
import Stats from '../components/Stats'
import Process from '../components/Process'
import Team from '../components/Team'
import SplitText from '../animations/SplitText'
import BlurText from '../animations/BlurText'
import RevealText from '../animations/RevealText'

const values = [
  {
    label: 'Engineering',
    heading: 'Precision at Every Joint',
    desc: 'Every beam, joint, and finish is executed to exacting tolerances by our certified engineering teams.',
  },
  {
    label: 'Sustainability',
    heading: 'Built for the Future',
    desc: 'We integrate green building standards into every project — reducing carbon footprint without adding cost.',
  },
  {
    label: 'Partnership',
    heading: 'Your Success, Our Portfolio',
    desc: 'We treat every client as a long-term partner, not a single transaction.',
  },
  {
    label: 'Delivery',
    heading: '96% On-Time, Every Time',
    desc: 'Deadline discipline is non-negotiable. Our track record speaks for itself across 50+ projects.',
  },
]


function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-8%' },
    transition: { duration: 0.6, delay, ease: [0.215, 0.61, 0.355, 1] },
  }
}

function SwissRule({ label }) {
  return (
    <div className="flex items-center gap-4 mb-12">
      <div className="h-[3px] w-8 bg-[#f84d07]" />
      <p className="text-[10px] font-bold tracking-[0.28em] uppercase text-gray-400">{label}</p>
      <div className="flex-1 h-px bg-gray-200" />
    </div>
  )
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="Who We Are"
        title="About BuildLine"
        subtitle="A globally trusted construction partner built on precision, transparency, and 15 years of delivered excellence."
        image="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&h=700&fit=crop&q=70"
        breadcrumb="About"
      />

      {/* Story */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <SwissRule label="Our Story" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-16">
            <h2 className="text-5xl sm:text-6xl font-black text-gray-900 uppercase leading-[1.0] tracking-tight">
              <SplitText text="Built from the" stagger={0.025} />
              <br />
              <SplitText text="Ground Up" stagger={0.035} delay={0.3} />
            </h2>

            <div className="space-y-5 text-sm text-gray-400 leading-relaxed">
              <p>
                <BlurText text="BuildLine was founded in 2009 in Dubai by Marcus Reid, a structural engineer who believed the industry deserved better — better communication, better craftsmanship, and better accountability." stagger={0.025} />
              </p>
              <p>
                <BlurText text="What started as a 5-person team taking on residential renovations has grown into a 100-strong multidisciplinary firm delivering landmark projects across 12 countries on four continents." stagger={0.025} delay={0.1} />
              </p>
              <p>
                <BlurText text="Today, BuildLine is synonymous with precision delivery, transparent project management, and sustainable construction practices that meet the highest international standards." stagger={0.025} delay={0.2} />
              </p>
            </div>
          </div>

          {/* Full-width image */}
          <motion.div
            {...fadeUp(0.2)}
            className="overflow-hidden rounded-2xl"
            style={{ height: '420px' }}
          >
            <img
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&h=700&fit=crop&q=80"
              alt="BuildLine construction site"
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-20 lg:py-24 border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <SwissRule label="What Drives Us" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {values.map((v, i) => (
              <motion.div
                key={v.label}
                {...fadeUp(i * 0.08)}
                className="py-10 pr-10 border-b border-gray-100 md:odd:border-r md:odd:pr-16 md:even:pl-16"
              >
                <p className="text-[10px] font-bold tracking-[0.26em] uppercase text-[#f84d07] mb-3">
                  {v.label}
                </p>
                <h3 className="text-xl font-black text-gray-900 mb-3 leading-snug">
                  {v.heading}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Stats />
      <Team />
      <Process />
    </>
  )
}
