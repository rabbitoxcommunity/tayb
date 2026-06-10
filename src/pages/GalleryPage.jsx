import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageHero from '../components/PageHero'

const categories = ['All', 'Construction', 'Architecture', 'Interior', 'Team', 'Before & After']

const images = [
  { src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop&q=80', category: 'Construction', caption: 'Foundation pour — Horizon Tower, Dubai', span: 'col-span-2' },
  { src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=800&fit=crop&q=80', category: 'Architecture', caption: 'Completed facade — TechNord Campus, Stockholm' },
  { src: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=500&fit=crop&q=80', category: 'Team', caption: 'Site planning session — Singapore Metro' },
  { src: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop&q=80', category: 'Interior', caption: 'Lobby fitout — Harbor Hotel, Sydney' },
  { src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=500&fit=crop&q=80', category: 'Interior', caption: 'Penthouse living area — Skyline, Hong Kong' },
  { src: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop&q=80', category: 'Architecture', caption: 'Street elevation — The Grand Arcade, NYC', span: 'col-span-2' },
  { src: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&h=500&fit=crop&q=80', category: 'Architecture', caption: 'Aerial view — Metro Bridge, Singapore' },
  { src: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=800&fit=crop&q=80', category: 'Architecture', caption: 'Greenview Residences at dusk, London' },
  { src: 'https://images.unsplash.com/photo-1467533003447-e295ff1b0435?w=600&h=500&fit=crop&q=80', category: 'Before & After', caption: 'After: Central Park Pavilion restoration, Paris' },
  { src: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=600&fit=crop&q=80', category: 'Architecture', caption: 'Lakefront Villa exterior — Geneva' },
  { src: 'https://images.unsplash.com/photo-1525438160292-a4a860951216?w=600&h=500&fit=crop&q=80', category: 'Construction', caption: 'Steel erection — Grand Arcade frame' },
  { src: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=800&fit=crop&q=80', category: 'Team', caption: 'CEO Marcus Reid on site review, Dubai' },
  { src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=600&fit=crop&q=80', category: 'Team', caption: 'Lead Architect Priya Nair — design review' },
  { src: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=600&fit=crop&q=80', category: 'Architecture', caption: 'Horizon Tower — full elevation at night', span: 'col-span-2' },
  { src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=500&fit=crop&q=80', category: 'Interior', caption: 'Master bedroom — Lakefront Villa, Geneva' },
  { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=500&fit=crop&q=80', category: 'Interior', caption: 'Open-plan kitchen — Greenview Penthouse' },
]

function Lightbox({ images, index, onClose, onPrev, onNext }) {
  const img = images[index]
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Close */}
      <button onClick={onClose} className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Prev */}
      <button onClick={(e) => { e.stopPropagation(); onPrev() }} className="absolute left-3 sm:left-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors z-10">
        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.93 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.93 }}
          transition={{ duration: 0.28 }}
          className="px-16 sm:px-20 max-w-5xl w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <img src={img.src} alt={img.caption} className="w-full max-h-[75vh] object-contain rounded-xl shadow-2xl" />
          <p className="text-center text-white/70 text-sm mt-4">{img.caption}</p>
          <p className="text-center text-xs text-white/40 mt-1">{index + 1} / {images.length}</p>
        </motion.div>
      </AnimatePresence>

      {/* Next */}
      <button onClick={(e) => { e.stopPropagation(); onNext() }} className="absolute right-3 sm:right-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors z-10">
        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
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

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

          {/* Filter */}
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

          {/* Masonry-style grid */}
          <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((img, i) => (
                <motion.button
                  key={img.src}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  onClick={() => openLightbox(i)}
                  className={`group relative overflow-hidden rounded-xl sm:rounded-2xl bg-gray-100 cursor-pointer ${img.span || ''}`}
                  style={{ aspectRatio: img.span === 'col-span-2' ? '16/7' : '1/1' }}
                >
                  <img
                    src={img.src}
                    alt={img.caption}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />

                  {/* Caption on hover */}
                  <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 p-3 sm:p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-xs sm:text-sm text-white font-medium leading-snug">{img.caption}</p>
                    <span className="mt-1 inline-block text-[10px] sm:text-xs text-white/60 rounded-full border border-white/30 px-2 py-0.5">
                      {img.category}
                    </span>
                  </div>

                  {/* Zoom icon */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                    <svg className="h-4 w-4 text-[#f84d07]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                    </svg>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Count */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center text-sm text-gray-400 mt-10"
          >
            Showing {filtered.length} of {images.length} images
          </motion.p>
        </div>
      </section>

      {/* Lightbox */}
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
