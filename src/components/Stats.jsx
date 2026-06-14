import { useEffect, useRef, useState } from 'react'

const stats = [
  { value: 79, label: 'Nanma Lotus Units', desc: 'Flagship residential project under execution in Dubai South' },
  { value: 200, suffix: '+', label: 'Dedicated Labourers', desc: 'Skilled workforce based out of India' },
  { value: 15, suffix: 'M', prefix: 'AED ', label: 'Projected Turnover', desc: 'Reflecting our capacity for complex projects' },
  { value: 2024, label: 'Year Founded', desc: 'Dubai-based Indian building construction contractor' },
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
