# ML Lab — Machine Learning Lab

> **Visualisasi. Eksperimen. Paham.**

Platform latihan soal Machine Learning interaktif untuk mahasiswa universitas. Menggabungkan visualisasi algoritma real-time, playground kode, soal latihan bertingkat, dan pembahasan langkah-demi-langkah — semua dalam satu dashboard terpusat.

## ✨ Fitur Utama

| Modul | Deskripsi |
|-------|-----------|
| 🎯 **K-Means** | Visualisasi interaktif + perhitungan step-by-step |
| 🔍 **DBSCAN** | Clustering berbasis kepadatan (eps, minPts) |
| 🌳 **Agglomerative** | Hierarchical clustering + dendrogram |
| 📏 **Evaluasi** | SSE, Silhouette, Elbow Method, Hopkins Statistic |
| 🤖 **Q-Learning** | Grid World + Q-table real-time |
| ⚖️ **AdaBoost** | Visualisasi bobot data per iterasi |
| 📚 **Stacking** | Arsitektur base models + meta-learner |
| 📝 **Latihan Terstruktur** | Soal AHC & K-Means + deadline tracking |

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Development server (localhost:3000)
pnpm dev

# Production build
pnpm build

# Preview production build
pnpm preview
```

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| **Language** | TypeScript (strict) |
| **Build** | Vite 5 |
| **UI** | Native Web Components (Shadow DOM) |
| **Styling** | CSS Custom Properties + Cascade Layers |
| **Routing** | Hash-based (works on GitHub Pages) |
| **Testing** | Vitest (unit) + Playwright (e2e) |
| **Docs** | Storybook |
| **Deploy** | GitHub Actions → GitHub Pages |

## 📁 Project Structure

```
ml-lab/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Fonts, images
│   ├── components/         # Design System Components
│   │   ├── atoms/          # Button, Badge, Icon, Tooltip...
│   │   ├── molecules/      # Card, Input, Tabs, Modal...
│   │   ├── organisms/      # TopBar, Sidebar, ModuleCard...
│   │   └── layouts/        # PageShell, DashboardLayout...
│   ├── core/
│   │   ├── tokens/         # Design tokens (colors, spacing, type...)
│   │   ├── theme/          # ThemeEngine (Light/Dark/Auto)
│   │   ├── utils/          # DOM, Storage, Animation, Math, Canvas
│   │   └── router/         # Hash-based Router
│   ├── features/           # Feature modules (domain-driven)
│   ├── pages/              # Route-level pages
│   ├── styles/             # Global CSS (reset, base, utilities)
│   └── main.ts             # App entry point
├── tests/                  # Unit, E2E, Visual tests
├── .github/workflows/      # CI/CD
└── package.json
```

## 🎨 Design System

Sistem desain terpusat di `src/core/tokens/` dan `src/components/`:

- **Tokens**: Warna (semantic + palette), Spacing, Typography, Shadows, Transitions, Breakpoints, Z-index
- **Themes**: Light / Dark / Auto (system preference) dengan persistensi localStorage
- **Components**: Web Components native (`<ml-button>`, `<ml-card>`, `<ml-theme-toggle>`, dll)
- **Accessibility**: WCAG 2.1 AA, keyboard navigation, focus management, reduced motion

## 🧪 Testing

```bash
# Unit tests
pnpm test

# Watch mode
pnpm test:watch

# Coverage report
pnpm test:coverage

# E2E tests
pnpm test:e2e

# E2E with UI
pnpm test:e2e:ui
```

## 📦 Deployment

### GitHub Pages (Recommended)

1. Push ke `main` branch
2. GitHub Actions otomatis build & deploy ke `gh-pages`
3. Akses di `https://username.github.io/ml-lab/`

### Netlify / Vercel

```bash
# Build command: pnpm build
# Output directory: dist
# SPA redirect: /* /index.html 200 (untuk hash routing)
```

## 🔧 Development Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build |
| `pnpm lint` | ESLint + Stylelint |
| `pnpm lint:fix` | Auto-fix lint issues |
| `pnpm typecheck` | TypeScript strict check |
| `pnpm test` | Run unit tests |
| `pnpm test:e2e` | Run E2E tests |
| `pnpm storybook` | Start Storybook |
| `pnpm format` | Prettier format |

## 📖 Documentation

- [PRD (Product Requirements Document)](PRD.md)
- [Tech Stack](TECH_STACK.md)
- [Design System](DESIGN_SYSTEM.md)

## 🤝 Contributing

1. Fork repository
2. Create feature branch: `git checkout -b feat/nama-fitur`
3. Commit dengan conventional commits: `git commit -m "feat: tambah fitur X"`
4. Push branch: `git push origin feat/nama-fitur`
5. Buat Pull Request

## 📄 License

MIT License — bebas digunakan untuk keperluan pendidikan dan penelitian.

---

**Dibangun dengan ❤️ untuk mahasiswa Machine Learning**