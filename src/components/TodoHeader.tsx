import React, { useState } from 'react';
// import { useTodo } from '../context/TodoContext';
// import { addNewTodo } from '../actions/TodoActions';
import { AbilityContext } from '../context/CanContext';
import { useAbility } from '@casl/react';
import { defineRulesFor } from '../config/ability';

export const TodoHeader = (/*props: Props*/): JSX.Element => {
  const ability = useAbility(AbilityContext);
  //const { dispatch } = useTodo();
  const [state, setState] = useState({ role: 'user' });

  const selectedIfRole = (role: string) => {
    return state.role === role ? 'selected' : '';
  };

  const setRole =
    (role: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      ability.update(defineRulesFor(role));
      setState({ role });
    };
  return (
    <div style={{ fontSize: '16pt' }} className="header">
      <ul className="roles">
        <li className="help">Login as different roles:</li>
        <li>
          <button
            type="button"
            className={selectedIfRole('admin')}
            onClick={setRole('admin')}
          >
            Admin
          </button>
        </li>
        <li>
          <button
            type="button"
            className={selectedIfRole('user')}
            onClick={setRole('user')}
          >
            User
          </button>
        </li>
      </ul>
    </div>
  );
};
