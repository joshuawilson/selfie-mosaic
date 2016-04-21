'use strict';

var hslTool = require('./hsl');

var selfies = [
  '/assets/selfies/andres.jpg',
  '/assets/selfies/jadlimcaco.jpg',
  '/assets/selfies/sauro.jpg',
  '/assets/selfies/ritu.jpg',
  '/assets/selfies/zack415.jpg'
]

var originalSize = 50;
var selfieSize = 10;

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
  var pixelData = sourceContext.getImageData(x + delta, y + delta, 1, 1).data;
  var lightness = pixelData[0] + pixelData[1] + pixelData[2];

  var selfie = selfieImage.cloneNode(true);
  var div = selfie.childNodes[0];
  var img = div.childNodes[1];
  img.src=selfies[Math.floor(Math.random() * (selfies.length))];
  div.style.left=(x-pixelSize)+'px';
  div.style.top=(y-pixelSize)+'px';
  div.dataset.x = x;
  div.dataset.y = y;
  // [r, g, b, a]
  if (pixelData[3] < 1) { // transparent
    div.classList.add('white');
    div.dataset.color = 'white';
  } else if (lightness < 15) {
    div.classList.add('black');
    div.dataset.color = 'black';
  } else if (lightness > (255 * 3) - 15 * 3) {
    div.classList.add('white');
    div.dataset.color = 'white';
  } else if ( pixelData[0] > 200 && pixelData[1] < 100 && pixelData[2] < 100 ) {
    div.classList.add('red');
    div.dataset.color = 'red';
  } else {
    div.classList.add('white');
    div.dataset.color = 'white';
  }
  img.onload = function() {
    var appended = imageMap.appendChild(div);
    setTimeout(function(div) {
      return function() {
        var x = parseInt(div.dataset.x) + selfieSize;
        var y = parseInt(div.dataset.y) + selfieSize;
        renderImageOnCanvas(div.childNodes[1], x, y, div.dataset.color);
        imageMap.removeChild(div);
      }
    }(appended), 1500)
  }
}

var _canvas = document.createElement('canvas');
_canvas.height = originalSize / 2;
_canvas.width = originalSize / 2;
var _context = _canvas.getContext('2d');

function renderImageOnCanvas(img, x, y, color) {
  _context.drawImage(img, 0, 0, originalSize / 2, originalSize / 2);
  _context.drawImage(_canvas, 0, 0, originalSize / 2, originalSize / 2, 0, 0, originalSize / 4, originalSize / 4);
  _context.drawImage(_canvas, 0, 0, originalSize / 4, originalSize / 4, 0, 0, selfieSize, selfieSize);

  targetContext.drawImage(_canvas, 0, 0, selfieSize, selfieSize, x, y, selfieSize, selfieSize);
  // targetContext.drawImage(img, x, y, selfieSize, selfieSize);
  if (color === 'red') {
    targetContext.globalCompositeOperation = 'color';
    targetContext.fillStyle = "rgba(255, 0, 0, 0.95)";
  } else if (color === 'black') {
    targetContext.globalCompositeOperation = 'multiply';
    targetContext.fillStyle = "rgba(192, 192, 192, 1)";
  } else if (color === 'white') {
    targetContext.globalCompositeOperation = 'exclusion';
    targetContext.fillStyle = "rgba(1, 1, 1, 0.95)";
  }
  targetContext.fillRect(x, y, selfieSize, selfieSize);
  targetContext.globalCompositeOperation = 'source-over';
  if (color === 'black') {
    var pixels = targetContext.getImageData(x, y, selfieSize, selfieSize);
    var filtered = brightness(pixels, -0.2);
    targetContext.putImageData(filtered, x, y);
  } else if (color === 'white') {
    var pixels = targetContext.getImageData(x, y, selfieSize, selfieSize);
    var filtered = brightness(pixels, 0.4);
    targetContext.putImageData(filtered, x, y);
  }
}

function white(pixels) {
  var d = pixels.data;
  for (var i=0; i<d.length; i+=4) {
    var r = d[i];
    var g = d[i+1];
    var b = d[i+2];
    // CIE luminance for the RGB
    // The human eye is bad at seeing red and blue, so we de-emphasize them.
    var v = 0.2126*r + 0.7152*g + 0.0722*b;
    d[i] = d[i+1] = d[i+2] = v * 1.2
  }
  return pixels;
};

function black(pixels) {
  var d = pixels.data;
  for (var i=0; i<d.length; i+=4) {
    var r = d[i];
    var g = d[i+1];
    var b = d[i+2];
    // CIE luminance for the RGB
    // The human eye is bad at seeing red and blue, so we de-emphasize them.
    var v = 0.2126*r + 0.7152*g + 0.0722*b;
    d[i] = d[i+1] = d[i+2] = v * 0.5;
  }
  return pixels;
};

var redRgb = [parseInt('cc', 16), 0, 0];
console.log(redRgb);
var redHsl = hslTool.rgbToHsl.apply(null, redRgb);
console.log(redHsl);

function red(pixels) {
  var d = pixels.data;
  for (var i=0; i<d.length; i+=4) {
    // d[i] = 3*d[i];
    var rgb = [d[i], d[i+1], d[i+2]];
    var hsl = hslTool.rgbToHsl.apply(null, rgb);
    var lum = hsl[2]; //Math.max(hsl[2], 0.05);
    // lum = Math.min(lum, 0.70);
    var newHsl = [redHsl[0], (redHsl[1] + hsl[1])/2, lum];
    var newRgb = hslTool.hslToRgb.apply(null, newHsl);
    d[i] = newRgb[0];
    d[i+1] = newRgb[1];
    d[i+2] = newRgb[2];
  }
  return pixels;
};

function brightness(pixels, adjustment) {
  var d = pixels.data;
  for (var i=0; i<d.length; i+=4) {
    var rgb = [d[i], d[i+1], d[i+2]];
    var hsl = hslTool.rgbToHsv.apply(null, rgb);
    hsl[2] += adjustment;
    var newRgb = hslTool.hsvToRgb.apply(null, hsl);
    d[i] = newRgb[0];
    d[i+1] = newRgb[1];
    d[i+2] = newRgb[2];
  }
  return pixels;
};

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

var sourceCanvas = document.getElementById('source');
var sourceContext = sourceCanvas.getContext('2d');
var targetCanvas = document.getElementById('target');
var targetContext = targetCanvas.getContext('2d');
var width = 1800;

var source = new Image();
source.src = '/assets/redhat.svg';
// source.width=600; source.height=600;
// Render our SVG image to the canvas once it loads.
source.onload = function(){
  var height = width * source.height / source.width;
  sourceCanvas.width=width; sourceCanvas.height=height;
  targetCanvas.width=width; targetCanvas.height=height;
  sourceContext.imageSmoothingEnabled = false;
  targetContext.imageSmoothingEnabled = false;
  sourceContext.drawImage(source,0,0, width, height);
  fillLogo(width, height);
}

module.exports = {

}
