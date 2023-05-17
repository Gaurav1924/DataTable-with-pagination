import "./styles.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [todosPerPage, setTodosPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((res) => setTodos(res.data));
  }, []);

  const noOfTotalPages = Math.ceil(todos?.length / todosPerPage);
  const pages = [...Array(noOfTotalPages + 1).keys()].slice(1);

  const indexOfLastTodo = currentPage * todosPerPage; 
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage + 1; 

  const visibleTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  const prevPageHandler = () => {
    if (currentPage !== 1)
      setCurrentPage(currentPage - 1);
  };

  const nextPageHandler = () => {
    if (currentPage !== noOfTotalPages)
      setCurrentPage(currentPage + 1);
  };
  return (
    <>
      <select onChange={(e) => setTodosPerPage(e.target.value)}>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
      </select>
      <div className="App">
        {visibleTodos.map((todo) => (
          <p key={todo.id}>{todo.title}</p>
        ))}
        <span onClick={prevPageHandler}>Prev</span>
        <p>
          {pages.map((page) => (
            <span
              key={page}
              onClick={() => setCurrentPage(page)}
              className={currentPage === page ? "active" : ""}
            >
              {`${page}`}
              {"|"}
            </span>
          ))}
        </p>
        <span onClick={nextPageHandler}>Next</span>
      </div>
    </>
  );
}
