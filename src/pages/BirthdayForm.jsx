import React, { useState, useEffect } from "react";
import { ref, push } from "firebase/database";
import { db } from "../firebaseConfig";
import { useLocation, useNavigate } from "react-router-dom";

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

  const location = useLocation(); // Usar location correctamente
  const navigate = useNavigate(); // Para redirigir a la vista de la invitación

  // Definir la clave secreta correcta
  const claveCorrecta = "form-data-bday"; // Cambia esto a tu clave deseada

  // Obtener la clave de la URL
  const queryParams = new URLSearchParams(location.search);
  const claveSecreta = queryParams.get("clave_secreta");

  // Estado para manejar si la clave es válida o no
  const [claveValida, setClaveValida] = useState(false);
  //form-data-bday?clave_secreta=form-data-bday

  useEffect(() => {
    // Si la clave no es correcta, redirigir al inicio o mostrar un mensaje
    if (claveSecreta === claveCorrecta) {
      setClaveValida(true);
    } else {
      navigate("/"); // Redirige a otra página si la clave es incorrecta
    }
  }, [claveSecreta, navigate]);

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
    <>
      {claveValida ? (
        <form onSubmit={handleSubmit}>
          {/* Aquí va tu formulario */}
          <h2>Crear invitación de cumpleaños</h2>
          <div>
            <label>Nombre del cumpleañero:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Fecha del cumpleaños:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Edad que cumple:</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Lugar del festejo:</label>
            <input
              type="text"
              name="place"
              value={formData.place}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Dirección real del lugar:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Horario de inicio:</label>
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Horario de fin:</label>
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Telefono de confirmación:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Crear invitación</button>
        </form>
      ) : (
        <p>No tienes acceso a este formulario.</p>
      )}
    </>
  );
};

export default BirthdayForm;
