import React, { Fragment, useState } from "react";

const InputTask: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showModal, setShowModal] = useState(false);

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const body = { title, description };
      const response = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setShowModal(false); // Close modal after successful addition
        window.location.href = "/tasks"; // Redirect to tasks list
      } else {
        console.error("Failed to add task");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error adding task:", err.message);
      } else {
        console.error("An unknown error occurred while adding task.");
      }
    }
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setShowModal(true)}
      >
        Add Task
      </button>

      {showModal && (
        <div className="modal show d-block" tabIndex={-1} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Add New Task</h4>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowModal(false)}
                >
                  &times;
                </button>
              </div>

              <div className="modal-body">
                <div className="form-group text-start mb-3">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder="Title"
                  />
                </div>

                <div className="form-group text-start mb-3">
                  <label htmlFor="description">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    placeholder="Description"
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={(e) => addTask(e)}
                >
                  Add Task
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div
          className="modal-backdrop show"
          onClick={() => setShowModal(false)}
        ></div>
      )}
    </Fragment>
  );
};

export default InputTask;

