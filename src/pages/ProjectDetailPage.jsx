import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PageHero from '../components/PageHero'
import RevealText from '../animations/RevealText'
import api from '../lib/api'

function AmenityIcon({ name }) {
  const n = name.toLowerCase()
  const cls = "h-4 w-4 text-white"
  const s = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, viewBox: '0 0 24 24' }

  if (n.includes('pool') || n.includes('swim'))
    return <svg className={cls} {...s}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12c0-1.242 1.343-2.25 3-2.25s3 1.008 3 2.25 1.343 2.25 3 2.25 3-1.008 3-2.25S15.593 9.75 17.25 9.75s3 1.008 3 2.25m-18 3.75c0-1.242 1.343-2.25 3-2.25s3 1.008 3 2.25 1.343 2.25 3 2.25 3-1.008 3-2.25 1.343-2.25 3-2.25 3 1.008 3 2.25m-18 3.75c0-1.242 1.343-2.25 3-2.25s3 1.008 3 2.25 1.343 2.25 3 2.25 3-1.008 3-2.25 1.343-2.25 3-2.25 3 1.008 3 2.25" /></svg>

  if (n.includes('gym') || n.includes('fitness') || n.includes('workout'))
    return <svg className={cls} {...s}><path strokeLinecap="round" strokeLinejoin="round" d="M6.5 6.5l3.5 3.5M14 14l3.5 3.5M14.5 9.5l-3.5 3.5M9.5 14.5l-3.5 3.5M18 6l2 2M2 20l2 2M16 4l4 4M4 16l4 4 M8 8l8 8M14 6l4 4M2 12l2 2M20 10l2 2" /></svg>

  if (n.includes('parking') || n.includes('garage') || n.includes('car'))
    return <svg className={cls} {...s}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>

  if (n.includes('security') || n.includes('cctv') || n.includes('surveillance') || n.includes('guard'))
    return <svg className={cls} {...s}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>

  if (n.includes('garden') || n.includes('landscape') || n.includes('green') || n.includes('park') || n.includes('lawn'))
    return <svg className={cls} {...s}><path strokeLinecap="round" strokeLinejoin="round" d="M11 20A12 12 0 0 0 20 11C20 6.03 15.97 2 11 2C6.03 2 2 6.03 2 11C2 15.97 6.03 20 11 20ZM11 20V11M11 11L20 11" /></svg>

  if (n.includes('lift') || n.includes('elevator'))
    return <svg className={cls} {...s}><path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" /></svg>

  if (n.includes('power') || n.includes('backup') || n.includes('generator') || n.includes('solar') || n.includes('energy'))
    return <svg className={cls} {...s}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>

  if (n.includes('water') || n.includes('aqua') || n.includes('supply'))
    return <svg className={cls} {...s}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg>

  if (n.includes('wifi') || n.includes('internet') || n.includes('broadband'))
    return <svg className={cls} {...s}><path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" /></svg>

  if (n.includes('jog') || n.includes('track') || n.includes('run') || n.includes('walk'))
    return <svg className={cls} {...s}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" /></svg>

  if (n.includes('spa') || n.includes('sauna') || n.includes('wellness'))
    return <svg className={cls} {...s}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" /></svg>

  if (n.includes('library') || n.includes('book') || n.includes('study') || n.includes('reading'))
    return <svg className={cls} {...s}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>

  if (n.includes('restaurant') || n.includes('cafeteria') || n.includes('food') || n.includes('dining') || n.includes('cafe'))
    return <svg className={cls} {...s}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z" /></svg>

  if (n.includes('medical') || n.includes('hospital') || n.includes('clinic') || n.includes('health'))
    return <svg className={cls} {...s}><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>

  if (n.includes('school') || n.includes('educat') || n.includes('college'))
    return <svg className={cls} {...s}><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg>

  if (n.includes('club') || n.includes('lounge') || n.includes('hall') || n.includes('community'))
    return <svg className={cls} {...s}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" /></svg>

  if (n.includes('play') || n.includes('kid') || n.includes('child') || n.includes('game'))
    return <svg className={cls} {...s}><path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" /></svg>

  if (n.includes('concierge') || n.includes('reception') || n.includes('service') || n.includes('bell'))
    return <svg className={cls} {...s}><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg>

  if (n.includes('ac') || n.includes('air') || n.includes('condition') || n.includes('cool'))
    return <svg className={cls} {...s}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>

  if (n.includes('ev') || n.includes('electric') || n.includes('charging') || n.includes('plug'))
    return <svg className={cls} {...s}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M15.75 3v1.5m-7.5 10.5h7.5A2.25 2.25 0 0018 12.75v-3a2.25 2.25 0 00-2.25-2.25H8.25A2.25 2.25 0 006 9.75v3A2.25 2.25 0 008.25 15.75zM12 15.75v4.5a2.25 2.25 0 004.5 0v-1.125" /></svg>

  if (n.includes('pet') || n.includes('dog') || n.includes('animal'))
    return <svg className={cls} {...s}><path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.729c.11.27.263.29.434.545a.75.75 0 01-.15 1.017 2.25 2.25 0 01-3.182-3.182.75.75 0 011.017-.15c.179.171.33.324.545.434l1.336 1.336z" /></svg>

  if (n.includes('intercom') || n.includes('phone') || n.includes('video door'))
    return <svg className={cls} {...s}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>

  if (n.includes('balcony') || n.includes('terrace') || n.includes('patio') || n.includes('deck'))
    return <svg className={cls} {...s}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>

  if (n.includes('basket') || n.includes('sport') || n.includes('court') || n.includes('tennis') || n.includes('badminton'))
    return <svg className={cls} {...s}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg>

  if (n.includes('rainwater') || n.includes('harvest') || n.includes('eco') || n.includes('sustain'))
    return <svg className={cls} {...s}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a6 6 0 01-6-6c0-3.8 6-11 6-11s6 7.2 6 11a6 6 0 01-6 6z" /></svg>

  if (n.includes('waste') || n.includes('trash') || n.includes('garbage') || n.includes('recycle') || n.includes('manage'))
    return <svg className={cls} {...s}><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>

  if (n.includes('shopping') || n.includes('mall') || n.includes('retail') || n.includes('store'))
    return <svg className={cls} {...s}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>

  // fallback
  return <svg className={cls} {...s}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
}

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
        label={project.projectType}
        title={project.title}
        subtitle={project.subDescription}
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
                  <h2 className="text-3xl sm:text-4xl font-black text-gray-900 uppercase tracking-tight">Project Overview</h2>
                </RevealText>
              </div>

              {project.mainDescription ? (
                <div
                  className="project-description"
                  dangerouslySetInnerHTML={{ __html: project.mainDescription }}
                />
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
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {project.amenities.map((amenity, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-5%' }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    className="flex items-center gap-3 px-5 py-4 border border-gray-100 rounded-xl"
                  >
                    <div className="h-8 w-8 rounded-lg bg-[#f84d07] flex items-center justify-center shrink-0">
                      <AmenityIcon name={amenity} />
                    </div>
                    <span className="text-sm font-medium text-gray-800 leading-snug">{amenity}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Nearby Locations */}
          {project.nearbyLocations?.length > 0 && (
            <div className="mt-8 lg:mt-10 border-t border-gray-100 pt-10 lg:pt-12">
              <div className="mb-10 text-center sm:text-left">
                <p className="text-[10px] font-bold tracking-[0.26em] uppercase text-[#f84d07] mb-2">Connectivity</p>
                <h3 className="text-2xl sm:text-3xl font-black text-gray-900 uppercase">Nearby Locations</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {project.nearbyLocations.map((loc, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-5%' }}
                    transition={{ duration: 0.35, delay: i * 0.06 }}
                    className="flex items-center justify-between px-5 py-4 border border-gray-100 rounded-xl group hover:border-[#f84d07]/20 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="h-8 w-8 rounded-lg bg-[#f84d07] flex items-center justify-center shrink-0">
                        <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-sm font-semibold text-gray-900 leading-snug break-words block">{loc.name}</span>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider mt-0.5">
                          Approx. <span className="text-[#f84d07] font-bold">{loc.distance}</span>
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Gallery */}
          {galleryUrls.length > 0 && (
            <div className="mt-8 lg:mt-10 border-t border-gray-100 pt-10 lg:pt-12">
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
