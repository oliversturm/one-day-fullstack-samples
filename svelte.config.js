import adapter from '@sveltejs/adapter-auto';

const { PREFIX, CACHE_POSTFIX } = process.env;

if (!PREFIX || !CACHE_POSTFIX) {
  throw new Error('PREFIX/CACHE_POSTFIX are not set.');
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    appDir: `${PREFIX}/packages/frontend-svelte/_app`,
    files: {
      assets: `${PREFIX}/packages/frontend-svelte/static`,
      hooks: `${PREFIX}/packages/frontend-svelte/src/hooks`,
      lib: `${PREFIX}/packages/frontend-svelte/src/lib`,
      params: `${PREFIX}/packages/frontend-svelte/src/params`,
      routes: `${PREFIX}/packages/frontend-svelte/src/routes`,
      serviceWorker: `${PREFIX}/packages/frontend-svelte/src/service-worker`,
      template: `${PREFIX}/packages/frontend-svelte/src/app.html`,
    },
    outDir: `${PREFIX}/packages/frontend-svelte/.svelte-kit`,
    package: {
      dir: `${PREFIX}/packages/frontend-svelte/package`,
    },
    vite: {
      cacheDir: `node_modules/.vite-svelte-${CACHE_POSTFIX}`,
      server: {
        port: 3010,
      },
    },
  },
};

export default config;
