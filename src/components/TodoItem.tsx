import React, { useRef, useState } from 'react';
import { AbilityContext } from '../context/CanContext';
import { useAbility } from '@casl/react';
import { ITodoItem } from '../interface';

export interface Props {
  todo: ITodoItem;
  onEdited: (todo: ITodoItem) => void;
  onRemove: (todo: ITodoItem) => void;
  onComplete: (todo: ITodoItem, completed: boolean) => void;
}

//type State = Readonly<{ isEditing: boolean; editingTitle: string }>;
export const TodoItem = (props: Props): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);

  const ability = useAbility(AbilityContext);

  const [state, setState] = useState({ editingTitle: '', isEditing: false });

  const getClassName = () => {
    const css = ['todo'];

    if (props.todo.completed) {
      css.push('completed');
    }

    if (state.isEditing) {
      css.push('editing');
    }

    return css.join(' ');
  };

  const completeTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props?.onComplete) props.onComplete(props.todo, e.target.checked);
  };

  const editTodo = () => {
    if (!ability.can('update', props.todo)) return;

    setState((prev) => ({ ...prev, isEditing: true }));
    inputRef.current?.focus();
  };

  const doneEdit = () => {
    if (state.isEditing) return;

    if (inputRef.current) {
      if (!inputRef.current.value) {
        removeTodo();
      } else {
        props.onEdited({ ...props.todo, title: inputRef.current.value });
      }
    }
    cancelEdit();
  };

  const cancelEdit = () => {
    setState((prev) => ({ ...prev, isEditing: false, editingTitle: '' }));
  };

  const doneOrCancelEdit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      doneEdit();
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  };
  const updateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, editingTitle: e.target.value }));
  };
  const removeTodo = () => {
    props.onRemove(props.todo);
  };

  return (
    <>
      <li className={getClassName()}>
        {ability.can('update', 'Todo') && (
          <input
            type="checkbox"
            checked={props.todo.completed}
            onChange={completeTodo}
            className="toggle"
          />
        )}
        <div className="view">
          <label onDoubleClick={editTodo}>{props.todo.title}</label>
        </div>

        {ability.can('update', 'Todo') && (
          <input
            className="edit"
            type="text"
            ref="inputRef"
            value={state.editingTitle || props.todo.title}
            onBlur={doneEdit}
            onKeyUp={doneOrCancelEdit}
            onChange={updateTitle}
          />
        )}
        <div className="assignee">{props.todo.assignee}</div>
        {ability.can('delete', 'Todo') && (
          <button className="destroy" onClick={removeTodo}></button>
        )}
      </li>
    </>
  );
};

TodoItem.contextType = AbilityContext;
