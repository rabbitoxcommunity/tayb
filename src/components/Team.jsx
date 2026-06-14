import { motion } from 'framer-motion'
import SplitText from '../animations/SplitText'
import BlurText from '../animations/BlurText'
import RevealText from '../animations/RevealText'

const team = [
  {
    name: 'Navas Meeran',
    role: 'Chairman',
    image: '/chairman.jpg',
    message: 'Meeran Group has always believed in providing the finest quality products and services at the most affordable prices. Through Nanma we now extend the goodness in the construction sector.',
  },
  {
    name: 'Asheen Panakkat',
    role: 'Managing Director',
    image: '/md.jpg',
    message: 'We bring in value to our customers through our openness and vast experience in the industry.',
  },
  {
    name: 'Mohamed Junaid',
    role: 'Director',
    image: '/director.jpg',
    message: 'Nanma for us is not just a business venture, it is a way of giving back goodness to society.',
  },
]

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
              text="Our leadership team brings together decades of construction, engineering, and project management expertise in the UAE."
              stagger={0.04}
              duration={0.5}
            />
          </p>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-6%' }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
              className="group relative overflow-hidden rounded-2xl bg-gray-100 shadow-sm"
            >
              {/* Image */}
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Normal State Bottom Label */}
              <div className="absolute bottom-0 inset-x-0 p-5 group-hover:opacity-0 transition-opacity duration-300">
                <div className="rounded-xl bg-white px-4 py-3 shadow-md">
                  <p className="font-bold text-gray-900 text-sm">{member.name}</p>
                  <p className="text-xs text-gray-500">{member.role}</p>
                </div>
              </div>

              {/* Hover Overlay with Quote/Message */}
              <div className="absolute inset-0 bg-[#f84d07]/95 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                  <p className="text-white text-sm sm:text-xs xl:text-sm leading-relaxed italic mb-5">
                    "{member.message}"
                  </p>
                  <div className="border-t border-white/20 pt-3">
                    <p className="font-bold text-white text-base">{member.name}</p>
                    <p className="text-xs text-white/80 uppercase tracking-wider font-semibold mt-0.5">{member.role}</p>
                  </div>
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
