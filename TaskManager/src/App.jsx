import { Routes, Route } from "react-router-dom";
import Register from "./Pages/register.jsx";
import Login from "./pages/login.jsx";
import Dashboard from "./Pages/dashBoared.jsx";
import PrivateRoute from "./Components/PrivetRoute.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
