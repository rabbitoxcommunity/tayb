import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

/**
 * Mask-reveal animation: clips text from below, then slides it into view.
 * Best used on headings and labels. Wrap a single line or block.
 */
export default function RevealText({
  children,
  className = '',
  delay = 0,
  duration = 0.7,
  once = true,
  direction = 'up', // 'up' | 'down' | 'left' | 'right'
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: '-6% 0px' })

  const axis = direction === 'left' || direction === 'right' ? 'x' : 'y'
  const sign = direction === 'down' || direction === 'right' ? '-' : ''

  const hidden = { [axis]: `${sign}105%`, opacity: 0 }
  const visible = {
    [axis]: '0%',
    opacity: 1,
    transition: {
      duration,
      delay,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }

  return (
    <span
      ref={ref}
      className={`inline-block overflow-hidden ${className}`}
      style={{ verticalAlign: 'bottom' }}
    >
      <motion.span
        style={{ display: 'block', willChange: 'transform, opacity' }}
        initial={hidden}
        animate={isInView ? visible : hidden}
      >
        {children}
      </motion.span>
    </span>
  )
}
