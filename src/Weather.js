import React, { useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBInputGroup,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

function Weather() {
  const [weatherData, setWeatherData] = useState({
    current: {
      temp: "N/A",
      feels_like: "N/A",
      humidity: "N/A",
      clouds: "N/A",
      wind_speed: "N/A",
      wind_gust: "N/A",
      weather: [{ main: "N/A", icon: "01d" }],
    },
  });

  const [locationData, setLocationData] = useState("");
  const APIKEY = "e8718d0bac24279b599ece27259f445d";

  const iconUrl = `https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`;

  // Handle form submission
  const updateWeatherInfo = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (!locationData.trim()) {
      alert("Please enter a location!");
      return;
    }

    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${locationData}&appid=${APIKEY}`
      );


      const currentWeather = response.data.main;
      const weatherDetails = response.data.weather[0];
      const windDetails = response.data.wind;

      setWeatherData({
        current: {
          temp: currentWeather.temp,
          feels_like: currentWeather.feels_like,
          humidity: currentWeather.humidity,
          clouds: response.data.clouds.all,
          wind_speed: windDetails.speed,
          wind_gust: windDetails.gust,
          weather: [{ main: weatherDetails.main, icon: weatherDetails.icon }],
        },
      });
      alert("Weather updated successfully!");
    } catch (error) {
      console.error("Error updating weather data: ", error);
      alert("Failed to fetch weather data. Please try again.");
    }
  };

  return (
    <section className="vh-100 d-flex justify-content-center align-items-center">
      <MDBContainer className="h-100 py-5">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol md="8" lg="6" xl="4">
            <MDBTypography tag="h1" className="mb-4 pb-2 fw-normal">
              Welcome to Weather Forecast
            </MDBTypography>

            <Form onSubmit={updateWeatherInfo}>
              <MDBInputGroup className="mb-3">
                <input
                  className="form-control rounded"
                  type="text"
                  placeholder="Enter location"
                  value={locationData}
                  onChange={(e) => setLocationData(e.target.value)}
                />
                <Button variant="success" className="me-2" type="submit">
                  Check!
                </Button>
              </MDBInputGroup>
            </Form>

            <MDBCard className="shadow-0 border">
              <MDBCardBody className="p-4">
                <MDBTypography tag="h4" className="mb-1 sfw-normal">
                  {locationData || "Location"}
                </MDBTypography>
                <p className="mb-2">
                  Current temperature:{" "}
                  <strong>{weatherData.current.temp}°F</strong>
                </p>
                <p>
                  Feels like: <strong>{weatherData.current.feels_like}°C</strong>
                </p>
                <p>
                  Humidity: <strong>{weatherData.current.humidity}%</strong>, Clouds:{" "}
                  <strong>{weatherData.current.clouds}%</strong>
                </p>
                <p>
                  Wind Speed: <strong>{weatherData.current.wind_speed} m/s</strong>, Wind Gust: <strong>{weatherData.current.wind_gust} m/s</strong>
                </p>

                <div className="d-flex flex-row align-items-center">
                  <img src={iconUrl} alt="Weather Icon" />
                  <h4 className="mb-0 me-4">{weatherData.current.weather[0].main}</h4>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}

export default Weather;
