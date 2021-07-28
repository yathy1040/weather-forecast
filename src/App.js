import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
	const [locationlat, setLocationLat] = useState(0);
	const [locationlong, setLocationLong] = useState(0);
	const success = (pos) => {
		var crd = pos.coords;
		setLocationLat(crd.latitude);
		setLocationLong(crd.longitude);
	};
	navigator.geolocation.getCurrentPosition(success);

	const [currentTime, setCurrentTime] = useState("");
	const [currentTemp, setCurrentTemp] = useState(0);
	const [currentHumidity, setCurrentHumidity] = useState(0);
	const [currentWindSpeed, setCurrentWindSpeed] = useState(0);

	const getCurrentInfo = () => {
		const requestOptions = {
			method: "GET",
		};
		fetch(
			`https://api.openweathermap.org/data/2.5/onecall?lat=${locationlat}&lon=${locationlong}&exclude=minutely,hourly,alerts&units=metric&appid=454ee2cac8aed2b3c050d94dacb937b7`
		)
			.then((response) => response.json())
			.then((data) => {
				setCurrentTime(data.current.dt);
				setCurrentTemp(data.current.temp);
				setCurrentHumidity(data.current.humidity);
				setCurrentWindSpeed(data.current.wind_speed);
			});
	};

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
			</header>
			<button type="button" onClick={getCurrentInfo}></button>
		</div>
	);
}

export default App;
