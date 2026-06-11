import { motion } from 'framer-motion'
import SplitText from '../animations/SplitText'
import BlurText from '../animations/BlurText'
import RevealText from '../animations/RevealText'

const services = [
  {
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
      </svg>
    ),
    title: 'Building Construction',
    desc: 'Full-cycle construction from groundbreaking to handover — residential towers, commercial complexes, and mixed-use developments built to last.',
    tag: '01',
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
    title: 'Renovation & Remodelling',
    desc: 'Breathe new life into existing structures. We handle complete overhauls, structural upgrades, and modern retrofits with minimal disruption.',
    tag: '02',
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
    title: 'Interior Design & Fit-Out',
    desc: 'Spaces that inspire. Our designers craft functional, beautiful interiors for offices, retail environments, hotels, and luxury residences.',
    tag: '03',
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
      </svg>
    ),
    title: 'Project Management',
    desc: 'End-to-end project oversight — budgeting, scheduling, contractor coordination, and quality assurance to keep every project on track.',
    tag: '04',
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
    title: 'Green & Sustainable Build',
    desc: 'LEED-certified processes, solar-ready structures, and eco-conscious materials that reduce environmental impact without compromising quality.',
    tag: '05',
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
      </svg>
    ),
    title: 'Land Survey & Planning',
    desc: 'Precision topographic surveys, site feasibility studies, and zoning analysis — laying the groundwork for every successful development.',
    tag: '06',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.09, ease: [0.215, 0.61, 0.355, 1] },
  }),
}

export default function Services() {
  return (
    <section className="relative bg-gray-50 py-20 lg:py-28">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.07) 1px, transparent 1px)',
          backgroundSize: '20vw 20vw',
        }}
      />
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div>
            <div className="mb-3">
              <RevealText>
                <p className="text-sm font-semibold tracking-widest uppercase text-[#f84d07]">
                  What We Offer
                </p>
              </RevealText>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight uppercase max-w-md">
              <SplitText text="Our Core Services" stagger={0.03} duration={0.5} />
            </h2>
          </div>
          <p className="text-gray-500 leading-relaxed max-w-sm lg:text-right">
            <BlurText
              text="From planning to handover, we provide a full spectrum of construction services tailored to your vision and budget."
              stagger={0.04}
              duration={0.5}
            />
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-6%' }}
              className="group relative bg-white rounded-2xl p-8 border border-gray-100 hover:border-[#f84d07]/30 hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <span className="absolute top-6 right-8 text-6xl font-black text-gray-100 group-hover:text-[#f84d07]/10 transition-colors leading-none select-none">
                {s.tag}
              </span>
              <div className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[#f84d07]/10 text-[#f84d07] group-hover:bg-[#f84d07] group-hover:text-white transition-all duration-300">
                {s.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">{s.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-6">{s.desc}</p>
              <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold text-[#f84d07] group-hover:gap-3 transition-all">
                Learn More
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
