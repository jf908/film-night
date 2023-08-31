import { browser } from '$app/environment';
import { preferredDark } from 'svelte-legos';
import { get, writable } from 'svelte/store';

function createThemeStore() {
  const saved = browser ? localStorage.getItem('theme') : null;
  const store = writable(saved || (get(preferredDark()) ? 'dark' : 'light'));
  return {
    ...store,
    toggle() {
      store.update((theme) => (theme === 'light' ? 'dark' : 'light'));
    },
  };
}

export const theme = createThemeStore();

theme.subscribe((theme) => {
  if (!browser) return;
  document.body.classList.remove('dark', 'light');
  document.body.classList.add(theme);
  localStorage.setItem('theme', theme);
});
