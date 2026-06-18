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
    label: 'Supply Chain',
    heading: 'Robust Regional Sourcing',
    desc: 'We partner with leading regional trading companies and specialized vendors, sourcing high-grade materials and the latest construction technologies.',
  },
  {
    label: 'Procurement',
    heading: 'Strict Durability & Aesthetics',
    desc: 'Through our streamlined procurement process, we ensure every project is built to the highest standards of durability, quality, and aesthetics.',
  },
  {
    label: 'Value Engineering',
    heading: 'Optimal Value Engineering',
    desc: 'Our zero tolerance policy and value engineering help us offer optimal value to our clients at unmatched turnaround times.',
  },
  {
    label: 'Collaboration',
    heading: 'Highly Scalable Solutions',
    desc: 'Our scalable building solutions and openness to collaborations and international alliances help us cater to a diverse clientele across every sector.',
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
        title="About TayB"
        subtitle="A Dubai-based Indian construction firm providing comprehensive building contracts and end-to-end solutions since 2024."
        image="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1400&h=700&fit=crop&q=70"
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
                <BlurText text="Started in the year 2024, we are a Dubai-based Indian construction firm specializing in the execution of comprehensive building contracts. We provide end-to-end construction solutions for developers, institutional builders, and private clients looking to bring sophisticated architectural visions to life within the UAE’s dynamic landscape." stagger={0.025} />
              </p>
              <p>
                <BlurText text="Our commitment to excellence is best demonstrated through our active project site. We are currently collaborating with Nanma Properties on their flagship development: Nanma Lotus based in Dubai South. This is a residential project comprising 79 units and is designed as B + G + 6 + Roof (Basement, Ground Floor, Six Residential floors, and a Rooftop area)." stagger={0.025} delay={0.1} />
              </p>
              <p>
                <BlurText text="With a dedicated team of professionals and 200+ labourers based out of India, we have set a projected turnover target of AED 15 Million, reflecting our capacity to handle increasingly complex residential and commercial projects." stagger={0.025} delay={0.2} />
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
              alt="TayB construction site"
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
