const BASE = '/api';

function getToken() {
  return localStorage.getItem('portfolio_token');
}

function authHeaders() {
  const t = getToken();
  return t ? { Authorization: `Bearer ${t}` } : {};
}

async function request(method, path, body, isForm = false) {
  const headers = { ...authHeaders() };
  if (!isForm && body) headers['Content-Type'] = 'application/json';

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: isForm ? body : body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);
  return data;
}

export const api = {
  // Auth
  login: (email, password) => request('POST', '/auth/login', { email, password }),
  me: () => request('GET', '/auth/me'),

  // Projects
  getProjects: () => request('GET', '/projects'),
  getProject: (id) => request('GET', `/projects/${id}`),
  createProject: (form) => request('POST', '/projects', form, true),
  updateProject: (id, data) => request('PUT', `/projects/${id}`, data),
  deleteProject: (id) => request('DELETE', `/projects/${id}`),

  // Skills
  getSkills: () => request('GET', '/skills'),
  addSkill: (category, skill) => request('POST', '/skills/add', { category, skill }),
  removeSkill: (category, skill) => request('DELETE', '/skills/remove', { category, skill }),

  // CV
  uploadCV: (form) => request('POST', '/cv/upload', form, true),
  cvExists: () => request('GET', '/cv/exists'),
};
