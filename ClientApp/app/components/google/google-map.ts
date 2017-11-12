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
}