# Starlight i18n (en + zh) Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add Astro Starlight i18n with English and Chinese, translate existing docs, and surface a language switcher in the header near the theme toggle.

**Architecture:** Use Starlight’s built-in `locales` configuration with `en` as the `root` locale to preserve existing URLs. Place translated content under `src/content/docs/zh/`. Rely on Starlight’s built-in language picker rather than a custom header component.

**Tech Stack:** Astro 5.x, `@astrojs/starlight` 0.37.x, Astro Content Collections.

### Task 1: Baseline failing verification (TDD RED)

**Files:**
- Modify: none (command-only)

**Step 1: Build the site**

Run: `npm run build`
Expected: Build succeeds.

**Step 2: Assert zh locale output exists (should FAIL)**

Run: `test -f dist/zh/index.html`
Expected: FAIL because i18n is not configured yet.

### Task 2: Configure Starlight locales

**Files:**
- Modify: `astro.config.mjs`

**Step 1: Update Starlight config with locales**

Add a `locales` block:

```js
locales: {
  root: {
    label: 'English',
    lang: 'en'
  },
  zh: {
    label: '简体中文',
    lang: 'zh-CN'
  }
}
```

**Step 2: Keep existing sidebar for root locale**

Do not add `zh.sidebar` yet; Starlight will infer translated slugs when content exists.

**Step 3: Build to ensure config parses**

Run: `npm run build`
Expected: Build succeeds.

### Task 3: Add zh locale content structure

**Files:**
- Create: `src/content/docs/zh/index.mdx`
- Create: `src/content/docs/zh/getting-started/introduction.md`
- Create: `src/content/docs/zh/getting-started/quick-start.md`
- Create: `src/content/docs/zh/architecture/overview.md`
- Create: `src/content/docs/zh/architecture/skills-system.md`
- Create: `src/content/docs/zh/architecture/security.md`
- Create: `src/content/docs/zh/skills/creating-skills.md`
- Create: `src/content/docs/zh/skills/builtin-skills.md`
- Create: `src/content/docs/zh/reference/configuration.md`

**Step 1: Create the zh directory tree**

Run: `mkdir -p src/content/docs/zh/{getting-started,architecture,skills,reference}`

**Step 2: Create zh translations mirroring existing paths**

Use the same filenames and relative paths under `zh/`.

**Step 3: Ensure all zh pages have frontmatter**

Each zh page should include at least:

```yaml
---
title: <translated title>
---
```

**Step 4: Build to ensure content collection validation passes**

Run: `npm run build`
Expected: Build succeeds.

### Task 4: Verify language switcher and localized routes (TDD GREEN)

**Files:**
- Modify: none (command-only)

**Step 1: Build the site**

Run: `npm run build`
Expected: Build succeeds.

**Step 2: Assert zh locale output exists (should PASS now)**

Run: `test -f dist/zh/index.html`
Expected: PASS.

**Step 3: Spot-check localized routes**

Run:
- `test -f dist/zh/getting-started/introduction/index.html`
- `test -f dist/getting-started/introduction/index.html`

Expected: both PASS.

**Step 4: Optional dev verification**

Run: `npm run dev`
Expected: Header shows a language picker alongside theme toggle; switching languages preserves the current page when translations exist.
