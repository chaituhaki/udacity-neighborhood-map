inputSearch = ko.observable();
markers = ko.observableArray([]);

googleError = function(){
  alert("Gouldn't able to reach google maps. Please reload the page");
}

function initMap() {
  // Calls ViewModel() and binds all the data to respective observavles
  ko.applyBindings(new ViewModel());
  // Create Map 
  map = new google.maps.Map(document.getElementById('map'), {
    center: center(),
    zoom: 15,
    styles: styles()
  }); 
}
/*
Creates an object that conatins data of an item(Marker Item)
*/
var Foursquare = function(item){
  this.name = ko.observable(item.name);
  this.coordinates = ko.observable({lat: item.location.lat,lng: item.location.lng});
  var str = item.location.formattedAddress;
  this.address = ko.observable(str[0]+",<br>"+str[1]+",<br>"+str[2]);
  // Check whether the Item has categories list in it and assign it to type
  this.type = ko.observable("Type Not Found");
  if(item.categories[0]){
    this.type = ko.observable(item.categories[0].name);
  }
}
// Create a marker and push them into markers observableArray
var showMarkers = function(){
    for(i=0; i<foursquareList().length; i++){
      var marker = new google.maps.Marker({
        position: foursquareList()[i].coordinates(),
        title: foursquareList()[i].name(),
        type: foursquareList()[i].type(),
        address: foursquareList()[i].address(),
        animation: google.maps.Animation.DROP,
        map: map
      });
      // Push marker into markers Observable Array
      markers.push(marker);
      infowindow = new google.maps.InfoWindow();
      var bounds = new google.maps.LatLngBounds();
      bounds.extend(marker.position);
      marker.addListener('click', function(){
        populateInfoWindow(this, infowindow)
      });
    }
}

// Populate an info window when clicked on marker
var populateInfoWindow = function(marker, infowindow){
    if (infowindow.marker != marker) {
        infowindow.marker = marker;
        var str = "<h3>" + marker.title + "</h3>" + "<hr>";
        str += "<p><strong>Address:</strong></p>";
        str += "<p>"+marker.address+"</p>";
        infowindow.setContent(str);
        infowindow.open(map, marker);

        infowindow.addListener('click', function() {
            infowindow.marker = null;
        });
    }
}

// listen to the click on the list in side menu
// calls populateInfoWindow of the item that is clicked
function listItemClicked(){
  populateInfoWindow(this, infowindow);
}

// Listen to inputs of the InputSearch() and return list of on objects
var filterMarkers = ko.computed(function(){
  if(inputSearch()){
    result = ko.observableArray();
    for(i=0; i<markers().length; i++){
      // set the markers visible when user searched using list tilte
      if(markers()[i].title.toLowerCase().includes(inputSearch().toLowerCase())){
        markers()[i].setVisible(true);
        result.push(markers()[i]);
      }
      else {
        markers()[i].setVisible(false);
      }
    }
    return result();
  }
  // set all the markers to visible
  for(i=0; i<markers().length; i++){
    markers()[i].setVisible(true);
  }
  return markers();
});