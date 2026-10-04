// Environment-aware API URL resolver for local development and deployed production hosts
const resolveBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim() !== '') {
    const clean = envUrl.trim().replace(/\/+$/, '');
    return clean.endsWith('/api') ? clean : `${clean}/api`;
  }
  if (typeof window !== 'undefined' && window.__FEMTECH_API_URL__) {
    const clean = window.__FEMTECH_API_URL__.trim().replace(/\/+$/, '');
    return clean.endsWith('/api') ? clean : `${clean}/api`;
  }
  return '/api';
};

export const BASE_URL = resolveBaseUrl();

const getHeaders = (isFormData = false) => {
  const token = localStorage.getItem('femtech_token');
  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }
  return headers;
};

// Safe response parser that detects HTML 404s from static deployment hosts
const parseResponse = async (res) => {
  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch (err) {
    if (!res.ok) {
      throw new Error(`Server error (${res.status} ${res.statusText}). Check your backend deployment status.`);
    }
    throw new Error(
      `Received non-JSON response from ${res.url}. In deployment, please set the VITE_API_URL environment variable to your deployed backend URL (e.g. https://your-backend.onrender.com).`
    );
  }
  if (!res.ok) {
    throw new Error(data.message || `Request failed with status ${res.status}`);
  }
  return data;
};

export const api = {
  // GET
  get: async (endpoint) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: getHeaders()
    });
    return parseResponse(res);
  },

  // POST JSON
  post: async (endpoint, body) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(body)
    });
    return parseResponse(res);
  },

  // POST FORM DATA (Files, Documents, Audio)
  postForm: async (endpoint, formData) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: getHeaders(true),
      body: formData
    });
    return parseResponse(res);
  },

  // PUT JSON
  put: async (endpoint, body) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(body)
    });
    return parseResponse(res);
  },

  // DELETE
  delete: async (endpoint) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    return parseResponse(res);
  }
};

