import React, { useRef, useState } from 'react';
import { Input, Select, InputLabel, FormControl } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useTodo } from '../context/TodoContext';
import { addNewTodo } from '../actions/TodoActions';
//import { ITodoInput } from '../interface';

// type Props = {
//   onNewTodo: (todo: ITodoInput) => void;
// };

const useStyles = makeStyles({
  formControl: {
    margin: 0,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: '2px',
  },
  newTodo: {
    display: 'flex',
  },
  newTodoInput: {
    flex: 1,
  },
  newTodoSelect: {
    flex: '0 0 auto',
  },
});

export const NewTodo = (/*props: Props*/): JSX.Element => {
  const classes = useStyles();
  const { dispatch } = useTodo();
  const [state, setState] = useState({ title: '', assignee: '' });

  const inputRef = useRef<HTMLInputElement>(null);
  //const selectRef = useRef<HTMLSelectElement>(null);

  // const updateTodoAssignee = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   event.preventDefault();
  //   setState({ ...state, [event.target.name]: event.target.value.trim() });
  // };
  const updateTodoAssignee = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof state;
    setState({ ...state, [name]: event.target.value });
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
    <div className={classes.newTodo}>
      {/* <input
        className="six columns"
        type="text"
        name="title"
        ref={inputRef}
        autoFocus
        autoComplete="off"
        placeholder="What needs to be done?"
        onChange={updateTodoTitle}
        onKeyUp={submitHandler}
      /> */}
      <Input
        className={classes.newTodoInput}
        type="text"
        name="title"
        inputRef={inputRef}
        autoFocus
        autoComplete="off"
        placeholder="What needs to be done?"
        onChange={updateTodoTitle}
        onKeyUp={submitHandler}
        required
        fullWidth
      />
      {/* <select
        className="two columns"
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
      </select> */}
      <FormControl
        variant="outlined"
        className={classes.formControl + ' ' + classes.newTodoSelect}
      >
        {/* <div className="new-todo-select"> */}
        <InputLabel htmlFor="filled-assignee">Age</InputLabel>
        <Select
          native
          label={'assignee'}
          value={state.assignee}
          onChange={updateTodoAssignee}
          inputProps={{
            name: 'assignee',
            id: 'filled-assignee',
          }}
        >
          <option aria-label="Choose Assignee" value="" />
          <option value={'Me'}>Me</option>
          <option value={'Ran'}>Ran</option>
          <option value={'Billy'}>Billy</option>
        </Select>
        {/* </div> */}
      </FormControl>
    </div>
  );
};
