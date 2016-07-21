var windowWidth;
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

  //ウインドウサイズを取得
  getWidowSize();

  //イベントやブースのタイトルのサイズ変更
  changeFontSize();
}
google.maps.event.addDomListener(window, 'load', initialize);
window.onresize = getWidowSize;

function getWidowSize() {
  windowWidth = window.innerWidth;
  console.log(windowWidth);
  changeFontSize();
}

function changeFontSize() {
  var textBoxWidth = (windowWidth *  3 / 10 * 0.8) - 20;
  console.log("changeFontSize");
  var className = document.getElementsByClassName('contents__title');
  for (j=0; j<className.length; j++) {
    console.log("classは全部で"+className.length+"あります");
    console.log(j+"の字の幅は"+ className[j].offsetWidth + "px");
    console.log("枠の幅は" + textBoxWidth + "px");
    className[j].style.fontSize = 2.2 + "rem";
    if (textBoxWidth <= (className[j].offsetWidth)){
      for(i=2.2; i>=1; i-=0.1){
        className[j].style.fontSize = i + "rem";
        console.log(j + "のフォントサイズは" + i + "rem");
        console.log(j+"の字の幅は"+ className[j].offsetWidth + "pxその2");
        if (textBoxWidth >= className[j].offsetWidth) {
          console.log(j + "は枠の幅以下になりました");
          break;
        }
      }
    } else {
      console.log("幅より小さいです");
    }
  }
}
