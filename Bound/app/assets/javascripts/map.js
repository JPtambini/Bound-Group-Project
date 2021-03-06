$(document).ready(function(){

//ICON SELECTORS (CHANGES OPACITY AND TRAVEL MODE IN MAP_OUT FUNCTION)
$("#walk").click(function(){
  if ( $("#walk").css("display") == "inline-block");
    document.getElementById("mode").innerHTML = "WALKING"
  });

$("#bus").click(function(){
  if ( $("#bus").css("display") == "inline-block");
    document.getElementById("mode").innerHTML = "TRANSIT"
  });

$("#car").click(function(){
  if ( $("#car").css("display") == "inline-block");
    document.getElementById("mode").innerHTML = "DRIVING"
  });

$("#bike").click(function(){
  if ( $("#bike").css("display") == "inline-block");
    document.getElementById("mode").innerHTML = "BICYCLING"
  });


//ICONS: ONLY ONE CAN BE SELECTED AT A TIME
$(".abc li a").click(function () {
    var t = $(this);
    var ul = t.closest('ul.abc');
    var selected = t.hasClass('selected');
    ul.find('li a').removeClass('selected');
    if (!selected)
        t.addClass('selected');
});

//BEGINNING MAP (CENTERED ON NYCDA) TO SHOW ON THE PAGE 
var map = new google.maps.Map(document.getElementById("map"), {
center: {lat: 40.7079502, lng: -74.0066584},
  zoom: 13
});

//DEFINES BUTTON THAT TRIGGERS MAP_OUT FUNCTION
var subby = document.getElementById("sub_butt");

//GOOGLE MAP API FUNCTION THAT RETURNS NEW MAP AND ROUTE
function map_out() {
var selectedMode = document.getElementById("mode").innerHTML;
var start = document.getElementsByName("start_point")[0].value;
var end = document.getElementsByName("end_point")[0].value;

var directionsService = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer();

var myOptions = {
 zoom:7,
 mapTypeId: google.maps.MapTypeId.ROADMAP
}

var map = new google.maps.Map(document.getElementById("map"), myOptions);
directionsDisplay.setMap(map);

var request = {
   origin: start, 
   destination: end,
   travelMode: google.maps.DirectionsTravelMode[selectedMode] 
};

directionsService.route(request, function(response, status) {
  if (status == google.maps.DirectionsStatus.OK) {
    var my_route = new google.maps.DirectionsRenderer({
    panel: document.getElementById("directions"),
    directions: response
    });

    // DISPLAYS THE DISTANCE:
    document.getElementById('distance').innerHTML += 
    ((response.routes[0].legs[0].distance.value)*.000621371).toFixed(2) + " miles";

    // DISPLAYS THE DURATION:
    var duration_in_minutes =Math.floor((response.routes[0].legs[0].duration.value)*.0166667)
    document.getElementById('duration').innerHTML += duration_in_minutes + " minutes";

    //TRANSFERS DURAITON VALUE TO GENRE FORM
    directionsDisplay.setDirections(response);
    document.getElementsByName("durax")[0].value = duration_in_minutes
  }
})

};

//WHEN SUBBY BUTTON IS CLICKED, MAP_OUT RUNS
google.maps.event.addDomListener(subby, "click", map_out);

//ONLY ONE CHECK BOX IN GENRE FORM CAN BE SELECTED AT A TIME
var $check_boxes = $('input[type=checkbox]');
$check_boxes.click(function() {
  $check_boxes.prop('checked', false);
  $(this).prop('checked', true);
});


});
