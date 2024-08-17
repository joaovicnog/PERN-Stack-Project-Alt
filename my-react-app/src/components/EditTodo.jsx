import React, { Fragment, useState } from "react";
import axios from "axios";

function EditTodo(props) {
  const [description, setDescription] = useState(props.edited.description);
  function editDescription(event) {
    setDescription(event.target.value);
  }
  async function updateDescription(event) {
    event.preventDefault();
    try {
      const body = { description };
      const response = await axios.put(
        `http://localhost:4000/todos/${props.edited.todo_id}`,
        body
      );

      window.location = "/";
    } catch (error) {
      console.log(body.description);
      console.error(error.message);
    }
  }
  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-warning"
        data-bs-toggle="modal"
        data-bs-target={`#id${props.edited.todo_id}`}
        onClick={() => {
          setDescription(props.edited.description);
        }}
      >
        Edit
      </button>

      <div
        className="modal fade"
        id={`id${props.edited.todo_id}`}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Todo
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  setDescription(props.edited.description);
                }}
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={editDescription}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-bs-dismiss="modal"
                onClick={(event) => updateDescription(event)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => {
                  setDescription(props.edited.description);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default EditTodo;
