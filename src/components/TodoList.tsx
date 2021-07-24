// import { useTodo } from '../context/TodoContext';
// import { deleteTodo } from '../actions/TodoActions';
import { TodoItem, Props as TodoItemProps } from './TodoItem';
import { ITodoItem } from '../interface';

type Props = Omit<TodoItemProps, 'todo'> & {
  items: ITodoItem[];
};

export const TodoList = (props: Props): JSX.Element => {
  const { items, ...todoProps } = props;
  // const {
  //   state: { todos },
  //   dispatch,
  // } = useTodo();

  //const deleteHandler = (id: string) => dispatch(deleteTodo(id));

  return items.length > 0 ? (
    <section className="main">
      <ul>
        {items.map((todo) => (
          <TodoItem key={todo.id} todo={todo} {...todoProps} />
        ))}
      </ul>
    </section>
  ) : (
    <h2>Empty Todo List!</h2>
  );
};

export default TodoList;
