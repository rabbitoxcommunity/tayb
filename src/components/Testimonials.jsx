import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SplitText from '../animations/SplitText'
import RevealText from '../animations/RevealText'

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'CEO, Mitchell Properties',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=face',
    quote: "BuildLine delivered our 12-storey office complex three weeks ahead of schedule and 8% under budget. The quality of finish and their communication throughout were exceptional — we've already signed them for our next development.",
    project: 'Horizon Office Tower',
    rating: 5,
  },
  {
    name: 'James Okafor',
    role: 'Director, Lakeview Developments',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=face',
    quote: "We've worked with many contractors over 20 years in property development. BuildLine stands out for their technical precision and their ability to navigate complex regulatory environments without slowing the project down.",
    project: 'Lakefront Villas, Phase 2',
    rating: 5,
  },
  {
    name: 'Amina Rousseau',
    role: 'Head of Facilities, TechNord Group',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
    quote: "Our campus renovation was a logistical challenge — 800 staff still on site during construction. BuildLine's phased approach meant zero disruption to our operations. I'd recommend them without hesitation.",
    project: 'TechNord Campus Renovation',
    rating: 5,
  },
  {
    name: 'Carlos Mendez',
    role: 'Private Client',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
    quote: "From the first consultation to handing over the keys, BuildLine made building our family home a genuinely positive experience. They listened, adapted, and delivered something we're truly proud of.",
    project: 'Custom Residential Build, Geneva',
    rating: 5,
  },
]

function Stars({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [active, setActive] = useState(0)

  return (
    <section className="bg-gray-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex justify-center mb-3">
            <RevealText>
              <p className="text-sm font-semibold tracking-widest uppercase text-[#f84d07]">
                Client Stories
              </p>
            </RevealText>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 uppercase">
            <SplitText text="What Our Clients Say" stagger={0.028} duration={0.5} />
          </h2>
        </div>

        {/* Main testimonial */}
        <div className="relative mx-auto max-w-3xl text-center mb-12">
          <motion.svg
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-6 h-10 w-10 text-[#f84d07]/30"
            fill="currentColor"
            viewBox="0 0 32 32"
          >
            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
          </motion.svg>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed font-medium mb-8 italic px-4 sm:px-0">
                "{testimonials[active].quote}"
              </p>
              <div className="flex flex-col items-center gap-2">
                <img src={testimonials[active].avatar} alt={testimonials[active].name} className="h-14 w-14 rounded-full object-cover ring-4 ring-[#f84d07]/20" />
                <Stars count={testimonials[active].rating} />
                <div>
                  <p className="font-bold text-gray-900">{testimonials[active].name}</p>
                  <p className="text-sm text-gray-500">{testimonials[active].role}</p>
                  <p className="text-xs text-[#f84d07] font-semibold mt-0.5">{testimonials[active].project}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Thumbnail nav */}
        <div className="flex justify-center gap-3 flex-wrap">
          {testimonials.map((item, i) => (
            <motion.button
              key={i}
              onClick={() => setActive(i)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className={`flex items-center gap-3 rounded-full px-4 py-2 border-2 transition-all ${
                active === i
                  ? 'border-[#f84d07] bg-[#f84d07]/5'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <img src={item.avatar} alt={item.name} className="h-8 w-8 rounded-full object-cover" />
              <span className={`text-sm font-semibold ${active === i ? 'text-[#f84d07]' : 'text-gray-600'}`}>
                {item.name.split(' ')[0]}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
