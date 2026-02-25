import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'CV', href: '#cv' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleLogoClick = () => {
    const next = logoClicks + 1;
    setLogoClicks(next);
    if (next >= 5) { setLogoClicks(0); navigate('/admin'); }
    setTimeout(() => setLogoClicks(0), 3000);
  };

  const navTo = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          padding: '1.1rem 3rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          background: scrolled ? 'rgba(7,9,14,0.9)' : 'transparent',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
          transition: 'all 0.4s ease',
        }}
      >
        <button
          onClick={handleLogoClick}
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '1.5rem',
            letterSpacing: '-0.03em',
            background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          SE.
        </button>

        {/* Desktop links */}
        <ul style={{ display: 'flex', gap: '2.25rem', listStyle: 'none', alignItems: 'center' }}
          className="desktop-nav">
          {links.map(l => (
            <li key={l.label}>
              <button onClick={() => navTo(l.href)} style={{
                background: 'none', border: 'none',
                color: 'var(--text-secondary)',
                fontSize: '0.82rem', fontWeight: 500,
                letterSpacing: '0.06em', textTransform: 'uppercase',
                cursor: 'pointer', transition: 'color 0.2s',
                fontFamily: 'var(--font-body)',
              }}
                onMouseEnter={e => e.target.style.color = 'var(--accent)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
              >{l.label}</button>
            </li>
          ))}
          <li>
            <button onClick={() => navTo('#contact')} className="btn-outline" style={{ padding: '0.5rem 1.25rem', fontSize: '0.82rem' }}>
              Contact
            </button>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)}
          style={{ display: 'none', color: 'var(--text)', background: 'none', border: 'none', cursor: 'pointer' }}
          className="mobile-toggle">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed', top: '60px', left: 0, right: 0, zIndex: 99,
              background: 'var(--surface)', borderBottom: '1px solid var(--border)',
              padding: '1.5rem',
              display: 'flex', flexDirection: 'column', gap: '0.5rem',
            }}
          >
            {links.map(l => (
              <button key={l.label} onClick={() => navTo(l.href)} style={{
                background: 'none', border: 'none', color: 'var(--text)',
                fontSize: '1rem', fontWeight: 500, padding: '0.75rem 1rem',
                textAlign: 'left', cursor: 'pointer', borderRadius: '8px',
                fontFamily: 'var(--font-body)',
                transition: 'background 0.2s',
              }}
                onMouseEnter={e => e.target.style.background = 'var(--card)'}
                onMouseLeave={e => e.target.style.background = 'none'}
              >{l.label}</button>
            ))}
            <button onClick={() => navTo('#contact')} className="btn-primary" style={{ marginTop: '0.5rem', justifyContent: 'center' }}>
              Contact
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
      `}</style>
    </>
  );
}
