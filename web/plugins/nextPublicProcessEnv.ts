import { type Plugin, loadEnv } from 'vite';
export function nextPublicProcessEnv(): Plugin {
  const publicEnv = loadEnv(
    process.env.NODE_ENV ?? 'development',
    process.cwd(),
    'NEXT_PUBLIC_',
  );
  const stub = `
if (typeof window !== 'undefined') {
  const $public = ${JSON.stringify(publicEnv)};
  globalThis.process ??= {};
  const base = globalThis.process.env ?? {};
  globalThis.process.env = new Proxy(Object.assign({}, $public, base), {
    get(t, p) { return p in t ? t[p] : undefined; },
    has() { return true; }
  });
}
`;
  return {
    name: 'vite:next-public-process-env',
    enforce: 'post',
    transform(code, id, opts) {
      if (opts?.ssr) return null;                          
      if (!/\.[cm]?[jt]sx?$/.test(id)) return null;  
      if (code.includes('globalThis.process ??=')) return null; 
      return { code: stub + code, map: null };
    },
  };
}
