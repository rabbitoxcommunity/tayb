import { useState } from 'react'

const info = [
  {
    label: 'Headquarters',
    value: (
      <span>
        Tayb Contracting L.L.C.<br />
        Office No: 207, 2nd Floor,<br />
        The Light 1 Commercial Towers,<br />
        Arjan, Dubai, UAE
      </span>
    ),
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
  {
    label: 'Phone',
    value: '(04) 575 9029 / +971 54 756 6000',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    value: 'taybcontracting@gmail.com',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    label: 'Working Hours',
    value: 'Mon – Fri, 8:00am – 6:00pm',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" className="relative bg-gray-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-sm font-semibold tracking-widest uppercase text-[#f84d07] mb-3">
            Get In Touch
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 uppercase">
            Start a Conversation
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Info panel */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div className="rounded-2xl bg-[#f84d07] p-8 text-white">
              <h3 className="text-xl font-bold mb-2">Contact Information</h3>
              <p className="text-white/75 text-sm mb-8">We typically respond within one business day.</p>

              <div className="space-y-5">
                {info.map(({ label, value, icon }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0 text-white/80">{icon}</div>
                    <div>
                      <p className="text-xs font-semibold text-white/60 uppercase tracking-wide">{label}</p>
                      <p className="text-sm font-medium text-white mt-0.5">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Socials */}
              <div className="mt-10 flex gap-3">
                {['LinkedIn', 'Twitter', 'Instagram'].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white/80 hover:bg-white hover:text-[#f84d07] transition-colors text-xs font-bold"
                  >
                    {s[0]}
                  </a>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden h-48 bg-gray-200 relative">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&h=300&fit=crop&q=80"
                alt="Office location map"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-full bg-[#f84d07] p-3 shadow-lg">
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.013 3.5-4.619 3.5-7.327A8.5 8.5 0 0012 3.5 8.5 8.5 0 003.21 12c0 2.708 1.556 5.314 3.5 7.327a19.585 19.585 0 002.683 2.282 16.974 16.974 0 001.144.742zM12 13.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f84d07]/10 text-[#f84d07] mb-4">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-500 text-sm">We'll be in touch within one business day.</p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 text-sm font-semibold text-[#f84d07] hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Smith"
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-[#f84d07] focus:outline-none focus:ring-2 focus:ring-[#f84d07]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-[#f84d07] focus:outline-none focus:ring-2 focus:ring-[#f84d07]/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+1 000 000 0000"
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-[#f84d07] focus:outline-none focus:ring-2 focus:ring-[#f84d07]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                      Service Needed
                    </label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:border-[#f84d07] focus:outline-none focus:ring-2 focus:ring-[#f84d07]/20 bg-white"
                    >
                      <option value="">Select a service</option>
                      <option>Building Construction</option>
                      <option>Renovation & Remodelling</option>
                      <option>Interior Design</option>
                      <option>Project Management</option>
                      <option>Land Survey & Planning</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                    Project Details *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project — location, size, timeline, and any specific requirements..."
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-[#f84d07] focus:outline-none focus:ring-2 focus:ring-[#f84d07]/20 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-[#f84d07] py-3.5 text-sm font-semibold text-white hover:bg-[#d94206] transition-colors shadow flex items-center justify-center gap-2"
                >
                  Send Message
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
