import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageHero from '../components/PageHero'
import RevealText from '../animations/RevealText'
import api from '../lib/api'

const info = [
  { label: 'Headquarters', value: <span>Tayb Contracting L.L.C.<br />Office No: 207, 2nd Floor,<br />The Light 1 Commercial Towers,<br />Arjan, Dubai, UAE</span>, icon: <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg> },
  { label: 'Phone', value: '(04) 575 9029 / +971 54 756 6000', icon: <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg> },
  { label: 'Email', value: 'taybcontracting@gmail.com', icon: <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg> },
]

const socials = [
  {
    label: 'LinkedIn',
    href: '#',
    icon: <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  },
  {
    label: 'Instagram',
    href: '#',
    icon: <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>,
  },
  {
    label: 'X (Twitter)',
    href: '#',
    icon: <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  },
]

const steps = [
  {
    number: '01',
    title: 'Submit Your Enquiry',
    description: 'Fill in the form with your project details — location, scope, and timeline. The more detail, the better.',
    icon: <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>,
  },
  {
    number: '02',
    title: 'We Review Your Project',
    description: 'Our team evaluates your requirements and prepares a tailored response, including initial thoughts on feasibility and timelines.',
    icon: <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>,
  },
  {
    number: '03',
    title: 'We Get Back to You',
    description: 'Expect a response within one business day. We\'ll schedule a call or site visit to discuss your project in full.',
    icon: <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" /></svg>,
  },
]

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-8%' },
    transition: { duration: 0.6, delay, ease: [0.215, 0.61, 0.355, 1] },
  }
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', service: '', budget: '', message: '' })
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const { hash } = useLocation()

  useEffect(() => {
    if (hash === '#enquiry-form') {
      const el = document.getElementById('enquiry-form')
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
    }
  }, [hash])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await api.post('/enquiries', form)
      setSent(true)
      setForm({ name: '', email: '', phone: '', company: '', service: '', budget: '', message: '' })
    } catch {
      setError('Something went wrong. Please try again or email us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <PageHero
        label="Get In Touch"
        title="Contact Us"
        subtitle="We'd love to hear about your project. Reach out and one of our team will respond within one business day."
        breadcrumb="Contact"
      />

      {/* Contact section */}
      <section id="contact" className="bg-gray-50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12">

            {/* Info panel */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact card */}
              <div className="rounded-2xl bg-[#f84d07] p-7 sm:p-8 text-white">
                <h3 className="text-xl font-bold mb-1">Contact Information</h3>
                <p className="text-white/70 text-sm mb-7">We typically respond within one business day.</p>
                <div className="space-y-5">
                  {info.map(({ label, value, icon }) => (
                    <div key={label} className="flex items-start gap-3">
                      <div className="mt-0.5 shrink-0 text-white/75">{icon}</div>
                      <div>
                        <p className="text-[11px] font-semibold text-white/55 uppercase tracking-wide">{label}</p>
                        <p className="text-sm font-medium text-white mt-0.5">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex gap-3">
                  {socials.map(({ label, href, icon }) => (
                    <a key={label} href={href} aria-label={label} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white/80 hover:bg-white hover:text-[#f84d07] transition-colors">
                      {icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Google Map */}
              <div className="rounded-2xl overflow-hidden h-48">
                <iframe
                  title="TayB Office Location"
                  src="https://maps.google.com/maps?q=The+Light+1+Commercial+Towers,+Arjan,+Dubai,+UAE&output=embed&z=15"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Form */}
            <div id="enquiry-form" className="lg:col-span-3 rounded-2xl bg-white p-6 sm:p-8 shadow-sm border border-gray-100">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 250 }}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f84d07]/10 text-[#f84d07] mb-4"
                  >
                    <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-500 text-sm mb-6">We'll be in touch within one business day.</p>
                  <button onClick={() => setSent(false)} className="text-sm font-semibold text-[#f84d07] hover:underline">Send another message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { name: 'name', label: 'Full Name *', placeholder: 'John Smith', type: 'text', required: true },
                      { name: 'email', label: 'Email Address *', placeholder: 'john@company.com', type: 'email', required: true },
                      { name: 'phone', label: 'Phone Number', placeholder: '+1 000 000 0000', type: 'tel' },
                      { name: 'company', label: 'Company / Organisation', placeholder: 'Your company', type: 'text' },
                    ].map(({ name, label, placeholder, type, required }) => (
                      <div key={name}>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">{label}</label>
                        <input
                          type={type}
                          name={name}
                          required={required}
                          value={form[name]}
                          onChange={handleChange}
                          placeholder={placeholder}
                          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-[#f84d07] focus:outline-none focus:ring-2 focus:ring-[#f84d07]/20"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">Service Needed</label>
                      <select name="service" value={form.service} onChange={handleChange} className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:border-[#f84d07] focus:outline-none focus:ring-2 focus:ring-[#f84d07]/20 bg-white">
                        <option value="">Select a service</option>
                        {['Building Construction', 'Renovation & Remodelling', 'Interior Design', 'Project Management', 'Land Survey & Planning', 'Other'].map((s) => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">Budget Range</label>
                      <select name="budget" value={form.budget} onChange={handleChange} className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:border-[#f84d07] focus:outline-none focus:ring-2 focus:ring-[#f84d07]/20 bg-white">
                        <option value="">Select budget</option>
                        {['Under $500K', '$500K – $2M', '$2M – $10M', '$10M – $50M', '$50M+'].map((b) => <option key={b}>{b}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">Project Details *</label>
                    <textarea name="message" required rows={5} value={form.message} onChange={handleChange} placeholder="Tell us about your project — location, size, timeline, and any specific requirements..." className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-[#f84d07] focus:outline-none focus:ring-2 focus:ring-[#f84d07]/20 resize-none" />
                  </div>

                  {error && (
                    <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">{error}</p>
                  )}
                  <button type="submit" disabled={submitting} className="w-full rounded-full bg-[#f84d07] py-3.5 text-sm font-semibold text-white hover:bg-[#d94206] disabled:opacity-60 transition-colors shadow flex items-center justify-center gap-2">
                    {submitting ? 'Sending…' : 'Send Message'}
                    {!submitting && <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* What happens next */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="mb-3">
              <RevealText>
                <p className="text-sm font-semibold tracking-widest uppercase text-[#f84d07]">After You Reach Out</p>
              </RevealText>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 uppercase">What Happens Next</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.12)}
                className="relative"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f84d07]/10 text-[#f84d07] mb-5">
                  {step.icon}
                </div>
                <p className="text-[11px] font-black text-[#f84d07]/50 tracking-[0.2em] uppercase mb-2">{step.number}</p>
                <h3 className="text-lg font-black text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
