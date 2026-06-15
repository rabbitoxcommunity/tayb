import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PageHero from '../components/PageHero'
import SplitText from '../animations/SplitText'
import BlurText from '../animations/BlurText'
import RevealText from '../animations/RevealText'
import { projects } from '../data/projects'

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
      {/* Close */}
      <button onClick={onClose} className="absolute top-6 right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 hover:scale-105 transition-all">
        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Prev */}
      <button onClick={(e) => { e.stopPropagation(); onPrev() }} className="absolute left-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-white hover:bg-white/15 transition-all z-10">
        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      {/* Main Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.97 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="px-20 max-w-4xl w-full flex flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <img src={src} alt={`${projectTitle} detail`} className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl border border-white/5" />
          
          <div className="text-center mt-5 max-w-xl">
            <span className="text-[10px] font-bold tracking-[0.24em] uppercase text-[#f84d07] block mb-1">
              Project Showcase
            </span>
            <h3 className="text-white font-extrabold text-lg sm:text-xl uppercase tracking-wide leading-snug">
              {projectTitle}
            </h3>
            <p className="text-center text-white/30 text-[10px] mt-4 font-mono select-none">
              {index + 1} &nbsp;/&nbsp; {images.length}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Next */}
      <button onClick={(e) => { e.stopPropagation(); onNext() }} className="absolute right-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-white hover:bg-white/15 transition-all z-10">
        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </motion.div>
  )
}

export default function ProjectDetailPage() {
  const { slug } = useParams()
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const projectIndex = projects.findIndex((p) => p.slug === slug)

  if (projectIndex === -1) {
    return (
      <>
        <PageHero
          label="404"
          title="Project Not Found"
          subtitle="The requested project could not be located in our portfolio database."
          breadcrumb="Not Found"
        />
        <section className="bg-white py-20 text-center">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-full bg-[#f84d07] px-6 py-3 text-sm font-semibold text-white shadow hover:scale-105 transition-all"
          >
            Return to Portfolio
          </Link>
        </section>
      </>
    )
  }

  const project = projects[projectIndex]
  const nextProject = projects[(projectIndex + 1) % projects.length]

  return (
    <>
      <PageHero
        label={project.category}
        title={project.title}
        subtitle={project.subtitle || project.desc}
        image={project.image}
        breadcrumb={project.title}
      />

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start">
            
            {/* Left Column — Description and Details */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <RevealText>
                  <h2 className="text-xs font-bold tracking-[0.24em] uppercase text-[#f84d07] mb-3">Project Narrative</h2>
                </RevealText>
                <h3 className="text-2xl sm:text-3xl font-black text-gray-900 uppercase leading-snug">
                  <SplitText text="Design & Construction Journey" stagger={0.03} />
                </h3>
              </div>

              <p className="text-lg text-gray-900 font-medium leading-relaxed mb-6">
                {project.desc}
              </p>

              <div className="text-gray-500 leading-relaxed space-y-6 text-base">
                {project.longDesc.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {/* Key Amenities Section */}
              {project.amenities && (
                <div className="mt-12 pt-10 border-t border-gray-100">
                  <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-[#f84d07] mb-6">
                    Key Amenities
                  </h4>
                  <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-sm text-gray-600 font-medium">
                    {project.amenities.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 bg-gray-50 border border-gray-100 px-4 py-2.5 rounded-xl">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#f84d07] shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Connectivity & Proximity Section */}
              {project.nearby && (
                <div className="mt-12 pt-10 border-t border-gray-100">
                  <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-[#f84d07] mb-6">
                    Connectivity & Proximity
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.nearby.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm bg-gray-50 border border-gray-100 px-5 py-3 rounded-xl">
                        <span className="text-gray-700 font-bold">{item.place}</span>
                        <span className="text-xs font-mono font-semibold text-[#f84d07] bg-[#f84d07]/10 px-2.5 py-1 rounded-md">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column — Sticky Specs Card */}
            <div className="lg:col-span-1 lg:sticky lg:top-28">
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm">
                <h4 className="text-xs font-black uppercase tracking-widest text-gray-900 mb-6 border-b border-gray-200/60 pb-3">
                  Specifications
                </h4>
                
                <div className="space-y-5">
                  {[
                    { label: 'Client Partner', value: project.client },
                    { label: 'Project Location', value: project.location },
                    { label: 'Completion Year', value: project.year },
                    { label: 'Total Built-up Area', value: project.area },
                    { label: 'Contract Value', value: project.value },
                    project.type && { label: 'Apartment/Villa Type', value: project.type },
                    project.units && { label: 'Total Units', value: project.units },
                    { label: 'Current Status', value: project.status },
                  ].filter(Boolean).map(({ label, value }) => (
                    <div key={label} className="border-b border-gray-200/40 pb-4 last:border-0 last:pb-0">
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
                      <p className="text-sm font-bold text-gray-900">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Showcase Gallery */}
          {project.galleryImages && project.galleryImages.length > 0 && (
            <div className="mt-20 lg:mt-28 border-t border-gray-100 pt-16 lg:pt-24">
              <div className="mb-12 text-center sm:text-left">
                <p className="text-[10px] font-bold tracking-[0.26em] uppercase text-[#f84d07] mb-2">Showcase Gallery</p>
                <h3 className="text-2xl sm:text-3xl font-black text-gray-900 uppercase">Project Captures</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {project.galleryImages.map((src, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-5%' }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    onClick={() => setLightboxIndex(index)}
                    className="overflow-hidden rounded-2xl aspect-[4/3] bg-gray-50 border border-gray-100 shadow-sm group cursor-pointer relative"
                  >
                    <img
                      src={src}
                      alt={`${project.title} detail capture ${index + 1}`}
                      className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-103"
                    />
                    
                    {/* Hover Expand Icon */}
                    <div className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#f84d07] hover:scale-105">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v6.5m0-6.5h6.5m-6.5 0L10.5 10.5M20.25 3.75v6.5m0-6.5h-6.5m6.5 0l-6.75 6.75M3.75 20.25v-6.5m0 6.5h6.5m-6.5 0l6.75-6.75M20.25 20.25v-6.5m0 6.5h-6.5m6.5 0l-6.75-6.75" />
                      </svg>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Navigation Links */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-20 pt-10 border-t border-gray-100">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-[#f84d07] transition-colors"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to Portfolio
            </Link>

            <Link
              to={`/projects/${nextProject.slug}`}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-900 hover:text-[#f84d07] transition-colors"
            >
              Next Project
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

        </div>
      </section>

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={project.galleryImages}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onPrev={() => setLightboxIndex((i) => (i - 1 + project.galleryImages.length) % project.galleryImages.length)}
            onNext={() => setLightboxIndex((i) => (i + 1) % project.galleryImages.length)}
            projectTitle={project.title}
          />
        )}
      </AnimatePresence>
    </>
  )
}
