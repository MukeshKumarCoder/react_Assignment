import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [newTodo, setNewTodo] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    fetchTodos(page);
  }, [page]);

  async function fetchTodos(page) {
    try {
      let res = await axios.get(
        `https://jsonplaceholder.typicode.com/todos?_limit=15&_page=${page}`
      );
      
      const totalCount = Number(res.headers["x-total-count"]);
      const totalPage = Math.ceil(totalCount / 15);
      setTodos(res.data);
      setTotalPage(totalPage);
      setLoading(false);
    } catch (error) {
      setErr(error);
      setLoading(false);
    }
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (err) {
    return <h1>Data Not Found...</h1>;
  }

  const addTodo = async () => {
    if (newTodo.trim() !== "") {
      try {
        const res = await axios.post(
          "https://jsonplaceholder.typicode.com/todos",
          {
            title: newTodo,
            completed: false,
          }
        );
        setTodos([...todos, res.data]);
        setNewTodo("");
      } catch (error) {
        console.log("Error while NewTodo", error);
      }
    }
  };

  const toggleStatus = async (id) => {
    try {
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      setTodos(updatedTodos);
      await axios.patch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        completed: !todos.find((todo) => todo.id === id).completed,
      });
    } catch (error) {
      console.log("Error while Toggling", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const filteredTodo = todos.filter((todo) => todo.id !== id);
      setTodos(filteredTodo);
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="title">My TODO App</h1>
      <div className="container">
        <div className="inputBox">
        <input
          type="text"
          placeholder="Add new Todo"
          value={newTodo}
          onChange={(e) => {
            setNewTodo(e.target.value);
          }}
        />
        <button onClick={addTodo}>Add</button>
        </div>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.id} {" - "}
              {todo.title} - {todo.completed ? "Conpleted" : "Not Completed"}
              <button className="todoBtn" onClick={() => toggleStatus(todo.id)}>Toggle</button>
              <button className="todoBtn" onClick={() => deleteTodo(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
        <div className="btn">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            prev
          </button>
          <p>Page: {page}</p>
          <button
            disabled={page === totalPage}
            onClick={() => setPage(page + 1)}
          >
            next
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
