import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { projects } from '../data/projects'

const categories = ['All', 'Residential', 'Commercial', 'Infrastructure', 'Renovation', 'Interior']

export default function ProjectsPage() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active)

  return (
    <>
      <PageHero
        label="Portfolio"
        title="Our Projects"
        subtitle="From landmark towers to intimate residences — every project is a story of collaboration and craft."
        breadcrumb="Projects"
      />

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

          {/* Filter tabs */}
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

          {/* 2-column card grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-14">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
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

        </div>
      </section>
    </>
  )
}
