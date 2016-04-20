(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('./mosaic')

},{"./mosaic":2}],2:[function(require,module,exports){
"use strict";

var selfies = [
  '/assets/selfies/andres.jpg',
  '/assets/selfies/jadlimcaco.jpg',
  '/assets/selfies/sauro.jpg',
  '/assets/selfies/ritu.jpg',
  '/assets/selfies/zack415.jpg'
]

var selfieSize = 15;

var selfieImage = (function() {
  var html = '<div class="picture"><div class="picture-mask"></div><img></div>';
  var documentFragment = document.createDocumentFragment();
  var element = document.createElement('div');
  element.innerHTML = html;
  documentFragment.appendChild(element.childNodes[0]);
  return documentFragment;
})();

var imageMap = document.getElementById('map');

function drawSelfie(x, y, pixelSize) {
  var delta = Math.floor(pixelSize / 2);
  var pixelData = context.getImageData(x + delta, y + delta, 1, 1).data;
  var lightness = pixelData[0] + pixelData[1] + pixelData[2];

  var selfie = selfieImage.cloneNode(true);
  var div = selfie.childNodes[0];
  var img = div.childNodes[1];
  img.src=selfies[Math.floor(Math.random() * (selfies.length))];
  div.style.left=(x-pixelSize)+'px';
  div.style.top=(y-pixelSize)+'px';
  // [r, g, b, a]
  if (pixelData[3] < 1) { // transparent
    div.classList.add('white');
  } else if (lightness < 15) {
    div.classList.add('black');
  } else if (lightness > (255 * 3) - 15 * 3) {
    div.classList.add('white');
  } else if ( pixelData[0] > 200 && pixelData[1] < 100 && pixelData[2] < 100 ) {
    div.classList.add('red');
  } else {
    div.classList.add('white');
  }
  img.onload = function(){
    imageMap.appendChild(div);
  }
}

function fillLogo(width, height) {
  var pixelSize = selfieSize;
  console.log(width, height, pixelSize);
  var radius = Math.min(width, height) / 2;
  for (var x = 0; x < width; x+=pixelSize) {
    for (var y = 0; y < height; y+=pixelSize) {
      var delay = Math.floor(Math.random() * (40000));
      setTimeout(function (x, y) {
        return function() {
         drawSelfie(x,y, pixelSize);
        }
      }(x,y), delay);
    }
  }
}

var canvas = document.getElementsByTagName('canvas')[0];
var context = canvas.getContext('2d');
var width = 1800;

var source = new Image();
source.src = '/assets/redhat.svg';
// source.width=600; source.height=600;
// Render our SVG image to the canvas once it loads.
source.onload = function(){
  var height = width * source.height / source.width;
  canvas.width=width; canvas.height=height;
  context.imageSmoothingEnabled = false;
  context.drawImage(source,0,0, width, height);
  fillLogo(width, height);
}

module.exports = {

}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvYXBwL21haW4uanMiLCJjbGllbnQvYXBwL21vc2FpYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInJlcXVpcmUoJy4vbW9zYWljJylcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc2VsZmllcyA9IFtcbiAgJy9hc3NldHMvc2VsZmllcy9hbmRyZXMuanBnJyxcbiAgJy9hc3NldHMvc2VsZmllcy9qYWRsaW1jYWNvLmpwZycsXG4gICcvYXNzZXRzL3NlbGZpZXMvc2F1cm8uanBnJyxcbiAgJy9hc3NldHMvc2VsZmllcy9yaXR1LmpwZycsXG4gICcvYXNzZXRzL3NlbGZpZXMvemFjazQxNS5qcGcnXG5dXG5cbnZhciBzZWxmaWVTaXplID0gMTU7XG5cbnZhciBzZWxmaWVJbWFnZSA9IChmdW5jdGlvbigpIHtcbiAgdmFyIGh0bWwgPSAnPGRpdiBjbGFzcz1cInBpY3R1cmVcIj48ZGl2IGNsYXNzPVwicGljdHVyZS1tYXNrXCI+PC9kaXY+PGltZz48L2Rpdj4nO1xuICB2YXIgZG9jdW1lbnRGcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZWxlbWVudC5pbm5lckhUTUwgPSBodG1sO1xuICBkb2N1bWVudEZyYWdtZW50LmFwcGVuZENoaWxkKGVsZW1lbnQuY2hpbGROb2Rlc1swXSk7XG4gIHJldHVybiBkb2N1bWVudEZyYWdtZW50O1xufSkoKTtcblxudmFyIGltYWdlTWFwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcCcpO1xuXG5mdW5jdGlvbiBkcmF3U2VsZmllKHgsIHksIHBpeGVsU2l6ZSkge1xuICB2YXIgZGVsdGEgPSBNYXRoLmZsb29yKHBpeGVsU2l6ZSAvIDIpO1xuICB2YXIgcGl4ZWxEYXRhID0gY29udGV4dC5nZXRJbWFnZURhdGEoeCArIGRlbHRhLCB5ICsgZGVsdGEsIDEsIDEpLmRhdGE7XG4gIHZhciBsaWdodG5lc3MgPSBwaXhlbERhdGFbMF0gKyBwaXhlbERhdGFbMV0gKyBwaXhlbERhdGFbMl07XG5cbiAgdmFyIHNlbGZpZSA9IHNlbGZpZUltYWdlLmNsb25lTm9kZSh0cnVlKTtcbiAgdmFyIGRpdiA9IHNlbGZpZS5jaGlsZE5vZGVzWzBdO1xuICB2YXIgaW1nID0gZGl2LmNoaWxkTm9kZXNbMV07XG4gIGltZy5zcmM9c2VsZmllc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoc2VsZmllcy5sZW5ndGgpKV07XG4gIGRpdi5zdHlsZS5sZWZ0PSh4LXBpeGVsU2l6ZSkrJ3B4JztcbiAgZGl2LnN0eWxlLnRvcD0oeS1waXhlbFNpemUpKydweCc7XG4gIC8vIFtyLCBnLCBiLCBhXVxuICBpZiAocGl4ZWxEYXRhWzNdIDwgMSkgeyAvLyB0cmFuc3BhcmVudFxuICAgIGRpdi5jbGFzc0xpc3QuYWRkKCd3aGl0ZScpO1xuICB9IGVsc2UgaWYgKGxpZ2h0bmVzcyA8IDE1KSB7XG4gICAgZGl2LmNsYXNzTGlzdC5hZGQoJ2JsYWNrJyk7XG4gIH0gZWxzZSBpZiAobGlnaHRuZXNzID4gKDI1NSAqIDMpIC0gMTUgKiAzKSB7XG4gICAgZGl2LmNsYXNzTGlzdC5hZGQoJ3doaXRlJyk7XG4gIH0gZWxzZSBpZiAoIHBpeGVsRGF0YVswXSA+IDIwMCAmJiBwaXhlbERhdGFbMV0gPCAxMDAgJiYgcGl4ZWxEYXRhWzJdIDwgMTAwICkge1xuICAgIGRpdi5jbGFzc0xpc3QuYWRkKCdyZWQnKTtcbiAgfSBlbHNlIHtcbiAgICBkaXYuY2xhc3NMaXN0LmFkZCgnd2hpdGUnKTtcbiAgfVxuICBpbWcub25sb2FkID0gZnVuY3Rpb24oKXtcbiAgICBpbWFnZU1hcC5hcHBlbmRDaGlsZChkaXYpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGZpbGxMb2dvKHdpZHRoLCBoZWlnaHQpIHtcbiAgdmFyIHBpeGVsU2l6ZSA9IHNlbGZpZVNpemU7XG4gIGNvbnNvbGUubG9nKHdpZHRoLCBoZWlnaHQsIHBpeGVsU2l6ZSk7XG4gIHZhciByYWRpdXMgPSBNYXRoLm1pbih3aWR0aCwgaGVpZ2h0KSAvIDI7XG4gIGZvciAodmFyIHggPSAwOyB4IDwgd2lkdGg7IHgrPXBpeGVsU2l6ZSkge1xuICAgIGZvciAodmFyIHkgPSAwOyB5IDwgaGVpZ2h0OyB5Kz1waXhlbFNpemUpIHtcbiAgICAgIHZhciBkZWxheSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICg0MDAwMCkpO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoeCwgeSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICBkcmF3U2VsZmllKHgseSwgcGl4ZWxTaXplKTtcbiAgICAgICAgfVxuICAgICAgfSh4LHkpLCBkZWxheSk7XG4gICAgfVxuICB9XG59XG5cbnZhciBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnY2FudmFzJylbMF07XG52YXIgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xudmFyIHdpZHRoID0gMTgwMDtcblxudmFyIHNvdXJjZSA9IG5ldyBJbWFnZSgpO1xuc291cmNlLnNyYyA9ICcvYXNzZXRzL3JlZGhhdC5zdmcnO1xuLy8gc291cmNlLndpZHRoPTYwMDsgc291cmNlLmhlaWdodD02MDA7XG4vLyBSZW5kZXIgb3VyIFNWRyBpbWFnZSB0byB0aGUgY2FudmFzIG9uY2UgaXQgbG9hZHMuXG5zb3VyY2Uub25sb2FkID0gZnVuY3Rpb24oKXtcbiAgdmFyIGhlaWdodCA9IHdpZHRoICogc291cmNlLmhlaWdodCAvIHNvdXJjZS53aWR0aDtcbiAgY2FudmFzLndpZHRoPXdpZHRoOyBjYW52YXMuaGVpZ2h0PWhlaWdodDtcbiAgY29udGV4dC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcbiAgY29udGV4dC5kcmF3SW1hZ2Uoc291cmNlLDAsMCwgd2lkdGgsIGhlaWdodCk7XG4gIGZpbGxMb2dvKHdpZHRoLCBoZWlnaHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxufVxuIl19
