import * as loadGoogleMapsAPI from "load-google-maps-api";

export class GoogleMap{
    private map: google.maps.Map;
    private infoWindow: google.maps.InfoWindow;
    constructor() {
      
      // var that = this;

      // var result = await loadGoogleMapsAPI({'key': 'AIzaSyBHOSP74dIV3Wk8MdfdHrYz1JSTIecBJL4'});

      // loadGoogleMapsAPI({'key': 'AIzaSyBHOSP74dIV3Wk8MdfdHrYz1JSTIecBJL4'}).then(function(googleMaps) {
      //   console.log(googleMaps);
      //   that.initMap();
      // }).catch((err) => {
      //   console.error(err);
      // })
    }

    initMap(): google.maps.Map {
        var uluru = {lat: -25.363, lng: 131.044};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: uluru
        });

        return map;

      }

      async attached(){
        try{
          var result = await loadGoogleMapsAPI({'key': 'AIzaSyBHOSP74dIV3Wk8MdfdHrYz1JSTIecBJL4'});
          this.map = this.initMap();
          this.infoWindow = new google.maps.InfoWindow();
        }
        catch(e)
        {
          console.log(e);
        }

      }

      addMarker() {
        var marker = new google.maps.Marker({
          position: {lat: -25.363, lng: 131.044},
          map: this.map
        });
      }

      addLocation(){
        var that = this;
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            this.infoWindow = new google.maps.InfoWindow();
            this.infoWindow.setPosition(pos);
            this.infoWindow.setContent('Location found.');
            this.infoWindow.open(this.map);
            this.map.setCenter(pos);
          }, function() {
            this.handleLocationError(true, this.infoWindow, this.map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          this.handleLocationError(false, this.infoWindow, this.map.getCenter());
        }
      }

       handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(this.map);
      }

      addCircles(){
        var citymap = {
          chicago: {
            center: {lat: 41.878, lng: -87.629},
            population: 2714856
          },
          newyork: {
            center: {lat: 40.714, lng: -74.005},
            population: 8405837
          },
          losangeles: {
            center: {lat: 34.052, lng: -118.243},
            population: 3857799
          },
          vancouver: {
            center: {lat: 49.25, lng: -123.1},
            population: 603502
          }
        };

        for (var city in citymap) {
          // Add the circle for this city to the map.
          var cityCircle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: this.map,
            center: citymap[city].center,
            radius: Math.sqrt(citymap[city].population) * 100
          });
        }
      }
}