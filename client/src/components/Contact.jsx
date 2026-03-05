import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, MapPin, Send } from "lucide-react";
import { useInView } from "../hooks/useInView";
const contacts = [
  {
    icon: <Mail size={18} />,
    label: "Email",
    value: "ahalhdad2023@gmail.com",
    href: "mailto:ahalhdad2023@gmail.com",
  },
  {
    icon: <Linkedin size={18} />,
    label: "LinkedIn",
    value: "ahmed-alhdad",
    href: "https://www.linkedin.com/in/ahmed-alhdad/",
  },
  {
    icon: <Github size={18} />,
    label: "GitHub",
    value: "ahmed-elhdad",
    href: "https://github.com/ahmed-elhdad",
  },
  {
    icon: <MapPin size={18} />,
    label: "Location",
    value: "Cairo, Egypt",
    href: null,
  },
];
export default function Contact() {
  const handleSend = async () => {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: form.email,
        subject: form.subject,
        html: form.message,
      };

      // const transporter = nodemailer.createTransport({
      //   service: "gmail",
      //   auth: {
      //     user: process.env.EMAIL_USER,
      //     pass: process.env.EMAIL_PASS,
      //   },
      // });
      // transporter.sendMail(mailOptions, (error, info) => {
      //   if (error) {
      //     console.error("Error: ", error);
      //     return res.status(500).json({ error: "Failed to send email" });
      //   } else {
      //     console.log("Sent successfully:", info.response);
      //     return res
      //       .status(200)
      //       .json({ message: "Reset code sent to email", code: code }); // For testing only, remove in production
      //   }
      // });
    } catch (err) {
      setError("The message doesn't send");
    }
  };
  const [ref, inView] = useInView(0.1),
    [error, setError] = useState(""),
    [form, setForm] = useState({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  const [status, setStatus] = useState(null);

  const handle = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    setStatus("success");
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setStatus(null), 4000);
  };

  return (
    <section
      id="contact"
      style={{ padding: "6rem 0", background: "var(--bg)" }}
    >
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "3.5rem" }}
        >
          <div className="section-label">Get In Touch</div>
          <h2 className="section-title" style={{ marginBottom: "0.75rem" }}>
            Let's work together
          </h2>
          <p className="section-desc">
            Have a project in mind? I'd love to hear about it. Let's build
            something great.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.5fr",
            gap: "4rem",
            alignItems: "start",
          }}
        >
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {contacts.map((c) => (
              <ContactItem key={c.label} {...c} />
            ))}

            <div
              style={{
                marginTop: "2rem",
                paddingTop: "2rem",
                borderTop: "1px solid var(--border)",
              }}
            >
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "var(--muted)",
                  marginBottom: "1rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                Response time
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "var(--accent)",
                    flexShrink: 0,
                    animation: "pulse 2s infinite",
                  }}
                />
                <span style={{ fontSize: "0.9rem" }}>
                  Usually within 24 hours
                </span>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            onSubmit={submit}
            style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              <div className="form-group">
                <label className="form-label">Name</label>
                <input
                  className="form-input"
                  name="name"
                  value={form.name}
                  onChange={handle}
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  className="form-input"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handle}
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Subject</label>
              <input
                className="form-input"
                name="subject"
                value={form.subject}
                onChange={handle}
                placeholder="Project inquiry..."
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea
                className="form-input"
                name="message"
                value={form.message}
                onChange={handle}
                rows={5}
                placeholder="Tell me about your project..."
                required
              />
            </div>

            {status === "success" && (
              <div className="alert alert-success">
                ✓ Message sent! I'll get back to you soon.
              </div>
            )}

            <button
              type="submit"
              className="btn-primary"
              onClick={handleSend}
              style={{ width: "fit-content" }}
            >
              <Send size={15} /> Send Message
            </button>
          </motion.form>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #contact .container > div:last-child { grid-template-columns: 1fr !important; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; } 50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}

function ContactItem({ icon, label, value, href }) {
  const inner = (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        padding: "1rem 0",
        borderBottom: "1px solid var(--border)",
        color: "var(--text)",
        transition: "color 0.2s",
      }}
      onMouseEnter={(e) =>
        href && (e.currentTarget.style.color = "var(--accent)")
      }
      onMouseLeave={(e) =>
        href && (e.currentTarget.style.color = "var(--text)")
      }
    >
      <div
        style={{
          width: 42,
          height: 42,
          flexShrink: 0,
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "var(--transition)",
        }}
      >
        {icon}
      </div>
      <div>
        <div
          style={{
            fontSize: "0.72rem",
            color: "var(--muted)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            marginBottom: "0.1rem",
          }}
        >
          {label}
        </div>
        <div style={{ fontSize: "0.9rem", fontWeight: 500 }}>{value}</div>
      </div>
    </div>
  );

  return href ? (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{ textDecoration: "none" }}
    >
      {inner}
    </a>
  ) : (
    inner
  );
}
