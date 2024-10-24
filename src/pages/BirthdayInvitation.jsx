import { useParams } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import { db } from "../firebaseConfig";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import ConfirmBtn from "../components/ConfirmBtn";
import AddressBtn from "../components/AddressBtn";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Confetti from "react-confetti";

const BirthdayInvitation = () => {
  const { id } = useParams(); // Captura el ID de la URL
  const [birthdayData, setBirthdayData] = useState(null);
  const [showConfetti, setShowConfetti] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const { width, height } = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  // useEffect para ocultar el confeti después de 5 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setShowConfetti(false), 1000);
    }, 4000); // 5000 ms = 5 seconds

    return () => clearTimeout(timer); // Limpiar el temporizador al desmontar el componente
  }, []);

  useEffect(() => {
    const birthdayRef = ref(db, `invitations/${id}`);
    onValue(birthdayRef, (snapshot) => {
      const data = snapshot.val();
      setBirthdayData(data);
    });
  }, [id]);

  if (!birthdayData) return <p>Cargando invitación...</p>;

  const formattedDate = format(
    new Date(birthdayData.date),
    "EEEE, dd 'de' MMMM 'de' yyyy",
    { locale: es }
  );

  return (
    <div className="bday-invitation">
      {showConfetti && (
        <div className={`confetti-container ${fadeOut ? "fade-out" : ""}`}>
          <Confetti width={width} height={height} />
        </div>
      )}
      <Header />

      <div className="main">
        <section className="bday-data">
          <h1>
            ¡{birthdayData.name} cumple {birthdayData.age}!
          </h1>

          <p>
            Lo festeja el día <strong>{formattedDate}</strong>
          </p>
          <p>
            de {birthdayData.startTime}hs a {birthdayData.endTime}hs
          </p>
          <p>
            en <strong>{birthdayData.place}</strong>
          </p>
        </section>
        <div className="btn-section">
          <section className="confirm-section">
            <p>Confirmá tu asistencia haciendo click en el boton de abajo.</p>
            {/* Botón para confirmar asistencia vía WhatsApp */}
            <ConfirmBtn
              phoneNumber={birthdayData.phone}
              birthdayName={birthdayData.name}
            />{" "}
          </section>

          <section className="address-section">
            <AddressBtn address={birthdayData.address} />{" "}
            {/* Pasar la dirección real */}
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BirthdayInvitation;
