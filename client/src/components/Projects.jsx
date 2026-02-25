import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { useInView } from '../hooks/useInView';

export default function Projects({ projects }) {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="projects" style={{
      padding: '6rem 0',
      background: 'var(--surface)',
      borderTop: '1px solid var(--border)',
    }}>
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '3rem' }}
        >
          <div className="section-label">Portfolio</div>
          <h2 className="section-title" style={{ marginBottom: '0.75rem' }}>Featured Projects</h2>
          <p className="section-desc">A selection of work I'm proud of — side projects to production systems.</p>
        </motion.div>

        {projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            style={{
              textAlign: 'center', padding: '5rem 2rem',
              border: '1px dashed var(--border)', borderRadius: 'var(--radius-lg)',
              color: 'var(--muted)',
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀</div>
            <div style={{ fontSize: '0.95rem' }}>Projects will appear here once added via the admin panel.</div>
            <div style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: 'var(--muted)' }}>Click the logo 5× to access admin</div>
          </motion.div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '1.5rem',
          }}>
            {projects.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} inView={inView} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project: p, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
      style={{
        background: 'var(--card)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)', overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        transition: 'var(--transition)',
        cursor: 'default',
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(129,140,248,0.35)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
    >
      {/* Thumbnail / emoji */}
      <div style={{
        height: 180,
        background: p.thumbnail
          ? `url(${p.thumbnail}) center/cover`
          : 'linear-gradient(135deg, rgba(100,255,218,0.04) 0%, rgba(129,140,248,0.1) 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '3.5rem',
        borderBottom: '1px solid var(--border)',
        position: 'relative', overflow: 'hidden',
      }}>
        {!p.thumbnail && <span>{p.emoji || '💻'}</span>}
        {/* subtle grid pattern */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 0.3,
        }} />
      </div>

      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Tech chips */}
        {p.tech?.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.75rem' }}>
            {p.tech.slice(0, 4).map(t => (
              <span key={t} className="badge badge-purple" style={{ fontSize: '0.7rem' }}>{t}</span>
            ))}
            {p.tech.length > 4 && (
              <span style={{ fontSize: '0.7rem', color: 'var(--muted)', alignSelf: 'center' }}>+{p.tech.length - 4}</span>
            )}
          </div>
        )}

        <div style={{
          fontFamily: 'var(--font-display)', fontWeight: 700,
          fontSize: '1.1rem', marginBottom: '0.5rem', color: '#fff',
        }}>{p.title}</div>

        <div style={{
          fontSize: '0.85rem', color: 'var(--text-secondary)',
          lineHeight: 1.65, flex: 1,
        }}>{p.description}</div>

        {(p.github || p.live) && (
          <div style={{
            display: 'flex', gap: '1rem',
            marginTop: '1.25rem', paddingTop: '1rem',
            borderTop: '1px solid var(--border)',
          }}>
            {p.github && (
              <a href={p.github} target="_blank" rel="noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 500 }}>
                <Github size={13} /> GitHub
              </a>
            )}
            {p.live && (
              <a href={p.live} target="_blank" rel="noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: 'var(--accent2)', fontWeight: 500 }}>
                <ExternalLink size={13} /> Live Demo
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
