import React from 'react';

export type ITodoAction =
  | { type: 'ADD'; payload: ITodoItem }
  | { type: 'DELETE'; payload: string };

export interface ITodoItem {
  id: string;
  type: 'Todo';
  title: string;
  assignee: string;
  completed: boolean;
}

export type ITodoInput = Pick<ITodoItem, 'title' | 'assignee'> & {
  completed: boolean;
};

export interface ITodoState {
  todos: ITodoItem[];
}

export interface ITodoContextModel {
  state: ITodoState;
  dispatch: React.Dispatch<ITodoAction>;
}
