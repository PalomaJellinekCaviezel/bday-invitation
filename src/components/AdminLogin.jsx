import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useAuth } from "../context/AuthContext";
import "../admin.css";
import { useNavigate } from "react-router-dom";

const AdminLogin = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLoginSuccess } = useAuth(); // Obtén la función del contexto
  const navigate = useNavigate(); // Crea una instancia de navigate

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        handleLoginSuccess();
        navigate("/admin"); // Redirige a la ruta del formulario admin
      })
      .catch((error) => {
        console.error("Error de autenticación:", error);
        alert("Error de autenticación. Verifica tus credenciales.");
      });
  };
  return (
    <div className="admin-login">
      <form onSubmit={handleLogin}>
        <h2>Login de Administrador</h2>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default AdminLogin;
