import React from 'react';

export type ITodoAction =
  | { type: 'ADD'; payload: ITodoItem }
  | { type: 'DELETE'; payload: string }
  | { type: 'UPDATE'; payload: ITodoItem };

export interface ITodoItem {
  id: string;
  type: 'Todo';
  title: string;
  assignee: string;
  completed: boolean;
}

export type ITodoAddInput = Pick<ITodoItem, 'title' | 'assignee'>;

export interface ITodoState {
  todos: ITodoItem[];
}

export interface ITodoContextModel {
  state: ITodoState;
  dispatch: React.Dispatch<ITodoAction>;
}
