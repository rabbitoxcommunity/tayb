import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import SplitText from '../animations/SplitText'
import RevealText from '../animations/RevealText'

const categories = ['All', 'Residential', 'Commercial', 'Infrastructure', 'Renovation']

const projects = [
  { title: 'Horizon Tower', category: 'Commercial', location: 'Dubai, UAE', year: '2024', image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=600&fit=crop&q=80' },
  { title: 'Greenview Residences', category: 'Residential', location: 'London, UK', year: '2024', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=500&fit=crop&q=80' },
  { title: 'Metro Bridge Expansion', category: 'Infrastructure', location: 'Singapore', year: '2023', image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&h=500&fit=crop&q=80' },
  { title: 'The Grand Arcade', category: 'Commercial', location: 'New York, USA', year: '2023', image: 'https://images.unsplash.com/photo-1525438160292-a4a860951216?w=600&h=500&fit=crop&q=80' },
  { title: 'Lakefront Villas', category: 'Residential', location: 'Geneva, Switzerland', year: '2022', image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=500&fit=crop&q=80' },
  { title: 'Central Park Pavilion', category: 'Renovation', location: 'Paris, France', year: '2022', image: 'https://images.unsplash.com/photo-1467533003447-e295ff1b0435?w=800&h=600&fit=crop&q=80' },
]

export default function Projects({ preview = false }) {
  const [active, setActive] = useState('All')

  const all = active === 'All' ? projects : projects.filter((p) => p.category === active)
  const displayed = preview ? projects.slice(0, 3) : all

  return (
    <section className="relative bg-white py-20 lg:py-28">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.07) 1px, transparent 1px)',
          backgroundSize: '20vw 20vw',
        }}
      />
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <div>
            <div className="mb-3">
              <RevealText>
                <p className="text-sm font-semibold tracking-widest uppercase text-[#f84d07]">Our Portfolio</p>
              </RevealText>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight uppercase">
              <SplitText text="Featured Projects" stagger={0.03} duration={0.5} />
            </h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 border-b-2 border-gray-900 pb-0.5 hover:text-[#f84d07] hover:border-[#f84d07] transition-colors"
            >
              View All Projects
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Filter (hidden in preview mode) */}
        {!preview && (
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActive(cat)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${active === cat ? 'bg-[#f84d07] text-white shadow' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        )}

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {displayed.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group relative overflow-hidden rounded-2xl bg-gray-100 block aspect-[4/3]"
              >
                <img src={project.image} alt={project.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="rounded-full bg-[#f84d07] px-3 py-1 text-xs font-semibold text-white">{project.category}</span>
                </div>
                <div className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </div>
                <div className="absolute bottom-0 inset-x-0 p-5">
                  <p className="text-xs text-white/60 mb-1">{project.location} · {project.year}</p>
                  <h3 className="text-lg font-bold text-white">{project.title}</h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Preview CTA */}
        {preview && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 text-center"
          >
            <Link
              to="/projects"
              className="inline-flex items-center gap-3 rounded-full border-2 border-gray-900 px-7 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
            >
              Explore All Projects
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  )
}
