import React from "react";

function getWeatherIcon(wmoCode) {
  const icons = new Map([
    [[0], "☀️"],
    [[1], "🌤"],
    [[2], "⛅️"],
    [[3], "☁️"],
    [[45, 48], "🌫"],
    [[51, 56, 61, 66, 80], "🌦"],
    [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
    [[71, 73, 75, 77, 85, 86], "🌨"],
    [[95], "🌩"],
    [[96, 99], "⛈"],
  ]);
  const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
  if (!arr) return "NOT FOUND";
  return icons.get(arr);
}

function convertToFlag(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function formatDay(dateStr) {
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
  }).format(new Date(dateStr));
}

class App extends React.Component {
  state = {
    location: "",
    isLoading: false,
    displayLocation: "",
    weather: {},
  };

  getWeather = async () => {
    try {
      // 1) Getting location (geocoding)
      if (this.state.location.length < 2) return;
      this.setState({ isLoading: true });
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${this.state.location}`
      );
      const geoData = await geoRes.json();
      // console.log(geoData);

      if (!geoData.results) throw new Error("Location not found");

      const { latitude, longitude, timezone, name, country_code } =
        geoData.results.at(0);
      // console.log(`${name} ${convertToFlag(country_code)}`);
      this.setState({
        displayLocation: `${name} ${convertToFlag(country_code)}`,
      });

      // 2) Getting actual weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      const weatherData = await weatherRes.json();
      // console.log(weatherData.daily);
      this.setState({ weather: weatherData.daily });
    } catch (err) {
      console.log(err);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  getLocation = (e) => this.setState({ location: e.target.value });

  componentDidMount() {
    this.setState({
      location: localStorage.getItem("location", this.state.location || ""),
    });
  }

  componentDidUpdate(preProps, preState) {
    if (preState.location !== this.state.location) {
      this.getWeather();
      localStorage.setItem("location", this.state.location);
    }
  }
  render() {
    // console.log(this.state.displayLocation);
    // console.log(this.state.weather);
    return (
      <div className="app">
        <h1>Classy Weather App</h1>
        <div>
          <InputLocation
            location={this.state.location}
            onChangeLocation={this.getLocation}
          />
        </div>

        {this.state.isLoading && <p className="loader"> Loding...</p>}
        {this.state.weather.weathercode && (
          <Weather
            weather={this.state.weather}
            displayLocation={this.state.displayLocation}
          />
        )}
      </div>
    );
  }
}

export default App;

class InputLocation extends React.Component {
  render() {
    return (
      <input
        type="text"
        placeholder="Enter place name...."
        value={this.props.location}
        onChange={this.props.onChangeLocation}
      />
    );
  }
}

class Weather extends React.Component {
  render() {
    const {
      temperature_2m_max: max,
      temperature_2m_min: min,
      time: date,
      weathercode: codes,
    } = this.props.weather;
    const { displayLocation } = this.props;

    return (
      <div>
        <h2>{displayLocation}</h2>
        <ul className="weather">
          {date.map((date, i) => {
            return (
              <Day
                date={date}
                max={max.at(i)}
                min={min.at(i)}
                code={codes.at(i)}
                key={i}
                today={i === 0}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}
// kathmandu
class Day extends React.Component {
  render() {
    const { date, max, min, code, today } = this.props;
    return (
      <li className="day">
        <span>{getWeatherIcon(code)}</span>
        <p>{today ? "today" : formatDay(date)}</p>
        <p>
          {min}- <strong>{max}</strong>
        </p>
      </li>
    );
  }
}
