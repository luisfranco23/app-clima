import "./App.css";
import Climate from "./components/Climate";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  
  const [location, setLocation] = useState();
  const [climate, setClimate] = useState();
  const [loading, setLoading] = useState(true)

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
        .then((res) => {
          setClimate(res.data)
          setLoading(false)
        })
        .catch((err) => console.log(err));
    }
  }, [location]);

  return (
    <div className="App">
      {
       loading ? 
          <ClimbingBoxLoader color={'#000'}  size={20} />
       :
          <Climate climate={climate}/>
      }
    </div>
  );
}

export default App;
