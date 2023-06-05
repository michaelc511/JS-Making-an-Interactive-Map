// map object
const myMap = {
	coordinates: [],
	businesses: [],
	map: {},
	markers: {},

	// build leaflet map
	buildMap() {
		this.map = L.map('map', {
		center: this.coordinates,
		zoom: 11,
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
}

// get coordinates via geolocation api
async function getCoords(){
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
// get foursquare businesses

// process foursquare array



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

// business submit button
document.getElementById('submit').addEventListener('click', async (event) => {
	event.preventDefault()
	let business = document.getElementById('business').value
	console.log(business)
})
