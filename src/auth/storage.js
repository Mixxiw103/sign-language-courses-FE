const STORAGE_KEY = "auth";

export function saveAuth({ accessToken, refreshToken, user }) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ accessToken, refreshToken, user })
  );
}

export function loadAuth() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearAuth() {
  localStorage.removeItem(STORAGE_KEY);
}
