import React from "react";

function CustomAlert({ message }) {
    return (
      <div className="bg-primary w-20 d-flex justify-content-center align-items-center">
        <div className="rounded p-2 alert alert-danger alert-sm">
          {message}
        </div>
      </div>
    );
  }
  

export default CustomAlert;
