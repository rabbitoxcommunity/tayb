import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import SplitText from '../animations/SplitText'
import RevealText from '../animations/RevealText'
import { projects } from '../data/projects'

const categories = ['All', 'Residential', 'Commercial', 'Infrastructure', 'Renovation']

export default function Projects({ preview = false }) {
  const [active, setActive] = useState('All')

  // Filter projects by category, matching base categories
  const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active)
  const displayed = preview ? projects.slice(0, 4) : filtered

  return (
    <section className="relative bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <div className="mb-3">
              <RevealText>
                <p className="text-[10px] font-bold tracking-[0.26em] uppercase text-[#f84d07]">Our Portfolio</p>
              </RevealText>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight uppercase">
              <SplitText text="Featured Projects" stagger={0.03} duration={0.5} />
            </h2>
          </div>
          {preview && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 border-b border-gray-900 pb-0.5 hover:text-[#f84d07] hover:border-[#f84d07] transition-colors"
              >
                View All Projects
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </Link>
            </motion.div>
          )}
        </div>

        {/* Filter (full page only) */}
        {!preview && (
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2 text-sm font-semibold transition-all border ${
                  active === cat
                    ? 'bg-[#f84d07] text-white border-[#f84d07]'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* 2-column card grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-14">
          <AnimatePresence mode="popLayout">
            {displayed.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.38, delay: i * 0.05 }}
                className="group"
              >
                <Link to={`/projects/${project.slug}`} className="block">
                  {/* Image */}
                  <div className="overflow-hidden mb-5 aspect-[4/3] bg-gray-100 rounded-2xl border border-gray-100 shadow-sm">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-103"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-black text-gray-900 leading-tight mb-3 group-hover:text-[#f84d07] transition-colors uppercase">
                    {project.title}
                  </h3>

                  {/* Orange dash + category */}
                  <div className="flex items-center gap-3">
                    <div className="h-px w-6 bg-[#f84d07] shrink-0" />
                    <p className="text-sm text-[#f84d07] font-semibold uppercase tracking-wider">{project.category}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Preview bottom link */}
        {preview && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-14 text-center"
          >
            <Link
              to="/projects"
              className="inline-flex items-center gap-3 border border-gray-200 px-7 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all"
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
