import { useState } from "react";

function Input(props) {
	const [city, setCity] = useState("");

	const [locationlat, setLocationLat] = useState(0);
	const [locationlong, setLocationLong] = useState(0);

	const cityButtonPressed = () => {
		fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=454ee2cac8aed2b3c050d94dacb937b7`
		)
			.then((response) => response.json())
			.then((data) => {
				props.location(data.coord.lat, data.coord.lon);
			});
		setCity("");
	};

	const locationPressed = () => {
		const success = (pos) => {
			var crd = pos.coords;
			setLocationLat(crd.latitude);
			setLocationLong(crd.longitude);
		};
		navigator.geolocation.getCurrentPosition(success);
		props.location(locationlat, locationlong);
	};

	return (
		<div>
			<input
				id="enter-city"
				type="text"
				value={city}
				onChange={(e) => setCity(e.target.value)}
			></input>
			<button type="button" onClick={cityButtonPressed}>
				Input City
			</button>
			<button type="button" onClick={locationPressed}>
				Use current location
			</button>
		</div>
	);
}

export default Input;
