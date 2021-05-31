import React, { useState } from "react";
import { Card } from "react-bootstrap";
import "./Card.css";

const Cards = () => {
  const [city, setcity] = useState("noida");
  const [data, setdata] = useState("");
  const [maxtemp, setmaxtemp] = useState("");
  const cityHandler = (event) => {
    event.preventDefault();
    setcity(event.target.value);
  };

  const detailhandler = async (event) => {
    event.preventDefault();
    let req = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c0f76304486171853c693f8798fd42f5`
    );
    try {
      let res = await req.json();
      let tmp = res.main.temp - 273.15;
      setdata(tmp.toFixed(3));
      setmaxtemp(res.weather[0].description);
    } catch (error) {
      console.log(error.message);
      setdata("❌ City Not Find");
    }
  };

  return (
    <div>
      <Card style={{ width: "18rem" }} className="card">
        <Card.Body>
          <Card.Title>
            <h3>*React Weather App*</h3>
          </Card.Title>
          <hr />
          <Card.Subtitle className="mb-2 text-muted">
            <input type="text" onChange={cityHandler} placeholder="Noida" />
          </Card.Subtitle>

          <Card.Subtitle className="mb-2 text-muted ">
            <input type="button" value="Search" onClick={detailhandler} />
          </Card.Subtitle>
          <hr />
          <Card.Text>Weather Temp: {data} °C</Card.Text>
          <Card.Text>Weather Details: {maxtemp}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Cards;
