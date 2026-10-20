/**
 * Main Entry Point — ML Lab Application
 * Initializes design system, theme, router, and mounts root component
 */

import './styles/global.css';
import '../core/tokens/index.css'; // CSS custom properties
import { themeEngine } from '../core/theme/ThemeEngine.ts';
import { router } from '../core/router/Router.ts';

// Register core components
import '../core/theme/ThemeProvider.ts';

// Register layout components (to be created)
import '../components/layouts/PageShell/PageShell.ts';
import '../components/layouts/DashboardLayout/DashboardLayout.ts';
import '../components/layouts/ModuleLayout/ModuleLayout.ts';
import '../components/layouts/ExerciseLayout/ExerciseLayout.ts';

// Register page components (to be created)
import '../pages/index/DashboardPage.ts';
import '../pages/clustering/ClusteringOverviewPage.ts';
import '../pages/clustering/KMeansPage.ts';
import '../pages/clustering/DBSCANPage.ts';
import '../pages/clustering/AgglomerativePage.ts';
import '../pages/clustering/EvaluationPage.ts';
import '../pages/reinforcement/QLearningPage.ts';
import '../pages/ensemble/AdaBoostPage.ts';
import '../pages/ensemble/StackingPage.ts';
import '../pages/exercises/ExercisesPage.ts';
import '../pages/exercises/AHCExercisePage.ts';
import '../pages/exercises/KMeansExercisePage.ts';

// Initialize theme (reads from localStorage, applies to document)
themeEngine.subscribe((resolved) => {
  document.documentElement.dataset.theme = resolved;
});

// Initialize router
router.subscribe((match) => {
  if (match) {
    document.title = match.route.meta?.title || 'ML Lab';
  } else {
    document.title = '404 — ML Lab';
  }
});

// Global error handler
window.addEventListener('error', (event) => {
  console.error('[ML Lab] Uncaught error:', event.error);
  // Could send to error tracking service here
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('[ML Lab] Unhandled rejection:', event.reason);
});

console.log('[ML Lab] 🚀 Application initialized');