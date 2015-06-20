var UI = require('ui');
var Vector2 = require('vector2');
var ajax = require('ajax');

var menu = new UI.Menu({
    sections: [{
      items: [{
        title: 'Vrijdag 3 juli',
        subtitle: '16:00 - 00:00',
        day_id:0
      }, {
        title: 'Zaterdag 4 juli',
        subtitle: '14:00 - 00:00',
        day_id:1
      }]
    }]
  });
  menu.on('select', function(e) {
    openDay(e.item.day_id);
  });
  menu.show();

var friday = [];
var saturday = [];
function openDay(day_id){

  var data = [];
  if(day_id===0){
    data = friday;
  }else{
    data = saturday;
  }
  var items = [];
  for(var i = 0 ; i < data.length ; i++){
    var item = [];
    item.title = data[i].name;
    item.subtitle = data[i].start.substring(0,5)+' - '+data[i].stage;
    items.push(item);
  }
  
  var dayWindow = new UI.Menu({
    sections: [{
      items: items
    }]
  });
  dayWindow.show();
}

ajax(
  {
    url: 'http://youngartfestival.nl/app_pebble.php',
    type: 'json'
  },
  function(data, status, request) {
    for(var i = 0 ; i < data.artists.length ; i++){
      if(data.artists[i].day_id===0){
        friday.push(data.artists[i]);
      }else{
        saturday.push(data.artists[i]);        
      }
      console.log(data.artists[i].name);
    }
  },
  function(error, status, request) {
    console.log('The ajax request failed: ' + error);
  }
);