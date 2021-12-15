import React from "react";
import Headline from "../components/Headline";
import Table from "../components/Table";

const Leaderboard = () => {
  return (
    <div className="flex flex-col justify-center">
      <Headline
        title="Leaderboard Prestasi Aktivis Salman"
        desc="Dikelola oleh Bidang Mahasiswa, Kaderisasi, dan Alumni Masjid Salman ITB"
      />
      <Table />
    </div>
  );
};

export default Leaderboard;
