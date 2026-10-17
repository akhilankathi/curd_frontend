import { TodoInputBox } from './todo/todoBox.tsx';
import { TodoList } from './todo/todoList.tsx';

function App() {
  return (
    <>
      <section
        id="center"
        className="flex flex-col items-center justify-center gap-4 bg-gray-100"
      >
        <h1 className="text-3xl font-bold mb-4">Todo App</h1>
        <TodoInputBox />
        <TodoList />
      </section>
    </>
  );
}

export default App;
