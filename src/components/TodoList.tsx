import { useTodo } from '../context/TodoContext';
// import { deleteTodo } from '../actions/TodoActions';
import { TodoItem, Props as TodoItemProps } from './TodoItem';
import { ITodoItem } from '../interface';

// type Props = Omit<TodoItemProps, 'todo'> & {
//   items: ITodoItem[];
// };
type Props = Omit<TodoItemProps, 'todo'>;

export const TodoList = (props: Props): JSX.Element => {
  //const { items, ...todoProps } = props;
  const {
    state: { todos },
    //dispatch,
  } = useTodo();

  //const deleteHandler = (id: string) => dispatch(deleteTodo(id));

  return todos.length > 0 ? (
    <section className="main">
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} {...props} />
        ))}
      </ul>
    </section>
  ) : (
    <h2>Empty Todo List!</h2>
  );
};

export default TodoList;
