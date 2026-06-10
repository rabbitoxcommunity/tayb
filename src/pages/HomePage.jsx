import Hero from '../components/Hero'
import About from '../components/About'
import Services from '../components/Services'
import Stats from '../components/Stats'
import Projects from '../components/Projects'
import Testimonials from '../components/Testimonials'
import CTA from '../components/CTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Stats />
      <Projects preview />
      <Testimonials />
      <CTA />
    </>
  )
}
