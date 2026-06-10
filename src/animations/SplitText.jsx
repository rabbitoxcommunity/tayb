import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function SplitText({
  text,
  className = '',
  delay = 0,
  duration = 0.55,
  stagger = 0.028,
  once = true,
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: '-8% 0px' })

  const chars = text.split(' ')

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  }

  const child = {
    hidden: { opacity: 0, y: '0.6em' },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, ease: [0.215, 0.61, 0.355, 1] },
    },
  }

  return (
    <motion.span
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      aria-label={text}
      className={`inline-block ${className}`}
    >
      {chars.map((word, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            verticalAlign: 'bottom',
            lineHeight: 'inherit',
            marginRight: i < chars.length - 1 ? '0.28em' : 0,
          }}
        >
          <motion.span
            variants={child}
            style={{ display: 'inline-block', willChange: 'transform, opacity' }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
