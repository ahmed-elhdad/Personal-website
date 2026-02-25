export default function Footer() {
  return (
    <footer style={{
      padding: '2rem 3rem',
      borderTop: '1px solid var(--border)',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      flexWrap: 'wrap', gap: '1rem',
      background: 'var(--surface)',
    }}>
      <div style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>
        © 2026 Software Engineer. Built with React + Node.js ❤️
      </div>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        {['#home', '#projects', '#contact'].map(href => (
          <button key={href}
            onClick={() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              background: 'none', border: 'none', color: 'var(--muted)',
              fontSize: '0.82rem', cursor: 'pointer', transition: 'color 0.2s',
              fontFamily: 'var(--font-body)',
            }}
            onMouseEnter={e => e.target.style.color = 'var(--accent)'}
            onMouseLeave={e => e.target.style.color = 'var(--muted)'}
          >
            {href.slice(1).charAt(0).toUpperCase() + href.slice(2)}
          </button>
        ))}
      </div>
    </footer>
  );
}
