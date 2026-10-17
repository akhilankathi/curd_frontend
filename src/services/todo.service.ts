export const TodoService = {
  getTodos: async () => {
    const response = await fetch('http://localhost:3000/todos');
    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }
    const todos = await response.json();
    return todos;
  },

  postTodo: async (todo: {
    id: number;
    name: string;
    isCompleted: boolean;
  }) => {
    const response = await fetch('http://localhost:3000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
    if (!response.ok) {
      throw new Error('Failed to post todo');
    }
    const newTodo = await response.json();
    return newTodo;
  },

  updateTodo: async (todo: {
    id: number;
    name: string;
    isCompleted: boolean;
  }) => {
    const response = await fetch(`http://localhost:3000/todos/${todo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
    if (!response.ok) {
      throw new Error('Failed to update todo');
    }
    const updatedTodo = await response.json();
    return updatedTodo;
  },

  deleteTodo: async (id: number) => {
    const response = await fetch(`http://localhost:3000/todos/${id}`, {
      method: 'DELETE',
    });
    console.log(response);
    if (!response.ok) {
      throw new Error('Failed to delete todo');
    }
    return `Todo deleted successfully.`;
  },
};
