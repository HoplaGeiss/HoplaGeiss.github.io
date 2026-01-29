# Personal Website & Tech Blog

A modern personal website with CV/portfolio and markdown-based blog, built with React, TypeScript, and Tailwind CSS. Features a dark theme with orange highlights and is automatically deployed to GitHub Pages.

## Features

- **CV/Portfolio Page**: Showcase your skills, experience, education, and contact information
- **Markdown Blog**: Write blog posts in markdown with frontmatter support
- **Dark Theme**: Professional dark theme with orange accent colors
- **Responsive Design**: Mobile-first design that looks great on all devices
- **GitHub Pages Ready**: Automated deployment via GitHub Actions
- **TypeScript**: Type-safe codebase
- **Fast Development**: Powered by Vite for instant HMR

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Package Manager**: pnpm (fast, efficient, disk-space saving)
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Markdown**: react-markdown with syntax highlighting
- **Deployment**: GitHub Pages via GitHub Actions

## Getting Started

### Prerequisites

- Node.js 18 or higher
- pnpm (install with `npm install -g pnpm` or `brew install pnpm`)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/hoplaWeb.git
cd hoplaWeb
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm run dev
```

4. Open your browser and visit `http://localhost:5173`

## Development

### Project Structure

```
hoplaWeb/
├── public/
│   └── blog/              # Markdown blog posts go here
├── src/
│   ├── components/        # Reusable components (Header, Footer)
│   ├── pages/            # Page components (Home, Blog, Post)
│   ├── App.tsx           # Main app with routing
│   └── main.tsx          # Entry point
├── .github/
│   └── workflows/
│       └── deploy.yml    # GitHub Actions deployment
└── vite.config.ts        # Vite configuration
```

### Adding Blog Posts

1. Create a new `.md` file in `public/blog/`
2. Add frontmatter at the top:

```markdown
---
title: "Your Post Title"
date: "2026-01-29"
tags: ["react", "typescript"]
excerpt: "A brief description of your post"
---

# Your Content Here

Write your blog post content in markdown...
```

3. Update the `postSlugs` array in `src/pages/Blog.tsx` with your new post filename (without .md)

### Customizing Content

- **Personal Info**: Edit `src/pages/Home.tsx` to add your name, skills, experience, and education
- **Social Links**: Update links in `src/components/Header.tsx` and `src/components/Footer.tsx`
- **Colors**: Modify `tailwind.config.js` to change the color scheme
- **Repository Name**: If your repo name isn't `hoplaWeb`, update the `base` path in `vite.config.ts`

## Deployment to GitHub Pages

### One-Time Setup

1. Create a new GitHub repository
2. Push your code to the repository
3. Go to repository Settings → Pages
4. Under "Build and deployment", select "GitHub Actions" as the source

### Automatic Deployment

Once set up, every push to the `main` branch will automatically:
1. Build the project
2. Deploy to GitHub Pages
3. Make your site available at `https://yourusername.github.io/hoplaWeb/`

### Manual Deployment

You can also build and deploy manually:

```bash
pnpm run build
# Upload the contents of the 'dist' folder to your hosting provider
```

## Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run preview` - Preview production build locally
- `pnpm run lint` - Run ESLint

## Why pnpm?

This project uses pnpm instead of npm for several advantages:
- **Faster**: Up to 2x faster installation
- **Efficient**: Uses hard links to save disk space
- **Strict**: Better dependency resolution, no phantom dependencies
- **Reliable**: Consistent installs with frozen lockfile

## Customization Tips

### Changing Colors

Edit `tailwind.config.js`:
```js
colors: {
  primary: {
    DEFAULT: '#your-color',
    hover: '#your-hover-color',
  }
}
```

### Adding More Sections

1. Create a new component in `src/pages/` or `src/components/`
2. Import and add it to your page
3. Style with Tailwind classes

### SEO Optimization

- Update `index.html` with proper meta tags
- Add a sitemap generator
- Include Open Graph tags for social sharing

## Contributing

Feel free to fork this project and customize it for your own use!

## License

MIT License - feel free to use this template for your own website.

## Questions?

If you have questions or run into issues, feel free to open an issue on GitHub.
