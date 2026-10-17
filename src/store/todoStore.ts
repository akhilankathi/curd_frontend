import { create } from 'zustand';
import type { Itodo } from '../todo/todo';
import { TodoService } from '../services/todo.service';

interface TodoStore {
  todoList: Itodo[];
  editTodo: Itodo;
  isDataFetched: boolean;
  isLoading: boolean;
  setisLoading: (value: boolean) => void;
  setDataFetched: (value: boolean) => void;
  seedTodos: (todos: Itodo[]) => void;
  addTodo: (todo: Itodo) => void;
  updateTodo: (updatedTodo: Itodo) => void;
  editTodoFunction: (todo: Itodo) => void;
  deleteTodo: (id: number) => void;
  toggleTodoCompletion: (id: number) => void;
}

export const useTodoStore = create<TodoStore>((set) => ({
  todoList: [],
  isDataFetched: false,
  isLoading: false,
  setisLoading: (value: boolean) => set({ isLoading: value }),
  setDataFetched: (value: boolean) => set({ isDataFetched: value }),
  seedTodos: (todos: Itodo[]) => set({ todoList: todos }),
  editTodo: { id: 0, name: '', isCompleted: false },
  addTodo: (todo: Itodo) =>
    TodoService.postTodo(todo).then(() => {
      set(() => ({
        isDataFetched: true,
      }));
    }),
  updateTodo: (updatedTodo: Itodo) =>
    TodoService.updateTodo(updatedTodo).then(() => {
      set(() => ({
        isDataFetched: true,
      }));
    }),
  deleteTodo: async (id: number) => {
    try {
      const res = await TodoService.deleteTodo(id);
      console.log(`response from deleteTodo: ${res}`);
      set(() => ({
        isDataFetched: true,
      }));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  },

  editTodoFunction: (todo: Itodo) => set({ editTodo: todo }),
  toggleTodoCompletion: (id: number) =>
    set((state) => ({
      todoList: state.todoList.map((todo: Itodo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      ),
      isDataFetched: true,
    })),
}));
