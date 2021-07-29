import { useState } from "react";
import logo from "./logo.svg";
import Input from "./Components/Input";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
	const [currentTime, setCurrentTime] = useState("");
	const [currentTemp, setCurrentTemp] = useState(0);
	const [currentHumidity, setCurrentHumidity] = useState(0);
	const [currentWindSpeed, setCurrentWindSpeed] = useState(0);

	const [dayOneTemp, setDayOneTemp] = useState(0);
	const [dayOneHumid, setDayOneHumid] = useState(0);

	const getInfo = (lat, lon) => {
		fetch(
			`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=454ee2cac8aed2b3c050d94dacb937b7`
		)
			.then((response) => response.json())
			.then((data) => {
				var currentDate = new Date(data.current.dt * 1000);
				var months = [
					"Jan",
					"Feb",
					"Mar",
					"Apr",
					"May",
					"Jun",
					"Jul",
					"Aug",
					"Sep",
					"Oct",
					"Nov",
					"Dec",
				];
				var year = currentDate.getFullYear();
				var month = months[currentDate.getMonth()];
				var date = currentDate.getDate();
				var hour = currentDate.getHours();
				var min = currentDate.getMinutes();
				var sec = currentDate.getSeconds();
				var time =
					date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
				setCurrentTime(time);
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
			<Input location={getInfo}></Input>
		</div>
	);
}

export default App;
