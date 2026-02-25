'use client';

import { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Task, ColumnConfig } from '@/types';
import TaskCard from './TaskCard';

const PAGE_SIZE = 5;

interface KanbanColumnProps {
  column: ColumnConfig;
  tasks: Task[];
  onAddTask: () => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  searchQuery: string;
}

export default function KanbanColumn({
  column,
  tasks,
  onAddTask,
  onEditTask,
  onDeleteTask,
  searchQuery,
}: KanbanColumnProps) {
  const [page, setPage] = useState(1);

  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  const visibleTasks = tasks.slice(0, page * PAGE_SIZE);
  const hasMore = visibleTasks.length < tasks.length;

  const loadMore = () => setPage((p) => p + 1);
  const collapse = () => setPage(1);

  return (
    <div className="flex flex-col min-w-[280px] max-w-[320px] flex-1">
      {/* Column header */}
      <div className={`flex items-center justify-between px-3 py-2.5 rounded-t-xl ${column.headerBg} border-b border-white/60`}>
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${column.dot}`} />
          <h2 className={`text-sm font-bold ${column.color}`}>{column.label}</h2>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full bg-white/70 ${column.color}`}>
            {tasks.length}
          </span>
        </div>
        <button
          onClick={onAddTask}
          className={`p-1 rounded-lg hover:bg-white/60 transition-colors ${column.color}`}
          title={`Add to ${column.label}`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {/* Droppable area */}
      <div
        ref={setNodeRef}
        className={`flex-1 min-h-[200px] rounded-b-xl border ${column.border} transition-all duration-200 ${
          column.bg
        } ${isOver ? 'ring-2 ring-blue-400 ring-inset bg-blue-50/60' : ''}`}
      >
        <SortableContext items={visibleTasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          <div className="p-2 space-y-2">
            {visibleTasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 gap-2 text-slate-400">
                <svg className="w-8 h-8 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span className="text-xs font-medium">
                  {searchQuery ? 'No matching tasks' : 'Drop tasks here'}
                </span>
              </div>
            ) : (
              visibleTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={onEditTask}
                  onDelete={onDeleteTask}
                  searchQuery={searchQuery}
                />
              ))
            )}
          </div>
        </SortableContext>

        {/* Pagination controls */}
        {tasks.length > PAGE_SIZE && (
          <div className="px-3 pb-3 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">
              {visibleTasks.length} of {tasks.length}
            </span>
            <div className="flex items-center gap-1">
              {hasMore && (
                <button
                  onClick={loadMore}
                  className="text-xs px-2.5 py-1 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors font-medium shadow-sm"
                >
                  Load more
                </button>
              )}
              {page > 1 && (
                <button
                  onClick={collapse}
                  className="text-xs px-2.5 py-1 bg-white border border-slate-200 text-slate-400 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Collapse
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
