import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageHero from '../components/PageHero'
import CTA from '../components/CTA'
import SplitText from '../animations/SplitText'
import RevealText from '../animations/RevealText'

const categories = ['All', 'Residential', 'Commercial', 'Infrastructure', 'Renovation', 'Interior']

const projects = [
  { title: 'Horizon Tower', category: 'Commercial', location: 'Dubai, UAE', year: '2024', area: '42,000 m²', value: '$12M', image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=600&fit=crop&q=80', desc: 'A landmark 32-storey commercial tower designed for mixed corporate use, featuring a sky lobby and green-certified facade.' },
  { title: 'Greenview Residences', category: 'Residential', location: 'London, UK', year: '2024', area: '8,500 m²', value: '$4.2M', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop&q=80', desc: '64-unit luxury residential development with rooftop gardens and EV-ready parking, completed 3 weeks ahead of schedule.' },
  { title: 'Metro Bridge Expansion', category: 'Infrastructure', location: 'Singapore', year: '2023', area: '2,100 m', value: '$28M', image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=600&fit=crop&q=80', desc: 'Critical infrastructure project expanding the city metro network with a 2.1km elevated span across the Marina Bay.' },
  { title: 'The Grand Arcade', category: 'Commercial', location: 'New York, USA', year: '2023', area: '18,000 m²', value: '$9.5M', image: 'https://images.unsplash.com/photo-1525438160292-a4a860951216?w=800&h=600&fit=crop&q=80', desc: 'Full retail fit-out of a heritage-listed arcade building, preserving original stonework while modernising all services.' },
  { title: 'Lakefront Villas', category: 'Residential', location: 'Geneva, Switzerland', year: '2022', area: '3,200 m²', value: '$6.8M', image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop&q=80', desc: 'Eight bespoke lakeside villas with private jetties, geothermal heating, and panoramic glazed facades.' },
  { title: 'Central Park Pavilion', category: 'Renovation', location: 'Paris, France', year: '2022', area: '1,400 m²', value: '$2.1M', image: 'https://images.unsplash.com/photo-1467533003447-e295ff1b0435?w=800&h=600&fit=crop&q=80', desc: 'Sensitive restoration and modernisation of a 19th-century public pavilion, retaining all listed architectural features.' },
  { title: 'TechNord Campus', category: 'Commercial', location: 'Stockholm, Sweden', year: '2022', area: '24,000 m²', value: '$16M', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop&q=80', desc: 'Phased renovation of a live corporate campus for 800 staff, delivered with zero operational disruption over 18 months.' },
  { title: 'Harbor Hotel Fitout', category: 'Interior', location: 'Sydney, Australia', year: '2021', area: '6,700 m²', value: '$3.9M', image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop&q=80', desc: 'Complete interior fit-out of a 5-star 180-room hotel including bespoke joinery, FF&E procurement, and all MEP services.' },
  { title: 'Skyline Penthouse', category: 'Interior', location: 'Hong Kong', year: '2021', area: '820 m²', value: '$1.8M', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&q=80', desc: 'Ultra-luxury duplex penthouse interior with bespoke Italian marble, automated home systems, and a cantilevered pool.' },
]

function ProjectModal({ project, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <motion.div
        className="relative bg-white rounded-2xl overflow-hidden max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        initial={{ scale: 0.9, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 30, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <img src={project.image} alt={project.title} className="w-full h-56 sm:h-72 object-cover" />
        <div className="p-6 sm:p-8">
          <span className="inline-block rounded-full bg-[#f84d07]/10 text-[#f84d07] text-xs font-semibold px-3 py-1 mb-4">{project.category}</span>
          <h3 className="text-2xl font-black text-gray-900 uppercase mb-2">{project.title}</h3>
          <p className="text-gray-500 mb-6 leading-relaxed">{project.desc}</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Location', value: project.location },
              { label: 'Year', value: project.year },
              { label: 'Area', value: project.area },
              { label: 'Value', value: project.value },
            ].map(({ label, value }) => (
              <div key={label} className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">{label}</p>
                <p className="text-sm font-bold text-gray-900">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function ProjectsPage() {
  const [active, setActive] = useState('All')
  const [selected, setSelected] = useState(null)

  const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active)

  return (
    <>
      <PageHero
        label="Portfolio"
        title="Our Projects"
        subtitle="From landmark towers to intimate residences — every project is a story of collaboration and craft."
        image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&h=700&fit=crop&q=60"
        breadcrumb="Projects"
      />

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

          {/* Filter tabs */}
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

          {/* Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.button
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.92, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.38, delay: i * 0.05 }}
                  onClick={() => setSelected(project)}
                  className="group relative overflow-hidden rounded-2xl bg-gray-100 block text-left aspect-[4/3] cursor-pointer"
                >
                  <img src={project.image} alt={project.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="rounded-full bg-[#f84d07] px-3 py-1 text-xs font-semibold text-white">{project.category}</span>
                  </div>
                  {/* View more on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-lg">
                      <svg className="h-5 w-5 text-[#f84d07]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12s3.375-6.75 9.75-6.75S21.75 12 21.75 12s-3.375 6.75-9.75 6.75S2.25 12 2.25 12z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-5">
                    <p className="text-xs text-white/60 mb-1">{project.location} · {project.year}</p>
                    <h3 className="text-lg font-bold text-white">{project.title}</h3>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>

      <CTA />
    </>
  )
}
