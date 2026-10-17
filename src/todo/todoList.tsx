import { Edit, Loader, Loader2, Trash } from 'lucide-react';
import { useTodoStore } from '../store/todoStore';

export const TodoList = () => {
  const { todoList, editTodoFunction, deleteTodo, isLoading } = useTodoStore();
  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <label htmlFor="todo" className="block text-sm font-medium text-gray-700">
        Todo List
      </label>
      <table className="border border-gray-300 rounded-md p-2 w-96 min-h-32">
        <thead className="bg-gray-100 border-b border-gray-300 w-full">
          <tr className="bg-green-200">
            <th className="p-2 w-1/12">S.No</th>
            <th className="p-2 w-8/12">Todo</th>
            <th className="p-2 w-3/12">Actions</th>
          </tr>
        </thead>
        {isLoading || !todoList ? (
          <Loader2
            className="animate-spin text-amber-500 h-10 w-10 mx-auto my-4"
            size={34}
          />
        ) : (
          <tbody>
            {todoList?.map((todoItem, index) => (
              <tr key={todoItem.id} className="border-b border-gray-300">
                <td className="p-2">{index + 1}</td>
                <td
                  className={`p-2 ${todoItem.isCompleted ? 'line-through text-gray-500' : 'text-gray-800'}`}
                >
                  {todoItem.name}
                </td>
                <td className="p-2 flex gap-2">
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded-md mr-2"
                    onClick={() => editTodoFunction(todoItem)}
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded-md"
                    onClick={() => deleteTodo(todoItem.id)}
                  >
                    <Trash size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};
