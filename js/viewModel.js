ViewModel = function(){
    center = ko.observable(mapCenter);
    foursquareList = ko.observableArray([]);
    styles = ko.observableArray(mapStyles);
    $.ajax({
        type: "GET",
        datatype: "json",
        url: "https://api.foursquare.com/v2/venues/search?"+
                "near=herndon,va&radius=1000&query=restaurant&"+
                "client_id="+clientID+"&v=20150603&client_secret="+clientSecret,
        success: function(data){
            var JsonData = data.response.venues;
            for(i=0; i<15; i++){
                item = JsonData[i];
                foursquareList.push(new Foursquare(item));
            }
            showMarkers();
            filterMarkers();
        }
    });
}