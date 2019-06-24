//******json data*****
var data = [
  { name : "早稲田大学", position : { lat : 35.7091, lng : 139.7222 } },
  { name : "高田馬場駅", position : { lat : 35.7128, lng : 139.7036 } }
];
//******json data*****

var map = L.map('map');
var tileLayer = L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
{attribution:'© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    maxZoom: 18
});
tileLayer.addTo(map);

map.on('locationfound', onLocationFound); //現在地が取得出来た場合，onLocationFound()を実行
map.on('locationerror', onLocationError); //現在地が取得出来なかった場合，onLocationError()を実行
map.locate({setView: true, maxZoom: 16, timeout: 20000});

function onLocationFound(e) {
    L.marker(e.latlng).addTo(map).bindPopup("You are here.").openPopup();
    var Departure_lat = e.latlng.lat;
    var Departure_lng = e.latlng.lng;

    //目的地の入力
    goal = window.prompt("目的地を入力してください！", "");

    //一致するものを探す
    var matchData = data.filter(function(item, index){
      if (item.name == goal) return true;
    });

    //経路探索
    L.Routing.control({
          waypoints: [
              L.latLng(Departure_lat, Departure_lng), //現在地
              L.latLng(matchData[0].position.lat, matchData[0].position.lng) //目的地
          ],
          routeWhileDragging: true
      }).addTo(map);
}

function onLocationError(e) {
    alert("Error." + e.message);
}