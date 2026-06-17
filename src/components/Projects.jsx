import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import SplitText from '../animations/SplitText'
import RevealText from '../animations/RevealText'
import api from '../lib/api'

export default function Projects({ preview = false }) {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/projects')
      .then(({ data }) => setProjects(data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const displayed = preview
    ? projects.filter((p) => p.featured).slice(0, 4)
    : projects

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

        {/* Loading skeleton */}
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

        {/* Empty state */}
        {!loading && displayed.length === 0 && (
          <div className="text-center py-24 text-gray-400">
            <p className="text-lg font-semibold">No featured projects yet</p>
            <p className="text-sm mt-1">Mark projects as featured in the admin panel.</p>
          </div>
        )}

        {/* Grid */}
        {!loading && displayed.length > 0 && (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-14">
            <AnimatePresence mode="popLayout">
              {displayed.map((project, i) => (
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

        {/* Preview bottom link */}
        {preview && !loading && displayed.length > 0 && (
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
