const AUTH_KEY = "auth_user";
const TOKEN_KEY = "auth_token";

export function isAuthenticated() {
  return !!localStorage.getItem(AUTH_KEY);
}

export function setStorageUser(user: { name: string; email: string }) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
}

export function removeStorageUser() {
  localStorage.removeItem(AUTH_KEY);
}

export function getStorageUser() {
  const raw = localStorage.getItem(AUTH_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function getStorageToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setStorageToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeStorageToken() {
  localStorage.removeItem(TOKEN_KEY);
}
