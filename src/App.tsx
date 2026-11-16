import { useEffect, useState } from 'react'
import { Nav } from './components/Nav'
import { ScrollProgress } from './components/ScrollProgress'
import { Toaster } from './components/Toaster'
import { ResumeModal } from './components/ResumeModal'
import { Marquee } from './components/Marquee'
import { Hero } from './sections/Hero'
import { Snapshot } from './sections/Snapshot'
import { About } from './sections/About'
import { Campaigns } from './sections/Campaigns'
import { Dashboards } from './sections/Dashboards'
import { CaseStudies } from './sections/CaseStudies'
import { Process } from './sections/Process'
import { Experience } from './sections/Experience'
import { Leadership } from './sections/Leadership'
import { Skills } from './sections/Skills'
import { Personal } from './sections/Personal'
import { Contact, Footer } from './sections/Contact'
import { ScrollTrigger } from './lib/gsap'

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false)

  // Fonts/images settle layout after first paint — keep scroll-linked animations accurate.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    document.fonts?.ready.then(refresh)
    return () => window.removeEventListener('load', refresh)
  }, [])

  return (
    <>
      <a
        href="#campaigns"
        className="fixed left-4 top-4 z-[110] -translate-y-24 rounded-full bg-accent px-4 py-2 font-semibold text-ink focus:translate-y-0"
      >
        Skip to portfolio
      </a>
      <ScrollProgress />
      <Nav onResume={() => setResumeOpen(true)} />
      <main>
        <div id="home">
          <Hero onResume={() => setResumeOpen(true)} />
          <Marquee />
          <Snapshot />
        </div>
        <div id="about">
          <About />
        </div>
        <div id="work">
          <Campaigns />
          <Dashboards />
          <CaseStudies />
          <Process />
        </div>
        <div id="experience">
          <Experience />
          <Leadership />
        </div>
        <div id="skills">
          <Skills />
        </div>
        <div id="contact">
          <Personal />
          <Contact />
        </div>
      </main>
      <Footer />
      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
      <Toaster />
    </>
  )
}
