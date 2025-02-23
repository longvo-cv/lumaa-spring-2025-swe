import React, { Fragment, useState } from "react";

interface Task {
  id: number;
  title: string;
  description: string;
  is_complete: boolean;
}

interface EditTaskProps {
  task: Task;
}

const EditTask: React.FC<EditTaskProps> = ({ task }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [isComplete, setIsComplete] = useState(task.is_complete);
  const [showModal, setShowModal] = useState(false);

  const updateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const body = { title, description, is_complete: isComplete };
      console.log("Updating task with ID:", task); 
      const response = await fetch(
        `http://localhost:5000/tasks/${task.id}`, 
        {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}`,  },
          body: JSON.stringify(body),
        }
      );

      if (response.ok) {
        setShowModal(false);
        window.location.href = "/tasks"; 
        
      } else {
        console.error("Failed to update the task");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error updating task:", err.message);
      } else {
        console.error("An unknown error occurred while updating task.");
      }
    }
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-warning"
        onClick={() => setShowModal(true)}
      >
        Edit
      </button>

      {showModal && (
        <div className="modal show d-block" tabIndex={-1} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Edit Task</h4>
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
                  />
                </div>
                <div className="form-group text-start">
                  <label className="font-weight-bold d-block ">
                    Completion Status
                  </label>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="complete-no"
                      name="is_complete"
                      value="false"
                      checked={!isComplete}
                      onChange={() => setIsComplete(false)}
                    />
                    <label className="form-check-label" htmlFor="complete-no">
                      No
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="complete-yes"
                      name="is_complete"
                      value="true"
                      checked={isComplete}
                      onChange={() => setIsComplete(true)}
                    />
                    <label className="form-check-label" htmlFor="complete-yes">
                      Yes
                    </label>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={(e) => updateTask(e)}
                >
                  Save Changes
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

      {/* Overlay to close modal */}
      {showModal && (
        <div
          className="modal-backdrop show"
          onClick={() => setShowModal(false)}
        ></div>
      )}
    </Fragment>
  );
};

export default EditTask;
