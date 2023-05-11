import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [data, setdata] = useState([]);
  function getlocation() {
    navigator.permissions
      .query({ name: "geolocation" })
      .then(function (result) {
        if (result.state == "granted" || result.state == "prompt") {
          navigator.geolocation.getCurrentPosition(function (position) {
            fetch(
              `https://api.geoapify.com/v1/geocode/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json&apiKey=21f61a865243443b8b07654137eadc62`,
              { method: "GET" }
            )
              .then((res) => res.json())
              .then((data) => setdata(data.results[0].formatted))
              .catch((err) => console.log(err));
          });
        }
      });
  }

  return (
    <div className="App">
      <button onClick={getlocation}>Get Location</button>

      <div className="info-div">
        {data.length > 0 ? (
          <>
            <div>Country </div> : <div>{"   " + data}</div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default App;
