# TIBCERT (Tibetan Computer Emergency Response Team)

This is the official website for **TIBCERT**, a digital security initiative dedicated to enhancing cybersecurity for the Tibetan community. Built with **Astro** and **Tailwind CSS**, this platform provides critical security resources, reports, and AI-driven assistance.

---
![screenshot](public/screenshot.png)

## 📖 Project Documentation

### Overview

TIBCERT serves as a digital security hub providing resources, reports, services, and AI-powered assistance to the Tibetan community.

### Technology Stack

- **Framework**: [Astro](https://astro.build/) (v5.x)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v4.x)
- **AI Integration**: Google Gemini API via `@google/generative-ai`
- **Content Management**: Astro Content Collections (Markdown/MDX)
- **Type Safety**: TypeScript

### Project Structure

```text
/
├── public/              # Static assets (images, icons, robots.txt)
├── src/                 # Source code
│   ├── assets/          # Project assets (images, fonts, etc.)
│   ├── components/      # Reusable UI components
│   │   ├── cards/       # Card-based UI elements
│   │   ├── common/      # Shared components (Navbar, Footer, GeminiChat, etc.)
│   │   └── landing/     # Components specific to the landing page
│   ├── content/         # Managed content collections
│   │   └── blog/        # Blog posts and reports
│   ├── layouts/         # Page layouts (Main Layout.astro)
│   ├── pages/           # Route definitions (.astro, .md)
│   ├── styles/          # Global styles (Tailwind, animations)
│   └── utils/           # Utility functions and helpers
├── astro.config.mjs     # Astro configuration
├── package.json         # Dependencies and scripts
└── tsconfig.json        # TypeScript configuration
```

### Key Features

- **AI Assistant**: Integrated Gemini-powered chatbot for real-time security advice.
- **Project Content**: Managed security reports and blog posts in `src/content/blog/`.
- **Live Blog Feed**: Automated synchronization with [blog.tibcert.org](https://blog.tibcert.org) via RSS for the latest community reports.
- **Social Media Integration**: Real-time display of recent insights and engagement from **Instagram** and **Facebook**.
- **Cyber-Tech UI**: Modern aesthetic with scanlines, grainy noise, and dark mode support.
- **TLP Implementation**: Information sharing guidelines using Traffic Light Protocol.

---

## 🛠 Developer Guide

### Getting Started

1. **Prerequisites**: Ensure you have Node.js (LTS) installed.
2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Environment Setup**: Create a `.env` file and add your `GEMINI_API_KEY`.

### Development Workflow

- **Local Dev Server**: `npm run dev` (available at `http://localhost:4321`)
- **New Pages**: Add `.astro` or `.md` files to `src/pages/`.
- **Styling**: Use Tailwind utility classes; global styles are in `src/styles/global.css`.
- **Content**: Add new reports to `src/content/blog/` following the schema in `src/content/config.ts`.

### Build and Deployment

- **Build**: `npm run build` (outputs to `dist/`)
- **Preview**: `npm run preview`

### Useful Commands

| Command | Purpose |
| :--- | :--- |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npx astro check` | Check for Astro/TS errors |

---

## 🚀 Deployment to Vercel

The TIBCERT website is optimized for deployment on **Vercel**. Follow these steps to deploy:

1. **Push to GitHub**: Ensure your latest changes are pushed to your GitHub repository.
2. **Import to Vercel**:
   - Log in to your [Vercel Dashboard](https://vercel.com/dashboard).
   - Click "Add New" -> "Project".
   - Import your TIBCERT repository.
3. **Configure Build Settings**: Vercel should automatically detect **Astro**.
   - Framework Preset: `Astro`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. **Setup Environment Variables**: (See the Google AI Studio Guide below).
5. **Deploy**: Click "Deploy". Vercel will build and host your site.

---

## 🤖 Google AI Studio Setup Guide

To enable the AI capabilities (Gemini Chat), you must configure your API keys.

### 1. Obtain an API Key

- Go to [Google AI Studio](https://aistudio.google.com/).
- Create a new project or select an existing one.
- Click on **"Get API key"** and generate a new key.

### 2. Local Setup

Create a `.env` file in the root directory:

```text
GEMINI_API_KEY=your_generated_api_key
```

### 3. Vercel / Production Setup

To make the AI work in production, you must add the environment variable in Vercel:

- In your Vercel Project Dashboard, go to **Settings** -> **Environment Variables**.
- Add a new variable:
  - **Key**: `GEMINI_API_KEY`
  - **Value**: `[Your API Key]`
- Redeploy your project for the changes to take effect.

---
*Maintained by the TIBCERT Team.*

![tibcert](https://media.giphy.com/media/PY083I4CaFcnlnnkT7/giphy.gif)

*Project of Tibetan Institute*
![TAI](https://media.giphy.com/media/3a5utSwC2oIeOh9TOJ/giphy.gif)
