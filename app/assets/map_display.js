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

var Departure_lat;
var Departure_lng;
var routingControl = null;

map.on('locationfound', onLocationFound); //現在地が取得出来た場合，onLocationFound()を実行
map.on('locationerror', onLocationError); //現在地が取得出来なかった場合，onLocationError()を実行
map.locate({setView: true, maxZoom: 16, timeout: 20000});

function onLocationFound(e) {
    L.marker(e.latlng).addTo(map).bindPopup("You are here.").openPopup();
    Departure_lat = e.latlng.lat;
    Departure_lng = e.latlng.lng;
}

function onLocationError(e) {
    alert("Error." + e.message);
}

function clickBtn(){
    const select = document.form.select;
    const active = [];
    var j;

    //チェックされているものを全てactive[]に格納する
    for (let i = 0; i < select.length; i++){
    	if(select[i].checked){
    		active.push(select[i].value);
    	}
   	}

    //一致するものを探す
    var matchData = data.filter(function(item, index){
      if (active.indexOf(item.name) >= 0) return true;
    });

    //乱数
    j = parseInt(Math.random() * matchData.length);

    //前の経路が残っていた場合，削除する
    if (routingControl != null){
        map.removeControl(routingControl);
        routingControl = null;
    }

    //経路探索
    routingControl = L.Routing.control({
          waypoints: [
              L.latLng(Departure_lat, Departure_lng), //現在地
              L.latLng(matchData[j].position.lat, matchData[j].position.lng) //目的地
          ],
          routeWhileDragging: true
      }).addTo(map);
}