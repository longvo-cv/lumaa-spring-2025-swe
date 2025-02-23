import React, { Fragment, useEffect, useState } from "react";
import EditTask from "./EditTask"; 

interface Task {
  id: number;
  title: string;
  description: string;
  is_complete: boolean;
}

const ListTasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const deleteTask = async (id: number) => {
    try {
      const deleteResponse = await fetch(`http://localhost:5000/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure token is included
        },
        method: "DELETE",
      });

      if (deleteResponse.ok) {
        setTasks(tasks.filter((task) => task.id !== id));
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Function to fetch tasks from backend
  const getTasks = async () => {
    try {
      const response = await fetch("http://localhost:5000/tasks", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure token is included
        },
      });
  
      const jsonData = await response.json();
      console.log("Fetched tasks:", jsonData); // Debugging log
  
      if (!Array.isArray(jsonData)) {
        throw new Error("Expected an array but got " + typeof jsonData);
      }
  
      setTasks(jsonData);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setTasks([]); 
    }
  };
  useEffect(() => {
    getTasks();
  }, []);

  return (
    <Fragment>
      <h1 className="text-center mt-5">Task List</h1>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Complete</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.is_complete ? "Yes" : "No"}</td>
              <td>
                <EditTask task={task} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTasks;
