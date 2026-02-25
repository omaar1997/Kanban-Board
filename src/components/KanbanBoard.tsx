'use client';

import { useState, useCallback, useMemo } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  DragOverlay,
} from '@dnd-kit/core';
import { Task, Column, COLUMNS, CreateTaskInput } from '@/types';
import { useTasks, useCreateTask, useUpdateTask, useDeleteTask, useMoveTask } from '@/hooks/useTasks';
import KanbanColumn from './KanbanColumn';
import TaskModal from './TaskModal';
import TaskCard from './TaskCard';
import SearchBar from './SearchBar';

export default function KanbanBoard() {
  
  const { data: tasks = [], isLoading, isError } = useTasks();
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();
  const moveTask = useMoveTask();

  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [defaultColumn, setDefaultColumn] = useState<Column>('backlog');
  const [searchQuery, setSearchQuery] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  // Filter tasks by search query
  const filteredTasks = useMemo(() => {
    if (!searchQuery.trim()) return tasks;
    const q = searchQuery.toLowerCase();
    return tasks.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
    );
  }, [tasks, searchQuery]);

  const getColumnTasks = useCallback(
    (colId: Column) => filteredTasks.filter((t) => t.column === colId),
    [filteredTasks]
  );

  const handleDragStart = (e: DragStartEvent) => {
    const task = tasks.find((t) => t.id === e.active.id);
    setActiveTask(task || null);
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    setActiveTask(null);
    if (!over) return;

    const taskId = active.id as string;
    const overId = over.id as string;

    // Check if dropped over a column
    const targetColumn = COLUMNS.find((c) => c.id === overId);
    if (targetColumn) {
      const task = tasks.find((t) => t.id === taskId);
      if (task && task.column !== targetColumn.id) {
        moveTask.mutate({ id: taskId, column: targetColumn.id });
      }
      return;
    }

    // Dropped over another card
    const overTask = tasks.find((t) => t.id === overId);
    if (overTask) {
      const task = tasks.find((t) => t.id === taskId);
      if (task && task.column !== overTask.column) {
        moveTask.mutate({ id: taskId, column: overTask.column });
      }
    }
  };

  const handleOpenCreate = (col: Column) => {
    setDefaultColumn(col);
    setEditingTask(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (task: Task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleModalSubmit = (data: CreateTaskInput) => {
    if (editingTask) {
      updateTask.mutate({ id: editingTask.id, ...data }, { onSuccess: () => setModalOpen(false) });
    } else {
      createTask.mutate(data, { onSuccess: () => setModalOpen(false) });
    }
  };

  const handleDelete = (id: string) => {
    deleteTask.mutate(id);
  };

  const totalFiltered = filteredTasks.length;

  if (isLoading || typeof window === 'undefined') {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-3 text-slate-500">
          <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="text-sm font-medium">Loading tasks...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-500 font-medium">Failed to load tasks</p>
          <p className="text-slate-400 text-sm mt-1">Please refresh the page</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          totalTasks={tasks.length}
          filteredCount={totalFiltered}
        />
        <button
          onClick={() => handleOpenCreate('backlog')}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-sm whitespace-nowrap"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          New Task
        </button>
      </div>

      {/* Board */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4 overflow-x-auto pb-4 flex-1">
          {COLUMNS.map((col) => (
            <KanbanColumn
              key={col.id}
              column={col}
              tasks={getColumnTasks(col.id)}
              onAddTask={() => handleOpenCreate(col.id)}
              onEditTask={handleOpenEdit}
              onDeleteTask={handleDelete}
              searchQuery={searchQuery}
            />
          ))}
        </div>

        <DragOverlay>
          {activeTask ? (
            <div className="rotate-2 opacity-90 w-[280px]">
              <TaskCard
                task={activeTask}
                onEdit={() => {}}
                onDelete={() => {}}
                searchQuery={searchQuery}
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Modal */}
      <TaskModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
        task={editingTask}
        defaultColumn={defaultColumn}
        isLoading={createTask.isPending || updateTask.isPending}
      />
    </div>
  );
}
