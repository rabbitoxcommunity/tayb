import { motion } from 'framer-motion'
import SplitText from '../animations/SplitText'
import BlurText from '../animations/BlurText'
import RevealText from '../animations/RevealText'

const team = [
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
    <section className="relative bg-white py-20 lg:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
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

        {/* Team Grid - Modern Minimal Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mt-16">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="group flex flex-col relative"
            >
              {/* Image Frame */}
              <div className="overflow-hidden rounded-[2rem] aspect-[4/5] bg-gray-50 relative shadow-sm border border-gray-100/50">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Floating Minimal Detail Card */}
                <div className="absolute bottom-6 inset-x-6 bg-white/95 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="inline-block bg-[#f84d07]/10 text-[#f84d07] text-[9px] font-bold tracking-[0.2em] uppercase px-2.5 py-1 rounded-md">
                    {member.role}
                  </span>
                  
                  <h4 className="text-lg font-black text-gray-900 uppercase tracking-tight mt-3">
                    {member.name}
                  </h4>
                  
                  <p className="text-xs text-gray-500 leading-relaxed mt-2.5 italic border-l border-gray-200 pl-3">
                    "{member.message}"
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
