import React, { useReducer } from 'react';
import { ITodoAction, ITodoState, ITodoContextModel } from '../interface';

const defaultState: ITodoState = {
  todos: [],
};

const reducer = (state: ITodoState, action: ITodoAction): ITodoState => {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case 'DELETE':
      return {
        ...state,
        todos: state.todos.filter((item) => item.id !== action.payload),
      };

    default:
      return state;
  }
};

export const TodoContext = React.createContext<ITodoContextModel | undefined>(
  undefined
);

type TodoProviderProps = {
  children: React.ReactNode;
};

export const TodoProvider = ({ children }: TodoProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = React.useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodo must be used within a CountProvider');
  }
  return context;
};
