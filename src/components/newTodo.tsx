import React, { useRef, useState } from 'react';
import { useTodo } from '../context/TodoContext';
import { addNewTodo } from '../actions/TodoActions';
//import { ITodoInput } from '../interface';

// type Props = {
//   onNewTodo: (todo: ITodoInput) => void;
// };

export const NewTodo = (/*props: Props*/): JSX.Element => {
  //const classes = useStyles();
  const { dispatch } = useTodo();
  const [state, setState] = useState({ title: '', assignee: '' });

  const inputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  const updateTodoAssignee = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setState({ ...state, [event.target.name]: event.target.value.trim() });
  };

  const updateTodoTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setState({ ...state, [event.target.name]: event.target.value.trim() });
  };

  const submitHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (event.key !== 'Enter') {
      return;
    }
    const inputValue = inputRef.current!.value;

    if (inputValue.trim() === '') {
      return;
    }

    dispatch(
      addNewTodo({
        title: state.title,
        assignee: state.assignee,
      })
    );

    inputRef.current!.value = '';
    selectRef.current!.value = '';
  };

  return (
    <div className="new-todo">
      <input
        name="title"
        style={{ fontSize: '16pt' }}
        type="text"
        ref={inputRef}
        autoFocus
        autoComplete="off"
        placeholder="Hi mate, what needs to be done?"
        onChange={updateTodoTitle}
        onKeyUp={submitHandler}
      />
      <select
        name="assignee"
        style={{ fontSize: '16pt' }}
        ref={selectRef}
        value={state.assignee}
        onChange={updateTodoAssignee}
      >
        <option value="" disabled>
          Choose Assignee
        </option>
        <option>me</option>
        <option>Ran</option>
        <option>Billy</option>
      </select>
    </div>
  );
};
