import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

const cards = [
  { icon: '🏗️', title: 'Architecture', desc: 'Designing scalable systems built to grow' },
  { icon: '⚡', title: 'Performance', desc: 'Obsessed with speed — every ms counts' },
  { icon: '✨', title: 'Clean Code', desc: 'Readable, elegant solutions every time' },
  { icon: '🔒', title: 'Security', desc: 'Security-first mindset from day one' },
];

export default function About() {
  const [ref, inView] = useInView(0.15);

  return (
    <section id="about" style={{
      padding: '6rem 0',
      background: 'var(--surface)',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="section-label">Who I am</div>
          <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>
            Building the future,<br />one commit at a time.
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, fontWeight: 300, marginBottom: '1rem' }}>
            I'm a software engineer with a deep passion for creating <strong style={{ color: 'var(--text)', fontWeight: 500 }}>robust, scalable applications</strong> that solve real-world problems. I specialize in both frontend and backend development, bringing ideas from concept to production.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, fontWeight: 300, marginBottom: '1.5rem' }}>
            I thrive in collaborative environments, tackling complex challenges with <strong style={{ color: 'var(--text)', fontWeight: 500 }}>attention to detail and engineering excellence</strong>. When I'm not coding, I'm exploring new tech or contributing to open-source.
          </p>
          <a href="#contact" className="btn-outline" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
            Let's Talk →
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}
        >
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              whileHover={{ y: -6, borderColor: 'var(--border-hover)' }}
              style={{
                background: 'var(--card)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius)', padding: '1.5rem',
                cursor: 'default', transition: 'var(--transition)',
              }}
            >
              <div style={{ fontSize: '1.6rem', marginBottom: '0.75rem' }}>{c.icon}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.3rem' }}>{c.title}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.5 }}>{c.desc}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          #about .container { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  );
}
