import { useState } from "react";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const axiosJwt = axios.create();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
      });
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    setError(false);
    setSuccess(false);
    try {
      await axiosJwt.delete("http://localhost:5000/api/users/" + id, {
        headers: { authorization: "Bearer " + user.tokenDeAcceso },
      });
      setSuccess(true);
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div>
      {user ? (
        <div className=" flex flex-col">
          <h2>Bienvenido al paner de control</h2>
          <h2>{user.username}</h2>
          <button
            className=" bg-red-400 p-2 mx-auto text-white font-semibold rounded-md"
            onClick={() => handleDelete(2)}
          >
            Borrar a Juana
          </button>
          <button
            className=" bg-red-400 p-2 mx-auto text-white font-semibold rounded-md"
            onClick={() => handleDelete(1)}
          >
            Borrar a Juan
          </button>
          {error && <span>no se tienen permisos para borrar el usuario</span>}
          {success && <span>usuario borrado exitosamente</span>}
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className=" p-8 flex flex-col w-[50%] mx-auto border-2 border-green-400 rounded-md text-center"
        >
          <span>Login</span>
          <input
            type="text"
            placeholder="username"
            className=" my-3 w-1/2 mx-auto border-2 border-b-green-400"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            className=" my-3 w-1/2 mx-auto border-2 border-b-green-400"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className=" rounded-md bg-green-400 p-3 w-1/2 mx-auto text-white font-semibold"
          >
            Login
          </button>
        </form>
      )}
    </div>
  );
}

export default App;
