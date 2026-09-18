const STORAGE_KEY = 'oompaLoompasState';

export function loadPersistedState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : undefined;
  } catch {
    return undefined;
  }
}

export function savePersistedState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Caching is an optimization, not a hard requirement: if localStorage
    // is full or unavailable (e.g. private browsing), just skip it.
  }
}
