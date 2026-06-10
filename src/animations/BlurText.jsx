import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

/**
 * Animates text in word-by-word (or char-by-char) with a blur+fade+slide.
 * Great for body text, subtitles, labels.
 */
export default function BlurText({
  text,
  className = '',
  by = 'word',       // 'word' | 'char'
  delay = 0,
  stagger = 0.07,
  duration = 0.65,
  once = true,
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: '-6% 0px' })

  const parts = by === 'word' ? text.split(' ') : text.split('')

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  }

  const child = {
    hidden: {
      opacity: 0,
      filter: 'blur(12px)',
      y: 8,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        duration,
        ease: 'easeOut',
      },
    },
  }

  return (
    <motion.span
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      aria-label={text}
      className={`inline ${className}`}
    >
      {parts.map((part, i) => (
        <motion.span
          key={i}
          variants={child}
          style={{
            display: 'inline-block',
            willChange: 'transform, opacity, filter',
            marginRight: by === 'word' ? '0.28em' : '0',
          }}
        >
          {part}
        </motion.span>
      ))}
    </motion.span>
  )
}
