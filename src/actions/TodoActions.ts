import { ITodoAction, ITodoInput } from '../interface';
import { uuid } from 'uuidv4';

export const addNewTodo = (todo: ITodoInput): ITodoAction => ({
  type: 'ADD',
  payload: { ...todo, id: uuid(), type: 'Todo' },
});

export const deleteTodo = (id: string): ITodoAction => ({
  type: 'DELETE',
  payload: id,
});
