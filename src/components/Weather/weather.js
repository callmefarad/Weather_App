import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import "antd/dist/antd.css";
import { Input } from "antd";
import weatherVideo from "../../videos/weather1.mp4";
// require("dotenv").config();

console.log(process.env.REACT_APP_OPEN_WEATHER_API_KEY);
console.log(process.env.REACT_APP_OPEN_WEATHER_URL);
// API credentials
const api = {
  key: "076082ee0e70e39163acf481e3e34de5",
  APIbaseURL: "https://api.openweathermap.org/data/2.5/",
};
// const api = {
//   key: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
//   APIbaseURL: process.env.REACT_APP_OPEN_WEATHER_URL,
// };

const Weather = () => {
  // creating the states
  const [input, setInput] = useState("");
  const [weatherData, setWeatherData] = useState("");

  // API call using axios module
  const APIcall = async () => {
    const res = await axios.get(
      `${api.APIbaseURL}weather?q=${input}&units=metric&appid=${api.key}`
    );

    if (res) {
      const data = await res.data;
      return setWeatherData(data);
    }
  };

  // creating the needed state
  const dateBuilder = (item) => {
    let availableMonths = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let availableDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let newMonth = availableMonths[item.getMonth()];
    let newDay = availableDays[item.getDay()];
    let newDate = item.getDate();
    let newYear = item.getFullYear();

    return `${newDay} ${newDate} ${newMonth} ${newYear}`;
  };

  // function to handle input change
  const handleChange = (e) => {
    setInput(e.target.value);
    console.log(e.target.value);
  };

  useEffect(() => {
    APIcall();
  }, []);
  return (
    <div>
      {weatherData ? (
        <>
          <WeatherContainer>
            <WeatherVideo
              src={weatherVideo}
              type="video/mp4"
              autoPlay={true}
              loop={true}
              muted
            />
            <WeatherWrapper>
              <Input
                onKeyPress={APIcall}
                onChange={handleChange}
                value={input}
                placeholder="Search a country"
              />
              <WeatherDateBuilder>{dateBuilder(new Date())}</WeatherDateBuilder>
              <WeatherGeo>
                {weatherData.name}, {weatherData.sys.country}
              </WeatherGeo>
              <WeatherTemperature>
                {Math.round(weatherData.main.temp)}°c
              </WeatherTemperature>
              <WeatherDescription>
                {weatherData.weather[0].description}
              </WeatherDescription>
            </WeatherWrapper>
          </WeatherContainer>
        </>
      ) : (
        <WeatherContainer>
          <WeatherVideo
            src={weatherVideo}
            type="video/mp4"
            autoPlay={true}
            loop={true}
            muted
          />
          <WeatherWrapper>
            <Input
              onKeyPress={APIcall}
              onChange={handleChange}
              value={input}
              placeholder="Search a country"
            />
            <WeatherDateBuilder>{dateBuilder(new Date())}</WeatherDateBuilder>
            <WeatherGeo>Default, null</WeatherGeo>
            <WeatherTemperature>0°c</WeatherTemperature>
            <WeatherDescription>description</WeatherDescription>
          </WeatherWrapper>
        </WeatherContainer>
      )}
    </div>
  );
};

export default Weather;

// styles from styled components
const WeatherContainer = styled.div`
  /* background-color: red; */
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  flex-direction: column;
`;
const WeatherVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;
const WeatherWrapper = styled.div`
  /* background-color: green; */
  width: 80%;
  height: 100vh;
  display: flex;
  position: absolute;
  flex-direction: column;
  /* top: 0; */
  padding: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  input {
    align-self: center;
    height: 60px;
    width: 80%;
    margin-top: 15px;
    border-radius: 5px;
    font-size: 20px;
  }
`;
const WeatherDateBuilder = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  border-radius: 5px;
  font-size: 25px;
  color: white;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 45px;
  }
  @media (max-width: 425px) {
    font-size: 30px;
  }
  @media (max-width: 375px) {
    font-size: 25px;
  }
  @media (max-width: 320px) {
    font-size: 22px;
  }
`;
const WeatherGeo = styled.div`
  color: white;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.19);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  box-shadow: 0px 5px 7px -2px rgba(0, 0, 0, 0.35);
  margin-top: 35px;
  font-size: 55px;
  font-weight: bold;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  padding-left: 20px;
  padding-right: 20px;

  @media (max-width: 768px) {
    font-size: 95px;
  }
  @media (max-width: 425px) {
    font-size: 55px;
  }
  @media (max-width: 375px) {
    font-size: 45px;
  }
  @media (max-width: 320px) {
    font-size: 40px;
  }
`;
const WeatherTemperature = styled.div`
  display: flex;
  justify-content: center;
  font-size: 85px;
  font-weight: bold;
  color: white;
`;
const WeatherDescription = styled.div`
  font-size: 35px;
  display: flex;
  justify-content: center;
  color: tomato;
  font-weight: bold;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 55px;
  }
  @media (max-width: 425px) {
    font-size: 35px;
  }
  @media (max-width: 375px) {
    font-size: 25px;
  }
  @media (max-width: 320px) {
    font-size: 25px;
  }
`;
