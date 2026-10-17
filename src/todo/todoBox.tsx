import { useEffect, useState } from 'react';
import { useTodoStore } from '../store/todoStore';
import { TodoService } from '../services/todo.service';
import type { Itodo } from './todo';

export const TodoInputBox = () => {
  const {
    editTodo,
    isLoading,
    addTodo,
    updateTodo,
    editTodoFunction,
    seedTodos,
    isDataFetched,
    setDataFetched,
    setisLoading,
  } = useTodoStore();
  const [todo, setTodo] = useState<Itodo>({
    id: 0,
    name: '',
    isCompleted: false,
  });

  const handleChangeTodoText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodo({
      ...todo,
      name: event.target.value,
    });
  };

  const handleClick = () => {
    if (!todo) return;
    if (editTodo.name) {
      updateTodo({
        ...editTodo,
        name: todo.name,
        isCompleted: todo.isCompleted,
      });
    } else {
      addTodo(todo);
    }

    setTodo({
      id: 0,
      name: '',
      isCompleted: false,
    });
    editTodoFunction({ id: 0, name: '', isCompleted: false });
  };

  useEffect(() => {
    if (editTodo.name) {
      setTodo({
        id: editTodo.id,
        name: editTodo.name,
        isCompleted: editTodo.isCompleted,
      });
    }
  }, [editTodo]);

  useEffect(() => {
    setisLoading(true);
    TodoService.getTodos().then((data) => {
      seedTodos(data);
    });
    setDataFetched(false);
    setisLoading(false);
  }, [isDataFetched]);

  return (
    <div className="flex gap-2 items-baseline-last justify-center">
      <div className="flex flex-col gap-2 items-center justify-center">
        {' '}
        <label
          htmlFor="todo"
          className="block text-sm font-medium text-gray-700"
        >
          Create a new todo or edit an existing one
        </label>
        <div className="flex gap-2 items-baseline-last justify-center">
          {' '}
          <input
            className="border border-gray-300 rounded-md p-2 w-8/12"
            type="search"
            name="todo"
            id="todo"
            onChange={handleChangeTodoText}
            placeholder="Enter todo text here ..."
            value={todo.name}
            autoComplete="off"
            disabled={isLoading}
          />
          <select
            className="border border-gray-300 rounded-md p-2 w-4/12 :disabled:bg-gray-200"
            name="status"
            id="status"
            value={todo.isCompleted ? 'true' : 'false'}
            disabled={isLoading || !todo.name}
            onChange={(e) => {
              if (editTodo.name) {
                setTodo({
                  ...todo,
                  isCompleted: e.target.value === 'true' ? true : false,
                });
              } else {
                setTodo({
                  id: Date.now(),
                  name: todo.name,
                  isCompleted: e.target.value === 'true' ? true : false,
                });
              }
            }}
          >
            <option value="false">Incomplete</option>
            <option value="true">Completed</option>
          </select>
        </div>
      </div>
      <button
        type="button"
        onClick={handleClick}
        className="bg-blue-500 text-white px-2 py-2 rounded-md"
        disabled={isLoading}
      >
        {editTodo.name ? 'Edit Todo' : 'Add Todo'}
      </button>
    </div>
  );
};
