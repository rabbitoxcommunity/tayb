import { motion } from 'framer-motion'
import PageHero from '../components/PageHero'
import Stats from '../components/Stats'
import Process from '../components/Process'
import Team from '../components/Team'
import Testimonials from '../components/Testimonials'
import CTA from '../components/CTA'
import SplitText from '../animations/SplitText'
import BlurText from '../animations/BlurText'
import RevealText from '../animations/RevealText'

const values = [
  {
    icon: '🏗️',
    title: 'Precision Engineering',
    desc: 'Every beam, joint, and finish is executed to exacting tolerances by our certified engineering teams.',
  },
  {
    icon: '🌿',
    title: 'Sustainable Practices',
    desc: 'We integrate green building standards into every project — reducing carbon footprint without adding cost.',
  },
  {
    icon: '🤝',
    title: 'Client Partnership',
    desc: 'We treat every client as a long-term partner, not a single transaction. Your success is our portfolio.',
  },
  {
    icon: '⏱️',
    title: 'On-Time Delivery',
    desc: 'Deadline discipline is non-negotiable. 96% of our projects are delivered on or before schedule.',
  },
]

const milestones = [
  { year: '2009', event: 'Founded in Dubai with a 5-person team' },
  { year: '2014', event: 'Expanded to Europe — first London project delivered' },
  { year: '2019', event: 'Achieved ISO 9001 & LEED accreditation' },
  { year: '2021', event: 'Crossed $2M in cumulative project value' },
  { year: '2023', event: 'Opened offices in Singapore and New York' },
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

      {/* Story section */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="mb-3">
                <RevealText>
                  <p className="text-sm font-semibold tracking-widest uppercase text-[#f84d07]">Our Story</p>
                </RevealText>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 uppercase leading-tight mb-6">
                <SplitText text="Built from the" stagger={0.025} />
                <br />
                <SplitText text="Ground Up" stagger={0.035} delay={0.3} />
              </h2>
              <div className="space-y-4 text-gray-500 leading-relaxed">
                <p>
                  <BlurText text="BuildLine was founded in 2009 in Dubai by Marcus Reid, a structural engineer who believed the industry deserved better — better communication, better craftsmanship, and better accountability." stagger={0.03} />
                </p>
                <p>
                  <BlurText text="What started as a 5-person team taking on residential renovations has grown into a 100-strong multidisciplinary firm delivering landmark projects across 12 countries on four continents." stagger={0.03} delay={0.1} />
                </p>
                <p>
                  <BlurText text="Today, BuildLine is synonymous with precision delivery, transparent project management, and sustainable construction practices that meet the highest international standards." stagger={0.03} delay={0.2} />
                </p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
              className="relative grid grid-cols-2 gap-4 h-[380px] sm:h-[440px]"
            >
              <div className="rounded-2xl overflow-hidden row-span-2">
                <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&h=700&fit=crop&q=80" alt="Construction" className="h-full w-full object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=500&h=300&fit=crop&q=80" alt="Team" className="h-full w-full object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=500&h=300&fit=crop&q=80" alt="Building" className="h-full w-full object-cover" />
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                className="absolute -bottom-4 -left-4 rounded-2xl bg-[#f84d07] px-6 py-4 shadow-xl"
              >
                <p className="text-3xl font-black text-white">15+</p>
                <p className="text-xs text-white/80 font-medium">Years of expertise</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex justify-center mb-3">
              <RevealText>
                <p className="text-sm font-semibold tracking-widest uppercase text-[#f84d07]">What Drives Us</p>
              </RevealText>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 uppercase">
              <SplitText text="Our Core Values" stagger={0.03} />
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.1)}
                className="bg-white rounded-2xl p-7 border border-gray-100 hover:shadow-lg hover:border-[#f84d07]/20 transition-all duration-300 group"
              >
                <div className="text-3xl mb-4">{v.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="mb-3">
              <RevealText>
                <p className="text-sm font-semibold tracking-widest uppercase text-[#f84d07]">Our Journey</p>
              </RevealText>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 uppercase">
              <SplitText text="Company Milestones" stagger={0.028} />
            </h2>
          </div>

          <div className="relative">
            {/* vertical line */}
            <div className="absolute left-5 sm:left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-px sm:-translate-x-1/2" />

            <div className="space-y-10">
              {milestones.map((m, i) => (
                <motion.div
                  key={i}
                  {...fadeUp(i * 0.08)}
                  className={`relative flex items-start gap-8 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
                >
                  {/* Dot */}
                  <div className="absolute left-5 sm:left-1/2 -translate-x-1/2 mt-1.5 h-3 w-3 rounded-full bg-[#f84d07] ring-4 ring-white z-10" />

                  {/* Content */}
                  <div className={`pl-12 sm:pl-0 sm:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'sm:text-right sm:pr-8' : 'sm:pl-8'}`}>
                    <p className="text-2xl font-black text-[#f84d07] mb-1">{m.year}</p>
                    <p className="text-gray-600 leading-snug text-sm sm:text-base">{m.event}</p>
                  </div>
                  <div className="hidden sm:block sm:w-[calc(50%-2rem)]" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Stats />
      <Team />
      <Process />
      <Testimonials />
      <CTA />
    </>
  )
}
