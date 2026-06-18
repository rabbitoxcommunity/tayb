import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageHero from '../components/PageHero'
import api from '../lib/api'

function Lightbox({ images, index, onClose, onPrev, onNext }) {
  const img = images[index]
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
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="px-20 max-w-4xl w-full flex flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <img src={img.url} alt={img.caption || ''} className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl border border-white/5" />
          <div className="text-center mt-5">
            {img.category && <span className="text-[10px] font-bold tracking-[0.24em] uppercase text-[#f84d07] block mb-1">{img.category}</span>}
            {img.caption && <h3 className="text-white font-extrabold text-lg uppercase tracking-wide">{img.caption}</h3>}
            <p className="text-white/30 text-[10px] mt-4 font-mono">{index + 1} / {images.length}</p>
          </div>
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

export default function GalleryPage() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState(null)

  useEffect(() => {
    api.get('/gallery?limit=100')
      .then(({ data }) => setImages(data.images))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const categories = ['All', ...new Set(images.map((img) => img.category).filter(Boolean))]
  const filtered = active === 'All' ? images : images.filter((img) => img.category === active)

  return (
    <>
      <PageHero
        label="Visual Story"
        title="Our Gallery"
        subtitle="A curated look at our projects, people, and craftsmanship — from groundbreaking to handover."
        image="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1400&h=700&fit=crop&q=70"
        breadcrumb="Gallery"
      />

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

          {/* Filter */}
          {!loading && categories.length > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mb-16 text-xs sm:text-sm uppercase tracking-widest font-bold text-gray-400">
              {categories.map((cat, i) => (
                <div key={cat} className="flex items-center">
                  <button
                    onClick={() => setActive(cat)}
                    className={`hover:text-gray-900 transition-colors ${active === cat ? 'text-[#f84d07] font-extrabold' : ''}`}
                  >
                    {cat}
                  </button>
                  {i < categories.length - 1 && <span className="ml-6 text-gray-200 font-light select-none">/</span>}
                </div>
              ))}
            </div>
          )}

          {/* Loading skeleton */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-[4/3] rounded-2xl bg-gray-100 animate-pulse" />
              ))}
            </div>
          )}

          {/* Empty */}
          {!loading && images.length === 0 && (
            <div className="text-center py-24 text-gray-400">
              <svg className="h-12 w-12 mx-auto mb-4 text-gray-200" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="font-semibold">No gallery images yet</p>
            </div>
          )}

          {/* Grid */}
          {!loading && filtered.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <AnimatePresence mode="popLayout">
                {filtered.map((img, i) => (
                  <motion.div
                    key={img._id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-10%' }}
                    transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
                    onClick={() => setLightboxIndex(i)}
                    className="group relative cursor-pointer overflow-hidden rounded-2xl bg-gray-50 border border-gray-100 shadow-sm aspect-[4/3]"
                  >
                    <img
                      src={img.url}
                      alt={img.caption || ''}
                      className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-[#f84d07]">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v6.5m0-6.5h6.5m-6.5 0L10.5 10.5M20.25 3.75v6.5m0-6.5h-6.5m6.5 0l-6.75 6.75M3.75 20.25v-6.5m0 6.5h6.5m-6.5 0l6.75-6.75M20.25 20.25v-6.5m0 6.5h-6.5m6.5 0l-6.75-6.75" />
                      </svg>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                      {img.category && <span className="text-[10px] font-bold tracking-[0.24em] uppercase text-[#f84d07] mb-1">{img.category}</span>}
                      {img.caption && <p className="text-white text-base font-bold uppercase">{img.caption}</p>}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {!loading && images.length > 0 && (
            <p className="text-center text-xs uppercase tracking-widest text-gray-400 mt-20 font-mono">
              Showing {filtered.length} of {images.length} images
            </p>
          )}
        </div>
      </section>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={filtered}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onPrev={() => setLightboxIndex((i) => (i - 1 + filtered.length) % filtered.length)}
            onNext={() => setLightboxIndex((i) => (i + 1) % filtered.length)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
