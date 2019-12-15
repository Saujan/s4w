 var locations = [{
      lat: -19.9286,
      lng: -43.93888,
      info: "marker 1"
    }, {
      lat: -19.85758,
      lng: -43.9668,
      info: "marker 2"
    }, {
      lat: -18.24587,
      lng: -43.59613,
      info: "marker 3"
    }, {
      lat: -20.46427,
      lng: -45.42629,
      info: "marker 4"
    }, {
      lat: -20.37817,
      lng: -43.41641,
      info: "marker 5"
    }, {
      lat: -20.09749,
      lng: -43.48831,
      info: "marker 6"
    }, {
      lat: -21.13594,
      lng: -44.26132,
      info: "marker 7"
    }, ];


 function initMap() {
    var map=newMap(-15.7942357,-47.8821945);
    var markers = locations.map(function(location, i) {
      var marker=getMarkers(location);
      var info=location.info;
      markerClick(marker,info);
      return marker;
    });
    // markerCluster.setMarkers(markers);
    // Add a marker clusterer to manage the markers.
    var markerCluster = new MarkerClusterer(map, markers, {
      imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
    });

  }

    
function newMap(lat,lan){
  var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 5,
      center: {
        lat: lat,
        lng: lan
      }
    });
  return map;
}    

function getMarkers(location){
    var marker = new google.maps.Marker({
      position: location
    });
    return marker;   
}


function markerClick(marker,data){
  var infoWin = new google.maps.InfoWindow({
    maxHeight: 1000,
    maxWidth: 1000});
  
  google.maps.event.addListener(marker, 'click', function(evt) {
    // var markerContent=markerContent();
    // alert(data);
    infoWin.setContent(markerContent(data));
    infoWin.open(map, marker);
    highchartPlot();
  })

}

function markerContent(data){
  var content="<div style=''><div id=\"container\" style=\"min-width: 1500px; height: 1500px; margin: 0 auto\"></div><br>description:\
          <ul>\
            <li>XYZ</li>\
            <ul>paragraph one</ul>\
            <li>ABC</li>\
            <ul>paragraph two</ul>\
            </ul><br><hr/><div id=\"forTable\" style=\"min-width: 310px; height: 200px; margin: 0 auto\"><table class=\"table\">\
          <thead>\
            <tr>\
              <th>Name</th>\
              <th>Age</th>\
              <th>Gender</th>\
            </tr>\
          </thead>\
          <tbody>\
              <td>Mary</td>\
              <td>21</td>\
              <td>"+data+"</td>\
            </tr>\
            <tr>\
              <td>July</td>\
              <td>23</td>\
              <td>M</td>\
            </tr>\
          </tbody>\
        </table><br>description:\
          <ul>\
            <li>XYZ</li>\
            <ul>paragraph one</ul>\
            <li>ABC</li>\
            <ul>paragraph two</ul>\
            </ul</div></div>";
  return content
}





    
