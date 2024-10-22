import React from "react";

const ConfirmBtn = ({ phoneNumber, birthdayName }) => {
  const handleConfirm = () => {
    const message = `¡Hola! Confirmo mi asistencia al cumpleaños de ${birthdayName}`;

    // Asegúrate de que phoneNumber esté en el formato correcto
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    // Abre el enlace en una nueva pestaña
    window.open(whatsappLink, "_blank");
  };

  return <button onClick={handleConfirm}>Confirmar asistencia</button>;
};

export default ConfirmBtn;
