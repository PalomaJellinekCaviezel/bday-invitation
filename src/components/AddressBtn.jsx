// ConfirmButton.js
import React from "react";

const AddressBtn = ({ address }) => {
  const handleGetAddress = () => {
    let googleMapsLink;

    if (address.startsWith("http://") || address.startsWith("https://")) {
      googleMapsLink = address;
    } else {
      googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        address
      )}`;
    }
    window.open(googleMapsLink, "_blank");
  };

  return <button onClick={handleGetAddress}>¿Cómo llegar?</button>;
};

export default AddressBtn;
