import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const pages = ['punta-cana', 'europa', 'cartagena', 'san-andres', 'mexico'];

export default defineConfig({
  input: [
    resolve(import.meta.dirname, 'index.html'),
    ...pages.map((page) => resolve(import.meta.dirname, `destinos/${page}/index.html`)),
  ],
});
