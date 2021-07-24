import { ITodoItem, ITodoInput } from '../interface';
import { v4 as uuid_v4 } from 'uuid';
const STORAGE_KEY = 'todos-react';

export const buildTodo = (attrs: ITodoInput): ITodoItem => {
  return {
    ...attrs,
    type: 'Todo',
    id: uuid_v4(),
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
