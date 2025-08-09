/* Creates minimal logged in user object into localstorage */
const KEY = "lul_session";

export function getSession() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || null;
  } catch {
    return null;
  }
}

export function setSession(user) {
  localStorage.setItem(KEY, JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem(KEY);
}
