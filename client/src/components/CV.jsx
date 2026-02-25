import { motion } from 'framer-motion';
import { Download, Eye } from 'lucide-react';
import { useInView } from '../hooks/useInView';

export default function CV() {
  const [ref, inView] = useInView(0.2);

  return (
    <section id="cv" style={{
      padding: '6rem 0',
      background: 'var(--surface)',
      borderTop: '1px solid var(--border)',
      textAlign: 'center',
    }}>
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label" style={{ justifyContent: 'center' }}>Resume</div>
          <h2 className="section-title" style={{ marginBottom: '0.75rem' }}>Download My CV</h2>
          <p className="section-desc" style={{ margin: '0 auto 3rem' }}>
            Everything about my experience, skills, and achievements — all in one document.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.65, delay: 0.15 }}
          style={{
            maxWidth: 600, margin: '0 auto',
            background: 'var(--card)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)', padding: '3rem',
            position: 'relative', overflow: 'hidden',
          }}
        >
          {/* Background conic gradient */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at 50% 0%, rgba(129,140,248,0.08) 0%, transparent 60%)',
            pointerEvents: 'none',
          }} />

          <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>📄</div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.5rem', marginBottom: '0.75rem' }}>
            Software Engineer Resume
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '2rem', fontWeight: 300 }}>
            My full resume includes detailed work history, technical skills, education, certifications, and notable projects. Updated regularly.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/api/cv/download" download className="btn-primary">
              <Download size={16} /> Download PDF
            </a>
            <a href="/api/cv/download" target="_blank" rel="noreferrer" className="btn-outline">
              <Eye size={16} /> Preview
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
