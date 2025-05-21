import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="border-2 shadow-xl py-3 flex justify-center items-center">
      copyright © Department of Computer Science {currentYear}
    </div>
  );
};

export default Footer;