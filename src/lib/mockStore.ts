import { Task, Column, CreateTaskInput, UpdateTaskInput } from '@/types';

const STORAGE_KEY = 'todo_dashboard_tasks';

const SEED_TASKS: Task[] = [
  { id: '1', title: 'Design system setup', description: 'Create color palette, typography scale, and component tokens for the design system.', column: 'backlog', createdAt: new Date(Date.now() - 86400000 * 5).toISOString(), priority: 'high' },
  { id: '2', title: 'Homepage hero section', description: 'Build responsive hero with animated gradient background and CTA buttons.', column: 'backlog', createdAt: new Date(Date.now() - 86400000 * 4).toISOString(), priority: 'medium' },
  { id: '3', title: 'Authentication flow', description: 'Implement login, register, and password reset with JWT tokens.', column: 'backlog', createdAt: new Date(Date.now() - 86400000 * 3).toISOString(), priority: 'high' },
  { id: '4', title: 'Accessibility audit', description: 'Run axe-core audit and fix WCAG 2.1 AA compliance issues.', column: 'backlog', createdAt: new Date(Date.now() - 86400000 * 1).toISOString(), priority: 'medium' },
  { id: '5', title: 'Performance optimization', description: 'Improve Core Web Vitals scores with image optimization and code splitting.', column: 'backlog', createdAt: new Date(Date.now() - 86400000 * 0.5).toISOString(), priority: 'low' },
  { id: '6', title: 'API integration', description: 'Connect frontend to REST API endpoints with error handling and retry logic.', column: 'in_progress', createdAt: new Date(Date.now() - 86400000 * 3).toISOString(), priority: 'high' },
  { id: '7', title: 'Dashboard layout', description: 'Build responsive 4-column kanban board with drag and drop support.', column: 'in_progress', createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), priority: 'high' },
  { id: '8', title: 'Dark mode support', description: 'Add CSS variables-based dark mode toggle with system preference detection.', column: 'in_progress', createdAt: new Date(Date.now() - 86400000 * 1).toISOString(), priority: 'low' },
  { id: '9', title: 'User profile page', description: 'Create profile page with avatar upload, bio, and settings tabs.', column: 'review', createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), priority: 'medium' },
  { id: '10', title: 'Email notifications', description: 'Set up transactional email templates with Sendgrid integration.', column: 'review', createdAt: new Date(Date.now() - 86400000 * 1).toISOString(), priority: 'low' },
  { id: '11', title: 'Unit test coverage', description: 'Write Jest tests for all utility functions and React components.', column: 'done', createdAt: new Date(Date.now() - 86400000 * 7).toISOString(), priority: 'medium' },
  { id: '12', title: 'CI/CD pipeline', description: 'Configure GitHub Actions for automated testing and deployment to Vercel.', column: 'done', createdAt: new Date(Date.now() - 86400000 * 6).toISOString(), priority: 'high' },
];

function genId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

function loadTasks(): Task[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Task[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_TASKS));
    return SEED_TASKS;
  } catch {
    return SEED_TASKS;
  }
}

function saveTasks(tasks: Task[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
  }
}

export const mockApi = {
  getTasks: async (): Promise<Task[]> => {
    return loadTasks();
  },

  createTask: async (input: CreateTaskInput): Promise<Task> => {
    const tasks = loadTasks();
    const newTask: Task = {
      id: genId(),
      ...input,
      createdAt: new Date().toISOString(),
    };
    saveTasks([...tasks, newTask]);
    return newTask;
  },

  updateTask: async (input: UpdateTaskInput): Promise<Task> => {
    const tasks = loadTasks();
    const idx = tasks.findIndex((t) => t.id === input.id);
    if (idx === -1) throw new Error('Task not found');
    const updated: Task = { ...tasks[idx], ...input };
    tasks[idx] = updated;
    saveTasks(tasks);
    return updated;
  },

  deleteTask: async (id: string): Promise<void> => {
    const tasks = loadTasks();
    saveTasks(tasks.filter((t) => t.id !== id));
  },

  moveTask: async (id: string, column: Column): Promise<Task> => {
    return mockApi.updateTask({ id, column });
  },
};
