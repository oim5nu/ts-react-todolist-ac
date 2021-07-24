import { ITodoAction, ITodoInput } from '../interface';
import { v4 as uuid_v4 } from 'uuid';

export const addNewTodo = (todo: ITodoInput): ITodoAction => ({
  type: 'ADD',
  payload: { ...todo, id: uuid_v4(), type: 'Todo' },
});

export const deleteTodo = (id: string): ITodoAction => ({
  type: 'DELETE',
  payload: id,
});
