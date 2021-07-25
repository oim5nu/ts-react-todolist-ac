import React, { useRef, useState } from 'react';
import { AbilityContext } from '../context/CanContext';
import { useAbility } from '@casl/react';
import { useTodo } from '../context/TodoContext';
import { updateTodo, deleteTodo } from '../actions/TodoActions';
import { ITodoItem } from '../interface';

export interface Props {
  todo: ITodoItem;
  onEdited: (todo: ITodoItem) => void;
  onRemove: (todo: ITodoItem) => void;
  onComplete: (todo: ITodoItem, completed: boolean) => void;
}

//type State = Readonly<{ isEditing: boolean; editingTitle: string }>;
export const TodoItem = (props: Props): JSX.Element => {
  const { state: contextState, dispatch } = useTodo();
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
    const canUpdateTodo = ability.can('update', props.todo);
    console.log('canUpdateTodo', canUpdateTodo);
    if (!canUpdateTodo) return;

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
      console.log('Done Edit');
      doneEdit();
      console.log('Cancel Edit');
      cancelEdit();
    }
  };
  const updateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('updateTitle');
    setState((prev) => ({ ...prev, editingTitle: e.target.value }));
  };
  const removeTodo = () => {
    console.log('click removeTodo');
    //props.onRemove(props.todo);
    dispatch(deleteTodo(props.todo.id));
  };
  debugger;
  const canUpdateTodo = ability.can('update', 'Todo');
  console.log('canUpdateTodo', canUpdateTodo);
  const canDeleteTodo = ability.can('delete', 'Todo');
  console.log('canDeleteTodo', canDeleteTodo);
  const canManageTodo = ability.can('manage', 'Todo');
  console.log('canManageTodo', canManageTodo);
  return (
    <>
      <li className={getClassName()}>
        {/* Checkbox & label*/}
        <label onDoubleClick={editTodo}>
          {canUpdateTodo && (
            <input
              type="checkbox"
              checked={props.todo.completed}
              onChange={completeTodo}
              className="toggle"
            />
          )}
          <span
            style={{
              display: 'inline-block',
              paddingLeft: '20px',
              width: '300px',
            }}
          >
            {props.todo.title}
          </span>
        </label>
        {/* Hidden Input*/}
        {canUpdateTodo && (
          <div>
            <input
              style={{
                display: 'none',
                fontSize: '16pt',
                marginLeft: '-300px',
                width: '300px',
              }}
              className="edit"
              type="text"
              ref={inputRef}
              value={state.editingTitle || props.todo.title}
              onBlur={doneEdit}
              onKeyUp={doneOrCancelEdit}
              onChange={updateTitle}
            />
          </div>
        )}
        <div className="assignee">{props.todo.assignee}</div>
        {canDeleteTodo && (
          <button
            style={{ fontSize: '16pt' }}
            className="btn"
            onClick={removeTodo}
          >
            X
          </button>
        )}
      </li>
    </>
  );
};

//TodoItem.contextType = AbilityContext;
