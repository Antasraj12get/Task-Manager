import { useState, useEffect } from "react";
import axios from "axios";

const TaskForm = ({ fetchTasks, editingTask, setEditingTask }) => {
  const [form, setForm] = useState({ title: "", description: "" });
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (editingTask) {
      setForm({ title: editingTask.title, description: editingTask.description });
    } else {
      setForm({ title: "", description: "" });
    }
  }, [editingTask]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingTask) {
        await axios.put(
          `http://localhost:5000/api/tasks/${editingTask._id}`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setEditingTask(null);
      } else {
        await axios.post("http://localhost:5000/api/tasks", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      setForm({ title: "", description: "" });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Task Title"
        className="w-full p-2 border"
        required
      />
      <input
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full p-2 border"
        required
      />
      <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        {editingTask ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
