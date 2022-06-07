import React, { useEffect, useState } from "react";
import axios from "axios";
import hot from "../assets/img/cambio-climatico.png";
import could from "../assets/img/lluvia.png";

const Climate = ({climate}) => {

  const [operation, setOperation] = useState(false);

  const pass = () => {
    setOperation(!operation);
  };

  const fahrenheit = ((climate?.main.temp - 273.15) * 9) / 5 + 32;
  const celsius = climate?.main.temp - 273.15;

  return (
    <div className="climate">
      <h2 className="title">Weather today in {climate?.name} </h2>
      <div className="climate__resume">      
        <p>
        <strong>My location: </strong>
        {climate?.sys.country} {climate?.name}
      </p>
      <p>
        <strong>Cloudiness:</strong> {climate?.clouds.all} %
      </p>
      <p>
        <strong>Humidity: </strong>
        {climate?.main.humidity}%
      </p></div>
      <div className="climate__info">
        <p>
          <strong>Actual temperature: </strong>
          {operation ? `${fahrenheit.toFixed(2)} ` : `${celsius.toFixed(2)} `}
          <button className="info__btn" onClick={pass}> {operation ? " °F" : " °C"} </button>
        </p>
        <img className="info_img" src={climate && `http://openweathermap.org/img/wn/${climate.weather[0].icon}@4x.png`} alt="climate" />
      </div>
    </div>
  );
};

export default Climate;
