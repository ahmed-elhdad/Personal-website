import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

export default function Skills({ skills }) {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="skills" style={{ padding: '6rem 0', background: 'var(--bg)' }}>
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '3rem' }}
        >
          <div className="section-label">Expertise</div>
          <h2 className="section-title" style={{ marginBottom: '0.75rem' }}>Technical Skills</h2>
          <p className="section-desc">Technologies I work with daily and have mastered over the years.</p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.25rem',
        }}>
          {skills.map((cat, i) => (
            <motion.div
              key={cat.id || cat.category}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.75rem',
                position: 'relative', overflow: 'hidden',
                cursor: 'default',
                transition: 'var(--transition)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(100,255,218,0.2)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)';
              }}
            >
              {/* Top accent line */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0,
                height: 2,
                background: 'linear-gradient(90deg, var(--accent), var(--accent2))',
              }} />

              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.6rem',
                fontFamily: 'var(--font-display)', fontWeight: 700,
                fontSize: '0.85rem', color: 'var(--accent)',
                textTransform: 'uppercase', letterSpacing: '0.1em',
                marginBottom: '1.25rem',
              }}>
                <span style={{ fontSize: '1.1rem' }}>{cat.icon}</span>
                {cat.category}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {cat.skills.map(skill => (
                  <motion.span
                    key={skill}
                    whileHover={{ scale: 1.05 }}
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid var(--border)',
                      color: 'var(--text)',
                      padding: '0.3rem 0.75rem',
                      borderRadius: 6,
                      fontSize: '0.8rem',
                      cursor: 'default',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'var(--accent-dim)';
                      e.currentTarget.style.borderColor = 'var(--accent)';
                      e.currentTarget.style.color = 'var(--accent)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                      e.currentTarget.style.borderColor = 'var(--border)';
                      e.currentTarget.style.color = 'var(--text)';
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
