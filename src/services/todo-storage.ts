import { ITodoItem, ITodoInput } from '../interface';
import { uuid } from 'uuidv4';
const STORAGE_KEY = 'todos-react';

export const buildTodo = (attrs: ITodoInput): ITodoItem => {
  return {
    ...attrs,
    type: 'Todo',
    id: uuid(),
    completed: false,
  };
};

export const fetchTodo = (): ITodoItem[] => {
  const items = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  // const lastItem = items[items.length - 1];

  // if (lastItem) {
  //   uid = lastItem.id;
  // }

  return items;
};

export const saveTodo = (todos: ITodoItem[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
};
