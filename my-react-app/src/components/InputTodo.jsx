import React, { useState, Fragment } from "react";
import axios from "axios";

function InputTodo() {
  const [description, setDescription] = useState("");

  function addDescription(event) {
    const { value } = event.target;
    setDescription(value);
  }

  async function onSubmitForm(event) {
    event.preventDefault();
    try {
      const body = { description };
      const response = await axios.post("http://localhost:4000/todos", body);

      window.location = "/";
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <Fragment>
      <h1 className="text-center mt-5">PERN ToDo List</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          className="form-control"
          type="text"
          value={description}
          onChange={addDescription}
        />
        <button className="btn btn-success">Add</button>
      </form>
    </Fragment>
  );
}

export default InputTodo;
