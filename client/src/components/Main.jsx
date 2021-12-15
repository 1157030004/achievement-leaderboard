import React from "react";

const Main = ({ children }) => {
  return (
    <div className="main pb-8 mx-5">
      <div className="container font-nunito max-w-3xl mx-auto">{children}</div>
    </div>
  );
};

export default Main;
