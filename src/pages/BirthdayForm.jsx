import React, { useState } from "react";
import { ref, push } from "firebase/database";
import { db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import AdminLogin from "../components/AdminLogin";
import "../admin.css";
import { useAuth } from "../context/AuthContext";

const BirthdayForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    age: "",
    place: "",
    address: "",
    startTime: "",
    endTime: "",
    phone: " ",
  });

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate(); // Para redirigir a la vista de la invitación

  // Actualizar el estado con los datos del formulario
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Guardar los datos en Firebase y redirigir a la vista de la invitación
  const handleSubmit = (e) => {
    e.preventDefault();

    // Referencia a la base de datos
    const invitationsRef = ref(db, "invitations");

    // Guardar los datos en Firebase con un ID único
    push(invitationsRef, formData)
      .then((snapshot) => {
        const id = snapshot.key; // Obtiene el ID generado por Firebase
        alert("Invitación creada correctamente");
        navigate(`/invitation/${id}`); // Redirige a la página de la invitación con el ID
      })
      .catch((error) => {
        alert("Error al crear la invitación: ", error);
      });
  };

  return (
    <div className="bday-form">
      {!isAuthenticated ? (
        <AdminLogin />
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>Crear invitación de cumpleaños</h2>

          <div>
            <label htmlFor="name">Nombre del cumpleañero:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="date">Fecha del cumpleaños:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="age">Edad que cumple:</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="place">Lugar del festejo:</label>
            <input
              type="text"
              id="place"
              name="place"
              value={formData.place}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="address">Dirección real del lugar:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="startTime">Horario de inicio:</label>
            <input
              type="time"
              id="startTime"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="endTime">Horario de fin:</label>
            <input
              type="time"
              id="endTime"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="phone">Teléfono de confirmación:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Crear invitación</button>
        </form>
      )}
    </div>
  );
};

export default BirthdayForm;
