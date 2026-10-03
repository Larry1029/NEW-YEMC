import path from 'node:path';
import process from 'node:process';
import micromatch from 'micromatch';
import type { Plugin } from 'vite';
export interface VitePluginRestartOptions {
	glob?: boolean;
	delay?: number;
	restart?: string | string[];
	reload?: string | string[];
}
let i = 0;
function toArray<T>(arr: T | T[] | undefined): T[] {
	if (!arr) return [];
	if (Array.isArray(arr)) return arr;
	return [arr];
}
export function restart(options: VitePluginRestartOptions = {}): Plugin {
	const { delay = 500, glob: enableGlob = true } = options;
	let root = process.cwd();
	let reloadGlobs: string[] = [];
	let restartGlobs: string[] = [];
	let timerState = 'reload';
	let timer: ReturnType<typeof setTimeout> | undefined;
	function clear() {
		clearTimeout(timer);
	}
	function schedule(fn: () => void) {
		clear();
		timer = setTimeout(fn, delay);
	}
	return {
		name: `vite-plugin-restart:${i++}`,
		apply: 'serve',
		config(c) {
			if (!enableGlob) return;
			if (!c.server) c.server = {};
			if (!c.server.watch) c.server.watch = {};
		},
		configResolved(config) {
			root = config.root;
			restartGlobs = toArray(options.restart).map((i) =>
				path.posix.join(root, i)
			);
			reloadGlobs = toArray(options.reload).map((i) =>
				path.posix.join(root, i)
			);
		},
		configureServer(server) {
			server.watcher.add([...restartGlobs, ...reloadGlobs]);
			server.watcher.on('add', handleFileChange);
			server.watcher.on('unlink', handleFileChange);
			function handleFileChange(file: string) {
				if (micromatch.isMatch(file, restartGlobs)) {
					timerState = 'restart';
					console.log('File changed, scheduling restart:', file);
					schedule(() => {
						server.restart();
					});
				} else if (
					micromatch.isMatch(file, reloadGlobs) &&
					timerState !== 'restart'
				) {
					timerState = 'reload';
					console.log('File changed, scheduling reload:', file);
					schedule(() => {
						server.ws.send({ type: 'full-reload' });
						timerState = '';
					});
				}
			}
		},
	};
}
