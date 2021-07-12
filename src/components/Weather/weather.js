import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import "antd/dist/antd.css";
import { Input } from "antd";
import Flag from "react-world-flags";
import weatherVideo from "../../videos/weather1.mp4";

// API credentials
console.log(process.env.REACT_APP_OPEN_WEATHER_API_KEY);
console.log(process.env.REACT_APP_OPEN_WEATHER_URL);
const api = {
  key: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
  APIbaseURL: process.env.REACT_APP_OPEN_WEATHER_URL,
};

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
              <InputWrapper>
                <Input
                  // onKeyPress={APIcall}
                  onChange={handleChange}
                  value={input}
                  placeholder="Enter a country"
                />
                <InputButton onClick={APIcall}>Search</InputButton>
              </InputWrapper>

              <WeatherDateBuilder>{dateBuilder(new Date())}</WeatherDateBuilder>
              <WeatherCountryWrapper>
                <WeatherCountryFullname>
                  {weatherData.name}
                </WeatherCountryFullname>
                <ShortWrapper>
                  <WeatherCountryShortname>
                    {weatherData.sys.country}
                  </WeatherCountryShortname>
                  <Flag code={weatherData.sys.country} height="28px" />
                </ShortWrapper>
              </WeatherCountryWrapper>
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
            <InputWrapper>
              <Input
                // onKeyPress={APIcall}
                onChange={handleChange}
                value={input}
                placeholder="Enter a country"
              />
              <InputButton onClick={APIcall}>Search</InputButton>
            </InputWrapper>
            <WeatherDateBuilder>{dateBuilder(new Date())}</WeatherDateBuilder>
            <WeatherCountryWrapper>
              <WeatherCountryFullname>Default</WeatherCountryFullname>
              <WeatherCountryShortname>Null</WeatherCountryShortname>
            </WeatherCountryWrapper>
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
  /* height: 100vh; */
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  flex-direction: column;
`;
const WeatherVideo = styled.video`
  width: 100%;
  /* height: 100%; */
  height: 650px;
  /* height: 100vh; */
  object-fit: cover;
  z-index: -1;
`;
const WeatherWrapper = styled.div`
  /* background-color: green; */
  width: 100%;
  /* height: 100vh; */
  display: flex;
  position: absolute;
  flex-direction: column;
  top: 0;
  bottom: 0;
  padding: 20px;
  /* margin-top: 20px; */
  /* margin-bottom: 20px; */
`;
const InputWrapper = styled.div`
  display: flex;
  /* background-color: red; */
  width: 100;
  justify-content: center;
  align-items: center;
  gap: 5px;
  margin-top: 15px;

  input {
    /* flex-grow: 1; */
    align-self: center;
    /* height: 150px; */
    width: 25%;
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 5px;
    font-size: 20px;

    @media (max-width: 768px) {
      width: 60%;
    }
    @media (max-width: 425px) {
      width: 80%;
    }
    @media (max-width: 375px) {
      width: 85%;
    }
    @media (max-width: 320px) {
      width: 85%;
    }
  }
`;
const InputButton = styled.div`
  background-color: #003366;
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding: 5px; */
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 20px;
  color: white;
  border: none;

  &:hover {
    /* background-color: #178fd7; */
    background-color: white;
    color: #003366;
    transform: all ease-out 750ms;
    /* border-width: 10px solid; */
    border: 1px solid;
    border-color: #178fd7;
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
    font-size: 40px;
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
const WeatherCountryWrapper = styled.div`
  color: white;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.19);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  box-shadow: 0px 5px 7px -2px rgba(0, 0, 0, 0.35);
  margin-top: 30px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;
  padding-left: 30px;
  padding-right: 30px;
`;
const WeatherCountryFullname = styled.div`
  /* background-color: yellow; */
  font-size: 70px;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 65px;
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
const ShortWrapper = styled.div`
  /* background-color: black; */
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 5px;
  margin-bottom: 10px;
`;
const WeatherCountryShortname = styled.div`
  font-size: 50px;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 35px;
  }
  @media (max-width: 425px) {
    font-size: 35px;
  }
  @media (max-width: 375px) {
    font-size: 35px;
  }
  @media (max-width: 320px) {
    font-size: 30px;
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
  font-size: 50px;
  display: flex;
  justify-content: center;
  color: #003366;
  font-weight: bold;
  margin-bottom: 20px;
  text-transform: capitalize;

  @media (max-width: 768px) {
    font-size: 45px;
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
