import React, { Fragment, useEffect, useState } from "react";
import EditTodo from "./EditTodo";
import axios from "axios";

function ListTodos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function getTodos() {
      try {
        const response = await axios.get("http://localhost:4000/todos");
        const jsonData = await response.data;
        setTodos(jsonData);
      } catch (error) {
        console.error(error.message);
      }
    }
    getTodos();
  }, []);

  async function deleteTodo(id) {
    try {
      const deleteTodo = await axios.delete(
        `http://localhost:4000/todos/${id}`
      );
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (error) {
      console.error(error.message);
    }
  }

  console.log(todos);

  return (
    <Fragment>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => {
            return (
              <tr key={todo.todo_id}>
                <td>{todo.description}</td>
                <td>
                  <EditTodo edited={todo} />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      deleteTodo(todo.todo_id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Fragment>
  );
}

export default ListTodos;
