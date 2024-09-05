import {create} from 'zustand';
import {TTodoDetailDTO} from 'types/dtos/todo.ts';

interface TodoStoreState {
  todoList: TTodoDetailDTO | null;
  setTodoList: (todoList: TTodoDetailDTO) => void;
  isEditMode: boolean;
  setIsEditMode: (isEdit: boolean) => void;
}

const useTodoStore = create<TodoStoreState>(set => ({
  todoList: null,
  setTodoList: (todoList: TTodoDetailDTO) => {
    set({todoList});
  },
  isEditMode: false,
  setIsEditMode: (isEditMode: boolean) => {
    set({isEditMode});
  },
}));

export default useTodoStore;
