//get coords
//async function getCoords(){
//    pos = await new Promise((resolve, reject) => {
//        navigator.geolocation.getCurrentPosition(resolve, reject)
//    })
//    return [pos.coords.latitude, pos.coords.longitude]
//}

async function getCoords() {
    const pos = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
   });
   // console.log(pos.coords.latitude);
    // let tempLat = 37.779379;
    // let tempLong = -122.418433;
  
    // // use this code to use SF as the address
    // return [tempLat, tempLong];
  
    // Use this code to use your address
    return [pos.coords.latitude, pos.coords.longitude]
  }
  
  // Just run it
  async function loadMap() {
    const coords = await getCoords();
    console.log(coords);
    // myMap.coordinates = coords
    // myMap.buildMap()
    // create map
    const myMap = L.map("map").setView(coords, 53);
  
    // add openstreetmap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      minZoom: "15",
    }).addTo(myMap);
  
    //marker
    const marker = L.marker(coords);
    marker.addTo(myMap).bindPopup("<p1><b>You Are Here!</b></p1>").openPopup();
  }
  
  loadMap();
  