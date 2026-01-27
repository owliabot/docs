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
				src: './src/assets/logo.svg',
				replacesTitle: false,
			},
			locales: {
				root: {
					label: 'English',
					lang: 'en',
				},
				zh: {
					label: '简体中文',
					lang: 'zh-CN',
				},
			},
			favicon: '/favicon.png',
			social: [
				{
					icon: 'discord',
					label: 'Discord',
					href: 'https://discord.gg/u77MTs3aT8',
					attrs: { target: '_blank', rel: 'noopener noreferrer' },
				},
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/owliabot/owliabot',
					attrs: { target: '_blank', rel: 'noopener noreferrer' },
				},
			],
			head: [
				{
					tag: 'script',
					attrs: { type: 'module' },
					content: `
						document.addEventListener('DOMContentLoaded', () => {
							for (const link of document.querySelectorAll('.social-icons a')) {
								link.setAttribute('target', '_blank');
								link.setAttribute('rel', 'noopener noreferrer me');
							}
						});
					`,
				},
			],
			sidebar: [
				{
					label: 'Getting Started',
					translations: { 'zh-CN': '开始使用' },
					items: [
						{
							label: 'Introduction',
							translations: { 'zh-CN': '简介' },
							slug: 'getting-started/introduction',
						},
						{
							label: 'Quick Start',
							translations: { 'zh-CN': '快速开始' },
							slug: 'getting-started/quick-start',
						},
					],
				},
				{
					label: 'Architecture',
					translations: { 'zh-CN': '架构' },
					items: [
						{
							label: 'Overview',
							translations: { 'zh-CN': '总览' },
							slug: 'architecture/overview',
						},
						{
							label: 'Skills System',
							translations: { 'zh-CN': 'Skills 系统' },
							slug: 'architecture/skills-system',
						},
						{
							label: 'Security Model',
							translations: { 'zh-CN': '安全模型' },
							slug: 'architecture/security',
						},
						{
							label: 'vs Clawdbot',
							translations: { 'zh-CN': '与 Clawdbot 对比' },
							slug: 'architecture/comparison',
						},
					],
				},
				{
					label: 'Skills',
					translations: { 'zh-CN': 'Skills' },
					items: [
						{
							label: 'Creating Skills',
							translations: { 'zh-CN': '创建 Skills' },
							slug: 'skills/creating-skills',
						},
						{
							label: 'Built-in Skills',
							translations: { 'zh-CN': '内置 Skills' },
							slug: 'skills/builtin-skills',
						},
					],
				},
				{
					label: 'Reference',
					translations: { 'zh-CN': '参考' },
					autogenerate: { directory: 'reference' },
				},
			],
			customCss: ['./src/styles/custom.css'],
		}),
	],
});
