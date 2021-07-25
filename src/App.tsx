import { TodoProvider } from './context/TodoContext';
import { AbilityContext } from './context/CanContext';
// import { TodoHeader } from './components/TodoHeader';
import { TodoListContainer } from './components/TodoListContainer';
import { buildAbilityFor } from './config/ability';
import './App.css';

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
