import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mockApi } from '@/lib/mockStore';
import { Task, CreateTaskInput, UpdateTaskInput, Column } from '@/types';

export const TASKS_KEY = ['tasks'];

export function useTasks() {
  return useQuery<Task[], Error>({
    queryKey: TASKS_KEY,
    queryFn: () => mockApi.getTasks(),
    staleTime: 30_000,
    enabled: typeof window !== 'undefined',
  });
}

export function useCreateTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateTaskInput) => mockApi.createTask(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: TASKS_KEY }),
  });
}

export function useUpdateTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: UpdateTaskInput) => mockApi.updateTask(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: TASKS_KEY }),
  });
}

export function useDeleteTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => mockApi.deleteTask(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: TASKS_KEY }),
  });
}

export function useMoveTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, column }: { id: string; column: Column }) =>
      mockApi.moveTask(id, column),
    onSuccess: () => qc.invalidateQueries({ queryKey: TASKS_KEY }),
  });
}
