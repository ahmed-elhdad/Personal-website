import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../api/client";
import {
  LogIn,
  LogOut,
  Plus,
  Trash2,
  LayoutDashboard,
  Layers,
  Upload,
  ArrowLeft,
  Eye,
  EyeOff,
  X,
} from "lucide-react";

export default function Admin() {
  const { user, login, logout, loading } = useAuth();
  const navigate = useNavigate();

  if (loading)
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--bg)",
        }}
      >
        <div className="spinner" style={{ width: 32, height: 32 }} />
      </div>
    );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        fontFamily: "var(--font-body)",
      }}
    >
      {/* Background effects */}
      <div
        style={{
          position: "fixed",
          top: "10%",
          right: "10%",
          width: 400,
          height: 400,
          background:
            "radial-gradient(circle, rgba(129,140,248,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: "10%",
          left: "5%",
          width: 300,
          height: 300,
          background:
            "radial-gradient(circle, rgba(100,255,218,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {user ? (
        <Dashboard
          user={user}
          logout={() => {
            logout();
            navigate("/");
          }}
          navigate={navigate}
        />
      ) : (
        <LoginPage onLogin={login} navigate={navigate} />
      )}
    </div>
  );
}

// ─── Login ────────────────────────────────────────────────────────────────────
function LoginPage({ onLogin, navigate }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await onLogin(email, password);
    } catch (err) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: "100%", maxWidth: 420 }}
      >
        <button
          onClick={() => navigate("/")}
          className="btn-ghost"
          style={{ marginBottom: "2rem" }}
        >
          <ArrowLeft size={16} /> Back to Portfolio
        </button>

        <div
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            padding: "2.5rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              background:
                "linear-gradient(90deg, var(--accent), var(--accent2))",
            }}
          />

          <div style={{ marginBottom: "2rem" }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: "var(--accent-dim)",
                border: "1px solid rgba(100,255,218,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.25rem",
              }}
            >
              <LogIn size={22} color="var(--accent)" />
            </div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.75rem",
                fontWeight: 800,
                marginBottom: "0.3rem",
              }}
            >
              Admin Portal
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
              Sign in to manage your portfolio
            </p>
          </div>

          <form
            onSubmit={submit}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                className="form-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@portfolio.com"
                required
                autoFocus
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={{ position: "relative" }}>
                <input
                  className="form-input"
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{ paddingRight: "2.75rem" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  style={{
                    position: "absolute",
                    right: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    color: "var(--muted)",
                    cursor: "pointer",
                  }}
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="alert alert-error">
                <X size={14} /> {error}
              </div>
            )}

            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
              style={{ justifyContent: "center", marginTop: "0.5rem" }}
            >
              {loading ? (
                <>
                  <div className="spinner" style={{ width: 16, height: 16 }} />{" "}
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn size={16} /> Sign In
                </>
              )}
            </button>
          </form>

          <p
            style={{
              marginTop: "1.5rem",
              fontSize: "0.75rem",
              color: "var(--muted)",
              textAlign: "center",
              lineHeight: 1.5,
            }}
          >
            Default: admin@portfolio.com / Admin@123!
            <br />
            Change in backend .env
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function Dashboard({ user, logout, navigate }) {
  const [tab, setTab] = useState("projects");
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    loadProjects();
    loadSkills();
  }, []);

  const loadProjects = () =>
    api
      .getProjects()
      .then((d) => setProjects(d.projects || []))
      .catch(() => {});
  const loadSkills = () =>
    api
      .getSkills()
      .then((d) => setSkills(d.skills || []))
      .catch(() => {});

  const tabs = [
    { id: "projects", label: "Projects", icon: <LayoutDashboard size={16} /> },
    { id: "skills", label: "Skills", icon: <Layers size={16} /> },
    { id: "cv", label: "Upload CV", icon: <Upload size={16} /> },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "240px 1fr",
        minHeight: "100vh",
      }}
    >
      {/* Sidebar */}
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        style={{
          background: "var(--surface)",
          borderRight: "1px solid var(--border)",
          padding: "2rem 1.25rem",
          display: "flex",
          flexDirection: "column",
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >
        <div style={{ marginBottom: "2.5rem" }}>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "1.25rem",
              background:
                "linear-gradient(135deg, var(--accent), var(--accent2))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "0.3rem",
            }}
          >
            SE. Admin
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
            {user.email}
          </div>
        </div>

        <nav
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
          }}
        >
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.7rem 1rem",
                borderRadius: 8,
                border: "none",
                background: tab === t.id ? "var(--accent-dim)" : "transparent",
                color: tab === t.id ? "var(--accent)" : "var(--text-secondary)",
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                fontSize: "0.875rem",
                cursor: "pointer",
                transition: "all 0.2s",
                textAlign: "left",
                borderLeft: `2px solid ${tab === t.id ? "var(--accent)" : "transparent"}`,
              }}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </nav>

        <div
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <button
            onClick={() => navigate("/")}
            className="btn-ghost"
            style={{ justifyContent: "flex-start", fontSize: "0.82rem" }}
          >
            <ArrowLeft size={15} /> View Site
          </button>
          <button
            onClick={logout}
            className="btn-ghost"
            style={{
              justifyContent: "flex-start",
              fontSize: "0.82rem",
              color: "var(--red)",
            }}
          >
            <LogOut size={15} /> Sign Out
          </button>
        </div>
      </motion.div>

      {/* Content */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{ padding: "3rem", overflow: "auto" }}
      >
        <AnimatePresence mode="wait">
          {tab === "projects" && (
            <ProjectsTab
              key="projects"
              projects={projects}
              onRefresh={loadProjects}
            />
          )}
          {tab === "skills" && (
            <SkillsTab key="skills" skills={skills} onRefresh={loadSkills} />
          )}
          {tab === "cv" && <CVTab key="cv" />}
        </AnimatePresence>
      </motion.main>
    </div>
  );
}

// ─── Projects Tab ─────────────────────────────────────────────────────────────
function ProjectsTab({ projects, onRefresh }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    tech: "",
    github: "",
    live: "",
    emoji: "💻",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const handle = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      await api.createProject(fd);
      setMsg({ type: "success", text: "✓ Project added successfully!" });
      setForm({
        title: "",
        description: "",
        tech: "",
        github: "",
        live: "",
        emoji: "💻",
      });
      onRefresh();
    } catch (err) {
      setMsg({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  const del = async (id) => {
    if (!confirm("Delete this project?")) return;
    await api.deleteProject(id).catch(() => {});
    onRefresh();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.5rem",
          fontWeight: 800,
          marginBottom: "0.25rem",
        }}
      >
        Projects
      </h2>
      <p
        style={{
          color: "var(--text-secondary)",
          fontSize: "0.875rem",
          marginBottom: "2.5rem",
        }}
      >
        Add and manage your portfolio projects
      </p>

      {/* Add form */}
      <div
        style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          padding: "2rem",
          marginBottom: "2.5rem",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            marginBottom: "1.5rem",
            fontSize: "1rem",
          }}
        >
          Add New Project
        </h3>
        <form
          onSubmit={submit}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          }}
        >
          <div className="form-group" style={{ gridColumn: "1/-1" }}>
            <label className="form-label">Project Title *</label>
            <input
              className="form-input"
              name="title"
              value={form.title}
              onChange={handle}
              placeholder="My Awesome Project"
              required
            />
          </div>
          <div className="form-group" style={{ gridColumn: "1/-1" }}>
            <label className="form-label">Description *</label>
            <textarea
              className="form-input"
              name="description"
              value={form.description}
              onChange={handle}
              rows={3}
              placeholder="What does this project do?"
              required
            />
          </div>
          <div className="form-group" style={{ gridColumn: "1/-1" }}>
            <label className="form-label">Technologies (comma-separated)</label>
            <input
              className="form-input"
              name="tech"
              value={form.tech}
              onChange={handle}
              placeholder="React, Node.js, PostgreSQL"
            />
          </div>
          <div className="form-group">
            <label className="form-label">GitHub URL</label>
            <input
              className="form-input"
              name="github"
              value={form.github}
              onChange={handle}
              placeholder="https://github.com/..."
            />
          </div>
          <div className="form-group">
            <label className="form-label">Live Demo URL</label>
            <input
              className="form-input"
              name="live"
              value={form.live}
              onChange={handle}
              placeholder="https://myproject.com"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Emoji Icon</label>
            <input
              className="form-input"
              name="emoji"
              value={form.emoji}
              onChange={handle}
              placeholder="💻"
            />
          </div>

          {msg && (
            <div
              className={`alert alert-${msg.type}`}
              style={{ gridColumn: "1/-1" }}
            >
              {msg.text}
            </div>
          )}

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{ gridColumn: "1/-1", width: "fit-content" }}
          >
            {loading ? (
              <>
                <div className="spinner" style={{ width: 16, height: 16 }} />{" "}
                Adding...
              </>
            ) : (
              <>
                <Plus size={16} /> Add Project
              </>
            )}
          </button>
        </form>
      </div>

      {/* List */}
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          marginBottom: "1.25rem",
        }}
      >
        All Projects{" "}
        <span
          style={{
            color: "var(--muted)",
            fontWeight: 400,
            fontSize: "0.875rem",
          }}
        >
          ({projects.length})
        </span>
      </h3>
      {projects.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "3rem",
            border: "1px dashed var(--border)",
            borderRadius: "var(--radius-lg)",
            color: "var(--muted)",
          }}
        >
          No projects yet. Add your first one above!
        </div>
      ) : (
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
        >
          {projects.map((p) => (
            <div
              key={p.id}
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: "1.25rem",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <span style={{ fontSize: "1.75rem" }}>{p.emoji || "💻"}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, marginBottom: "0.15rem" }}>
                  {p.title}
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>
                  {p.tech?.join(", ")} ·{" "}
                  {new Date(p.createdAt).toLocaleDateString()}
                </div>
              </div>
              <button
                onClick={() => del(p.id)}
                style={{
                  background: "none",
                  border: "1px solid var(--border)",
                  color: "var(--text-secondary)",
                  borderRadius: 8,
                  padding: "0.5rem",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--red)";
                  e.currentTarget.style.color = "var(--red)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.color = "var(--text-secondary)";
                }}
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ─── Skills Tab ───────────────────────────────────────────────────────────────
function SkillsTab({ skills, onRefresh }) {
  const [category, setCategory] = useState("");
  const [skillName, setSkillName] = useState("");
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const categories = skills.map((s) => s.category);

  const add = async (e) => {
    e.preventDefault();
    if (!skillName) return;
    setLoading(true);
    setMsg(null);
    try {
      await api.addSkill(category || categories[0] || "Frontend", skillName);
      setMsg({ type: "success", text: `✓ "${skillName}" added!` });
      setSkillName("");
      onRefresh();
    } catch (err) {
      setMsg({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  const remove = async (cat, skill) => {
    await api.removeSkill(cat, skill).catch(() => {});
    onRefresh();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.5rem",
          fontWeight: 800,
          marginBottom: "0.25rem",
        }}
      >
        Skills
      </h2>
      <p
        style={{
          color: "var(--text-secondary)",
          fontSize: "0.875rem",
          marginBottom: "2.5rem",
        }}
      >
        Manage your technical skills by category
      </p>

      {/* Add form */}
      <div
        style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          padding: "2rem",
          marginBottom: "2.5rem",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            marginBottom: "1.5rem",
            fontSize: "1rem",
          }}
        >
          Add Skill
        </h3>
        <form
          onSubmit={add}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr auto",
            gap: "1rem",
            alignItems: "end",
          }}
        >
          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              className="form-input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
              <option value="new">+ New Category</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Skill Name</label>
            <input
              className="form-input"
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
              placeholder="e.g. TypeScript"
              required
            />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? (
              <div className="spinner" style={{ width: 16, height: 16 }} />
            ) : (
              <>
                <Plus size={16} /> Add
              </>
            )}
          </button>
          {msg && (
            <div
              className={`alert alert-${msg.type}`}
              style={{ gridColumn: "1/-1" }}
            >
              {msg.text}
            </div>
          )}
        </form>
      </div>

      {/* Skills grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "1.25rem",
        }}
      >
        {skills.map((cat) => (
          <div
            key={cat.id || cat.category}
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              padding: "1.5rem",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "0.85rem",
                color: "var(--accent)",
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span>{cat.icon}</span> {cat.category}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {cat.skills.map((skill) => (
                <div
                  key={skill}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid var(--border)",
                    borderRadius: 6,
                    padding: "0.3rem 0.6rem",
                    fontSize: "0.78rem",
                  }}
                >
                  {skill}
                  <button
                    onClick={() => remove(cat.category, skill)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "var(--muted)",
                      display: "flex",
                      alignItems: "center",
                      padding: 0,
                      lineHeight: 1,
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--red)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--muted)")
                    }
                  >
                    <X size={11} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── CV Tab ───────────────────────────────────────────────────────────────────
function CVTab() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const upload = async (e) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    setMsg(null);
    try {
      const fd = new FormData();
      fd.append("cv", file);
      await api.uploadCV(fd);
      setMsg({
        type: "success",
        text: "✓ CV uploaded successfully! It's now downloadable from the portfolio.",
      });
      setFile(null);
    } catch (err) {
      setMsg({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.5rem",
          fontWeight: 800,
          marginBottom: "0.25rem",
        }}
      >
        Upload CV
      </h2>
      <p
        style={{
          color: "var(--text-secondary)",
          fontSize: "0.875rem",
          marginBottom: "2.5rem",
        }}
      >
        Upload your resume PDF to make it downloadable from the portfolio
      </p>

      <div style={{ maxWidth: 500 }}>
        <div
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            padding: "2.5rem",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "3rem", marginBottom: "1.25rem" }}>📄</div>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              marginBottom: "0.5rem",
            }}
          >
            Resume PDF
          </h3>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.875rem",
              marginBottom: "2rem",
              lineHeight: 1.6,
            }}
          >
            Upload your CV as a PDF file. Max 15MB. This will immediately be
            available for download on your portfolio.
          </p>

          <form
            onSubmit={upload}
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
          >
            <label
              style={{
                border: `2px dashed ${file ? "var(--accent)" : "var(--border)"}`,
                borderRadius: "var(--radius)",
                padding: "2rem",
                cursor: "pointer",
                transition: "border-color 0.2s",
                background: file ? "var(--accent-dim)" : "transparent",
              }}
            >
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
              {file ? (
                <div style={{ color: "var(--accent)" }}>
                  <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
                    ✓
                  </div>
                  <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>
                    {file.name}
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--text-secondary)",
                      marginTop: "0.25rem",
                    }}
                  >
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </div>
                </div>
              ) : (
                <div style={{ color: "var(--text-secondary)" }}>
                  <Upload
                    size={28}
                    style={{ marginBottom: "0.5rem", opacity: 0.5 }}
                  />
                  <div style={{ fontSize: "0.875rem" }}>
                    Click to select PDF
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      marginTop: "0.25rem",
                      opacity: 0.7,
                    }}
                  >
                    Max 15MB
                  </div>
                </div>
              )}
            </label>

            {msg && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}

            <button
              type="submit"
              className="btn-primary"
              disabled={!file || loading}
              style={{ justifyContent: "center" }}
            >
              {loading ? (
                <>
                  <div className="spinner" style={{ width: 16, height: 16 }} />{" "}
                  Uploading...
                </>
              ) : (
                <>
                  <Upload size={16} /> Upload CV
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
