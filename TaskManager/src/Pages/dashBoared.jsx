import { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "../Components/TaskForm.jsx";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // ✅ Safely extract the array of tasks
      setTasks(res.data.tasks || []);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setTasks([]); // Fallback to empty array to avoid .map crash
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Your Tasks</h1>
      <TaskForm
        fetchTasks={fetchTasks}
        editingTask={editingTask}
        setEditingTask={setEditingTask}
      />
      <div className="mt-6 space-y-3">
        {/* ✅ Safe rendering with array check */}
        {Array.isArray(tasks) && tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task._id} className="border p-4 rounded shadow flex justify-between">
              <div>
                <h2 className="text-lg font-semibold">{task.title}</h2>
                <p className="text-sm text-gray-600">{task.description}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => setEditingTask(task)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No tasks found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;



















// import { useEffect, useState } from "react";
// import axios from "axios";
// import TaskForm from "../Components/TaskForm.jsx";

// const Dashboard = () => {
//   const [tasks, setTasks] = useState([]);
//   const [editingTask, setEditingTask] = useState(null);
//   const token = localStorage.getItem("token");

//   const fetchTasks = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/tasks", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTasks(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchTasks();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h1 className="text-3xl font-bold mb-4">Your Tasks</h1>
//       <TaskForm fetchTasks={fetchTasks} editingTask={editingTask} setEditingTask={setEditingTask} />
//       <div className="mt-6 space-y-3">
//         {tasks.map((task) => (
//           <div key={task._id} className="border p-4 rounded shadow flex justify-between">
//             <div>
//               <h2 className="text-lg font-semibold">{task.title}</h2>
//               <p className="text-sm text-gray-600">{task.description}</p>
//             </div>
//             <div className="space-x-2">
//               <button
//                 onClick={() => setEditingTask(task)}
//                 className="text-blue-600 hover:underline"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDelete(task._id)}
//                 className="text-red-600 hover:underline"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
