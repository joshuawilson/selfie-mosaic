"use strict";

(function() {
  var selfies = [
    '/selfies/andres.jpg',
    '/selfies/jadlimcaco.jpg',
    '/selfies/sauro.jpg',
    '/selfies/ritu.jpg',
    '/selfies/zack415.jpg'
  ]

  var selfieImage = (function() {
    var html = '<div class="picture"><div class="picture-mask"><img></div></div>';
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
    var img = div.childNodes[0].childNodes[0];
    img.src=selfies[Math.floor(Math.random() * (selfies.length))];
    div.style.left=(x-pixelSize)+'px';
    div.style.top=(y-pixelSize)+'px';
    if (pixelData[3] < 1) {
      div.classList.add('white');
    } else if (lightness < 15) {
      div.classList.add('black');
    } else if (lightness > (255 * 3) - 15) {
      div.classList.add('white');
    } else {
      div.classList.add('red');
    }
    img.onload = function(){
      imageMap.appendChild(div);
    }
  }

  function fillLogo(width, height) {
    var pixelSize = 15;
    console.log(width, height, pixelSize);
    var radius = Math.min(width, height) / 2;
    for (var x = 0; x < width; x+=pixelSize) {
      for (var y = 0; y < height; y+=pixelSize) {
        if (Math.pow((x-width/2), 2) + Math.pow((y-height/2), 2) <= Math.pow(radius, 2)) {
          var delay = Math.floor(Math.random() * (1000));
          setTimeout(function (x, y) {
            return function() {
              drawSelfie(x,y, pixelSize);
            }
          }(x,y), delay);
        };
      }
    }
  }

  var canvas = document.getElementsByTagName('canvas')[0];
  var context = canvas.getContext('2d');
  var width = 2500;

  var source = new Image();
  source.src = '/redhat.svg';
  // source.width=600; source.height=600;
  // Render our SVG image to the canvas once it loads.
  source.onload = function(){
    var height = width * source.height / source.width;
    canvas.width=width; canvas.height=height;
    context.imageSmoothingEnabled = false;
    context.drawImage(source,0,0, width, height);
    fillLogo(height, height);
  }
})()
