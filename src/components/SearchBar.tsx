'use client';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  totalTasks: number;
  filteredCount: number;
}

export default function SearchBar({ value, onChange, totalTasks, filteredCount }: SearchBarProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex-1 max-w-sm">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search tasks..."
          className="w-full pl-9 pr-9 py-2 text-sm border border-slate-200 rounded-xl outline-none transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-slate-300 bg-white shadow-sm"
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded text-slate-400 hover:text-slate-600 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      {value && (
        <span className="text-xs text-slate-500 whitespace-nowrap">
          {filteredCount} of {totalTasks} tasks
        </span>
      )}
    </div>
  );
}
