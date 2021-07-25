import { ITodoAction, ITodoAddInput, ITodoItem } from '../interface';
import { v4 as uuid_v4 } from 'uuid';

export const addNewTodo = (todo: ITodoAddInput): ITodoAction => ({
  type: 'ADD',
  payload: { ...todo, id: uuid_v4(), type: 'Todo', completed: false },
});

export const updateTodo = (todo: ITodoItem): ITodoAction => ({
  type: 'UPDATE',
  payload: { ...todo },
});

export const deleteTodo = (id: string): ITodoAction => ({
  type: 'DELETE',
  payload: id,
});
