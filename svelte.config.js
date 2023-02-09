// import adapter from '@sveltejs/adapter-vercel'
import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-vercel'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		preprocess({
			postcss: true,
			preserve: ['ld+json']
		})
	],
	kit: {
		adapter: adapter(),
		csrf: {
			checkOrigin: false
		}
	}
	// vitePlugin: {
	// 	experimental: {
	// 		inspector: true
	// 	}
	// }
}

export default config
