import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

const experience = [
  {
    num: '01', date: '2023 — Present',
    role: 'Software Engineer', company: 'Current Company · Full-time',
    desc: 'Leading development of core platform features, improving system performance by 40%, and mentoring junior developers. Driving architectural decisions for microservices migration.',
  },
  {
    num: '02', date: '2022 — 2023',
    role: 'Junior Software Engineer', company: 'Previous Company · Full-time',
    desc: 'Built and maintained RESTful APIs, collaborated on frontend features using React, and participated in agile sprints and code reviews.',
  },
  {
    num: '03', date: '2021 — 2022',
    role: 'Frontend Intern', company: 'Startup · Internship',
    desc: 'Developed responsive web interfaces, integrated REST APIs, and contributed to a UI component library used across all company products.',
  },
];

const education = [
  {
    num: '🎓', date: '2018 — 2022',
    role: "Bachelor's in Computer Science",
    company: 'Your University',
    desc: 'Graduated with honors. Focused on algorithms, data structures, software engineering, and distributed systems.',
  },
];

export default function Experience() {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="experience" style={{ padding: '6rem 0', background: 'var(--bg)' }}>
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '3rem' }}
        >
          <div className="section-label">Career</div>
          <h2 className="section-title">Experience & Education</h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
          <TimelineColumn title="Work Experience" items={experience} inView={inView} startDelay={0} />
          {/* <TimelineColumn title="Education" items={education} inView={inView} startDelay={0.2} /> */}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #experience .container > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function TimelineColumn({ title, items, inView, startDelay }) {
  return (
    <div>
      <h3 style={{
        fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem',
        color: 'var(--text-secondary)', textTransform: 'uppercase',
        letterSpacing: '0.1em', marginBottom: '2rem',
        display: 'flex', alignItems: 'center', gap: '0.75rem',
      }}>
        <span style={{ width: 24, height: 1, background: 'var(--muted)', display: 'inline-block' }} />
        {title}
      </h3>

      <div style={{ position: 'relative' }}>
        <div style={{
          position: 'absolute', left: 15, top: 8, bottom: 8, width: 1,
          background: 'linear-gradient(to bottom, var(--accent), var(--accent2), transparent)',
        }} />

        {items.map((item, i) => (
          <motion.div
            key={item.num}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: startDelay + i * 0.12 }}
            style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.75rem' }}
          >
            <div style={{
              width: 30, height: 30, flexShrink: 0,
              background: 'var(--card)', border: '2px solid var(--accent)',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.65rem', fontWeight: 700, color: 'var(--accent)',
              zIndex: 1, marginTop: 2,
            }}>{item.num}</div>

            <motion.div
              whileHover={{ borderColor: 'var(--border-hover)' }}
              style={{
                background: 'var(--card)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius)', padding: '1.25rem',
                flex: 1, transition: 'var(--transition)',
              }}
            >
              <div style={{ fontSize: '0.72rem', color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>{item.date}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', marginBottom: '0.2rem' }}>{item.role}</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '0.75rem' }}>{item.company}</div>
              <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
