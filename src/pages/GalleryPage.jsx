import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageHero from '../components/PageHero'

const categories = ['All', 'Construction', 'Architecture', 'Interior', 'Team', 'Before & After']

const images = [
  { src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop&q=80', category: 'Construction', caption: 'Foundation pour' },
  { src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=800&fit=crop&q=80', category: 'Architecture', caption: 'Completed facade' },
  { src: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=500&fit=crop&q=80', category: 'Team', caption: 'Site planning session' },
  { src: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop&q=80', category: 'Interior', caption: 'Lobby fitout' },
  { src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=500&fit=crop&q=80', category: 'Interior', caption: 'Penthouse living area' },
  { src: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop&q=80', category: 'Architecture', caption: 'Street elevation' },
  { src: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&h=500&fit=crop&q=80', category: 'Architecture', caption: 'Aerial view' },
  { src: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=800&fit=crop&q=80', category: 'Architecture', caption: 'Greenview Residences' },
  { src: 'https://images.unsplash.com/photo-1467533003447-e295ff1b0435?w=600&h=500&fit=crop&q=80', category: 'Before & After', caption: 'After restoration' },
  { src: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=600&fit=crop&q=80', category: 'Architecture', caption: 'Lakefront Villa exterior' },
  { src: 'https://images.unsplash.com/photo-1525438160292-a4a860951216?w=600&h=500&fit=crop&q=80', category: 'Construction', caption: 'Steel erection' },
  { src: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=800&fit=crop&q=80', category: 'Team', caption: 'Site review' },
  { src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=600&fit=crop&q=80', category: 'Team', caption: 'Design review' },
  { src: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=600&fit=crop&q=80', category: 'Architecture', caption: 'Horizon Tower' },
  { src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=500&fit=crop&q=80', category: 'Interior', caption: 'Master bedroom' },
  { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=500&fit=crop&q=80', category: 'Interior', caption: 'Open-plan kitchen' },
]

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
          <img src={img.src} alt={img.caption} className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl border border-white/5" />
          
          <div className="text-center mt-5 max-w-xl">
            <span className="text-[10px] font-bold tracking-[0.24em] uppercase text-[#f84d07] block mb-1">
              {img.category}
            </span>
            <h3 className="text-white font-extrabold text-lg sm:text-xl uppercase tracking-wide leading-snug">
              {img.caption}
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

export default function GalleryPage() {
  const [active, setActive] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const filtered = active === 'All' ? images : images.filter((img) => img.category === active)

  const openLightbox = (i) => setLightboxIndex(i)
  const closeLightbox = () => setLightboxIndex(null)
  const prevImage = () => setLightboxIndex((i) => (i - 1 + filtered.length) % filtered.length)
  const nextImage = () => setLightboxIndex((i) => (i + 1) % filtered.length)

  return (
    <>
      <PageHero
        label="Visual Story"
        title="Our Gallery"
        subtitle="A curated look at our projects, people, and craftsmanship — from groundbreaking to handover."
        image="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1400&h=700&fit=crop&q=60"
        breadcrumb="Gallery"
      />

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

          {/* Minimal Filter */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mb-16 text-xs sm:text-sm uppercase tracking-widest font-bold text-gray-400">
            {categories.map((cat, i) => (
              <div key={cat} className="flex items-center">
                <button
                  onClick={() => setActive(cat)}
                  className={`hover:text-gray-900 transition-colors ${active === cat ? 'text-[#f84d07] font-extrabold' : ''}`}
                >
                  {cat}
                </button>
                {i < categories.length - 1 && (
                  <span className="ml-6 text-gray-200 font-light select-none">/</span>
                )}
              </div>
            ))}
          </div>

          {/* Minimal Photography Catalog Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((img, i) => (
                <motion.div
                  key={img.src}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
                  onClick={() => openLightbox(i)}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl bg-gray-50 border border-gray-100 shadow-sm aspect-[4/3]"
                >
                  <div className="w-full h-full overflow-hidden">
                    <img
                      src={img.src}
                      alt={img.caption}
                      className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-105"
                    />
                  </div>

                  {/* Subtle Zoom/Expand Icon in corner */}
                  <div className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#f84d07] hover:scale-105">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v6.5m0-6.5h6.5m-6.5 0L10.5 10.5M20.25 3.75v6.5m0-6.5h-6.5m6.5 0l-6.75 6.75M3.75 20.25v-6.5m0 6.5h6.5m-6.5 0l6.75-6.75M20.25 20.25v-6.5m0 6.5h-6.5m6.5 0l-6.75-6.75" />
                    </svg>
                  </div>

                  {/* Clean minimal hover caption overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out flex flex-col justify-end p-6 text-left">
                    <div className="flex items-center justify-between mb-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                      <span className="text-[10px] font-bold tracking-[0.24em] uppercase text-[#f84d07]">
                        {img.category}
                      </span>
                      <span className="text-[10px] font-mono text-white/50">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <p className="text-white text-base font-bold tracking-wide leading-snug uppercase translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out delay-75">
                      {img.caption}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Image Count */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center text-xs uppercase tracking-widest text-gray-400 mt-20 font-mono"
          >
            Showing {filtered.length} of {images.length} images
          </motion.p>
        </div>
      </section>

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={filtered}
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
          />
        )}
      </AnimatePresence>
    </>
  )
}
