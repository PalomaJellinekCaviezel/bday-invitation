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

const BirthdayInvitation = () => {
  const { id } = useParams(); // Captura el ID de la URL
  const [birthdayData, setBirthdayData] = useState(null);

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
    <>
      <Header />
      <section className="bday-data">
        <h1>
          {birthdayData.name} cumple {birthdayData.age}
        </h1>
        <h2>y estas invitado!</h2>
        <p>
          El día <strong>{formattedDate}</strong>
        </p>
        <p>
          de {birthdayData.startTime}hs a {birthdayData.endTime}hs
        </p>
        <p>
          en <strong>{birthdayData.place}</strong>
        </p>
      </section>
      <section className="confirm-section">
        <p>Confirmá tu asistencia haciendo click en el boton de abajo!</p>
        {/* Botón para confirmar asistencia vía WhatsApp */}
        <ConfirmBtn
          phoneNumber={birthdayData.phone}
          birthdayName={birthdayData.name}
        />{" "}
      </section>

      <section className="address-section">
        <p>{birthdayData.address}</p>
        <AddressBtn address={birthdayData.address} />{" "}
        {/* Pasar la dirección real */}
      </section>
      <Footer />
    </>
  );
};

export default BirthdayInvitation;
