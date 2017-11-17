var Location = function(item){
    this.title = ko.observable(item.title);
    this.type = ko.observable(item.type);
    this.coordinates = ko.observable(item.coordinates);
}

function initMap() {
  ko.applyBindings(new ViewModel());
  map = new google.maps.Map(document.getElementById('map'), {
    center: mapCenter,
    zoom: 12
  });
  
  for(i=0; i<locationList().length; i++){
    var marker = new google.maps.Marker({
      position: locationList()[i].coordinates(),
      title: locationList()[i].title(),
      type: locationList()[i].type(),
      map: map
    });
    var infowindow = new google.maps.InfoWindow();
    marker.addListener('click', function(){
      populateInfoWindow(this, infowindow)
    });
  }
  var populateInfoWindow = function(marker, infowindow){
      if (infowindow.marker != marker) {
          infowindow.marker = marker;
          infowindow.setContent('<div>' + marker.title + '</div>');
          infowindow.open(map, marker);

          infowindow.addListener('click', function() {
            infowindow.marker = null;
          });
      }
  }
   
}