import React from 'react';
import { TodoProvider } from './context/TodoContext';
import { AbilityContext } from './context/CanContext';
import { TodoListContainer } from './components/TodoListContainer';
import { buildAbilityFor } from './config/ability';
//import TodoList from './components/TodoList';

export default function App(): JSX.Element {
  const defaultAbility = buildAbilityFor('user');
  return (
    <TodoProvider>
      <AbilityContext.Provider value={defaultAbility}>
        <TodoListContainer />
      </AbilityContext.Provider>
    </TodoProvider>
  );
}
