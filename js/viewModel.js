var locationList = ko.observableArray([]);
var ViewModel = function(){
    var self = this;
    locations.forEach(function(item){
        locationList.push(new Location(item));
    });
}

