export type Column = 'backlog' | 'in_progress' | 'review' | 'done';
export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  column: Column;
  createdAt: string;
  priority: Priority;
}

export interface CreateTaskInput {
  title: string;
  description: string;
  column: Column;
  priority: Priority;
}

export interface UpdateTaskInput extends Partial<CreateTaskInput> {
  id: string;
}

export interface ColumnConfig {
  id: Column;
  label: string;
  color: string;
  bg: string;
  border: string;
  headerBg: string;
  dot: string;
}

export const COLUMNS: ColumnConfig[] = [
  {
    id: 'backlog',
    label: 'Backlog',
    color: 'text-slate-700',
    bg: 'bg-slate-50',
    border: 'border-slate-200',
    headerBg: 'bg-slate-100',
    dot: 'bg-slate-400',
  },
  {
    id: 'in_progress',
    label: 'In Progress',
    color: 'text-blue-700',
    bg: 'bg-blue-50/50',
    border: 'border-blue-200',
    headerBg: 'bg-blue-100',
    dot: 'bg-blue-500',
  },
  {
    id: 'review',
    label: 'Review',
    color: 'text-amber-700',
    bg: 'bg-amber-50/50',
    border: 'border-amber-200',
    headerBg: 'bg-amber-100',
    dot: 'bg-amber-500',
  },
  {
    id: 'done',
    label: 'Done',
    color: 'text-emerald-700',
    bg: 'bg-emerald-50/50',
    border: 'border-emerald-200',
    headerBg: 'bg-emerald-100',
    dot: 'bg-emerald-500',
  },
];
