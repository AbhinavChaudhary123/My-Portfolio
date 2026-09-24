import { useEffect, useState } from 'react'
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Code2,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Menu,
  MessageCircle,
  Monitor,
  Server,
  Sparkles,
  X,
  Send,
  Database,
  GraduationCap,
  BriefcaseBusiness,
  Play,
} from 'lucide-react'
import { profile, projects, skills } from './data'

function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      }),
      { threshold: 0.12 },
    )
    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

function App() {
  useReveal()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [resumeOpen, setResumeOpen] = useState(false)
  const [sent, setSent] = useState(false)

  const closeMobile = () => setMobileOpen(false)

  return (
    <div className="site-shell">
      <div className="noise" />
      <Navbar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} closeMobile={closeMobile} />
      <main>
        <Hero onHire={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact setSent={setSent} sent={sent} />
      </main>
      <Footer />

      {resumeOpen && <ResumeModal onClose={() => setResumeOpen(false)} />}

      <button
        className="resume-floating"
        onClick={() => setResumeOpen(true)}
        aria-label="Review resume"
        title="Review resume"
      >
        <BriefcaseBusiness size={17} />
        <span>Resume</span>
      </button>
    </div>
  )
}

function Navbar({ mobileOpen, setMobileOpen, closeMobile }) {
  const links = ['About', 'Skills', 'Projects', 'Experience', 'Contact']
  return (
    <header className="navbar-wrap">
      <nav className="navbar container">
        <a href="#home" className="brand" onClick={closeMobile}>
          <span className="brand-mark">AC</span>
          <span>ABHINAV CHAUDHARY<span className="brand-dot">.</span></span>
        </a>
        <div className={`nav-links ${mobileOpen ? 'open' : ''}`}>
          {links.map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} onClick={closeMobile}>{link}</a>
          ))}
          <a className="nav-cta" href="#contact" onClick={closeMobile}>Let's Talk <ArrowUpRight size={15} /></a>
        </div>
        <button className="menu-btn" onClick={() => setMobileOpen(v => !v)} aria-label="Toggle navigation">
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </nav>
    </header>
  )
}

function Hero({ onHire }) {
  return (
    <section id="home" className="hero container">
      <div className="hero-copy reveal">
        <div className="eyebrow"><span className="pulse-dot" /> AVAILABLE FOR OPPORTUNITIES</div>
        <h1>Building digital<br /><span>experiences</span> that work.</h1>
        <p className="hero-sub">
          I'm <strong>Abhinav Chaudhary</strong>, a Full Stack Developer and Technical Trainer focused on building responsive, scalable web applications and making complex technology easier to understand.
        </p>
        <div className="hero-actions">
          <button className="btn btn-primary" onClick={onHire}>Hire Me <ArrowUpRight size={18} /></button>
          <a className="btn btn-ghost" href="#projects">View Projects <ArrowDown size={17} /></a>
        </div>
        <div className="hero-meta">
          <span><Code2 size={15} /> MERN Stack</span>
          <span><Monitor size={15} /> Web Development</span>
          <span><Sparkles size={15} /> Technical Training</span>
        </div>
      </div>

      <div className="hero-visual reveal delay-1">
        <div className="visual-orbit orbit-one" />
        <div className="visual-orbit orbit-two" />
        <div className="profile-frame">
          <img src="/assets/profile.png" alt="Abhinav Chaudhary" />
          <div className="profile-label">
            <span>ABHINAV CHAUDHARY</span>
            <small>FULL STACK DEVELOPER</small>
          </div>
        </div>
        <div className="floating-chip chip-react"><span>REACT</span><i /></div>
        <div className="floating-chip chip-node"><span>NODE</span><i /></div>
        <div className="floating-chip chip-mongo"><span>MONGO</span><i /></div>
      </div>
    </section>
  )
}

function SectionHeading({ kicker, title, text }) {
  return (
    <div className="section-heading reveal">
      <span className="section-kicker">{kicker}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  )
}

function About() {
  return (
    <section id="about" className="section container">
      <SectionHeading kicker="01 / ABOUT" title={<>Developer by craft.<br /><span>Trainer by passion.</span></>} text="I enjoy turning ideas into useful products and helping other developers understand how the pieces fit together." />
      <div className="about-grid">
        <div className="about-copy reveal">
          <p className="large-copy">I’m currently pursuing a B.Tech in Information Technology at <strong>Babu Banarasi Das Institute of Technology and Management</strong>, while working as a Full Stack Development Trainer / Technical Trainer.</p>
          <p>My work sits at the intersection of product development and teaching. I build full-stack applications with React, Node.js, Express and MongoDB, while creating project-based learning material, coding exercises and technical content.</p>
          <p>My long-term goal is simple: <strong>become the best in the field</strong> by continuously building, learning and sharing.</p>
        </div>
        <div className="about-cards reveal delay-1">
          <InfoCard icon={<GraduationCap />} title="Education" value="B.Tech · Information Technology" sub="BBDITM, Lucknow · 2023–2027" />
          <InfoCard icon={<BriefcaseBusiness />} title="Current Role" value="Full Stack Development Trainer" sub="RankUp Technologies · Sep 2026–Present" />
          <InfoCard icon={<Code2 />} title="Specialization" value="Web Development" sub="Frontend · Backend · REST APIs" />
        </div>
      </div>
    </section>
  )
}

function InfoCard({ icon, title, value, sub }) {
  return (
    <div className="info-card">
      <div className="info-icon">{icon}</div>
      <div><span>{title}</span><strong>{value}</strong><small>{sub}</small></div>
    </div>
  )
}

function Skills() {
  return (
    <section id="skills" className="section section-dark">
      <div className="container">
        <SectionHeading kicker="02 / SKILLS" title={<>Tools I use to turn<br /><span>ideas into products.</span></>} text="A practical stack built around modern JavaScript, full-stack application development and clean user experiences." />
        <div className="skills-layout">
          <div className="skill-stack reveal">
            {skills.map((skill, index) => (
              <div className="skill-row" key={skill.name} style={{ '--delay': `${index * 45}ms` }}>
                <div className="skill-top"><span>{skill.name}</span><small>{skill.level}%</small></div>
                <div className="skill-track"><div className="skill-fill" style={{ width: `${skill.level}%` }} /></div>
              </div>
            ))}
          </div>
          <div className="stack-map reveal delay-1">
            <StackCard icon={<Monitor />} title="Frontend" items="React.js · JavaScript · HTML · CSS · Tailwind" />
            <StackCard icon={<Server />} title="Backend" items="Node.js · Express.js · REST APIs · MVC" />
            <StackCard icon={<Database />} title="Data & Cloud" items="MongoDB · Mongoose · MySQL · Cloudinary · Render" />
          </div>
        </div>
      </div>
    </section>
  )
}

function StackCard({ icon, title, items }) {
  return <div className="stack-card"><div className="stack-icon">{icon}</div><div><h3>{title}</h3><p>{items}</p></div></div>
}

function Projects() {
  return (
    <section id="projects" className="section container">
      <SectionHeading kicker="03 / SELECTED WORK" title={<>Things I’ve <span>built.</span></>} text="A selection of full-stack projects that show how I approach product thinking, APIs, data and frontend experience." />
      <div className="projects-list">
        {projects.map((project, index) => <ProjectCard key={project.name} project={project} index={index} />)}
      </div>
    </section>
  )
}

function ProjectCard({ project, index }) {
  return (
    <article className={`project-card ${project.theme} reveal`}>
      <div className="project-art">
        <div className="art-grid" />
        <div className="art-window">
          <div className="art-bar"><span /><span /><span /></div>
          <div className="art-content">
            <div className="art-title">{project.name}</div>
            <div className="art-lines"><i /><i /><i /></div>
            <div className="art-boxes"><b /><b /><b /></div>
          </div>
        </div>
        <span className="project-number">{project.number}</span>
      </div>
      <div className="project-info">
        <span className="project-type">{project.type}</span>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        <div className="tag-list">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        <div className="project-links">
          <a href={project.live} target="_blank" rel="noreferrer">Live Project <ExternalLink size={16} /></a>
          <a href={project.github} target="_blank" rel="noreferrer">GitHub <Github size={16} /></a>
        </div>
      </div>
    </article>
  )
}

function Experience() {
  return (
    <section id="experience" className="section section-dark">
      <div className="container">
        <SectionHeading kicker="04 / EXPERIENCE" title={<>Where I’m <span>growing.</span></>} />
        <div className="timeline reveal">
          <div className="timeline-line" />
          <div className="timeline-item">
            <div className="timeline-dot" />
            <div className="timeline-date">SEP 2026 — PRESENT</div>
            <div className="timeline-body">
              <span>RANKUP TECHNOLOGIES</span>
              <h3>Full Stack Development Trainer / Technical Trainer</h3>
              <p>Developing project-based learning materials, coding exercises and technical tutorials; creating programming and web-development content; simplifying complex concepts with practical examples; and delivering training across web-development domains.</p>
            </div>
          </div>
          <div className="timeline-item education-item">
            <div className="timeline-dot" />
            <div className="timeline-date">2023 — 2027</div>
            <div className="timeline-body">
              <span>BBDITM · LUCKNOW</span>
              <h3>B.Tech in Information Technology</h3>
              <p>Building a strong foundation in software development while turning classroom concepts into practical web projects.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Contact({ setSent, sent }) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true); setError(''); setSent(false)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form)
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Something went wrong.')
      setSent(true)
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      setError(err.message || 'Unable to send your message.')
    } finally { setLoading(false) }
  }

  return (
    <section id="contact" className="section contact-section container">
      <div className="contact-panel reveal">
        <div className="contact-copy">
          <span className="section-kicker">05 / CONTACT</span>
          <h2>Have an idea?<br /><span>Let’s build it.</span></h2>
          <p>Whether you’re a recruiter, a company with an opportunity, or someone with a product idea, send me a message. It will reach my inbox directly.</p>
          <a className="email-line" href={`mailto:${profile.email}`}><Mail size={18} /> {profile.email}</a>
          <div className="contact-socials">
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github /></a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label><span>Name</span><input name="name" value={form.name} onChange={handleChange} placeholder="Your name" required minLength={2} /></label>
            <label><span>Email</span><input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required /></label>
          </div>
          <label><span>Subject</span><input name="subject" value={form.subject} onChange={handleChange} placeholder="What would you like to talk about?" required minLength={3} /></label>
          <label><span>Message</span><textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell me a little about the opportunity or project..." rows="6" required minLength={10} /></label>
          {error && <div className="form-message error">{error}</div>}
          {sent && <div className="form-message success"><Check size={17} /> Message sent successfully. I’ll get back to you soon.</div>}
          <button className="btn btn-primary form-submit" disabled={loading}>{loading ? 'Sending…' : <>Send Message <Send size={17} /></>}</button>
        </form>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div><a href="#home" className="brand"><span className="brand-mark">AC</span><span>ABHINAV CHAUDHARY<span className="brand-dot">.</span></span></a><p>Building. Teaching. Learning.</p></div>
        <div className="footer-links"><a href={profile.github} target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a><a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn</a><a href={`mailto:${profile.email}`}><Mail size={16} /> Email</a></div>
        <div className="copyright">© {new Date().getFullYear()} Abhinav Chaudhary. All rights reserved.</div>
      </div>
    </footer>
  )
}

function ResumeModal({ onClose }) {
  return (
    <div className="modal-backdrop" onMouseDown={e => e.target === e.currentTarget && onClose()}>
      <div className="resume-modal">
        <div className="modal-head"><div><span>RESUME</span><h3>Abhinav Chaudhary</h3></div><button onClick={onClose}><X /></button></div>
        <iframe src={profile.resume} title="Abhinav Chaudhary Resume" />
        <div className="modal-actions">
          <a className="btn btn-primary" href={profile.resume} download><Download size={17} /> Download Resume</a>
          <a className="btn btn-ghost" href={profile.resume} target="_blank" rel="noreferrer"><ExternalLink size={17} /> Open Full Screen</a>
        </div>
      </div>
    </div>
  )
}

export default App
