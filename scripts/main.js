// Loads Weather API
function getAPIdata() {
    let request = 'https://api.openweathermap.org/data/2.5/weather?appid=c032222b0f71e014ea65bc5f551a8372&q=florida&units=metric'
    fetch(request)

    .then(function(response) {
        return response.json();
    })

    .then(function(response) {
        document.getElementById('weather').innerHTML = '<br>' + 'Kennedy Space Centre, ' + response.name + '<br>' + response.main.temp + ' C <br>';
        document.getElementById('weather').innerHTML += '<br>' + 'Wind Speed: ' + response.wind.speed + ' km/h' + '<br>' + response.weather[0].description;
    });
}

// Shows weather info onclick
document.getElementById('showWeather').onclick = function() {
    getAPIdata();
};

// Access token for Map API
mapboxgl.accessToken = 'pk.eyJ1IjoicmlrYXZlbCIsImEiOiJjbDRscnpreG0xYmxwM2pwZm5zanUwYmtqIn0.ockBwXZuyN-dPX5NkO5Z8A';

// Location data for Map API
let landingSite = [
    {
      name: 'Kennedy Space Centre',
      location: {lat: 28.5728722,lng: -80.6489808},
      ranking: 1
    }, {
      name: 'Edwards AFB',
      location: {lat: 40.740121, lng: -73.9905932},
      ranking: 2
    }, {
      name: 'Cape Canaveral',
      location: {lat: 28.3922,lng: 80.6077},
      ranking: 3
    }, {
      name: 'Vandenberg AFB',
      location: {lat: 40.740121, lng: -73.990593},
      ranking: 4
    }, {
      name: 'San Marco Platform',
      location: {lat: 2.9, lng: 40.3},
      ranking: 5
    }, {
      name: 'Wallops Island',
      location: {lat:37.8, lng: 75.5},
      ranking: 5
    }
  ];

// Loads map
let map = new mapboxgl.Map({
    container: 'map', 
    zoom: 5,
    pitch: 60, 
    center: [-80.6489808, 28.5728722], //recenters map to florida
    style: 'mapbox://styles/rikavel/cl4mx7wqp00a015ny45bcscp8', //style pointing to a stylesheet that mapbox uses
  });

// Multiple custom markers & popups
for(let i=0; i< landingSite.length; i++){
	let myCustomMarker = document.createElement('div');
	myCustomMarker.className = 'customMarker';
	myCustomMarker.innerHTML = landingSite[i].name;

    // Popup + preview image for each amrker
    let myPopup = new mapboxgl.Popup().setHTML('<h3>Status: Available</h3>' + '<p>Ready to Land,</p>' + '<p>Captain!</p>' + "<img id= 'myImg' style = 'height: 70%; width: 100%;' src = '/assets/previewImage.jpg' > </img>");

	// Adding a marker based on listed lon lat coordinates
	let marker = new mapboxgl.Marker(myCustomMarker)
	.setLngLat([landingSite[i].location.lng, landingSite[i].location.lat])
    .setPopup(myPopup)
	.addTo(map);
}

// Unavailable landing site marker
let CustomMarkerTwo = document.createElement('div');

CustomMarkerTwo.style.backgroundImage = 'url("/assets/cross.png")';
CustomMarkerTwo.style.backgroundSize = '100%';
CustomMarkerTwo.style.width = '70px';
CustomMarkerTwo.style.height = '70px';

let popupRed = new mapboxgl.Popup({ offset: 25 }).setHTML(
    '<h3>Senzhou, China</h3>' + '<p>Landing Site Unavailable!</p>'
    );

let marker = new mapboxgl.Marker(CustomMarkerTwo).setLngLat([117.8912, 34.9240]).setPopup(popupRed).addTo(map);
     
