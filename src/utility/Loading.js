import React from 'react';

function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
    <img src="assets/logo.png" alt="Loader" className="w-50 h-50 animate-spin" />
  </div>
  );
}

export default Loader;
