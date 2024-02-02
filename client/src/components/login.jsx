import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const postData = {
      name: name,
      password: password,
    };

    console.log("Post data:", postData);

    try {
      const response = await axios.post("/api/login", postData);

      console.log("Response status:", response.status);

      if (response.status === 200) {
        console.log("Login successful");
        navigate("/blog");
        // Redirigir a la página principal o realizar otra acción en caso de éxito
      } else {
        console.error("Login failed:", response.data.message);
        alert("Credenciales incorrectas"); // Mostrar una alerta para credenciales incorrectas
        // Manejar el error de inicio de sesión (por ejemplo, mostrar un mensaje de error)
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Credenciales incorrectas");
        alert("Credenciales incorrectas"); // Mostrar una alerta para credenciales incorrectas
      } else {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <input
            className="btn-c bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            value="Entrar"
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
