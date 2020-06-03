
/* This script and many more are available free online at
The JavaScript Source :: http://javascript.internet.com
Created by: Steve DeGroof :: http://degroof.blogspot.com */

// a slider control class
// Limitation: slider controls must be positioned at absolute coordinates within the document.

// document-scope mouse button indicator
var SliderControlIsMouseDown = false;

// notifies slider object that mouse button has been pressed
function SliderControlMouseDown(e) {
  // stupid kludge because "this" is overwritten on events
  this.parent.isMouseDown=true;
  SliderControlIsMouseDown=true;
  // set the thumb to the current position
  this.parent.setThumb();
}

// notifies slider object that mouse button has been released
function SliderControlMouseUp(e) {
  // stupid kludge because "this" is overwritten on events
  this.parent.isMouseDown=false;
  SliderControlIsMouseDown=false;
}

// notifies slider object that mouse moved
function SliderControlMouseMove(e) {
  // stupid kludge because "this" is overwritten on events
  var parent = this.parent;
  var tempX = 0;
  var tempY = 0;
  if(navigator.appName == "Netscape"){
    tempX = e.pageX
    tempY = e.pageY
  } else {
    tempX = window.event.clientX + window.document.body.scrollLeft
    tempY = window.event.clientY + window.document.body.scrollTop
  }
  parent.mouseX=tempX-parent.x;
  parent.mouseY=tempY-parent.y;
  parent.setThumb();
}

// check mouse button and position, then update as needed
function SliderControlSetThumb() {
  if (  // if the mouse is outside the extents of the control or the mouse button is up...
    this.mouseX>this.width  ||
    this.mouseX<0  ||
    this.mouseY>this.height  ||
    this.mouseY<0 ||
    SliderControlIsMouseDown==false) {
      this.isMouseDown=false;
  }
  if (this.isMouseDown) {
    this.UpdateThumbPosition(true);
  }
}

// notifies control that mouse button was released anywhere on the document
function SliderControlDocMouseUp(e) {
  SliderControlIsMouseDown = false;
}

// resize the control
function SliderControlSetSize(w,h) {
  this.width=w;
  this.height=h;
  this.slider.style.width=this.width;
  this.slider.style.height=this.height;
  this.UpdateThumbPosition(true);
}

// set control position
function SliderControlSetPosition(x,y) {
  this.x=x;
  this.y=y;
  this.slider.style.left=this.x;
  this.slider.style.top=this.y;
  this.UpdateThumbPosition(true);
}

// set tracking
// true, false = horizontal slider
// false, true = vertical slider
// true, true  = x/y control
function SliderControlSetTracking(x,y) {
  this.trackX=x;
  this.trackY=y;
  this.UpdateThumbPosition(true);
}

// callback on value change
function SliderControlNotify(x,y) {
  // dummy callback, do nothing
}

// update the slider control position and optionally notify a listener
function SliderControlUpdateThumbPosition(notify) {
  // check horizontal vs vertical vs xy
  if (this.trackX) {
    this.thumbWidth=this.thumbSize;
  } else {
    this.thumbWidth=this.width;
  }
  if (this.trackY) {
    this.thumbHeight=this.thumbSize;
  } else {
    this.thumbHeight=this.height;
  }
  this.thumb.style.width=this.thumbWidth;
  this.thumb.style.height=this.thumbHeight;

  // limit thumb movement
  if (this.mouseX>this.width-this.thumbWidth/2) {
    this.mouseX=this.width-this.thumbWidth/2;
  }
  if (this.mouseY>this.height-this.thumbHeight/2) {
    this.mouseY=this.height-this.thumbHeight/2;
  }
  if (this.mouseX<this.thumbWidth/2) {
    this.mouseX=this.thumbWidth/2;
  }
  if (this.mouseY<this.thumbHeight/2) {
    this.mouseY=this.thumbHeight/2;
  }
  if (!this.trackX) {
    this.mouseX=this.width/2;
  }
  if (!this.trackY) {
    this.mouseY=this.height/2;
  }

  // update x and y values (0..1)
  if (this.trackX) {
    this.xValue=(this.mouseX-this.thumbWidth/2)/(this.width-this.thumbWidth);
  } else {
    this.xValue=0;
  }
  if (this.trackY) {
    this.yValue=(this.mouseY-this.thumbHeight/2)/(this.height-this.thumbHeight);
  } else {
    this.yValue=0;
  }
  this.thumb.style.left=this.x+this.mouseX-this.thumbWidth/2;
  this.thumb.style.top=this.y+this.mouseY-this.thumbHeight/2;

  // notify listener
  if (notify) {
    if (this.trackY && this.trackX) {
      this.notify(this.xValue,this.yValue);
    }
    if (this.trackY && !this.trackX) {
      this.notify(this.yValue,this.yValue);
    }
    if (!this.trackY && this.trackX) {
      this.notify(this.xValue,this.xValue);
    }
  }
}

// set slider colors
function SliderControlSetColors(color,thumbColor) {
  this.color=color;
  this.thumbColor=thumbColor;
  this.slider.style.backgroundColor=this.color;
  this.thumb.style.backgroundColor=this.thumbColor;
}

// set x and y values and optionally notify listener
function SliderControlSetValue(x,y,notify) {
  this.xValue=x;
  this.yValue=y;
  if(x == undefined || isNaN(x)) {
    x=0.5;
  }
  if (x>1) {
    x=1;
  }
  if (x<0) {
    x=0;
  }
  if(y == undefined || isNaN(y)) {
    y=x;
  }
  if (this.trackX) {
    this.xValue=x;
    this.mouseX=(this.xValue*(this.width-this.thumbWidth))+this.thumbWidth/2;
  }
  if (this.trackY) {
    this.yValue=y;
    this.mouseY=(this.yValue*(this.height-this.thumbHeight))+this.thumbHeight/2;
  }
  if(notify == undefined) {
    notify = true;
  }
  this.UpdateThumbPosition(notify);
}

// set callback function
// function should have 2 parameters
// e.g. sliderMoved(x,y)
function SliderControlSetNotifier(func) {
  if(typeof func == 'function') {
    this.notify=func;
  } else {
    alert('Notifier must be a function with 2 parameters');
  }
}

// set the thumb size
function SliderControlSetThumbSize(sz) {
  this.thumbSize=sz;
  this.UpdateThumbPosition(true);
}

// constructor
function SliderControl() {
  // set a bunch of default values
  this.thumbWidth=3;
  this.thumbHeight=3;
  this.thumbSize=3;
  this.xValue=0;
  this.yValue=0;
  this.x=0;
  this.y=0;
  this.mouseX=0;
  this.mouseY=0;
  this.width=10;
  this.height=10;
  this.color='#FFFFFF';
  this.thumbColor='#000000';
  this.trackX=true;
  this.trackY=true;
  this.isMouseDown=false;
  // set up main slider body
  this.slider = document.createElement('div');
  this.slider.style.zIndex=5;
  this.slider.style.width=this.width;
  this.slider.style.height=this.height;
  this.slider.style.left=this.x;
  this.slider.style.top=this.y;
  this.slider.style.backgroundColor=this.color;
  this.slider.style.visibility='visible';
  this.slider.style.position='absolute';
  this.slider.style.fontSize='0';
  this.slider.parent=this;
  document.body.appendChild(this.slider);
  // set up methods
  this.mouseDown=SliderControlMouseDown;
  this.setValue=SliderControlSetValue;
  this.setThumb=SliderControlSetThumb;
  this.setThumbSize=SliderControlSetThumbSize;
  this.setSize=SliderControlSetSize;
  this.setPosition=SliderControlSetPosition;
  this.setTracking=SliderControlSetTracking;
  this.setColors=SliderControlSetColors;
  this.setNotifier=SliderControlSetNotifier;
  this.UpdateThumbPosition=SliderControlUpdateThumbPosition;
  this.mouseUp=SliderControlMouseUp;
  this.mouseMove=SliderControlMouseMove;
  this.notify=SliderControlNotify;
  this.slider.onmousedown=this.mouseDown;
  this.slider.onmouseup=this.mouseUp;
  this.slider.onmousemove=this.mouseMove;
  // set up 'thumb' element
  this.thumb = document.createElement('div');
  this.thumb.style.zIndex=6;
  this.thumb.style.width=this.thumbWidth;
  this.thumb.style.height=this.thumbHeight;
  this.thumb.style.left=this.x+this.mouseX;
  this.thumb.style.top=this.y+this.mouseY;
  this.thumb.style.backgroundColor=this.thumbColor;
  this.thumb.style.visibility='visible';
  this.thumb.style.position='absolute';
  this.thumb.style.fontSize='0';
  document.body.appendChild(this.thumb);
  this.thumb.onmousedown=this.mouseDown;
  this.thumb.onmouseup=this.mouseUp;
  this.thumb.onmousemove=this.mouseMove;
  this.thumb.parent=this;
  document.onmouseup=SliderControlDocMouseUp;
}

// end of SliderControl class




<!-- Paste this code into the HEAD section of your HTML document.
     You may need to change the path of the file.  -->

<script type="text/javascript" src="slider.min.js"></script>



<!-- Paste this code into an external JavaScript file  -->

/* This script and many more are available free online at
The JavaScript Source :: http://javascript.internet.com
Created by: Steve DeGroof :: http://degroof.blogspot.com */

//color controls
var colorSquare;
var slRed;
var slGreen;
var slBlue;
var slHue;
var slSaturation;
var slLightness;
var slHueSat;

function init() {
  colorSquare=document.createElement('div');
  slRed=new SliderControl();
  slGreen=new SliderControl();
  slBlue=new SliderControl();
  slHue=new SliderControl();
  slSaturation=new SliderControl();
  slLightness=new SliderControl();
  slHueSat=new SliderControl();

  slRed.setNotifier(calculateRgb);
  slRed.setSize(270,15);
  slRed.setPosition(400,120);
  slRed.setTracking(true, false);
  slRed.setValue(0);
  slRed.setColors('red','gray');

  slGreen.setNotifier(calculateRgb);
  slGreen.setSize(270,15);
  slGreen.setPosition(400,140);
  slGreen.setTracking(true, false);
  slGreen.setValue(0);
  slGreen.setColors('green','gray');

  slBlue.setNotifier(calculateRgb);
  slBlue.setSize(270,15);
  slBlue.setPosition(400,160);
  slBlue.setTracking(true, false);
  slBlue.setValue(0);
  slBlue.setColors('blue','gray');

  slHue.setNotifier(calculateHsl);
  slHue.setSize(270,15);
  slHue.setPosition(400,200);
  slHue.setTracking(true, false);
  slHue.setValue(0);
  slHue.setColors('red','black');

  slSaturation.setNotifier(calculateHsl);
  slSaturation.setSize(270,15);
  slSaturation.setPosition(400,220);
  slSaturation.setTracking(true, false);
  slSaturation.setValue(0);
  slSaturation.setColors('gray','black');

  slLightness.setNotifier(calculateHsl);
  slLightness.setSize(270,15);
  slLightness.setPosition(400,240);
  slLightness.setTracking(true, false);
  slLightness.setValue(0);
  slLightness.setColors('black','red');

  slHueSat.setNotifier(calculateHs);
  slHueSat.setSize(267,267);
  slHueSat.setPosition(400,260);
  slHueSat.setTracking(true, true);
  slHueSat.setValue(0);
  slHueSat.setColors('white','black');
  slHueSat.slider.style.backgroundImage='url(hs.jpg)';

  document.body.appendChild(colorSquare);
  colorSquare.style.zIndex=3;
  colorSquare.style.width=100;
  colorSquare.style.height=140;
  colorSquare.style.left=215;
  colorSquare.style.top=120;
  colorSquare.style.backgroundColor='black';
  colorSquare.style.visibility='visible';
  colorSquare.style.position='absolute';
  colorSquare.style.fontSize='0';

  //preset html color value
  document.data.htmlValue.value='#A29737';
  enterHtmlColor();
}

//use entered text to update the color controls
function enterHtmlColor() {
  var rgb=parseInt(document.data.htmlValue.value.substr(1),16);
  var r=Math.floor((rgb & 0xff0000) / 0x10000)/255;
  var g=Math.floor((rgb & 0x00ff00) / 0x100)/255;
  var b=Math.floor(rgb & 0xff)/255;
  slRed.setValue(r,r);
  slGreen.setValue(g,g);
  slBlue.setValue(b,b);
}

//convert rgb to hsl (all values 0..1)
function rgbToHsl(r, g, b) {
  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var l = (max + min) / 2;
  var h = 0;
  var s = 0;
  if(max != min)
  {
    if (l<.5) {
      s= (max - min) / (max + min);
    } else {
      s=(max - min) / (2 - max - min);
    }
    if (r==max) {
      h = (g-b)/(max-min)/6;
    }
    if (g==max) {
      h = (2.0 + (b-r)/(max-min))/6;
    }
    if (b==max) {
      h = (4.0 + (r-g)/(max-min))/6;
    }
  }
  if(h < 0) {
    h += 1;
  }
  return [h, s, l];
}

//calculate rgb component
function hToC(x, y, h) {
  var c;
  if(h < 0) {
    h += 1;
  }
  if(h > 1) {
    h -= 1;
  }
  if (h<1/6) {
    c=x +(y - x) * h * 6;
  } else {
    if(h < 1/2) {
      c=y;
    } else {
      if(h < 2/3) {
        c=x + (y - x) * (2 / 3 - h) * 6;
      } else {
        c=x;
      }
    }
  }
  return c;
}

//convert hsl to rgb (all values 0..1)
function hslToRgb(h, s, l){
  var
    y = (l > .5)?
      l + s - l * s:
      l * (s + 1),
    x = l * 2 - y,
    r = hToC(x, y, h + 1 / 3),
    g = hToC(x, y, h),
    b = hToC(x, y, h - 1 / 3);
  return [r, g, b];
}

//convert hsl to an html color string
function hslToHtmlColor(h,s,l) {
  var rgb=hslToRgb(h,s,l);
  return "#"+toHex(rgb[0]*255)+toHex(rgb[1]*255)+toHex(rgb[2]*255);
}

//convert decimal to hex
function toHex(decimal,places) {
  if(places == undefined || isNaN(places))  places = 2;
  var hex = new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F");
  var next = 0;
  var hexidecimal = "";
  decimal=Math.floor(decimal);
  while(decimal > 0) {
    next = decimal % 16;
    decimal = Math.floor((decimal - next)/16);
    hexidecimal = hex[next] + hexidecimal;
  }
  while (hexidecimal.length<places) {
    hexidecimal = "0"+hexidecimal;
  }
  return hexidecimal;
}

//listens for any rgb slider change
//calculates html color and hsl slider values
function calculateRgb(x,y) {
  document.data.htmlValue.value="#"+toHex(slRed.xValue*255)+toHex(slGreen.xValue*255)+toHex(slBlue.xValue*255);
  colorSquare.style.backgroundColor="#"+toHex(slRed.xValue*255)+toHex(slGreen.xValue*255)+toHex(slBlue.xValue*255);
  var hsl=rgbToHsl(slRed.xValue,slGreen.xValue,slBlue.xValue);
  slHue.setValue(hsl[0],hsl[0],false);
  slSaturation.setValue(hsl[1],hsl[1],false);
  slLightness.setValue(hsl[2],hsl[2],false);
  slHueSat.setValue(hsl[0],1-hsl[1],false);
  slHue.setColors(hslToHtmlColor(slHue.xValue,1,.5),'black');
  slSaturation.setColors(hslToHtmlColor(slHue.xValue,slSaturation.xValue,.5),'black');
  slLightness.setColors(hslToHtmlColor(.5,0,slLightness.xValue),'red');
}

//listens for any hsl slider change
//calculates html color and rgb slider values
function calculateHsl(x,y) {
  var rgb=hslToRgb(slHue.xValue,slSaturation.xValue,slLightness.xValue);
  slRed.setValue(rgb[0],rgb[0],false);
  slGreen.setValue(rgb[1],rgb[1],false);
  slBlue.setValue(rgb[2],rgb[2],false);
  document.data.htmlValue.value="#"+toHex(slRed.xValue*255)+toHex(slGreen.xValue*255)+toHex(slBlue.xValue*255);
  colorSquare.style.backgroundColor="#"+toHex(slRed.xValue*255)+toHex(slGreen.xValue*255)+toHex(slBlue.xValue*255);
  slHue.setColors(hslToHtmlColor(slHue.xValue,1,.5),'black');
  slSaturation.setColors(hslToHtmlColor(slHue.xValue,slSaturation.xValue,.5),'black');
  slLightness.setColors(hslToHtmlColor(.5,0,slLightness.xValue),'red');
  slHueSat.setValue(slHue.xValue,1-slSaturation.xValue,false);
}

//listens for the hs slider change
//calculates html color and rgb slider values
function calculateHs(x,y) {
  slHue.setValue(x,x,false);
  slSaturation.setValue(1-y,1-y,true);
}




<!-- Paste this code into the HEAD section of your HTML document.
     You may need to change the path of the file.  -->

<script type="text/javascript" src="color.min.js"></script>



<!-- Paste this code into the BODY tag -->

<body onload="init();">



<!-- Paste this code into the BODY section of your HTML document  -->

<table align="center" width="50%">
<tr><td>
<b>HTML Color Picker</b><br>
Either enter an HTML color value or move one of the sliders.
<form name=data>
HTML Color <input type=text name=htmlValue onKeyUp=enterHtmlColor();>
</form>
</td></tr>
</table>

<div style="position:absolute;top:120;left:300;width:95" align=right>Red</div>
<div style="position:absolute;top:140;left:300;width:95" align=right>Green</div>
<div style="position:absolute;top:160;left:300;width:95" align=right>Blue</div>
<div style="position:absolute;top:200;left:300;width:95" align=right>Hue</div>
<div style="position:absolute;top:220;left:300;width:95" align=right>Saturation</div>
<div style="position:absolute;top:240;left:300;width:95" align=right>Lightness</div>
<p><div align="center">
<font face="arial, helvetica" size"-2">Free JavaScripts provided<br>
by <a href="http://javascriptsource.com">The JavaScript Source</a></font>
</div><p>


