import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import profileFace from "../assets/profile_face.jpg";

/* ── Animation variants ─────────────────────────────────────────── */
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const slideRight = {
  hidden: { opacity: 0, x: 48, scale: 0.96 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ── Component ──────────────────────────────────────────────────── */
export default function Hero({ projectCount }) {
  const scrollTo = (id) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative min-h-screen grid lg:grid-cols-2 grid-cols-1
                 items-center gap-16 px-6 lg:px-24 pt-28 pb-16 lg:pb-20 overflow-hidden"
    >
      {/* Ambient glows */}
      <div
        className="pointer-events-none absolute top-[8%] right-[4%] w-[520px] h-[520px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(129,140,248,0.13) 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-[4%] -left-[4%] w-[380px] h-[380px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(100,255,218,0.08) 0%, transparent 70%)",
        }}
      />

      {/* ══ LEFT — text ══════════════════════════════════════════════ */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col"
      >
        {/* Badge */}
        <motion.div variants={fadeUp} className="mb-7">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                           text-[11px] font-semibold tracking-[0.14em] uppercase border"
            style={{
              background: "rgba(100,255,218,0.06)",
              borderColor: "rgba(100,255,218,0.22)",
              color: "#64ffda",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#64ffda]"
              style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
            />
            Available for Work
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="font-display font-extrabold leading-[1.04] tracking-[-0.035em]
                     text-[clamp(2.8rem,4.5vw,5.4rem)] mb-6"
        >
          <span
            className="block"
            style={{
              background:
                "linear-gradient(180deg,#fff 35%,rgba(255,255,255,0.42))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Ahmed Mohamed
          </span>
          <span
            className="block"
            style={{
              background: "linear-gradient(135deg,#64ffda 0%,#818cf8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Software Engineer
          </span>
        </motion.h1>

        {/* Desc */}
        <motion.p
          variants={fadeUp}
          className="text-[1.05rem] font-light leading-[1.75] max-w-[460px] mb-9"
          style={{ color: "#94a3b8" }}
        >
          I craft exceptional digital experiences — scalable backends,
          pixel-perfect interfaces, and elegant architectures that stand the
          test of time.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-9">
          <button
            onClick={() => scrollTo("#projects")}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg
                       font-bold text-sm tracking-wide text-[#07090e]
                       bg-gradient-to-br from-[#64ffda] to-[#818cf8]
                       transition-all duration-300 hover:-translate-y-0.5
                       hover:shadow-[0_8px_32px_rgba(100,255,218,0.35)]"
          >
            View Projects <ArrowRight size={16} />
          </button>
          <a
            href="/api/cv/download"
            download
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-medium
                       text-sm border transition-all duration-300 hover:-translate-y-0.5
                       hover:border-[#64ffda] hover:text-[#64ffda] hover:bg-[rgba(100,255,218,0.06)]"
            style={{ borderColor: "rgba(255,255,255,0.1)", color: "#e2e8f0" }}
          >
            Download CV <Download size={15} />
          </a>
        </motion.div>

        {/* Socials */}
        <motion.div
          variants={fadeUp}
          className="flex gap-3 pb-6 border-b"
          style={{ borderColor: "rgba(255,255,255,0.07)" }}
        >
          {[
            {
              icon: <Github size={18} />,
              href: "https://github.com",
              label: "GitHub",
            },
            {
              icon: <Linkedin size={18} />,
              href: "https://linkedin.com",
              label: "LinkedIn",
            },
            {
              icon: <Mail size={18} />,
              href: "mailto:ahalhdad@gmail.com",
              label: "Email",
            },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className="w-10 h-10 flex items-center justify-center rounded-[10px] border
                          transition-all duration-300 hover:border-[#64ffda] hover:text-[#64ffda]
                          hover:-translate-y-0.5"
              style={{
                background: "#10161f",
                borderColor: "rgba(255,255,255,0.07)",
                color: "#94a3b8",
              }}
            >
              {s.icon}
            </a>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div variants={fadeUp} className="flex gap-10 pt-6">
          {[
            { value: "3+", label: "Years Exp." },
            { value: projectCount, label: "Projects" },
            { value: "∞", label: "Coffee ☕" },
          ].map((s) => (
            <div key={s.label}>
              <div
                className="font-display font-extrabold text-[2.1rem] leading-none"
                style={{ color: "#64ffda" }}
              >
                {s.value}
              </div>
              <div
                className="mt-1 text-[0.72rem] uppercase tracking-[0.09em]"
                style={{ color: "#475569" }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ══ RIGHT — photo ════════════════════════════════════════════ */}
      <motion.div
        variants={slideRight}
        initial="hidden"
        animate="visible"
        className="relative hidden lg:flex justify-center items-center"
      >
        <div className="relative w-[400px] h-[440px]">
          {/* Spinning gradient border */}
          <div
            className="absolute -inset-[3px] rounded-[26px] z-0"
            style={{
              background:
                "conic-gradient(from 0deg, #64ffda, #818cf8, transparent 50%, #64ffda)",
              animation: "spin-slow 8s linear infinite",
            }}
          />

          {/* Dark backing plate */}
          <div
            className="absolute inset-[2px] rounded-[24px] z-[1]"
            style={{ background: "#07090e" }}
          />

          {/* ── Face photo ── */}
          <div className="absolute inset-[5px] z-[2] rounded-[20px] overflow-hidden group">
            <img
              src={profileFace}
              alt="Profile"
              className="w-full h-full object-cover object-top
                         transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              style={{ filter: "contrast(1.06) saturate(1.05)" }}
            />
            {/* Bottom vignette */}
            <div
              className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to top, rgba(7,9,14,0.65) 0%, transparent 100%)",
              }}
            />
          </div>

          {/* Bottom glow */}
          <div
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-12 z-0 blur-2xl pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse, rgba(100,255,218,0.28), transparent 70%)",
            }}
          />
        </div>

        {/* Float chip — top right — cycles through specialties */}
        <CyclingFloatChip
          className="top-[5%] -right-5"
          style={{ animation: "float 3.5s ease-in-out infinite" }}
          roles={[
            {
              emoji: "⚡",
              label: "Specialty",
              value: "Full-Stack Dev",
              valueColor: "#e2e8f0",
            },
            {
              emoji: "🤖",
              label: "Specialty",
              value: "Junior ML Eng",
              valueColor: "#818cf8",
            },
            {
              emoji: "🎨",
              label: "Specialty",
              value: "UI / UX Dev",
              valueColor: "#64ffda",
            },
          ]}
        />

        {/* Float chip — bottom left */}
        <FloatChip
          emoji="🚀"
          label="Status"
          value="Open to Offers"
          valueColor="#64ffda"
          className="bottom-[14%] -left-5"
          style={{ animation: "float 3.5s ease-in-out 1.75s infinite" }}
        />
      </motion.div>

      {/* Keyframes */}
      <style>{`
        @keyframes pulse-dot {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.4; transform:scale(0.7); }
        }
        @keyframes float {
          0%,100% { transform:translateY(0); }
          50%     { transform:translateY(-10px); }
        }
        @keyframes spin-slow {
          from { transform:rotate(0deg); }
          to   { transform:rotate(360deg); }
        }
      `}</style>
    </section>
  );
}

/* ── Static floating chip ───────────────────────────────────────── */
function FloatChip({
  emoji,
  label,
  value,
  valueColor,
  className = "",
  style = {},
}) {
  return (
    <div
      className={`absolute flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl
                  border backdrop-blur-md z-10
                  shadow-[0_8px_32px_rgba(0,0,0,0.45)] ${className}`}
      style={{
        background: "rgba(16,22,31,0.92)",
        borderColor: "rgba(255,255,255,0.09)",
        ...style,
      }}
    >
      <span className="text-lg leading-none">{emoji}</span>
      <div>
        <div
          className="text-[0.61rem] uppercase tracking-wide mb-0.5"
          style={{ color: "#475569" }}
        >
          {label}
        </div>
        <div
          className="text-[0.82rem] font-semibold leading-none"
          style={{ color: valueColor ?? "#e2e8f0" }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}

/* ── Cycling floating chip — fades between roles every 2.5 s ───── */
function CyclingFloatChip({ roles, className = "", style = {} }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true); // drives opacity

  useEffect(() => {
    const DISPLAY = 2500; // ms each role is shown
    const FADE_OUT = 350; // ms fade-out before switching

    const timer = setInterval(() => {
      // 1. fade out
      setVisible(false);

      // 2. after fade, swap content and fade back in
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % roles.length);
        setVisible(true);
      }, FADE_OUT);
    }, DISPLAY + FADE_OUT);

    return () => clearInterval(timer);
  }, [roles.length]);

  const current = roles[index];

  return (
    <div
      className={`absolute flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl
                  border backdrop-blur-md z-10
                  shadow-[0_8px_32px_rgba(0,0,0,0.45)] ${className}`}
      style={{
        background: "rgba(16,22,31,0.92)",
        borderColor: "rgba(255,255,255,0.09)",
        minWidth: "148px",
        ...style,
      }}
    >
      {/* Emoji — slides up when changing */}
      <span
        className="text-lg leading-none"
        style={{
          display: "inline-block",
          transition: "opacity 0.35s ease, transform 0.35s ease",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(-6px)",
        }}
      >
        {current.emoji}
      </span>

      <div style={{ overflow: "hidden" }}>
        {/* Label */}
        <div
          className="text-[0.61rem] uppercase tracking-wide mb-0.5"
          style={{ color: "#475569" }}
        >
          {current.label}
        </div>

        {/* Value — slides up + fades */}
        <div
          className="text-[0.82rem] font-semibold leading-none whitespace-nowrap"
          style={{
            color: current.valueColor ?? "#e2e8f0",
            transition: "opacity 0.35s ease, transform 0.35s ease",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(6px)",
          }}
        >
          {current.value}
        </div>
      </div>
    </div>
  );
}
