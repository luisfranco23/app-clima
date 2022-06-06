import React, { useEffect, useState } from "react";
import axios from "axios";
import hot from "../assets/img/cambio-climatico.png";
import could from "../assets/img/lluvia.png";

const Climate = () => {
  const [location, setLocation] = useState();
  const [climate, setClimate] = useState();

  useEffect(() => {
    const success = (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      setLocation({ lat, lon });
    };
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  useEffect(() => {
    if (location !== undefined) {
      const API_key = "9dcf9e802372121e73487818a802eb5f";
      const URL_API = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${API_key}`;

      axios
        .get(URL_API)
        .then((res) => setClimate(res.data))
        .catch((err) => console.log(err));
    }
  }, [location]);

  const [operation, setOperation] = useState(false);

  const pass = () => {
    setOperation(!operation);
  };

  const fahrenheit = ((climate?.main.temp - 273.15) * 9) / 5 + 32;
  const celsius = climate?.main.temp - 273.15;

  const humidity = climate?.main.humidity;

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
        <img className="info_img" src={humidity < 60 ? hot : could} alt="climate" />
      </div>
    </div>
  );
};

export default Climate;
