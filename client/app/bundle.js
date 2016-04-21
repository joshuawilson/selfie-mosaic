(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
// http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c

/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSL representation
 */
function rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  Array           The RGB representation
 */
function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [r * 255, g * 255, b * 255];
}

/**
 * Converts an RGB color value to HSV. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and v in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSV representation
 */
function rgbToHsv(r, g, b){
    r = r/255, g = g/255, b = b/255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, v = max;

    var d = max - min;
    s = max == 0 ? 0 : d / max;

    if(max == min){
        h = 0; // achromatic
    }else{
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, v];
}

/**
 * Converts an HSV color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes h, s, and v are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  v       The value
 * @return  Array           The RGB representation
 */
function hsvToRgb(h, s, v){
    var r, g, b;

    var i = Math.floor(h * 6);
    var f = h * 6 - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);

    switch(i % 6){
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }

    return [r * 255, g * 255, b * 255];
}

module.exports = {
  rgbToHsl: rgbToHsl,
  hslToRgb: hslToRgb,
  rgbToHsv: rgbToHsv,
  hsvToRgb: hsvToRgb
}

},{}],2:[function(require,module,exports){
require('./mosaic')

},{"./mosaic":3}],3:[function(require,module,exports){
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

},{"./hsl":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvYXBwL2hzbC5qcyIsImNsaWVudC9hcHAvbWFpbi5qcyIsImNsaWVudC9hcHAvbW9zYWljLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5SUE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG4vLyBodHRwOi8vYXhvbmZsdXguY29tL2hhbmR5LXJnYi10by1oc2wtYW5kLXJnYi10by1oc3YtY29sb3ItbW9kZWwtY1xuXG4vKipcbiAqIENvbnZlcnRzIGFuIFJHQiBjb2xvciB2YWx1ZSB0byBIU0wuIENvbnZlcnNpb24gZm9ybXVsYVxuICogYWRhcHRlZCBmcm9tIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSFNMX2NvbG9yX3NwYWNlLlxuICogQXNzdW1lcyByLCBnLCBhbmQgYiBhcmUgY29udGFpbmVkIGluIHRoZSBzZXQgWzAsIDI1NV0gYW5kXG4gKiByZXR1cm5zIGgsIHMsIGFuZCBsIGluIHRoZSBzZXQgWzAsIDFdLlxuICpcbiAqIEBwYXJhbSAgIE51bWJlciAgciAgICAgICBUaGUgcmVkIGNvbG9yIHZhbHVlXG4gKiBAcGFyYW0gICBOdW1iZXIgIGcgICAgICAgVGhlIGdyZWVuIGNvbG9yIHZhbHVlXG4gKiBAcGFyYW0gICBOdW1iZXIgIGIgICAgICAgVGhlIGJsdWUgY29sb3IgdmFsdWVcbiAqIEByZXR1cm4gIEFycmF5ICAgICAgICAgICBUaGUgSFNMIHJlcHJlc2VudGF0aW9uXG4gKi9cbmZ1bmN0aW9uIHJnYlRvSHNsKHIsIGcsIGIpe1xuICAgIHIgLz0gMjU1LCBnIC89IDI1NSwgYiAvPSAyNTU7XG4gICAgdmFyIG1heCA9IE1hdGgubWF4KHIsIGcsIGIpLCBtaW4gPSBNYXRoLm1pbihyLCBnLCBiKTtcbiAgICB2YXIgaCwgcywgbCA9IChtYXggKyBtaW4pIC8gMjtcblxuICAgIGlmKG1heCA9PSBtaW4pe1xuICAgICAgICBoID0gcyA9IDA7IC8vIGFjaHJvbWF0aWNcbiAgICB9ZWxzZXtcbiAgICAgICAgdmFyIGQgPSBtYXggLSBtaW47XG4gICAgICAgIHMgPSBsID4gMC41ID8gZCAvICgyIC0gbWF4IC0gbWluKSA6IGQgLyAobWF4ICsgbWluKTtcbiAgICAgICAgc3dpdGNoKG1heCl7XG4gICAgICAgICAgICBjYXNlIHI6IGggPSAoZyAtIGIpIC8gZCArIChnIDwgYiA/IDYgOiAwKTsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGc6IGggPSAoYiAtIHIpIC8gZCArIDI7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBiOiBoID0gKHIgLSBnKSAvIGQgKyA0OyBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBoIC89IDY7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtoLCBzLCBsXTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBhbiBIU0wgY29sb3IgdmFsdWUgdG8gUkdCLiBDb252ZXJzaW9uIGZvcm11bGFcbiAqIGFkYXB0ZWQgZnJvbSBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0hTTF9jb2xvcl9zcGFjZS5cbiAqIEFzc3VtZXMgaCwgcywgYW5kIGwgYXJlIGNvbnRhaW5lZCBpbiB0aGUgc2V0IFswLCAxXSBhbmRcbiAqIHJldHVybnMgciwgZywgYW5kIGIgaW4gdGhlIHNldCBbMCwgMjU1XS5cbiAqXG4gKiBAcGFyYW0gICBOdW1iZXIgIGggICAgICAgVGhlIGh1ZVxuICogQHBhcmFtICAgTnVtYmVyICBzICAgICAgIFRoZSBzYXR1cmF0aW9uXG4gKiBAcGFyYW0gICBOdW1iZXIgIGwgICAgICAgVGhlIGxpZ2h0bmVzc1xuICogQHJldHVybiAgQXJyYXkgICAgICAgICAgIFRoZSBSR0IgcmVwcmVzZW50YXRpb25cbiAqL1xuZnVuY3Rpb24gaHNsVG9SZ2IoaCwgcywgbCl7XG4gICAgdmFyIHIsIGcsIGI7XG5cbiAgICBpZihzID09IDApe1xuICAgICAgICByID0gZyA9IGIgPSBsOyAvLyBhY2hyb21hdGljXG4gICAgfWVsc2V7XG4gICAgICAgIGZ1bmN0aW9uIGh1ZTJyZ2IocCwgcSwgdCl7XG4gICAgICAgICAgICBpZih0IDwgMCkgdCArPSAxO1xuICAgICAgICAgICAgaWYodCA+IDEpIHQgLT0gMTtcbiAgICAgICAgICAgIGlmKHQgPCAxLzYpIHJldHVybiBwICsgKHEgLSBwKSAqIDYgKiB0O1xuICAgICAgICAgICAgaWYodCA8IDEvMikgcmV0dXJuIHE7XG4gICAgICAgICAgICBpZih0IDwgMi8zKSByZXR1cm4gcCArIChxIC0gcCkgKiAoMi8zIC0gdCkgKiA2O1xuICAgICAgICAgICAgcmV0dXJuIHA7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcSA9IGwgPCAwLjUgPyBsICogKDEgKyBzKSA6IGwgKyBzIC0gbCAqIHM7XG4gICAgICAgIHZhciBwID0gMiAqIGwgLSBxO1xuICAgICAgICByID0gaHVlMnJnYihwLCBxLCBoICsgMS8zKTtcbiAgICAgICAgZyA9IGh1ZTJyZ2IocCwgcSwgaCk7XG4gICAgICAgIGIgPSBodWUycmdiKHAsIHEsIGggLSAxLzMpO1xuICAgIH1cblxuICAgIHJldHVybiBbciAqIDI1NSwgZyAqIDI1NSwgYiAqIDI1NV07XG59XG5cbi8qKlxuICogQ29udmVydHMgYW4gUkdCIGNvbG9yIHZhbHVlIHRvIEhTVi4gQ29udmVyc2lvbiBmb3JtdWxhXG4gKiBhZGFwdGVkIGZyb20gaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9IU1ZfY29sb3Jfc3BhY2UuXG4gKiBBc3N1bWVzIHIsIGcsIGFuZCBiIGFyZSBjb250YWluZWQgaW4gdGhlIHNldCBbMCwgMjU1XSBhbmRcbiAqIHJldHVybnMgaCwgcywgYW5kIHYgaW4gdGhlIHNldCBbMCwgMV0uXG4gKlxuICogQHBhcmFtICAgTnVtYmVyICByICAgICAgIFRoZSByZWQgY29sb3IgdmFsdWVcbiAqIEBwYXJhbSAgIE51bWJlciAgZyAgICAgICBUaGUgZ3JlZW4gY29sb3IgdmFsdWVcbiAqIEBwYXJhbSAgIE51bWJlciAgYiAgICAgICBUaGUgYmx1ZSBjb2xvciB2YWx1ZVxuICogQHJldHVybiAgQXJyYXkgICAgICAgICAgIFRoZSBIU1YgcmVwcmVzZW50YXRpb25cbiAqL1xuZnVuY3Rpb24gcmdiVG9Ic3YociwgZywgYil7XG4gICAgciA9IHIvMjU1LCBnID0gZy8yNTUsIGIgPSBiLzI1NTtcbiAgICB2YXIgbWF4ID0gTWF0aC5tYXgociwgZywgYiksIG1pbiA9IE1hdGgubWluKHIsIGcsIGIpO1xuICAgIHZhciBoLCBzLCB2ID0gbWF4O1xuXG4gICAgdmFyIGQgPSBtYXggLSBtaW47XG4gICAgcyA9IG1heCA9PSAwID8gMCA6IGQgLyBtYXg7XG5cbiAgICBpZihtYXggPT0gbWluKXtcbiAgICAgICAgaCA9IDA7IC8vIGFjaHJvbWF0aWNcbiAgICB9ZWxzZXtcbiAgICAgICAgc3dpdGNoKG1heCl7XG4gICAgICAgICAgICBjYXNlIHI6IGggPSAoZyAtIGIpIC8gZCArIChnIDwgYiA/IDYgOiAwKTsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGc6IGggPSAoYiAtIHIpIC8gZCArIDI7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBiOiBoID0gKHIgLSBnKSAvIGQgKyA0OyBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBoIC89IDY7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtoLCBzLCB2XTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBhbiBIU1YgY29sb3IgdmFsdWUgdG8gUkdCLiBDb252ZXJzaW9uIGZvcm11bGFcbiAqIGFkYXB0ZWQgZnJvbSBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0hTVl9jb2xvcl9zcGFjZS5cbiAqIEFzc3VtZXMgaCwgcywgYW5kIHYgYXJlIGNvbnRhaW5lZCBpbiB0aGUgc2V0IFswLCAxXSBhbmRcbiAqIHJldHVybnMgciwgZywgYW5kIGIgaW4gdGhlIHNldCBbMCwgMjU1XS5cbiAqXG4gKiBAcGFyYW0gICBOdW1iZXIgIGggICAgICAgVGhlIGh1ZVxuICogQHBhcmFtICAgTnVtYmVyICBzICAgICAgIFRoZSBzYXR1cmF0aW9uXG4gKiBAcGFyYW0gICBOdW1iZXIgIHYgICAgICAgVGhlIHZhbHVlXG4gKiBAcmV0dXJuICBBcnJheSAgICAgICAgICAgVGhlIFJHQiByZXByZXNlbnRhdGlvblxuICovXG5mdW5jdGlvbiBoc3ZUb1JnYihoLCBzLCB2KXtcbiAgICB2YXIgciwgZywgYjtcblxuICAgIHZhciBpID0gTWF0aC5mbG9vcihoICogNik7XG4gICAgdmFyIGYgPSBoICogNiAtIGk7XG4gICAgdmFyIHAgPSB2ICogKDEgLSBzKTtcbiAgICB2YXIgcSA9IHYgKiAoMSAtIGYgKiBzKTtcbiAgICB2YXIgdCA9IHYgKiAoMSAtICgxIC0gZikgKiBzKTtcblxuICAgIHN3aXRjaChpICUgNil7XG4gICAgICAgIGNhc2UgMDogciA9IHYsIGcgPSB0LCBiID0gcDsgYnJlYWs7XG4gICAgICAgIGNhc2UgMTogciA9IHEsIGcgPSB2LCBiID0gcDsgYnJlYWs7XG4gICAgICAgIGNhc2UgMjogciA9IHAsIGcgPSB2LCBiID0gdDsgYnJlYWs7XG4gICAgICAgIGNhc2UgMzogciA9IHAsIGcgPSBxLCBiID0gdjsgYnJlYWs7XG4gICAgICAgIGNhc2UgNDogciA9IHQsIGcgPSBwLCBiID0gdjsgYnJlYWs7XG4gICAgICAgIGNhc2UgNTogciA9IHYsIGcgPSBwLCBiID0gcTsgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtyICogMjU1LCBnICogMjU1LCBiICogMjU1XTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHJnYlRvSHNsOiByZ2JUb0hzbCxcbiAgaHNsVG9SZ2I6IGhzbFRvUmdiLFxuICByZ2JUb0hzdjogcmdiVG9Ic3YsXG4gIGhzdlRvUmdiOiBoc3ZUb1JnYlxufVxuIiwicmVxdWlyZSgnLi9tb3NhaWMnKVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaHNsVG9vbCA9IHJlcXVpcmUoJy4vaHNsJyk7XG5cbnZhciBzZWxmaWVzID0gW1xuICAnL2Fzc2V0cy9zZWxmaWVzL2FuZHJlcy5qcGcnLFxuICAnL2Fzc2V0cy9zZWxmaWVzL2phZGxpbWNhY28uanBnJyxcbiAgJy9hc3NldHMvc2VsZmllcy9zYXVyby5qcGcnLFxuICAnL2Fzc2V0cy9zZWxmaWVzL3JpdHUuanBnJyxcbiAgJy9hc3NldHMvc2VsZmllcy96YWNrNDE1LmpwZydcbl1cblxudmFyIG9yaWdpbmFsU2l6ZSA9IDUwO1xudmFyIHNlbGZpZVNpemUgPSAxMDtcblxudmFyIHNlbGZpZUltYWdlID0gKGZ1bmN0aW9uKCkge1xuICB2YXIgaHRtbCA9ICc8ZGl2IGNsYXNzPVwicGljdHVyZVwiPjxkaXYgY2xhc3M9XCJwaWN0dXJlLW1hc2tcIj48L2Rpdj48aW1nPjwvZGl2Pic7XG4gIHZhciBkb2N1bWVudEZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBlbGVtZW50LmlubmVySFRNTCA9IGh0bWw7XG4gIGRvY3VtZW50RnJhZ21lbnQuYXBwZW5kQ2hpbGQoZWxlbWVudC5jaGlsZE5vZGVzWzBdKTtcbiAgcmV0dXJuIGRvY3VtZW50RnJhZ21lbnQ7XG59KSgpO1xuXG52YXIgaW1hZ2VNYXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwJyk7XG5cbmZ1bmN0aW9uIGRyYXdTZWxmaWUoeCwgeSwgcGl4ZWxTaXplKSB7XG4gIHZhciBkZWx0YSA9IE1hdGguZmxvb3IocGl4ZWxTaXplIC8gMik7XG4gIHZhciBwaXhlbERhdGEgPSBzb3VyY2VDb250ZXh0LmdldEltYWdlRGF0YSh4ICsgZGVsdGEsIHkgKyBkZWx0YSwgMSwgMSkuZGF0YTtcbiAgdmFyIGxpZ2h0bmVzcyA9IHBpeGVsRGF0YVswXSArIHBpeGVsRGF0YVsxXSArIHBpeGVsRGF0YVsyXTtcblxuICB2YXIgc2VsZmllID0gc2VsZmllSW1hZ2UuY2xvbmVOb2RlKHRydWUpO1xuICB2YXIgZGl2ID0gc2VsZmllLmNoaWxkTm9kZXNbMF07XG4gIHZhciBpbWcgPSBkaXYuY2hpbGROb2Rlc1sxXTtcbiAgaW1nLnNyYz1zZWxmaWVzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChzZWxmaWVzLmxlbmd0aCkpXTtcbiAgZGl2LnN0eWxlLmxlZnQ9KHgtcGl4ZWxTaXplKSsncHgnO1xuICBkaXYuc3R5bGUudG9wPSh5LXBpeGVsU2l6ZSkrJ3B4JztcbiAgZGl2LmRhdGFzZXQueCA9IHg7XG4gIGRpdi5kYXRhc2V0LnkgPSB5O1xuICAvLyBbciwgZywgYiwgYV1cbiAgaWYgKHBpeGVsRGF0YVszXSA8IDEpIHsgLy8gdHJhbnNwYXJlbnRcbiAgICBkaXYuY2xhc3NMaXN0LmFkZCgnd2hpdGUnKTtcbiAgICBkaXYuZGF0YXNldC5jb2xvciA9ICd3aGl0ZSc7XG4gIH0gZWxzZSBpZiAobGlnaHRuZXNzIDwgMTUpIHtcbiAgICBkaXYuY2xhc3NMaXN0LmFkZCgnYmxhY2snKTtcbiAgICBkaXYuZGF0YXNldC5jb2xvciA9ICdibGFjayc7XG4gIH0gZWxzZSBpZiAobGlnaHRuZXNzID4gKDI1NSAqIDMpIC0gMTUgKiAzKSB7XG4gICAgZGl2LmNsYXNzTGlzdC5hZGQoJ3doaXRlJyk7XG4gICAgZGl2LmRhdGFzZXQuY29sb3IgPSAnd2hpdGUnO1xuICB9IGVsc2UgaWYgKCBwaXhlbERhdGFbMF0gPiAyMDAgJiYgcGl4ZWxEYXRhWzFdIDwgMTAwICYmIHBpeGVsRGF0YVsyXSA8IDEwMCApIHtcbiAgICBkaXYuY2xhc3NMaXN0LmFkZCgncmVkJyk7XG4gICAgZGl2LmRhdGFzZXQuY29sb3IgPSAncmVkJztcbiAgfSBlbHNlIHtcbiAgICBkaXYuY2xhc3NMaXN0LmFkZCgnd2hpdGUnKTtcbiAgICBkaXYuZGF0YXNldC5jb2xvciA9ICd3aGl0ZSc7XG4gIH1cbiAgaW1nLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcHBlbmRlZCA9IGltYWdlTWFwLmFwcGVuZENoaWxkKGRpdik7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbihkaXYpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHggPSBwYXJzZUludChkaXYuZGF0YXNldC54KSArIHNlbGZpZVNpemU7XG4gICAgICAgIHZhciB5ID0gcGFyc2VJbnQoZGl2LmRhdGFzZXQueSkgKyBzZWxmaWVTaXplO1xuICAgICAgICByZW5kZXJJbWFnZU9uQ2FudmFzKGRpdi5jaGlsZE5vZGVzWzFdLCB4LCB5LCBkaXYuZGF0YXNldC5jb2xvcik7XG4gICAgICAgIGltYWdlTWFwLnJlbW92ZUNoaWxkKGRpdik7XG4gICAgICB9XG4gICAgfShhcHBlbmRlZCksIDE1MDApXG4gIH1cbn1cblxudmFyIF9jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbl9jYW52YXMuaGVpZ2h0ID0gb3JpZ2luYWxTaXplIC8gMjtcbl9jYW52YXMud2lkdGggPSBvcmlnaW5hbFNpemUgLyAyO1xudmFyIF9jb250ZXh0ID0gX2NhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG5mdW5jdGlvbiByZW5kZXJJbWFnZU9uQ2FudmFzKGltZywgeCwgeSwgY29sb3IpIHtcbiAgX2NvbnRleHQuZHJhd0ltYWdlKGltZywgMCwgMCwgb3JpZ2luYWxTaXplIC8gMiwgb3JpZ2luYWxTaXplIC8gMik7XG4gIF9jb250ZXh0LmRyYXdJbWFnZShfY2FudmFzLCAwLCAwLCBvcmlnaW5hbFNpemUgLyAyLCBvcmlnaW5hbFNpemUgLyAyLCAwLCAwLCBvcmlnaW5hbFNpemUgLyA0LCBvcmlnaW5hbFNpemUgLyA0KTtcbiAgX2NvbnRleHQuZHJhd0ltYWdlKF9jYW52YXMsIDAsIDAsIG9yaWdpbmFsU2l6ZSAvIDQsIG9yaWdpbmFsU2l6ZSAvIDQsIDAsIDAsIHNlbGZpZVNpemUsIHNlbGZpZVNpemUpO1xuXG4gIHRhcmdldENvbnRleHQuZHJhd0ltYWdlKF9jYW52YXMsIDAsIDAsIHNlbGZpZVNpemUsIHNlbGZpZVNpemUsIHgsIHksIHNlbGZpZVNpemUsIHNlbGZpZVNpemUpO1xuICAvLyB0YXJnZXRDb250ZXh0LmRyYXdJbWFnZShpbWcsIHgsIHksIHNlbGZpZVNpemUsIHNlbGZpZVNpemUpO1xuICBpZiAoY29sb3IgPT09ICdyZWQnKSB7XG4gICAgdGFyZ2V0Q29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSAnY29sb3InO1xuICAgIHRhcmdldENvbnRleHQuZmlsbFN0eWxlID0gXCJyZ2JhKDI1NSwgMCwgMCwgMC45NSlcIjtcbiAgfSBlbHNlIGlmIChjb2xvciA9PT0gJ2JsYWNrJykge1xuICAgIHRhcmdldENvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ211bHRpcGx5JztcbiAgICB0YXJnZXRDb250ZXh0LmZpbGxTdHlsZSA9IFwicmdiYSgxOTIsIDE5MiwgMTkyLCAxKVwiO1xuICB9IGVsc2UgaWYgKGNvbG9yID09PSAnd2hpdGUnKSB7XG4gICAgdGFyZ2V0Q29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSAnZXhjbHVzaW9uJztcbiAgICB0YXJnZXRDb250ZXh0LmZpbGxTdHlsZSA9IFwicmdiYSgxLCAxLCAxLCAwLjk1KVwiO1xuICB9XG4gIHRhcmdldENvbnRleHQuZmlsbFJlY3QoeCwgeSwgc2VsZmllU2l6ZSwgc2VsZmllU2l6ZSk7XG4gIHRhcmdldENvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ3NvdXJjZS1vdmVyJztcbiAgaWYgKGNvbG9yID09PSAnYmxhY2snKSB7XG4gICAgdmFyIHBpeGVscyA9IHRhcmdldENvbnRleHQuZ2V0SW1hZ2VEYXRhKHgsIHksIHNlbGZpZVNpemUsIHNlbGZpZVNpemUpO1xuICAgIHZhciBmaWx0ZXJlZCA9IGJyaWdodG5lc3MocGl4ZWxzLCAtMC4yKTtcbiAgICB0YXJnZXRDb250ZXh0LnB1dEltYWdlRGF0YShmaWx0ZXJlZCwgeCwgeSk7XG4gIH0gZWxzZSBpZiAoY29sb3IgPT09ICd3aGl0ZScpIHtcbiAgICB2YXIgcGl4ZWxzID0gdGFyZ2V0Q29udGV4dC5nZXRJbWFnZURhdGEoeCwgeSwgc2VsZmllU2l6ZSwgc2VsZmllU2l6ZSk7XG4gICAgdmFyIGZpbHRlcmVkID0gYnJpZ2h0bmVzcyhwaXhlbHMsIDAuNCk7XG4gICAgdGFyZ2V0Q29udGV4dC5wdXRJbWFnZURhdGEoZmlsdGVyZWQsIHgsIHkpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHdoaXRlKHBpeGVscykge1xuICB2YXIgZCA9IHBpeGVscy5kYXRhO1xuICBmb3IgKHZhciBpPTA7IGk8ZC5sZW5ndGg7IGkrPTQpIHtcbiAgICB2YXIgciA9IGRbaV07XG4gICAgdmFyIGcgPSBkW2krMV07XG4gICAgdmFyIGIgPSBkW2krMl07XG4gICAgLy8gQ0lFIGx1bWluYW5jZSBmb3IgdGhlIFJHQlxuICAgIC8vIFRoZSBodW1hbiBleWUgaXMgYmFkIGF0IHNlZWluZyByZWQgYW5kIGJsdWUsIHNvIHdlIGRlLWVtcGhhc2l6ZSB0aGVtLlxuICAgIHZhciB2ID0gMC4yMTI2KnIgKyAwLjcxNTIqZyArIDAuMDcyMipiO1xuICAgIGRbaV0gPSBkW2krMV0gPSBkW2krMl0gPSB2ICogMS4yXG4gIH1cbiAgcmV0dXJuIHBpeGVscztcbn07XG5cbmZ1bmN0aW9uIGJsYWNrKHBpeGVscykge1xuICB2YXIgZCA9IHBpeGVscy5kYXRhO1xuICBmb3IgKHZhciBpPTA7IGk8ZC5sZW5ndGg7IGkrPTQpIHtcbiAgICB2YXIgciA9IGRbaV07XG4gICAgdmFyIGcgPSBkW2krMV07XG4gICAgdmFyIGIgPSBkW2krMl07XG4gICAgLy8gQ0lFIGx1bWluYW5jZSBmb3IgdGhlIFJHQlxuICAgIC8vIFRoZSBodW1hbiBleWUgaXMgYmFkIGF0IHNlZWluZyByZWQgYW5kIGJsdWUsIHNvIHdlIGRlLWVtcGhhc2l6ZSB0aGVtLlxuICAgIHZhciB2ID0gMC4yMTI2KnIgKyAwLjcxNTIqZyArIDAuMDcyMipiO1xuICAgIGRbaV0gPSBkW2krMV0gPSBkW2krMl0gPSB2ICogMC41O1xuICB9XG4gIHJldHVybiBwaXhlbHM7XG59O1xuXG52YXIgcmVkUmdiID0gW3BhcnNlSW50KCdjYycsIDE2KSwgMCwgMF07XG5jb25zb2xlLmxvZyhyZWRSZ2IpO1xudmFyIHJlZEhzbCA9IGhzbFRvb2wucmdiVG9Ic2wuYXBwbHkobnVsbCwgcmVkUmdiKTtcbmNvbnNvbGUubG9nKHJlZEhzbCk7XG5cbmZ1bmN0aW9uIHJlZChwaXhlbHMpIHtcbiAgdmFyIGQgPSBwaXhlbHMuZGF0YTtcbiAgZm9yICh2YXIgaT0wOyBpPGQubGVuZ3RoOyBpKz00KSB7XG4gICAgLy8gZFtpXSA9IDMqZFtpXTtcbiAgICB2YXIgcmdiID0gW2RbaV0sIGRbaSsxXSwgZFtpKzJdXTtcbiAgICB2YXIgaHNsID0gaHNsVG9vbC5yZ2JUb0hzbC5hcHBseShudWxsLCByZ2IpO1xuICAgIHZhciBsdW0gPSBoc2xbMl07IC8vTWF0aC5tYXgoaHNsWzJdLCAwLjA1KTtcbiAgICAvLyBsdW0gPSBNYXRoLm1pbihsdW0sIDAuNzApO1xuICAgIHZhciBuZXdIc2wgPSBbcmVkSHNsWzBdLCAocmVkSHNsWzFdICsgaHNsWzFdKS8yLCBsdW1dO1xuICAgIHZhciBuZXdSZ2IgPSBoc2xUb29sLmhzbFRvUmdiLmFwcGx5KG51bGwsIG5ld0hzbCk7XG4gICAgZFtpXSA9IG5ld1JnYlswXTtcbiAgICBkW2krMV0gPSBuZXdSZ2JbMV07XG4gICAgZFtpKzJdID0gbmV3UmdiWzJdO1xuICB9XG4gIHJldHVybiBwaXhlbHM7XG59O1xuXG5mdW5jdGlvbiBicmlnaHRuZXNzKHBpeGVscywgYWRqdXN0bWVudCkge1xuICB2YXIgZCA9IHBpeGVscy5kYXRhO1xuICBmb3IgKHZhciBpPTA7IGk8ZC5sZW5ndGg7IGkrPTQpIHtcbiAgICB2YXIgcmdiID0gW2RbaV0sIGRbaSsxXSwgZFtpKzJdXTtcbiAgICB2YXIgaHNsID0gaHNsVG9vbC5yZ2JUb0hzdi5hcHBseShudWxsLCByZ2IpO1xuICAgIGhzbFsyXSArPSBhZGp1c3RtZW50O1xuICAgIHZhciBuZXdSZ2IgPSBoc2xUb29sLmhzdlRvUmdiLmFwcGx5KG51bGwsIGhzbCk7XG4gICAgZFtpXSA9IG5ld1JnYlswXTtcbiAgICBkW2krMV0gPSBuZXdSZ2JbMV07XG4gICAgZFtpKzJdID0gbmV3UmdiWzJdO1xuICB9XG4gIHJldHVybiBwaXhlbHM7XG59O1xuXG5mdW5jdGlvbiBmaWxsTG9nbyh3aWR0aCwgaGVpZ2h0KSB7XG4gIHZhciBwaXhlbFNpemUgPSBzZWxmaWVTaXplO1xuICBjb25zb2xlLmxvZyh3aWR0aCwgaGVpZ2h0LCBwaXhlbFNpemUpO1xuICB2YXIgcmFkaXVzID0gTWF0aC5taW4od2lkdGgsIGhlaWdodCkgLyAyO1xuICBmb3IgKHZhciB4ID0gMDsgeCA8IHdpZHRoOyB4Kz1waXhlbFNpemUpIHtcbiAgICBmb3IgKHZhciB5ID0gMDsgeSA8IGhlaWdodDsgeSs9cGl4ZWxTaXplKSB7XG4gICAgICB2YXIgZGVsYXkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoNDAwMDApKTtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKHgsIHkpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgZHJhd1NlbGZpZSh4LHksIHBpeGVsU2l6ZSk7XG4gICAgICAgIH1cbiAgICAgIH0oeCx5KSwgZGVsYXkpO1xuICAgIH1cbiAgfVxufVxuXG52YXIgc291cmNlQ2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NvdXJjZScpO1xudmFyIHNvdXJjZUNvbnRleHQgPSBzb3VyY2VDYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbnZhciB0YXJnZXRDYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFyZ2V0Jyk7XG52YXIgdGFyZ2V0Q29udGV4dCA9IHRhcmdldENhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xudmFyIHdpZHRoID0gMTgwMDtcblxudmFyIHNvdXJjZSA9IG5ldyBJbWFnZSgpO1xuc291cmNlLnNyYyA9ICcvYXNzZXRzL3JlZGhhdC5zdmcnO1xuLy8gc291cmNlLndpZHRoPTYwMDsgc291cmNlLmhlaWdodD02MDA7XG4vLyBSZW5kZXIgb3VyIFNWRyBpbWFnZSB0byB0aGUgY2FudmFzIG9uY2UgaXQgbG9hZHMuXG5zb3VyY2Uub25sb2FkID0gZnVuY3Rpb24oKXtcbiAgdmFyIGhlaWdodCA9IHdpZHRoICogc291cmNlLmhlaWdodCAvIHNvdXJjZS53aWR0aDtcbiAgc291cmNlQ2FudmFzLndpZHRoPXdpZHRoOyBzb3VyY2VDYW52YXMuaGVpZ2h0PWhlaWdodDtcbiAgdGFyZ2V0Q2FudmFzLndpZHRoPXdpZHRoOyB0YXJnZXRDYW52YXMuaGVpZ2h0PWhlaWdodDtcbiAgc291cmNlQ29udGV4dC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcbiAgdGFyZ2V0Q29udGV4dC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcbiAgc291cmNlQ29udGV4dC5kcmF3SW1hZ2Uoc291cmNlLDAsMCwgd2lkdGgsIGhlaWdodCk7XG4gIGZpbGxMb2dvKHdpZHRoLCBoZWlnaHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxufVxuIl19
