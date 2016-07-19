function initialize() {
  var marker;
  var latlng = new google.maps.LatLng(34.677300,138.945937);
  var myOptions = {
    zoom: 16, /*拡大比率*/
    center: latlng, /*表示枠内の中心点*/
    mapTypeId: google.maps.MapTypeId.ROADMAP,/*表示タイプの指定*/
    scrollwheel: false,
    draggable: false
  };
  var map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);

  /*取得スタイルの貼り付け*/
  var styleOptions = [
    {
      stylers:[
        { saturation: -100 },
        { visibility: "" },
        { lightness: 22 }
      ]
    }
  ];
  marker = new google.maps.Marker({ // マーカーの追加
    position: latlng, // マーカーを立てる位置を指定
    map: map // マーカーを立てる地図を指定
  });

  infoWindow = new google.maps.InfoWindow({ // 吹き出しの追加
    content: '<div class="info"><a href="http://nanz.villageinc.jp/">NanZ Village</a></div>' // 吹き出しに表示する内容
  });

  marker.addListener('click', function() { // マーカーをクリックしたとき
    infoWindow.open(map, marker); // 吹き出しの表示
  });

  var styledMapOptions = { name: 'NanZ Village' }
  var sampleType = new google.maps.StyledMapType(styleOptions, styledMapOptions);
  map.mapTypes.set('sample', sampleType);
  map.setMapTypeId('sample');
}
google.maps.event.addDomListener(window, 'load', initialize);
