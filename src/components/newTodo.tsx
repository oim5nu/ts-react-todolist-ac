import React, { useRef, useState } from 'react';
import { useTodo } from '../context/TodoContext';
import { addNewTodo } from '../actions/TodoActions';
//import { ITodoInput } from '../interface';

// type Props = {
//   onNewTodo: (todo: ITodoInput) => void;
// };

export const NewTodo = (/*props: Props*/): JSX.Element => {
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
        completed: false,
      })
    );

    setState({ title: '', assignee: '' });
    // textInputRef.current!.value = '';
    // assigneeSelectRef.current!.value = '';
  };

  return (
    <div>
      <input
        type="text"
        name="title"
        ref={inputRef}
        autoFocus
        autoComplete="off"
        placeholder="What needs to be done?"
        onChange={updateTodoTitle}
        onKeyUp={submitHandler}
      />
      <select
        name="assignee"
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
