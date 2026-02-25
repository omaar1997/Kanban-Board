# TaskFlow - Kanban Dashboard

A modern, responsive Kanban board application for efficient task management. Built with Next.js 14, React 18, and TypeScript, featuring drag-and-drop functionality, real-time updates, and localStorage persistence.

## 🎯 Features

- **Kanban Board** - Organize tasks across four columns (Backlog, In Progress, Review, Done)
- **Drag & Drop** - Seamlessly move tasks between columns with dnd-kit
- **Task Management** - Create, edit, and delete tasks with rich descriptions
- **Search & Filter** - Real-time search across task titles and descriptions
- **Priority Levels** - Assign high, medium, or low priority to each task
- **Responsive Design** - Fully responsive UI optimized for desktop and tablet devices
- **Data Persistence** - Tasks automatically saved to localStorage
- **Dark-Friendly UI** - Clean, modern design with Tailwind CSS
- **Server-Side Rendering** - SSR-safe implementation with proper hydration handling

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js 14](https://nextjs.org) | React framework with App Router |
| [React 18](https://react.dev) | UI library |
| [TypeScript](https://www.typescriptlang.org) | Type safety |
| [Tailwind CSS](https://tailwindcss.com) | Utility-first styling |
| [@dnd-kit](https://docs.dndkit.com) | Drag and drop functionality |
| [React Query](https://tanstack.com/query/latest) | Server state management |
| [React Hook Form](https://react-hook-form.com) | Form handling |
| [PostCSS](https://postcss.org) | CSS transformations |

## 📋 Prerequisites

- **Node.js** 16.x or higher
- **npm** 7.x or higher (or yarn/pnpm/bun)
- Modern web browser with ES6+ support

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone <repository-url>
cd todo-dashboard
```

### 2. Install dependencies

```bash
npm install
```

Alternatively, use yarn, pnpm, or bun:

```bash
yarn install
# or
pnpm install
# or
bun install
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📦 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build optimized production bundle |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint to check code quality |

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Homepage with TaskFlow header
│   ├── providers.tsx       # React Query client provider
│   ├── globals.css         # Global styles
│   └── fonts/              # Custom font imports
├── components/
│   ├── KanbanBoard.tsx     # Main board component with drag logic
│   ├── KanbanColumn.tsx    # Column with pagination
│   ├── TaskCard.tsx        # Individual task card with drag handle
│   ├── TaskModal.tsx       # Create/edit task modal
│   └── SearchBar.tsx       # Search input and filter display
├── hooks/
│   └── useTasks.ts         # Custom React Query hooks for tasks
├── lib/
│   └── mockStore.ts        # Mock API with localStorage integration
├── types/
│   └── index.ts            # TypeScript interfaces and types
└── [config files]
```

## 🎮 Usage Guide

### Creating a Task

1. Click the **"New Task"** button in the toolbar
2. Fill in the task details:
   - **Title** (required, max 100 characters)
   - **Description** (optional)
   - **Column** (Backlog, In Progress, Review, or Done)
   - **Priority** (Low, Medium, or High)
3. Click **"Create Task"** to add it to the board

### Moving Tasks

- **Drag a task card** to another column to change its status
- Tasks can be moved between any columns
- Changes are automatically saved to localStorage

### Editing a Task

1. Hover over a task card
2. Click the **edit icon** (pencil)
3. Modify the task details in the modal
4. Click **"Save Changes"** to update

### Deleting a Task

1. Hover over a task card
2. Click the **delete icon** (trash)
3. Confirm deletion in the popup
4. The task will be removed from the board

### Searching Tasks

1. Use the **search bar** at the top of the board
2. Type to filter tasks by title or description
3. The counter shows matching tasks vs. total tasks
4. Click the **X** button to clear the search

## 🔧 Development

### Adding New Features

The project uses React Query for server state management and localStorage for persistence. To add new features:

1. **Update types** in `src/types/index.ts`
2. **Extend the mock API** in `src/lib/mockStore.ts`
3. **Create custom hooks** in `src/hooks/useTasks.ts`
4. **Build new components** in `src/components/`

### Building for Production

```bash
npm run build
npm start
```

The optimized build will be available at `dist/` and ready for deployment.

## 🌐 Deployment

### Deploy to Vercel

The easiest deployment option for Next.js applications:

1. Push your code to GitHub/GitLab
2. Import the repository on [Vercel](https://vercel.com)
3. Vercel auto-detects Next.js and configures the build
4. Your app deploys automatically on every push

See [Next.js Deployment Documentation](https://nextjs.org/docs/app/building-your-application/deploying) for other hosting options.

## 📝 Notes

- **Data Storage**: Tasks are stored in the browser's localStorage. They persist across sessions but are local to each browser.
- **Seed Data**: On first load, the app initializes with 12 sample tasks
- **SSR Hydration**: Query configuration uses `enabled: typeof window !== 'undefined'` to prevent hydration mismatches
- **Responsive**: Optimized for screens 1024px and wider; mobile support in future versions

## 🐛 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For issues or questions, please open an issue on the repository or contact the maintainers.

---

**Last Updated**: February 2026  
**Built with ❤️ using Next.js and React**
