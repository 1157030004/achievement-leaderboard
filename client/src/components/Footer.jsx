import React from "react";

const Footer = () => {
  let year = new Date().getFullYear();
  return (
    <footer class="p-4 footer bg-base-100 text-base-content footer-center">
      <div>
        <p>
          Copyright © {year} - All right reserved by Kaderisasi Masjid Salman
          ITB
        </p>
      </div>
    </footer>
  );
};

export default Footer;
