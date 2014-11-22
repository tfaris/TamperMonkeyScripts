// ==UserScript==
// @name       Motorcycle Roads Google Maps URL
// @version    1.0
// @description  Builds a Google Maps directions URL for any route on motorcycleroads.com and appends a link to the page.
// @match      http://www.motorcycleroads.com/*
// @copyright  2014+, tfaris <ta.faris@gmail.com>
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==

/* Returns a basic comma-separated lat/long string 
*  for the given point.
*/
function getPointString(point){
    return point[0] + ',' + point[1];
}

$(document).ready(function(){
    // Find the first script that contains a call to the fetchPolylineData method.
    // The argument is the parameter we need to pass later to get the route data.
    var id = $("script:contains('fetchPolylineData')").html().match(/fetchPolylineData\('(.*)'\)/)[1];
    
    if (id){
        // Run a JSON request to the motorcycleroads site for the route ID. 
        $.getJSON('http://www.motorcycleroads.com/services/routePolyline.php?routeID='+id, 
            function(data){
                var points = data.response.polylinePoints,
                    chosenPoints = [],
                    gMapsUrl = 'https://www.google.com/maps/dir';
                // We probably can't use all of the points as there is a limit
                // to how long a URL can be. Choose every N points instead.
                var N = 10;
                for (var i in points){
                    if (i % N == 0){
                        chosenPoints.push(points[i]);
                    }                
                }
                if (chosenPoints.length == 1){
                    // We don't have a lot of points in our list, so just use the whole thing.
                    chosenPoints = points;
                }
                // Build the directions portion of the URL. Locations are simply separated
                // by '/' and are defined as lat,long points.
                for (var i in chosenPoints){
                    gMapsUrl += '/' + getPointString(chosenPoints[i]);
                }
                $("<a target='_blank' href='"+gMapsUrl+"'>Directions</a>").insertAfter($("#map_canvas"));
            });
    }
});