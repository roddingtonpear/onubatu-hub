const API_BASE = import.meta.env.VITE_API_URL || '/api';

async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(err.error || 'Request failed');
  }
  return res.json();
}

export async function uploadChat(file) {
  const formData = new FormData();
  formData.append('chatfile', file);
  const res = await fetch(`${API_BASE}/chat/upload`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Upload failed' }));
    throw new Error(err.error || 'Upload failed');
  }
  return res.json();
}

export async function getExports() {
  return apiFetch('/chat/exports');
}

export async function deleteExport(id) {
  return apiFetch(`/chat/exports/${id}`, { method: 'DELETE' });
}

export async function getMessages(params = {}) {
  const query = new URLSearchParams(
    Object.fromEntries(Object.entries(params).filter(([, v]) => v != null && v !== ''))
  ).toString();
  return apiFetch(`/chat/messages?${query}`);
}

export async function getSenders() {
  return apiFetch('/chat/senders');
}

export async function getStats() {
  return apiFetch('/chat/stats');
}

export async function searchMessages(q, page = 1) {
  return apiFetch(`/chat/search?q=${encodeURIComponent(q)}&page=${page}`);
}
