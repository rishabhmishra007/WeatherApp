import React from "react";
import Weather from "./components/weather";

const App = () => {
  return (
    <div className="text-center my-[50px] mx-auto max-w-[700px] rounded-2xl h-[470px] py-5 px-3.5 bg-[rgb(0,255,166)]">
      <Weather />
    </div>
  );
};

export default App;
