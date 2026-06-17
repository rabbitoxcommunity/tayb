import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PageHero from '../components/PageHero'
import RevealText from '../animations/RevealText'
import SplitText from '../animations/SplitText'
import api from '../lib/api'

function Lightbox({ images, index, onClose, onPrev, onNext, projectTitle }) {
  const src = images[index]
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button onClick={onClose} className="absolute top-6 right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all">
        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <button onClick={(e) => { e.stopPropagation(); onPrev() }} className="absolute left-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-white hover:bg-white/15 transition-all z-10">
        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.97 }}
          transition={{ duration: 0.25 }}
          className="px-20 max-w-4xl w-full flex flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <img src={src} alt={projectTitle} className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl border border-white/5" />
          <p className="text-white/30 text-[10px] mt-5 font-mono">{index + 1} / {images.length}</p>
        </motion.div>
      </AnimatePresence>

      <button onClick={(e) => { e.stopPropagation(); onNext() }} className="absolute right-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-white hover:bg-white/15 transition-all z-10">
        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </motion.div>
  )
}

function NearbyIcon({ type }) {
  const cls = "h-5 w-5 text-[#f84d07]"
  const paths = {
    education: "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222",
    healthcare: "M4.5 12.75l6 6 9-13.5M9 12h6m-3-3v6",
    shopping: "M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z",
    transport: "M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12",
    dining: "M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.379a48.474 48.474 0 00-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z",
    recreation: "M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z",
  }
  return (
    <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d={paths[type] || "M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"} />
    </svg>
  )
}

export default function ProjectDetailPage() {
  const { slug } = useParams()
  const [project, setProject] = useState(null)
  const [allProjects, setAllProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  useEffect(() => {
    Promise.all([
      api.get(`/projects/${slug}`),
      api.get('/projects'),
    ])
      .then(([detail, list]) => {
        setProject(detail.data)
        setAllProjects(list.data)
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-8 w-8 border-2 border-[#f84d07] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (notFound || !project) {
    return (
      <>
        <PageHero label="404" title="Project Not Found" subtitle="The requested project could not be found." breadcrumb="Not Found" />
        <section className="bg-white py-20 text-center">
          <Link to="/projects" className="inline-flex items-center gap-2 rounded-full bg-[#f84d07] px-6 py-3 text-sm font-semibold text-white shadow hover:scale-105 transition-all">
            Return to Portfolio
          </Link>
        </section>
      </>
    )
  }

  const galleryUrls = project.images?.map((img) => img.url) || []
  const currentIndex = allProjects.findIndex((p) => p.slug === slug)
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length]

  const specs = [
    project.location && { label: 'Location', value: project.location },
    project.year && { label: 'Year', value: project.year },
    project.projectType && { label: 'Project Type', value: project.projectType },
    project.propertyType && { label: 'Property Type', value: project.propertyType },
  ].filter(Boolean)

  return (
    <>
      <PageHero
        label={project.category}
        title={project.title}
        subtitle={project.description}
        image={project.coverImage?.url}
        breadcrumb={project.title}
      />

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start">

            {/* Left — Description */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <RevealText>
                  <h2 className="text-xs font-bold tracking-[0.24em] uppercase text-[#f84d07] mb-3">Project Overview</h2>
                </RevealText>
                <h3 className="text-2xl sm:text-3xl font-black text-gray-900 uppercase leading-snug">
                  <SplitText text="Design & Construction Journey" stagger={0.03} />
                </h3>
              </div>

              {project.description ? (
                <div className="text-gray-600 leading-relaxed space-y-5 text-base">
                  {project.description.split('\n\n').map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 italic">No description available.</p>
              )}
            </div>

            {/* Right — Specs */}
            <div className="lg:col-span-1 lg:sticky lg:top-28">
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm">
                <h4 className="text-xs font-black uppercase tracking-widest text-gray-900 mb-6 border-b border-gray-200/60 pb-3">
                  Specifications
                </h4>
                <div className="space-y-5">
                  {specs.map(({ label, value }) => (
                    <div key={label} className="border-b border-gray-200/40 pb-4 last:border-0 last:pb-0">
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
                      <p className="text-sm font-bold text-gray-900">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Amenities */}
          {project.amenities?.length > 0 && (
            <div className="mt-20 lg:mt-28 border-t border-gray-100 pt-16 lg:pt-24">
              <div className="mb-10 text-center sm:text-left">
                <p className="text-[10px] font-bold tracking-[0.26em] uppercase text-[#f84d07] mb-2">Features</p>
                <h3 className="text-2xl sm:text-3xl font-black text-gray-900 uppercase">Amenities</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {project.amenities.map((amenity, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-5%' }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 shadow-sm"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f84d07]/10">
                      <svg className="h-4 w-4 text-[#f84d07]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </span>
                    <span className="text-sm font-semibold text-gray-800">{amenity}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Nearby Locations */}
          {project.nearbyLocations?.length > 0 && (
            <div className="mt-20 lg:mt-28 border-t border-gray-100 pt-16 lg:pt-24">
              <div className="mb-10 text-center sm:text-left">
                <p className="text-[10px] font-bold tracking-[0.26em] uppercase text-[#f84d07] mb-2">Connectivity</p>
                <h3 className="text-2xl sm:text-3xl font-black text-gray-900 uppercase">Nearby Locations</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.nearbyLocations.map((loc, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-5%' }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50 px-5 py-4 shadow-sm"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f84d07]/10">
                      <NearbyIcon type={loc.type} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-gray-900 truncate">{loc.name}</p>
                      <p className="text-xs text-[#f84d07] font-semibold mt-0.5">{loc.distance}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Gallery */}
          {galleryUrls.length > 0 && (
            <div className="mt-20 lg:mt-28 border-t border-gray-100 pt-16 lg:pt-24">
              <div className="mb-12 text-center sm:text-left">
                <p className="text-[10px] font-bold tracking-[0.26em] uppercase text-[#f84d07] mb-2">Showcase Gallery</p>
                <h3 className="text-2xl sm:text-3xl font-black text-gray-900 uppercase">Project Captures</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {galleryUrls.map((url, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-5%' }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    onClick={() => setLightboxIndex(i)}
                    className="overflow-hidden rounded-2xl aspect-[4/3] bg-gray-50 border border-gray-100 shadow-sm group cursor-pointer relative"
                  >
                    <img src={url} alt={`${project.title} ${i + 1}`} className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                    <div className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-[#f84d07]">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v6.5m0-6.5h6.5m-6.5 0L10.5 10.5M20.25 3.75v6.5m0-6.5h-6.5m6.5 0l-6.75 6.75M3.75 20.25v-6.5m0 6.5h6.5m-6.5 0l6.75-6.75M20.25 20.25v-6.5m0 6.5h-6.5m6.5 0l-6.75-6.75" />
                      </svg>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom nav */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-20 pt-10 border-t border-gray-100">
            <Link to="/projects" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-[#f84d07] transition-colors">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to Portfolio
            </Link>

            {nextProject && nextProject.slug !== slug && (
              <Link to={`/projects/${nextProject.slug}`} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-900 hover:text-[#f84d07] transition-colors">
                Next Project
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            )}
          </div>

        </div>
      </section>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={galleryUrls}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onPrev={() => setLightboxIndex((i) => (i - 1 + galleryUrls.length) % galleryUrls.length)}
            onNext={() => setLightboxIndex((i) => (i + 1) % galleryUrls.length)}
            projectTitle={project.title}
          />
        )}
      </AnimatePresence>
    </>
  )
}
