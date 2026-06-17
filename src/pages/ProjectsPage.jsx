import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import api from '../lib/api'

export default function ProjectsPage() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState('All')

  useEffect(() => {
    api.get('/projects')
      .then(({ data }) => setProjects(data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const categories = ['All', ...new Set(projects.map((p) => p.projectType).filter(Boolean))]
  const filtered = active === 'All' ? projects : projects.filter((p) => p.projectType === active)

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
          {!loading && categories.length > 1 && (
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

          {/* Loading */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-14">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[4/3] rounded-2xl bg-gray-100 mb-5" />
                  <div className="h-6 bg-gray-100 rounded w-3/4 mb-3" />
                  <div className="h-4 bg-gray-100 rounded w-1/4" />
                </div>
              ))}
            </div>
          )}

          {/* Empty */}
          {!loading && projects.length === 0 && (
            <div className="text-center py-24 text-gray-400">
              <p className="text-lg font-semibold">No projects yet</p>
              <p className="text-sm mt-1">Check back soon.</p>
            </div>
          )}

          {/* Grid */}
          {!loading && projects.length > 0 && (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-14">
              <AnimatePresence mode="popLayout">
                {filtered.map((project, i) => (
                  <motion.div
                    key={project._id}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.38, delay: i * 0.05 }}
                    className="group"
                  >
                    <Link to={`/projects/${project.slug}`} className="block">
                      <div className="overflow-hidden mb-5 aspect-[4/3] bg-gray-100 rounded-2xl border border-gray-100 shadow-sm">
                        {project.coverImage?.url ? (
                          <img
                            src={project.coverImage.url}
                            alt={project.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-gray-300">
                            <svg className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-gray-900 leading-tight mb-3 group-hover:text-[#f84d07] transition-colors uppercase">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-3">
                        <div className="h-px w-6 bg-[#f84d07] shrink-0" />
                        <p className="text-sm text-[#f84d07] font-semibold uppercase tracking-wider">{project.projectType}</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

        </div>
      </section>
    </>
  )
}
