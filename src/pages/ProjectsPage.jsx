import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageHero from '../components/PageHero'

const categories = ['All', 'Residential', 'Commercial', 'Infrastructure', 'Renovation', 'Interior']

const projects = [
  { title: 'Innovative Commercial Building', category: 'Architecture Design', location: 'Dubai, UAE', year: '2024', area: '42,000 m²', value: '$12M', image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=700&fit=crop&q=80', desc: 'A landmark 32-storey commercial tower designed for mixed corporate use, featuring a sky lobby and green-certified facade.' },
  { title: 'Eco-Friendly Housing Project', category: 'Residential Construction', location: 'London, UK', year: '2024', area: '8,500 m²', value: '$4.2M', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=700&fit=crop&q=80', desc: '64-unit luxury residential development with rooftop gardens and EV-ready parking, completed 3 weeks ahead of schedule.' },
  { title: 'Metro Bridge Expansion', category: 'Infrastructure', location: 'Singapore', year: '2023', area: '2,100 m', value: '$28M', image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=700&fit=crop&q=80', desc: 'Critical infrastructure project expanding the city metro network with a 2.1km elevated span across the Marina Bay.' },
  { title: 'The Grand Arcade', category: 'Commercial Fit-Out', location: 'New York, USA', year: '2023', area: '18,000 m²', value: '$9.5M', image: 'https://images.unsplash.com/photo-1525438160292-a4a860951216?w=800&h=700&fit=crop&q=80', desc: 'Full retail fit-out of a heritage-listed arcade building, preserving original stonework while modernizing all services.' },
  { title: 'Lakefront Villas', category: 'Residential Construction', location: 'Geneva, Switzerland', year: '2022', area: '3,200 m²', value: '$6.8M', image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=700&fit=crop&q=80', desc: 'Eight bespoke lakeside villas with private jetties, geothermal heating, and panoramic glazed facades.' },
  { title: 'Central Park Pavilion', category: 'Renovation', location: 'Paris, France', year: '2022', area: '1,400 m²', value: '$2.1M', image: 'https://images.unsplash.com/photo-1467533003447-e295ff1b0435?w=800&h=700&fit=crop&q=80', desc: 'Sensitive restoration and modernisation of a 19th-century public pavilion, retaining all listed architectural features.' },
  { title: 'TechNord Campus', category: 'Commercial Renovation', location: 'Stockholm, Sweden', year: '2022', area: '24,000 m²', value: '$16M', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=700&fit=crop&q=80', desc: 'Phased renovation of a live corporate campus for 800 staff, delivered with zero operational disruption over 18 months.' },
  { title: 'Harbor Hotel Fit-Out', category: 'Interior Design', location: 'Sydney, Australia', year: '2021', area: '6,700 m²', value: '$3.9M', image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=700&fit=crop&q=80', desc: 'Complete interior fit-out of a 5-star 180-room hotel including bespoke joinery, FF&E procurement, and all MEP services.' },
  { title: 'Skyline Penthouse', category: 'Interior Design', location: 'Hong Kong', year: '2021', area: '820 m²', value: '$1.8M', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=700&fit=crop&q=80', desc: 'Ultra-luxury duplex penthouse interior with bespoke Italian marble, automated home systems, and a cantilevered pool.' },
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
        className="relative bg-white overflow-hidden max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        initial={{ scale: 0.95, y: 24, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 24, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center bg-black/30 text-white hover:bg-black/50 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <img src={project.image} alt={project.title} className="w-full h-60 sm:h-80 object-cover" />
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-6 bg-[#f84d07]" />
            <span className="text-xs font-semibold text-[#f84d07] uppercase tracking-widest">{project.category}</span>
          </div>
          <h3 className="text-2xl font-black text-gray-900 uppercase mb-3 leading-tight">{project.title}</h3>
          <p className="text-gray-500 mb-6 leading-relaxed text-sm">{project.desc}</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-gray-100">
            {[
              { label: 'Location', value: project.location },
              { label: 'Year', value: project.year },
              { label: 'Area', value: project.area },
              { label: 'Value', value: project.value },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white p-4">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
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
                  onClick={() => setSelected(project)}
                  className="group cursor-pointer"
                >
                  {/* Image */}
                  <div className="overflow-hidden mb-5 aspect-[4/3] bg-gray-100">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-black text-gray-900 leading-tight mb-3 group-hover:text-[#f84d07] transition-colors">
                    {project.title}
                  </h3>

                  {/* Orange dash + category */}
                  <div className="flex items-center gap-3">
                    <div className="h-px w-6 bg-[#f84d07] shrink-0" />
                    <p className="text-sm text-[#f84d07] font-medium">{project.category}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  )
}
