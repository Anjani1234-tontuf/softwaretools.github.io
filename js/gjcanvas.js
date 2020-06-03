/*
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Copyright © 2000-2012 by Gary Johnson

COPYRIGHT

The information contained on this site is protected by Canadian, United States of America and international copyright laws.

All website materials, including, without limitation, design, text, graphics, photos, files, the Fast Track! logo, and
the selection and arrangement thereof are © 2000-2009 Gary Johnson ALL RIGHTS RESERVED.

Permission is granted to electronically copy and print to hard copy portions of this website for the sole purpose of
using materials it contains for informational and non-commercial personal use only.

Any other use of materials in this website, including any commercial use, reproduction for purposes other than those noted above,
modification, distribution or republication, without the prior written consent of Gary Johnson is strictly prohibited.


The Full Copyright statement is

http://garyjohnsoninfo.info/XXSoftwareTools/Copyright.html

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
*/

/*
Changelog
*/

function tstHTML5Canvas()
{
  return !!document.createElement('canvas').getContext;
}

function showXY(theCTX, theX, theY)
{
  theCTX.beginPath();
  theCTX.lineWidth="1";

  theCTX.moveTo(theX-3,theY);
  theCTX.lineTo(theX+3,theY);
  theCTX.stroke();
  theCTX.moveTo(theX,theY-3);
  theCTX.lineTo(theX,theY+3);
  theCTX.closePath();
  theCTX.stroke();
}

function showBigXY(theCTX, theX, theY,theColor)
{
  theCTX.beginPath();
  theCTX.lineWidth="3";

  if(theColor)
  {
    theCTX.strokeStyle=theColor;
  }
  else
  {
    theCTX.strokeStyle="blue";
  }


  theCTX.moveTo(theX-6,theY);
  theCTX.lineTo(theX+6,theY);
  theCTX.stroke();
  theCTX.moveTo(theX,theY-6);
  theCTX.lineTo(theX,theY+6);
  theCTX.closePath();
  theCTX.stroke();
}


function frmtNumber(expression,NumDigitsAfterDecimal)
{
  try
  {
    var strNum = new String(expression);
    var re = ".";
    var intDec = strNum.indexOf(re);
    if(intDec > 0)
    {
      intDec = (parseInt(intDec)+(NumDigitsAfterDecimal+1));
      strNum = strNum.substr(0,intDec);
      return strNum - 0;
    }
    else
    {
      return strNum - 0;
    }
  }
  catch (error)
  {
    alert( error, " frmtNumber ");
  }
  return 0;
}

//    var ctx = mycanvas.getContext("2d");  ( mycanvas , ctx)
function drawGrid(theCanvas, theCTX)
{

//Let’s begin by drawing the off-white grid.

theCTX.strokeStyle = "#eee";
theCTX.stroke();
//for (var x = 0.5; x < 500; x += 10)
for (var x = 0.5; x < 400; x += 20)
{
  theCTX.moveTo(x, 0);
  theCTX.lineTo(x, theCanvas.height);
}

// Draw vertical lines

//for (var y = 0.5; y < 375; y += 10)
for (var y = 0.5; y < 200; y += 20)
{
  theCTX.moveTo(0, y);
  theCTX.lineTo(theCanvas.width, y);
}

theCTX.strokeStyle = "#000";
theCTX.stroke();
}


function TbezierCurveTo(theCTX, cp1x, cp1y, cp2x, cp2y, x, y,mtX,mtY,colorhex,gjlinewh)
{
   colorhex = typeof colorhex !== 'undefined' ? colorhex : '#FF7F50';  //coral
   gjlinewh = typeof gjlinewh !== 'undefined' ? gjlinewh : '1';  //coral

  theCTX.beginPath();
  theCTX.lineWidth=gjlinewh;
  theCTX.strokeStyle=colorhex;
  theCTX.moveTo(mtX,mtY);
  //points along the way
  theCTX.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
  theCTX.stroke();
  theCTX.closePath();

  theCTX.beginPath();
  theCTX.lineWidth="1";
  theCTX.strokeStyle="red";

  theCTX.moveTo(cp1x, cp1y);
  theCTX.lineTo(mtX,mtY);
  theCTX.stroke();

  theCTX.moveTo(cp2x, cp2y);
  theCTX.lineTo(x, y);
  theCTX.stroke();
  theCTX.closePath();
}

function showLine(thex1, they1, thex2,they2)
{

  ctx.beginPath();
  ctx.lineWidth="1";
  ctx.strokeStyle="black";
  ctx.fillStyle="white";
  ctx.moveTo(thex1,they1);
  ctx.lineTo(thex2,they2);
  ctx.closePath();
  ctx.stroke();
}


/*

http://processingjs.org/  processing.js
http://processing.org/learning/trig/

yui compressor

http://code.google.com/p/flot/  flot
http://www.artetics.com/Articles/using-various-javascript-libraries-to-create-pie-chart
http://bluff.jcoglan.com/  simple
http://www.liquidx.net/plotkit
http://www.omnipotent.net/jquery.sparkline/  yeah


http://glimr.rubyforge.org/cake/canvas.html#KeyboardTest  GOOD CONTROLS FOR GAME TYPE THINGS
http://tech.groups.yahoo.com/group/canvas-developers/links

Hi! This is the Google Group for the JavaScript InfoVis Toolkit: http://thejit.org/

stackoverflow

// preparation of canvas containing data of overlayImage
var OVERLAY_IMAGE_WIDTH = 320;
var OVERLAY_IMAGE_Height = 400;
var overlayImageCanvas = document.createElement('canvas');
overlayImageCanvas.width = OVERLAY_IMAGE_WIDTH;
overlayImageCanvas.height = OVERLAY_IMAGE_HEIGHT;
overlayImageCanvas.getContext('2d').putImageData(overlayImage, 0, 0);

*/



/*
My notes

change the cursor to be a crosshair, increase mouse precision, slow it down.
get a nice big mouse that fits comfortably in your hand

who does defining of ppi and differnent resolution etc affect canvas
76.6 pixels per inch

is this possible on a canvas style="overflow:auto;overflow-x:scroll;overflow-y:scroll;"

gradient.addColorStop("1.0","rgba(  0,   0,  0,  0");  is a bug in chrome, not in FF

This is the API
 void quadraticCurveTo(in float cpx, in float cpy, in float x, in float y);

This does not throw an error
  theCTX.quadraticCurveTo(265,160,289,301,156);

even in API, no argument checking, note when mixing 2D with 3D this could be ?
do not know how pointinpath should work

need better understanding of beginPath closePath

draw background layers first
with  theCTX.globalCompositeOperation = "source-over";
and transparency = 1
You can futz with this with
  if(theCTX.globalCompositeOperation == "source-over")
  {
    theCTX.globalCompositeOperation = "destination-over";
  }
...

  if(theCTX.globalCompositeOperation == "destination-over")
  {
    theCTX.globalCompositeOperation = "source-over";
  }


do I need to use web safe colors? are the 140 named web safe?


see gltich in KandinskyCanvas.html

Do not know WTF happening in CanvasTestCoordinateSys.html

Do not know how to clip - maybe it should be done off visible part of screen

It helps to visulaize the 2 control points for bezier and quadratic curves
TbezierCurveTo

I am still working on the upper left concentric circles in Kandinsky
see drawPollock type of thing

I think I can warp a radial gradient to get some of the shawdows on Circles
always check in Chrome and FF
KandinskyCanvas is not working in Safari


0 is east, Math.PI/2 is south, Math.PI is west, and Math.PI*3/2 is north.
If anticlockwise is 1 then the direction of the arc, along with the Angles for north and south, are reversed.


Math.PI = top half circle
Math.PI /2 = three quarters circle

this is a complete circle
  var startAngle     = 0;                 // The starting point on the circle.
  var endAngle       = Math.PI * 2;       // The end point on the circle.
  var anticlockwise  = true;


Suppose you want a gradient that shades from top to bottom.
 When you create the gradient object, keep the x values (1st and 3rd parameters) constant, and make the
y values (2nd and 4th parameters) range from 0 to the height of the canvas.


bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
TbezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y,mtX,mtY)

It would be nice to be able to assign an ID to a beginPath and then rotate that
beginPath  - can you nest ?, what are the rules if you do?

scripts moved to end solves problem of scripts loading before material, like defer

Chrome Ctrl+F5 or Shift+F5	 Reloads your current page, ignoring cached content.


images/Kandinsky.jpg
http://www.glyphs.com/art/kandinsky/comp8640.jpg
http://en.wikipedia.org/wiki/Wassily_Kandinsky

big pics
http://www.ibiblio.org/wm/paint/auth/kandinsky/
Composition VIII
1923 (140 Kb); Oil on canvas, 140 x 201 cm (55 1/8 x 79 1/8 in); Solomon R. Guggenheim Museum, New York

this href in linux brings up something else
http://www.glyphs.com/art/kandinsky/comp8640.jpg
https://www.digimarc.com/
ue script findrangeofnumbers
Here is the commented script according to your requirements. It lists all found values in the output window with full name of active file and line number. So you can double click on such a line to position the cursor to that line or use the keys CTRL+SHIFT+DOWN ARROW and CTRL+SHIFT+UP ARROW to navigate through the lines with a found value without leaving the edit area of the file.

*/


/*
void strokeRect(in float x, in float y, in float w, in float h);

attribute DOMString lineCap; // "butt", "round", "square" (default "butt")
  attribute DOMString lineJoin; // "miter", "round", "bevel"  (default "miter")
  attribute float lineWidth; // (default 1)
  attribute float miterLimit; // (default 10)

  CanvasPattern createPattern(in HTMLCanvasElement image, in DOMString repetition);
  interface CanvasPattern {   opaque object

  transformations (default transform is the identity matrix)
  void rotate(in float angle);
  --void scale(in float x, in float y);
  void setTransform(in float m11, in float m12, in float m21, in float m22, in float dx, in float dy);
  void transform(in float m11, in float m12, in float m21, in float m22, in float dx, in float dy);

  void drawImage(in HTMLImageElement image, in float dx, in float dy, optional in float dw, in float dh);

*/

/*
var spRL  = "519,173,487,187, 503,156,482,178, 499,148,476,170, 495,148,471,161, 492,138,466,153"; //string
//                                                           -------
//r spBT  = "511,172,492,138, 503,176,483,144, 496,181,476,148, 487,186,466,151";
var spBT  = "510,173,492,138, 503,176,483,144, 496,181,476,148, 487,187,466,151";
// arrayName.split takes the above string and converts it into and array
var pRL   = spRL.split(','); // point RL
var pBT   = spBT.split(',');
var slRL  = new Array(pRL.length / 4);
var slBT  = new Array(pBT.length / 4);
var pXY   = new Array(slRL.length * slRL.length * 2);


  //compute slope and a few other calcs for the lines running right to left
  var j;
  for (var i = 0; i < pRL.length; i++)
  {
    j = i;
    //myDump( i + ": " +  pRL[i] + " , " + pRL[++i] );
    computesl1(pRL[i],pRL[++i], pRL[++i], pRL[++i], slRL, j);
  }

  // lines running bottom to top

  var l;
  for (var k = 0; k < pRL.length; k++)
  {
    l = k;
    //myDump( i + ": " +  pRL[i] + " , " + pRL[++i] );
    computesl1(pBT[k],pBT[++k], pBT[++k], pBT[++k], slBT, k);
  }

}

//slope
function computesl1(X1,Y1,X2,Y2,slRL, counter)
{

  showLine(X1,Y1,X2,Y2);

  var deltaX = X1 - X2;
  var deltaY = Y1 - Y2;

// m is slope m = (y2 – y1) / (x2 – x1)
  var m = frmtNumber(deltaY/deltaX,2);

//y= m*x+b     Solve for a y
//m= (y-b)/x   Solve for slope (m)
//x= (y-b)/m   Solve for an x
//b= y – m*x   Solve for y intercept (b)


  var b= Y1 - (X1 * m);
  slRL[counter] = frmtNumber((Y1 - (X1 * m)), 2);

  var distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);


//x1 = Math.sqrt(distance -(deltaY * deltaY)) + X2
//x2 = x1 - Math.sqrt(distance -(deltaY * deltaY))
//y1 = Math.sqrt(distance -(deltaX * deltaX)) + Y2
//y2 = Y1 - Math.sqrt(distance -(deltaX * deltaX))


  myDump(X1+","+Y1+" - "+X2+","+Y2+" -> "+ slRL[counter]);

}
function doPlot(X1,Y1,X2,Y2,m, b)
{
  X1 = X1 -0;
  Y1 = Y1 -0;
  X2 = X2 -0;
  Y2 = Y2 -0;
  m = m -0;
  b = b -0;

    myDump("Plot starting at "+ X1+","+Y1);


}
*/
