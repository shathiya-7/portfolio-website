import { FormEvent, MouseEvent, useEffect, useRef, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Copy,
  Mail,
  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react"

const projects = [
  {
    number: "01",
    title: "Automated Dependency Vulnerability Patching System",
    description:
      "A security-first automation pipeline that finds vulnerable dependencies, validates patches, and turns fixes into reviewable pull requests.",
    tags: ["GitHub Actions", "Trivy", "PostgreSQL", "AWS Lambda", "Slack"],
    visual: "security",
  },
  {
    number: "02",
    title: "RailCue — Dynamic Train ETA Prediction",
    description:
      "A data-driven arrival engine that translates live and historical rail signals into practical, continuously improving ETA predictions.",
    tags: ["Python", "XGBoost", "FastAPI", "Pandas", "Supabase"],
    visual: "rail",
  },
  {
    number: "03",
    title: "FinProof — Financial Reliability Passport",
    description:
      "A portable reliability profile helping gig workers organize and present verifiable financial information with clarity and control.",
    tags: ["Fintech", "Data systems", "Verification", "Product design"],
    visual: "finance",
  },
]

const skillGroups = [
  {
    title: "Languages",
    skills: ["C", "C++", "Python", "HTML5", "CSS3", "JavaScript", "SQL"],
  },
  {
    title: "Development",
    skills: ["React", "Node.js", "Supabase", "MySQL"],
  },
  {
    title: "DevOps & Cloud",
    skills: ["Git", "GitHub", "Docker", "AWS"],
  },
  {
    title: "Cybersecurity",
    skills: [
      "Penetration Testing",
      "Vulnerability Assessment",
      "Web Security",
      "Privilege Escalation",
      "Linux / Windows Security",
      "Network Enumeration",
    ],
  },
  {
    title: "CS Fundamentals",
    skills: ["DSA", "OOP", "DBMS", "Design & Analysis of Algorithms"],
  },
]

const timelineItems = [
  {
    date: "SEP — OCT 2026",
    type: "Experience",
    meta: "THIRANEX EDUTECH LLP",
    title: "Cybersecurity Intern",
    text: "Applied security practices · Vulnerability assessment · Hands-on cybersecurity workflows",
  },
  {
    date: "2026 — PRESENT",
    type: "Leadership",
    meta: "IIITDM KANCHEEPURAM",
    title: "Coordinator, Developers Club",
    text: "DevOps · Open source · Community building ",
  },
  {
    date: "2026 — PRESENT",
    type: "Leadership",
    meta: "IIITDM KANCHEEPURAM",
    title: "Coordinator, Cybersecurity Club",
    text: "Security labs · CTF learning · Cyber awareness",
  },
  {
    date: "2025 — 2029",
    type: "Education",
    meta: "IIITDM KANCHEEPURAM",
    title: "B.Tech, Computer Science & Engineering",
    text: "2nd year Undergraduate student",
  },
  {
    date: "2025",
    type: "Schooling",
    meta: "SECONDARY & SENIOR SECONDARY EDUCATION",
    title: "JEE Main: 98 Percentile",
    text: "CBSE: Class XII- 95.6% , Class X- 97.6%",
  },
]

const publicWork = [
  {
    label: "ECSoC",
    title: "Open-Source Contributor",
    text: "Contributing, collaborating, and learning in public through real open-source work.",
    image: "assets/ecsoc.png",
    imageAlt: "ECSoC Elite Coders Summer of Code contributor badge",
  },
  {
    label: "SHEFI",
    title: "Season 17 Scholar",
    text: "Awarded a full scholarship to learn alongside a global community exploring Web3.",
    image: "assets/shefi.jpg",
    imageAlt: "You Can Do It with SheFi Season Seventeen artwork",
  },
  {
    label: "GIRLS WHO YAP",
    title: "GWY Fellowship 2.0",
    text: "Growing through a cohort built around ideas, expression, and community.",
    image: "assets/gwy-acceptance-shathiya-k.png",
    imageAlt: "Girls Who Yap Fellowship 2.0 acceptance artwork",
  },
]

const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-12%" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
}

function MagneticLink({
  href,
  children,
  filled = false,
}: {
  href: string
  children: React.ReactNode
  filled?: boolean
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const reduceMotion = useReducedMotion()

  const move = (event: MouseEvent<HTMLAnchorElement>) => {
    if (reduceMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (event.clientX - rect.left - rect.width / 2) * 0.12
    const y = (event.clientY - rect.top - rect.height / 2) * 0.18
    ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
  }

  const reset = () => {
    if (ref.current) ref.current.style.transform = ""
  }

  return (
    <a
      ref={ref}
      href={href}
      className={`magnetic-link ${filled ? "filled" : ""}`}
      onMouseMove={move}
      onMouseLeave={reset}
    >
      {children}
      <ArrowUpRight size={15} strokeWidth={1.8} />
    </a>
  )
}

function SectionHeading({
  index,
  kicker,
  title,
  className = "",
}: {
  index: string
  kicker: string
  title: string
  className?: string
}) {
  return (
    <motion.div className={`section-heading ${className}`} {...reveal}>
      <div className="section-label">
        <span>{index}</span>
        <span>{kicker}</span>
      </div>
      <h2>{title}</h2>
    </motion.div>
  )
}

function ProjectVisual({ type }: { type: string }) {
  if (type === "security") {
    return (
      <div
        className="project-visual security-visual selected-project-visual"
        aria-label="Scan to patch workflow diagram"
      >
        {["SCAN", "ASSESS", "PATCH", "TEST", "PR"].map((item, index) => (
          <div className="flow-step" key={item}>
            <span>0{index + 1}</span>
            <b>{item}</b>
            {index < 4 && <i />}
          </div>
        ))}
        <div className="scan-line" />
      </div>
    )
  }

  if (type === "rail") {
    return (
      <div
        className="project-visual rail-visual selected-project-visual"
        aria-label="Animated railway prediction diagram"
      >
        <div className="rail-line">
          {[0, 1, 2, 3].map((station) => (
            <span className={`station station-${station}`} key={station}>
              <i />
              <small>{["MAS", "TBM", "CGL", "VM"][station]}</small>
            </span>
          ))}
          <motion.div
            className="train-dot"
            animate={{ left: ["5%", "71%"] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        </div>
        <div className="eta-card">
          <span>NEXT ARRIVAL</span>
          <strong>08:42</strong>
          <small>± 2 min confidence</small>
        </div>
      </div>
    )
  }

  return (
    <div
      className="project-visual finance-visual selected-project-visual"
      aria-label="Illustrative financial dashboard"
    >
      <div className="score-ring">
        <span>RELIABILITY</span>
        <strong>782</strong>
        <small>Illustrative score</small>
      </div>
      <div className="finance-stats">
        <div>
          <span>INCOME VERIFIED</span>
          <b>₹42,800</b>
        </div>
        <div>
          <span>CONSISTENCY</span>
          <b>+12.4%</b>
        </div>
        <div className="mini-bars">
          {[44, 62, 55, 76, 68, 86, 92].map((height, index) => (
            <i key={index} style={{ height: `${height}%` }} />
          ))}
        </div>
      </div>
    </div>
  )
}

function InteractiveCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return

    let activeSection: HTMLElement | null = null

    const move = (event: globalThis.MouseEvent) => {
      dotRef.current?.style.setProperty(
        "transform",
        `translate3d(${event.clientX}px, ${event.clientY}px, 0)`,
      )
      ringRef.current?.style.setProperty(
        "transform",
        `translate3d(${event.clientX}px, ${event.clientY}px, 0)`,
      )
      dotRef.current?.classList.add("is-visible")
      ringRef.current?.classList.add("is-visible")
    }
    const hover = (event: globalThis.MouseEvent) => {
      const target = event.target as HTMLElement
      ringRef.current?.classList.toggle(
        "is-active",
        Boolean(target.closest("a, button, input, textarea, label")),
      )
    }
    const press = () => ringRef.current?.classList.add("is-pressed")
    const release = () => ringRef.current?.classList.remove("is-pressed")
    const enter = () => {
      dotRef.current?.classList.add("is-visible")
      ringRef.current?.classList.add("is-visible")
    }
    const leave = () => {
      dotRef.current?.classList.remove("is-visible")
      ringRef.current?.classList.remove("is-visible")
    }
    const moveSectionGlow = (event: PointerEvent) => {
      const target = event.target as HTMLElement
      const section = target.closest<HTMLElement>(".section, .hero")
      if (activeSection && activeSection !== section) {
        activeSection.style.removeProperty("--section-cursor-x")
        activeSection.style.removeProperty("--section-cursor-y")
      }
      activeSection = section
      if (!section) return

      const bounds = section.getBoundingClientRect()
      section.style.setProperty(
        "--section-cursor-x",
        `${event.clientX - bounds.left}px`,
      )
      section.style.setProperty(
        "--section-cursor-y",
        `${event.clientY - bounds.top}px`,
      )
    }
    const clearSectionGlow = () => {
      activeSection?.style.removeProperty("--section-cursor-x")
      activeSection?.style.removeProperty("--section-cursor-y")
      activeSection = null
    }

    window.addEventListener("mousemove", move, { passive: true })
    window.addEventListener("pointermove", moveSectionGlow, { passive: true })
    document.addEventListener("mouseover", hover, { passive: true })
    window.addEventListener("mousedown", press)
    window.addEventListener("mouseup", release)
    document.documentElement.addEventListener("mouseenter", enter)
    document.documentElement.addEventListener("mouseleave", leave)
    document.documentElement.addEventListener("pointerleave", clearSectionGlow)
    return () => {
      window.removeEventListener("mousemove", move)
      window.removeEventListener("pointermove", moveSectionGlow)
      document.removeEventListener("mouseover", hover)
      window.removeEventListener("mousedown", press)
      window.removeEventListener("mouseup", release)
      document.documentElement.removeEventListener("mouseenter", enter)
      document.documentElement.removeEventListener("mouseleave", leave)
      document.documentElement.removeEventListener("pointerleave", clearSectionGlow)
    }
  }, [])

  return (
    <>
      <div className="cursor-dot" ref={dotRef} aria-hidden="true" />
      <div className="cursor-ring" ref={ringRef} aria-hidden="true" />
    </>
  )
}

export default function App() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0)
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [contactStatus, setContactStatus] = useState("")
  const headingRef = useRef<HTMLHeadingElement>(null)
  const portraitRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<number | null>(null)
  const reduceMotion = useReducedMotion()
  const letters = "SHATHIYA K.".split("")

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const interactWithHero = (event: MouseEvent<HTMLElement>) => {
    if (reduceMotion || window.matchMedia("(pointer: coarse)").matches) return
    if (frameRef.current) cancelAnimationFrame(frameRef.current)
    const clientX = event.clientX
    const clientY = event.clientY

    frameRef.current = requestAnimationFrame(() => {
      const heading = headingRef.current
      if (heading) {
        const rect = heading.getBoundingClientRect()
        heading.style.setProperty("--cursor-x", `${clientX - rect.left}px`)
        heading.style.setProperty("--cursor-y", `${clientY - rect.top}px`)
        heading
          .querySelectorAll<HTMLElement>(".name-letter")
          .forEach((letter) => {
            const box = letter.getBoundingClientRect()
            const dx = clientX - (box.left + box.width / 2)
            const dy = clientY - (box.top + box.height / 2)
            const distance = Math.sqrt(dx * dx + dy * dy)
            const strength = Math.max(0, 1 - distance / 150)
            letter.style.transform = `translate3d(${(-dx / 24) * strength}px, ${(-dy / 24) * strength}px, 0) scale(${1 + strength * 0.045})`
            letter.style.setProperty("--proximity", `${strength}`)
          })
      }

      if (portraitRef.current) {
        const box = portraitRef.current.getBoundingClientRect()
        const x = (clientX - box.left - box.width / 2) / box.width
        const y = (clientY - box.top - box.height / 2) / box.height
        portraitRef.current.style.setProperty("--photo-x", `${x * 10}px`)
        portraitRef.current.style.setProperty("--photo-y", `${y * 10}px`)
        portraitRef.current.style.setProperty(
          "--light-x",
          `${clientX - box.left}px`,
        )
        portraitRef.current.style.setProperty(
          "--light-y",
          `${clientY - box.top}px`,
        )
      }
    })
  }

  const resetHero = () => {
    headingRef.current
      ?.querySelectorAll<HTMLElement>(".name-letter")
      .forEach((letter) => {
        letter.style.transform = ""
        letter.style.setProperty("--proximity", "0")
      })
    portraitRef.current?.style.setProperty("--photo-x", "0px")
    portraitRef.current?.style.setProperty("--photo-y", "0px")
  }

  const copyEmail = async () => {
    await navigator.clipboard.writeText("kannanshathiya7@gmail.com")
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  const submitContactForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = String(formData.get("name") ?? "")
    const email = String(formData.get("email") ?? "")
    const subject = String(formData.get("subject") ?? "")
    const message = String(formData.get("message") ?? "")
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`
    const composeParams = new URLSearchParams({
      view: "cm",
      fs: "1",
      to: "kannanshathiya7@gmail.com",
      su: subject,
      body,
    })
    const composeUrl = `https://mail.google.com/mail/?${composeParams.toString()}`
    const composeWindow = window.open(composeUrl, "_blank")

    if (!composeWindow) {
      window.location.assign(composeUrl)
      return
    }

    composeWindow.opener = null
    setContactStatus("Gmail compose opened with your message ready to send.")
  }

  const navItems = [
    ["About", "#intro"],
    ["Projects", "#projects"],
    ["Toolbox", "#skills"],
    ["Experience", "#experience"],
    ["Contact", "#contact"],
  ]

  return (
    <div className="site-shell">
      <InteractiveCursor />
      <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <a className="monogram" href="#intro" aria-label="Shathiya K. home">
          Sha<span>.</span>
        </a>
        <nav className={menuOpen ? "open" : ""} aria-label="Primary navigation">
          {navItems.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <button
            className="icon-button theme-toggle"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={`Switch to ${
              theme === "dark" ? "light" : "dark"
            } theme`}
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button
            className="icon-button menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </header>

      <main>
        <section
          className="hero"
          id="intro"
          onMouseMove={interactWithHero}
          onMouseLeave={resetHero}
        >
          <div className="hero-grid" />
          <div className="hero-annotation annotation-one">
            37.14°N / 80.02°E
          </div>
          <div className="hero-annotation annotation-two">
            STATUS / BUILDING
          </div>

          <motion.div
            className="portrait-column"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="portrait-frame" ref={portraitRef}>
              <div className="portrait-cross cross-one">+</div>
              <div className="portrait-cross cross-two">+</div>
              <img
                src={`${import.meta.env.BASE_URL}assets/shathiya-portrait.jpeg`}
                alt="Shathiya K."
              />
              <div className="portrait-glow" />
              <div className="portrait-meta">
                <span>SUBJECT / Sha</span>
                <span>FRAME / 001</span>
              </div>
            </div>
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
          </motion.div>

          <div className="hero-content">
            <motion.p
              className="eyebrow"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
            >
              <span />
              CS STUDENT / BUILDER / EXPLORER
            </motion.p>
            <h1 ref={headingRef} aria-label="Shathiya K.">
              {letters.map((letter, index) => (
                <motion.span
                  className={`name-letter ${letter === " " ? "space" : ""}`}
                  key={`${letter}-${index}`}
                  initial={{ opacity: 0, y: 55, rotate: 2 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{
                    delay: 0.28 + index * 0.045,
                    duration: 0.65,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </h1>
            <motion.div
              className="hero-copy"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.78, duration: 0.7 }}
            >
              <p className="intro-line">
                Breaking code to understand it,
                <br />
                building systems to master it.
              </p>
              <p className="playful-line">
                Currently learning, building, and figuring out my niche.
              </p>
            </motion.div>
            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.65 }}
            >
              <MagneticLink href="#projects" filled>
                Explore my work
              </MagneticLink>
              <MagneticLink href="#contact">Let's connect</MagneticLink>
            </motion.div>
            <motion.div
              className="social-row"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.12 }}
            >
              <a
                href="https://github.com/shathiya-7"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <b className="social-mark">GH</b>
              </a>
              <a
                href="https://www.linkedin.com/in/shathiyakiiitdmk29/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <b className="social-mark linkedin-mark">in</b>
              </a>
              <span />
              <small>OPEN TO IDEAS & COLLABORATION</small>
            </motion.div>
          </div>

          <a className="scroll-cue" href="#projects">
            <span>Scroll to explore</span>
            <ArrowDown size={15} />
          </a>
          <div className="hero-disciplines">
            {["BUILD / SOFTWARE", "BREAK / SECURITY", "AUTOMATE / SYSTEMS"].map(
              (item) => (
                <span key={item}>{item}</span>
              ),
            )}
          </div>
        </section>

        <section className="section projects-section" id="projects">
          <SectionHeading
            index="01"
            kicker="Selected projects"
            title="THINGS I'VE BUILT."
          />
          <div className="projects-list">
            <div
              className="project-index"
              role="tablist"
              aria-label="Projects"
            >
              {projects.map((project, index) => (
                <button
                  className={`project-index-item ${activeProjectIndex === index ? "active" : ""}`}
                  id={`project-tab-${index}`}
                  key={project.title}
                  type="button"
                  role="tab"
                  aria-selected={activeProjectIndex === index}
                  aria-controls="project-details"
                  onClick={() => setActiveProjectIndex(index)}
                >
                  <span>{project.number}</span>
                  {project.title}
                  <ArrowUpRight size={16} />
                </button>
              ))}
            </div>
            <motion.article
              className="project-card active-project-card"
              key={projects[activeProjectIndex].title}
              id="project-details"
              role="tabpanel"
              aria-labelledby={`project-tab-${activeProjectIndex}`}
              {...reveal}
            >
              <div className="project-copy">
                <span className="project-number">
                  PROJECT / {projects[activeProjectIndex].number}
                </span>
                <h3>{projects[activeProjectIndex].title}</h3>
                <p>{projects[activeProjectIndex].description}</p>
                <div className="tag-list">
                  {projects[activeProjectIndex].tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
              <ProjectVisual type={projects[activeProjectIndex].visual} />
            </motion.article>
          </div>
        </section>

        <section className="section skills-section" id="skills">
          <SectionHeading
            index="02"
            kicker="Skills & systems"
            title="MY CURRENT TOOLBOX."
          />
          <div className="skills-layout">
            <motion.div className="skills-intro" {...reveal}>
              <p>
                A growing toolkit for turning curiosity into reliable, useful
                systems—from interfaces to infrastructure and security labs.
              </p>
              <div className="terminal-line">
                <span>$</span> learning --mode continuous
                <i />
              </div>
            </motion.div>
            <div className="skill-groups">
              {skillGroups.map((group, index) => (
                <motion.div
                  className="skill-group"
                  key={group.title}
                  {...reveal}
                  transition={{ ...reveal.transition, delay: index * 0.04 }}
                >
                  <h3>
                    <span>0{index + 1}</span>
                    {group.title}
                  </h3>
                  <div className="skill-badges">
                    {group.skills.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="section experience-section" id="experience">
          <SectionHeading
            index="03"
            kicker="Experience & education"
            title="THE PATH SO FAR."
          />
          <div className="timeline">
            {timelineItems.map((item) => (
              <motion.div className="timeline-row" key={item.title} {...reveal}>
                <div className="timeline-meta">
                  <span>{item.date}</span>
                  <i>{item.type}</i>
                </div>
                <div className="timeline-content">
                  <small>{item.meta}</small>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="section public-section">
          <SectionHeading
            index="04"
            kicker="Open source & fellowships"
            title="LEARNING IN PUBLIC."
            className="selected-public-heading"
          />
          <div className="public-grid">
            {publicWork.map((item, index) => (
              <motion.article
                key={item.label}
                {...reveal}
                transition={{ ...reveal.transition, delay: index * 0.08 }}
              >
                <img
                  className="public-image"
                  src={`${import.meta.env.BASE_URL}${item.image}`}
                  alt={item.imageAlt}
                />
                <span>
                  0{index + 1} / {item.label}
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="contact-glow" />
          <SectionHeading
            index="05"
            kicker="Contact"
            title="LET'S BUILD SOMETHING INTERESTING."
          />
          <div className="contact-grid">
            <motion.div className="contact-copy" {...reveal}>
              <p>
                Always happy to connect, collaborate, and explore interesting
                ideas.
              </p>
              <button className="copy-email" onClick={copyEmail}>
                <span>
                  <Mail size={16} />
                  kannanshathiya7@gmail.com
                </span>
                {copied ? <Check size={17} /> : <Copy size={17} />}
              </button>
              <div className="contact-links">
                <a
                  href="https://github.com/shathiya-7"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub <ArrowUpRight size={15} />
                </a>
                <a
                  href="https://www.linkedin.com/in/shathiyakiiitdmk29/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn <ArrowUpRight size={15} />
                </a>
              </div>
            </motion.div>
            <motion.form {...reveal} onSubmit={submitContactForm}>
              <div className="field-row">
                <label>
                  <span>Your name</span>
                  <input name="name" type="text" placeholder="Name" required />
                </label>
                <label>
                  <span>Your email</span>
                  <input
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                  />
                </label>
              </div>
              <label>
                <span>Subject</span>
                <input
                  name="subject"
                  type="text"
                  placeholder="What are we building?"
                  required
                />
              </label>
              <label>
                <span>Message</span>
                <textarea
                  name="message"
                  placeholder="Tell me a little about your idea..."
                  rows={4}
                  required
                />
              </label>
              <button className="contact-submit" type="submit">
                Open Gmail compose <ArrowUpRight size={15} />
              </button>
              <p className="contact-status" role="status" aria-live="polite">
                {contactStatus}
              </p>
            </motion.form>
          </div>
        </section>
      </main>

      <footer>
        <a className="monogram" href="#intro">
          Sha<span>.</span>
        </a>
        <p>Designed & built by Shathiya K. / 2026</p>
        <a href="#intro">
          Back to top <ArrowUpRight size={14} />
        </a>
      </footer>
    </div>
  )
}
