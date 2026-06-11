import { motion } from 'framer-motion'
import SplitText from '../animations/SplitText'
import BlurText from '../animations/BlurText'
import RevealText from '../animations/RevealText'

const team = [
  {
    name: 'Marcus Reid',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop&crop=face&q=80',
  },
  {
    name: 'Priya Nair',
    role: 'Lead Architect',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&crop=face&q=80',
  },
  {
    name: 'David Osei',
    role: 'Head of Engineering',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face&q=80',
  },
  {
    name: 'Elena Vasquez',
    role: 'Project Director',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop&crop=face&q=80',
  },
]

const LinkedInIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

export default function Team() {
  return (
    <section className="relative bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div>
            <div className="mb-3">
              <RevealText>
                <p className="text-sm font-semibold tracking-widest uppercase text-[#f84d07]">
                  Meet The Team
                </p>
              </RevealText>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight uppercase max-w-sm">
              <SplitText text="The Experts Behind" stagger={0.028} />
              <br />
              <SplitText text="Every Build" stagger={0.04} delay={0.3} />
            </h2>
          </div>
          <p className="text-gray-500 leading-relaxed max-w-sm">
            <BlurText
              text="Our multidisciplinary team brings together architecture, engineering, and project management expertise across six continents."
              stagger={0.04}
              duration={0.5}
            />
          </p>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-6%' }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
              className="group relative overflow-hidden rounded-2xl bg-gray-100"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#f84d07]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 inset-x-0 p-5">
                <div className="translate-y-0 group-hover:-translate-y-10 transition-transform duration-300">
                  <div className="rounded-xl bg-white px-4 py-3">
                    <p className="font-bold text-gray-900 text-sm">{member.name}</p>
                    <p className="text-xs text-gray-500">{member.role}</p>
                  </div>
                </div>
                <div className="absolute bottom-5 inset-x-5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  <div>
                    <p className="font-bold text-white">{member.name}</p>
                    <p className="text-xs text-white/80">{member.role}</p>
                  </div>
                  <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#f84d07] hover:bg-[#f84d07] hover:text-white transition-colors">
                    <LinkedInIcon />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Join CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 mb-4">Interested in joining our team?</p>
          <a href="#" className="inline-flex items-center gap-2 rounded-full border-2 border-gray-900 px-6 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-900 hover:text-white transition-colors">
            View Open Positions
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
