import fs from 'node:fs';
import path from 'node:path';
import type { PluginContext } from 'rollup';
import { normalizePath, transformWithEsbuild, type Plugin } from 'vite';
export interface HierarchicalLayoutOptions {
  pagePattern?: RegExp;
  layoutFiles?: string[];
  srcRoots?: string[];
}
const DEFAULT_PAGE_PATTERN = /\/page\.(jsx?)$/;
const DEFAULT_LAYOUT_FILES = ['layout.jsx'];
const DEFAULT_PARAM_PATTERN = /\[(\.{3})?([^\]]+)\]/g;
const NO_LAYOUT_QUERY = '?noLayout.jsx';
export function layoutWrapperPlugin(userOpts: HierarchicalLayoutOptions = {}): Plugin {
  const opts: Required<HierarchicalLayoutOptions> = {
    pagePattern: userOpts.pagePattern ?? DEFAULT_PAGE_PATTERN,
    layoutFiles: userOpts.layoutFiles ?? DEFAULT_LAYOUT_FILES,
    srcRoots: userOpts.srcRoots ?? [path.join(__dirname, '../src')],
  };
  let root = '';
  return {
    name: 'vite-react-hierarchical-layouts',
    enforce: 'pre',
    configResolved(c) {
      root = normalizePath(c.root);
    },
    async transform(code, id) {
      if (
        opts.pagePattern.test(id) &&
        !id.includes(NO_LAYOUT_QUERY) 
      ) {
        return buildWrapper.call(this, id);
      }
      return null;
    },
  };
  function collectLayouts(pagePath: string, o: Required<HierarchicalLayoutOptions>) {
    const layouts: { absFile: string; hasExport: boolean }[] = [];
    let dir = path.dirname(pagePath);
    const stopDirs = o.srcRoots.map((r) => path.resolve(r));
    while (true) {
      for (const name of o.layoutFiles) {
        const candidate = path.join(dir, name);
        if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
          const hasExport = fs.readFileSync(candidate, 'utf-8').includes('export');
          layouts.unshift({ absFile: candidate, hasExport });
        }
      }
      if (stopDirs.includes(dir)) break;
      const parent = path.dirname(dir);
      if (parent === dir) break; 
      dir = parent;
    }
    return layouts;
  }
  function extractRouteParams(pagePath: string, paramPattern: RegExp): string[] {
    const relativePath = normalizePath(pagePath);
    const params: string[] = [];
    const matches = relativePath.matchAll(new RegExp(paramPattern));
    for (const match of matches) {
      if (match[2]) {
        params.push(match[2]);
      }
    }
    return params;
  }
  function buildWrapper(this: PluginContext, pagePath: string): string {
    const layouts = collectLayouts(pagePath, opts);
    for (const layout of layouts) {
      this.addWatchFile(layout.absFile);
    }
    const routeParams = extractRouteParams(pagePath, DEFAULT_PARAM_PATTERN);
    const hasSpreadParams = /\[\.{3}[^\]]+\]/.test(normalizePath(pagePath));
    const imports: string[] = [];
    const opening: string[] = [];
    const closing: string[] = [];
    layouts.forEach(({ absFile, hasExport }, i) => {
      const varName = `Layout${i}`;
      imports.push(`import ${varName} from ${JSON.stringify(absFile)};`);
      if (hasExport) {
        opening.push(`<${varName}>`);
        closing.unshift(`</${varName}>`);
      }
    });
    imports.push(`import Page from ${JSON.stringify(pagePath + NO_LAYOUT_QUERY)};`);
    if (routeParams.length > 0) {
      imports.push(
        `import { useParams${hasSpreadParams ? ', useLocation' : ''} } from 'react-router-dom';`
      );
    }
    return `
${imports.join('\n')}
export default function WrappedPage(props) {
  ${routeParams.length > 0 ? 'const params = useParams();' : ''}
  ${hasSpreadParams ? 'const location = useLocation();' : ''}
  return (
    ${opening.join('\n    ')}
      <Page {...props}${
        routeParams.length > 0
          ? routeParams
              .map((param) =>
                pagePath.includes(`[...${param}]`)
                  ? 
                    `${param}={location.pathname
                      .split('/')
                      .slice(
                        location.pathname
                          .split('/')
                          .findIndex(Boolean) + 1
                      )}`
                  : `${param}={params.${param}}`
              )
              .join(' ')
          : ''
      } />
    ${closing.join('\n    ')}
  );
}
`;
  }
}
