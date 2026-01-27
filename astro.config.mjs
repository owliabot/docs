// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://docs.owlia.bot',
	integrations: [
		starlight({
			title: 'OwliaBot',
			logo: {
				light: './src/assets/logo-light.svg',
				dark: './src/assets/logo-dark.svg',
				replacesTitle: false,
			},
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/owliabot/owliabot' },
			],
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						{ label: 'Introduction', slug: 'getting-started/introduction' },
						{ label: 'Quick Start', slug: 'getting-started/quick-start' },
					],
				},
				{
					label: 'Architecture',
					items: [
						{ label: 'Overview', slug: 'architecture/overview' },
						{ label: 'Skills System', slug: 'architecture/skills-system' },
						{ label: 'Security Model', slug: 'architecture/security' },
					],
				},
				{
					label: 'Skills',
					items: [
						{ label: 'Creating Skills', slug: 'skills/creating-skills' },
						{ label: 'Built-in Skills', slug: 'skills/builtin-skills' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
			customCss: ['./src/styles/custom.css'],
		}),
	],
});
