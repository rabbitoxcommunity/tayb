import { useEffect, useRef, useState } from 'react'

const stats = [
  { value: 50, suffix: '+', label: 'Projects Completed', desc: 'Delivered on time and within budget' },
  { value: 100, suffix: '+', label: 'Expert Team Members', desc: 'Certified engineers, architects & managers' },
  { value: 3.5, suffix: 'M', prefix: '$', label: 'Project Value Managed', desc: 'Across residential & commercial sectors' },
  { value: 15, suffix: '+', label: 'Years of Experience', desc: 'Building trust one project at a time' },
]

function Counter({ target, suffix, prefix }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 1800
          const steps = 60
          const increment = target / steps
          let current = 0
          const timer = setInterval(() => {
            current += increment
            if (current >= target) {
              setCount(target)
              clearInterval(timer)
            } else {
              setCount(parseFloat(current.toFixed(1)))
            }
          }, duration / steps)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  const display = Number.isInteger(target) ? Math.round(count) : count.toFixed(1)

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{display}{suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <section className="relative overflow-hidden bg-[#f84d07] py-20">
      {/* subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {stats.map((s, i) => (
            <div key={i} className="text-white">
              <p className="text-5xl lg:text-6xl font-black mb-2">
                <Counter target={s.value} suffix={s.suffix} prefix={s.prefix || ''} />
              </p>
              <p className="text-lg font-bold mb-1">{s.label}</p>
              <p className="text-sm text-white/65 leading-snug">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
