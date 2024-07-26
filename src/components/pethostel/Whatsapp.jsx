import React from 'react';

function ContactUs() {
  const whatsappNumber = '1234567890'; // Replace with your WhatsApp number in international format

  return (
    <div>
      <a 
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-button"
      >
        Contact Us on WhatsApp
      </a>
    </div>
  );
}

export default ContactUs;
