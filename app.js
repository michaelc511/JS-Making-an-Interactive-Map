/*
P1 Document

// map object

// get coordinates via geolocation api

// get foursquare businesses

// process foursquare array

// event handlers
// window load

// business submit button



	Map object - myMap
		buildMap() - Function
		addMarkers() - Function  

*/
// P2 map object
const myMap = {
	coordinates: [],
	businesses: [],
	map: {},
	markers: {},

	// build leaflet map
	buildMap() {
		// create map
		this.map = L.map('map', {
			center: this.coordinates,
			zoom: 10,
		});

		// add openstreetmap tiles
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
			minZoom: '15',
		}).addTo(this.map)
		
		// create and add geolocation marker
		const marker = L.marker(this.coordinates)
		marker
			.addTo(this.map)
			.bindPopup('<p1><b>You are here</b><br></p1>')
			.openPopup()
	},

	// add business markers
	addMarkers() {
		for (var i = 0; i < this.businesses.length; i++) {
			this.markers = L.marker([
				this.businesses[i].lat,
				this.businesses[i].long,
			])
				.addTo(this.map)
				.bindPopup(`<p1>${this.businesses[i].name}</p1>`)
				.openPopup()
		}
	},
}

/*
	P2 getCoords() - Function 
*/
// get coordinates via geolocation api
async function getCoords() {
	const pos = await new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject)
	});
	console.log(pos.coords.latitude)
	let tempLat = 37.779379
	let tempLong = -122.418433

	// use this code to use SF as the address
	return [tempLat, tempLong]

	// Use this code to use your address
	// return [pos.coords.latitude, pos.coords.longitude]
}

/*
	getFourSquare () - Function 
*/

// P2 get foursquare businesses
async function getFoursquare(business) {

	const apiKey = 'fsq3Y3ke4l0wzO37KmBodosczZnNv3YKY/7wFeg2Ou6MxlE=';
	const options = {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			Authorization: apiKey
		}
	}

	let limit = 5
	let lat = myMap.coordinates[0]
	let lon = myMap.coordinates[1]
//	let response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.foursquare.com/v3/places/search?&query=${business}&limit=${limit}&ll=${lat}%2C${lon}`, options)
	let response = await fetch(`https://api.foursquare.com/v3/places/search?&query=${business}&limit=${limit}&ll=${lat}%2C${lon}`, options)
	console.log(response);
	let data = await response.text()
	let parsedData = JSON.parse(data)
	let businesses = parsedData.results
	return businesses
}

// P3 process foursquare array
function processBusinesses(data) {
	let businesses = data.map((element) => {
		let location = {
			name: element.name,
			lat: element.geocodes.main.latitude,
			long: element.geocodes.main.longitude
		};
		return location
	})
	return businesses
}




// event handlers
// P2  window load
/*
	1. get coords
	2. set the coords to myMap object
	3. myMap build map
*/
 
// Just run it 
async function loadMap() {
	const coords = await getCoords()
		console.log(coords)
		myMap.coordinates = coords
		myMap.buildMap()
	}
	
	loadMap(); 
	
	// event handlers
	// window load
	// use onload
	// window.onload = async () => {
	// 	async function loadMap() {
	// 		const coords = await getCoords()
	// 			console.log(coords)
	// 			myMap.coordinates = coords
	// 			myMap.buildMap()
	// 		}
	// 	}
	
/*
	P2 handle submit button 
*/

// business submit button
document.getElementById('submit').addEventListener('click', async (event) => {
	event.preventDefault()
	let business = document.getElementById('business').value
	let data = await getFoursquare(business)
	console.log(data);
	myMap.businesses = processBusinesses(data)
	myMap.addMarkers()
})
