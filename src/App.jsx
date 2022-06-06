import "./App.css";
import Climate from "./components/Climate";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { useEffect, useState } from "react";

function App() {

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    },3000)
  }, [])

  return (
    <div className="App">
      {
       loading ? (
         <ClimbingBoxLoader color={'#000'} loading={loading} size={20} />
         ) 
         :(
           <Climate />
        )
      }
    </div>
  );
}

export default App;
