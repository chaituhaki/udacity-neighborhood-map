ViewModel = function(){
    center = ko.observable(mapCenter);
    foursquareList = ko.observableArray([]);
    styles = ko.observableArray(mapStyles);
    // get data in JSON format from Foursquare API using AJAX
    $.ajax({
        type: "GET",
        datatype: "json",
        url: "https://api.foursquare.com/v2/venues/search?"+
                "near=herndon,va&radius=1000&query=restaurant&"+
                "client_id="+clientID+"&v=20150603&client_secret="+clientSecret,
        success: function(data){
            var JsonData = data.response.venues;
            //parse JSON data
            for(i=0; i<15; i++){
                item = JsonData[i];
                foursquareList.push(new Foursquare(item));
            }
            showMarkers();
            filterMarkers();
        }
    });
}