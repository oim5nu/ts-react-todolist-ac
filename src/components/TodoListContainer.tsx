import React, { useEffect, useState } from 'react';
import { buildTodo, saveTodo, fetchTodo } from '../services/todo-storage';
//import NewTodo from './NewTodo';
import { TodoList } from './TodoList';
import { ITodoItem } from '../interface';
import { AbilityContext } from '../context/CanContext';
import { useAbility } from '@casl/react';
import { NewTodo } from './newTodo';

export const TodoListContainer = (): JSX.Element => {
  const [state, setState] = useState({ items: fetchTodo() });
  console.log('AbilityContext', AbilityContext);
  const ability = useAbility(AbilityContext);
  useEffect(() => {
    saveTodo(state.items);
  }, [state.items]);

  // const addTodo = (
  //   attrs: Pick<ITodoItem, 'assignee' | 'title' | 'completed'>
  // ) => {
  //   const todoItem = buildTodo(attrs);

  //   setState((prevState) => ({
  //     items: [...prevState.items, todoItem],
  //   }));
  // };

  const removeTodo = (todoItem: ITodoItem) => {
    setState((prevState) => ({
      items: prevState.items.filter((item) => item !== todoItem),
    }));
  };

  const editTodo = (todoItem: ITodoItem) => {
    setState((prevState) => {
      const items = prevState.items.slice();
      const index = items.findIndex((item) => item.id === todoItem.id);

      items.splice(index, 1, todoItem);

      return { items: items };
    });
  };

  const completeTodo = (todo: ITodoItem, completed: boolean) => {
    setState((prevState) => {
      const items = prevState.items.slice();
      const index = items.findIndex((item) => item.id === todo.id);
      items[index] = { ...items[index], completed };
      return { items: items };
    });
  };

  return (
    <div>
      <header className="header">
        {ability.can('create', 'Todo') && <NewTodo />}
      </header>
      <TodoList
        items={state.items}
        onRemove={removeTodo}
        onEdited={editTodo}
        onComplete={completeTodo}
      />
    </div>
  );
};
