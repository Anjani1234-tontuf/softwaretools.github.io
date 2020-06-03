/*
Content Notes

Technical Notes

need rewrite of this remove isgecko isie and replace with tests.

mygettop
    mtop = getTop(idin);
    if((!mtop) || (mtop == -1))
to
    if(mtop == -1)

Dec 2012 changed clip
clip format is 2px, 2pc, 2px 2px,
Old format was IE 7 or less ex. from 2 2 2 2

*/
//  Globals
var toggleId;
var px  = 'px';
//  var EOL = "\n";
var EOL = '<br>';
var debugOnce=false;
var vtoggleTop=200;

function gjonerror(ex, msg)
{
  try
  {
    if(isGecko())
    {
      //println("gjonerror " + msg + " " + ex.name + " " + ex.message + "\n");
      var wintxt = "\n" + " -- - " +  "\n" + "\n" + " " + " - - -  "  + msg + " - - -  " + "\n" + " " + " - - -  "  + ex.name + " - - -  " + " " +  ex.message + " - - - " + "\n" + "\n" + " - - -  " + ex.fileName  + " - - -  " + " line: " + ex.lineNumber + " - - -  " + "\n" + "\n" + " - - -   " + " UA " + navigator.userAgent + " - - -  " + "\n" + "\n" + "\n" + " - - -  ";
      alert(wintxt);
    }
    else
    {
      var wintxt = "\n" + " - - -  " +  "\n" + "\n" + " " + " - - -  "  + msg + " - - -  " + "\n" + " " + " - - -  "  + ex.name + " - - -  " + " " +  ex.message + " - - -  " + "\n" + "\n" + " - - -  " + " UA " + navigator.userAgent + " - - -  " + "\n" + "\n" + " - - -  ";
      alert(wintxt);
    }
  }
  catch(error)
  {
    alert("Error in Error" + msg + "1: " + ex.name + "1: " + ex.message  + "2: " + error.name +  "2: " + error.name);
  }

  return false;
}

function mkunique()
{
  return (new Date()).getTime();
}

function noOP()
{
  return;
}


function setToggleTop(eventin)
{
  if(isGecko())
  {
    vtoggleTop = getEventY(eventin) + 10;
  }
  else
  {
    //cannot get zindex to go in front of java object
    vtoggleTop = getEventY(eventin) +30;
  }
}

function getToggleBottom()
{
  return 1;
}

function getElement(idin)
{
  // SEP 2006, removed try catch because of Timer.html and FF throwing error
  if(document.all)
  {
    return document.all[idin];
  }
  else
  {
    return document.getElementById(idin);
  }
}

function setVisible(idin)
{
  try
  {
    document.getElementById(idin).style.visibility = 'visible';
  }
  catch (error)
  {
    gjonerror( error, " setVisible ");
  }
}

function setHidden(idin)
{
  try
  {
    document.getElementById(idin).style.visibility = 'hidden';
  }
  catch (error)
  {
    gjonerror( error, " setHidden ");
  }
}

function setGone(idin)
{
  try
  {
    document.getElementById(idin).style.visibility = 'hidden';
  }
  catch (error)
  {
    gjonerror( error, " setGone ");
  }
}

/* diplay none is better */
function isVisible(idin)
{
  var myE= document.getElementById(idin);
  if(myE.style.visibility=='hidden')
  {
    return false;
  }
  else
  {
    return true;
  }
}

function toggleVisibility(idin)
{
  try
  {
    if(isVisible(idin))
    {
      setHidden(idin);
    }
    else
    {
      setVisible(idin);
    }
  }
  catch (error)
  {
    gjonerror( error, " toggleVisibility ");
  }
}

function toggleDivVisibility(idin, width, height)
{
  try
  {
    if(isVisible(idin))
    {
      setHeight(idin,10);
      setWidth(idin,10);
      setHidden(idin);
    }
    else
    {
      if(width)
      {
        setWidth(idin,width);
        //should throw error here if width is bad
      }
      if(height)
      {
        setHeight(idin,height);
      }
      setVisible(idin);
    }
  }
  catch (error)
  {
    gjonerror( error, " toggleDivVisibility ");
  }
}

function toggleDivVisibilityZ(idin, width, height, myZ)
{
  try
  {
    if(isVisible(idin))
    {
      setHeight(idin,10);
      setWidth(idin,10);
      setZ(idin, --myZ);
      setHidden(idin);
    }
    else
    {
      if(width)
      {
        setWidth(idin,width);
        //should throw error here if width is bad
      }
      if(height)
      {
        setHeight(idin,height);
      }
      setZ(idin,++myZ);
      setVisible(idin);
    }
  }
  catch (error)
  {
    gjonerror( error, " toggleDivVisibility ");
  }
  return myZ;
}

// <input class="closeit" type="button" id="sSSssazy" value="-" onClick="toggleDisplayButton('CMEB1','sSSssazy' );">
// <p id ="CMEB1" class="note">

function toggleDisplayButton(idin,buttonid)
{
  try
  {
    var aDiv = document.getElementById(idin);

    if(aDiv.style.display == 'none')
    {
      aDiv.style.display = 'block';
      document.getElementById(buttonid).value="-";
    }
    else
    {
      aDiv.style.display = 'none';
      document.getElementById(buttonid).value="+";
    }
  }
  catch (error)
  {
    gjonerror( error, "toggleDisplayButton");
  }
}


//get the integer of the top
function getTop(idin)
{
  var top=-1;
  var myE= document.getElementById(idin);

  try
  {
    if(myE.style.posTop)
      top = myE.style.posTop;
    else if(myE.style.top)
      top = parseInt(myE.style.top);
    if(isNaN(top)) top=-1;
  }
  catch (error)
  {
    gjonerror( error, "getTop ");
  }
  return top;
}

function mygetTop(idin)
{
  var mtop;

  try
  {
    mtop = getTop(idin);
    if(mtop == -1)
    {
      mtop = parseInt(getCompStyle(idin, 'top'));
      if(isNaN(mtop))
      {
        mtop = -1;
      }
    }
  }
  catch (error)
  {
    gjonerror( error, "mygetTop ");
  }
  return mtop;
}


function getLeft(idin)
{
  var left=-1;

  var myE= document.getElementById(idin);

  try
  {
   if(myE.style.pixelLeft)
        left = myE.style.pixelLeft;
   else if(myE.style.left)
        left = parseInt(myE.style.left);
      if(isNaN(left)) left=-1;
  }
  catch (error)
  {
    gjonerror( error, "getLeft");
  }
  return left;
}

function mygetLeft(idin)
{
  var mleft;

  try
  {
    mleft = getLeft(idin);
    if(mleft == -1)
    {
      mleft = parseInt(getCompStyle(idin, 'left'));
      if(isNaN(mleft))
      {
        mleft = -1;
      }
    }
  }
  catch (error)
  {
    gjonerror( error, "mygetLeft");
  }
  return mleft;
}

function getWidth(idin)
{
  var myE= document.getElementById(idin);

  var width =-1;
  try
  {

  if(myE.style.pixelWidth)
        width = myE.style.pixelWidth;
  else if(myE.style.width)
       width = parseInt(myE.style.width);
     if(isNaN(width)) width=-1;
  }
  catch (error)
  {
    gjonerror( error, "getWidth ");
  }
  return width;
}

function mygetWidth(idin)
{
  var mwidth;

  try
  {
    mwidth = getWidth(idin);
    if(mwidth == -1)
    {
      mwidth = parseInt(getCompStyle(idin, 'width'));
      if(isNaN(mwidth))
      {
        mwidth = -1;
      }
    }
  }
  catch (error)
  {
    gjonerror( error, "mygetWidth ");
  }
  return mwidth;
}

function getHeight(idin)
{
  var myE= document.getElementById(idin);
  var height=-1;

  try
  {
    if(myE.style.posHeight)
        height = myE.style.posHeight;
    else if(myE.style.height)
      height = parseInt(myE.style.height);
    if(isNaN(height)) height=-1;
  }
  catch (error)
  {
    gjonerror( error, "getHeight ");
  }
  return height;
}

function mygetHeight(idin)
{
  var mheight;

  try
  {
    mheight = getHeight(idin);
    if(mheight == -1)
    {
      mheight = parseInt(getCompStyle(idin, 'height'));
      if(isNaN(mheight))
      {
        mheight = -1;
      }
    }
  }
  catch (error)
  {
    gjonerror( error, "mygetHeight");
  }
  return mheight;
}

function setWidth(idin, newWidth)
{
  var myE= document.getElementById(idin);

  try
  {
    (myE.style.width) ? (myE.style.width = newWidth + px) : ( myE.style.pixelWidth = newWidth);
  }
  catch (error)
  {
    gjonerror( error, "setWidth ");
  }
}

function setHeight(idin, newHeight)
{
  var myE= document.getElementById(idin);
  var ret = -1;
  try
  {
     (myE.style.height) ? (myE.style.height = newHeight + px) : ( myE.style.pixelWidth = newHeight);
  }
  catch (error)
  {
    gjonerror( error, "setHeight "  + idin);
  }
  return ret;
}

// x oordinates CSS style is always T R B L - need to have T and L to set Postion
// Mickey has left as read only

function setTop(idin,y)
{
  var myE= document.getElementById(idin);

  try
  {
    (myE.style.top) ? myE.style.top = y + px : myE.style.pixelTop = y;
  }
  catch (error)
  {
    gjonerror( error, "setTop for " + idin);
  }
}


function setLeft(idin, x)
{
  var myE= document.getElementById(idin);
  try
  {
    (myE.style.left) ? myE.style.left = x + px : myE.style.pixelLeft = x;
  }
  catch (error)
  {
    gjonerror( error, " setLeft for " + idin );
  }
}

function setClip(idin, t,r,b,l)
{

  if(checkDebug())
  {
    var myE= document.getElementById(idin);
    if(myE.style.clip === undefined  || myE.style.clip === "" || myE.style.clip == "0")
    {
      alert('setClip clip not set in css');
      return;
    }
    if(myE.style.position != 'absolute')
    {
      alert('setClip position not absolute');
      return;
    }
  }
  else
  {
    var myE= document.getElementById(idin);
  }

  try
  {
//IE 7 and before did not have , or I think px

    //    var myRect = 'rect(' + t + px + ' ' + r + px + ' ' + b + px + ' ' + l + px + ')';
    //    myE.style.clip = 'rect(' + t + px + ',' + r + px + ',' + b + px + ',' + l + px + ')';
    var myclip = 'rect(' + t + px + ',' + r + px + ',' + b + px + ',' + l + px + ')';
    // dec 2012 bag this for above var myclip = 'rect(' + t + ',' + r + ',' + b + ',' + l + ')';
    //    alert(" " + myclip);
    myE.style.clip = myclip;
    //    alert("clip is : " + myE.style.clip);
  }
  catch (error)
  {
    gjonerror( error, "setClip");
  }
}

function setClass(idin, cname)
{
  var myE= document.getElementById(idin);
  myE.className=cname;
}

function setZ(idin,z)
{
  var myE= document.getElementById(idin);

  try
  {
    myE.style.zIndex = z;
  }
  catch (error)
  {
    gjonerror( error, "setZ ");
  }
}
/* duh maybe a better name would be setLeftTop becasue thats the real order of the args */
function setTopLeft(idin, x, y)
{
  setTop(idin,y);
  setLeft(idin,x);
}


function setBackGroundColor(idin, mycolor)
{
  var myE= document.getElementById(idin);

  try
  {
    myE.style.backgroundColor = mycolor;
  }
  catch (error)
  {
    gjonerror( error, "setBackGroundColor ");
  }
}

function getInterCap(cstyle)
{
  //  margin-left to MarginLeft
   //    this does NOT fix : top or  posTop
  //  :left or  pixelLeft
  //  :width or  pixelWidth
  //  :height or posHeight

  try
  {
    var converted = new String(cstyle);
    var re = "-";
    var where = converted.indexOf(re);

    if(where > 0)
    {
      var part1 = converted.substr(0, where);
      var capit = converted.substr(where + 1, 1);
      capit = capit.toUpperCase();
      var part2 = converted.substr(where +2, converted.length);
      return part1 + capit + part2;
    }
    else
    {
      delete converted;
      return cstyle;
    }
  }
  catch (error)
  {
    gjonerror( error, "getInterCap");
  }
  return false;
}


function appendInnerHTML(idin, myHTML)
{
    var myE= document.getElementById(idin);
    myE.innerHTML  = myE.innerHTML + myHTML;
}

function changeInnerHTML(idin, myHTML)
{
  try
  {
    var myE= document.getElementById(idin);
    myE.innerHTML = myHTML;
  }
  catch (error)
  {
    gjonerror( error, "changeInnerHTML" + idin + " " + myHTML);
  }
}

function returnInnerHTML(idin)
{
  try
  {
    var myE= document.getElementById(idin);
  }
  catch (error)
  {
    gjonerror( error, "returnInnerHTML id" + idin);
  }

  return myE.innerHTML;
}

function changeBorder(idin, which)
{
   if(which)
  {
    document.getElementById(idin).style.borderStyle  = 'dotted';
    document.getElementById(idin).style.borderSize = '2px';
    document.getElementById(idin).style.borderColor  = 'black';
  }
  else
  {
    document.getElementById(idin).style.borderStyle  = 'solid';
    document.getElementById(idin).style.borderSize = '2px';
    document.getElementById(idin).style.borderColor  = 'black';
  }
}

function myHighlight(idto, idfrom, mygoto)
{
  if(isIE())
  {
    var temp = document.getElementById(idto);
    if(temp.style.borderStyle ==  'dotted')
    {
      myHighlightundo(idto);
      myHighlightundo(idfrom);
    }
    else
    {
      myHighlightdo(idto);
      myHighlightdo(idfrom);

      if(mygoto)
      {
        window.location = mygoto;
      }
    }
  }
  else
  if(isGecko())
  {
    //kludge see note in getCompStyle
    var testit = getCompStyle(idto,'border-left-style');

    if( (testit == 'dotted') || (document.getElementById(idto).style.borderStyle ==  'dotted') )
    {
      myHighlightundo(idto);
      myHighlightundo(idfrom);
    }
    else
    {
      myHighlightdo(idto);
      myHighlightdo(idfrom);

      if(mygoto)
      {
        window.location = mygoto;
      }
    }
  }
}

function myHighlightdo(idin)
{
  document.getElementById(idin).style.borderStyle  = 'dotted';
  document.getElementById(idin).style.borderWidth  = '2px';
  document.getElementById(idin).style.borderColor  = 'black';
}

function myHighlightundo(idin)
{
  document.getElementById(idin).style.borderStyle  = 'none';
  document.getElementById(idin).style.borderWidth  = '0';
}

function hideStatus()
{
  try
  {
    if(window.statusbar.visible=='visible')
    {
      window.statusbar.visible=!window.statusbar.visible;
    }
  }
  catch (error)
  {
    gjonerror( error, "hide Status error ");
  }
}


function getCW()
{
var clientWidth = -1;

if(window.innerWidth) return window.innerWidth;
if(document.documentElement && document.documentElement.clientWidth) return document.documentElement.clientWidth;
if(document.body && document.body.clientWidth) return document.body.clientWidth;
return clientWidth;
}

// xDef r2, Copyright 2001-2011 Michael Foster (Cross-Browser.com)
// Part of X, a Cross-Browser Javascript Library, Distributed under the terms of the GNU LGPL
function xDef()
{
  for (var i=0, l=arguments.length; i<l; ++i) {
    if (typeof(arguments[i]) === 'undefined')
      return false;
  }
  return true;
}

function getCH()
{
var clientHeight = -1;
if(window.innerHeight) return window.innerHeight;
if(document.documentElement && document.documentElement.clientHeight) return document.documentElement.clientHeight;
if(document.body && document.body.clientHeight) return document.body.clientHeight;
return clientHeight;
}

//if pageX/Y is supplied, pageX/Y is relative to the whole page (Netscape compatible) - also used by Opera 7+
//if clientX/Y is supplied, clientX/Y should be relative to displayed portion of page (Internet Explorer compatible)
// http://www.howtocreate.co.uk/tutorials/index.php?tut=0&part=17

function getEventX(event)
{
  var eventX;

  if(isIE())
  {
    if( typeof( event.clientX ) == 'number' )
    {
      eventX = event.clientX;

      // add it if its not 0
      if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) )
      {
        //IE 4, 5 & 6 (in non-standards compliant mode)
        eventX += document.body.scrollLeft;
      }
      else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) )
      {
        //IE 6 (in standards compliant mode)
        eventX += document.documentElement.scrollLeft;
      }
    }
    else
    {
      alert('we are hosed in getEventX Not number');
    }
  }
  else if(isGecko())
  {
    eventX            = event.pageX;
  }
  return eventX;
}

function getEventY(event)
{
  var eventY;
  if(isIE())
  {
    if( typeof( event.clientY ) == 'number' )
    {
      eventY = event.clientY;

      // add it if its not 0
      if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) )
      {
        eventY += document.body.scrollTop;
      }
      else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) )
      {
        eventY += document.documentElement.scrollTop;
      }
    }
    else
    {
      alert('we are hosed in getEventY not number');
    }
  }
  else if(isGecko())
  {
    eventY            = event.pageY;
  }
  else
  {
    alert('unsupported browser');
  }
  return eventY;
}

function showMousePosition()
{
  if (document.addEventListener)
  {
    // DOM Level 2 Event Model
    // Register capturing event handlers
    document.addEventListener("mousemove", showMousePostionE, true);
  }
  else if (document.attachEvent)
  {
    // IE 5+ Event Model
    // In the IE Event model, we can't capture events, so these handlers
    // are triggered when only if the event bubbles up to them.
    // This assumes that there aren't any intervening elements that
    // handle the events and stop them from bubbling.
    document.attachEvent("onmousemove", showMousePostionE);
  }
  else
  {
    alert('we are hosed in showMousePosition');
  }
}

function showMousePostionE(event)
{
  if(isGecko())
  {
    var w = window;

    window.status = "eventX,Y: " + event.pageX + "," + event.pageY +
    " w.page X,YOffset: " + window.pageXOffset + "," + window.pageYOffset +
    " w.inner W,H: " + window.innerWidth +  "," + window.innerHeight +
    " w.scroll X,Y: " + window.scrollX +  "," + window.scrollY;
  }
  else if(isIE())
  {

    var w = window;

    if(document.compatMode == 'CSS1Compat')
    //    if(document.documentElement)
    {
      var d = document.documentElement;
    }
    else if(document.body)
    {
      var d = document.body;
    }
    else
    {
      alert('we are hosed in showMousePostionE');
    }

    window.status = "w.event.clientX,Y: " + w.event.clientX + "," + w.event.clientY +
    " w.eventx,y: " + w.event.x + "," + w.event.y +
    " d.scrollL,T: " + d.scrollLeft + "," + d.scrollTop;
  }
  else
  {
    alert('we are hosed in showMousePostionE');
  }
}

function getCenterY()
{
  var center = -1;

  if(window.pageYOffset)
  {
    return (window.pageYOffset + (getCH() / 2));
  }

  if(document.body && document.body.scrollTop)
  {
     return (document.body.scrollTop + (getCH() / 2));
  }

  if(document.compatMode == 'CSS1Compat')
  {
     return (document.documentElement.scrollTop + (getCH() / 2));
   }

  return center;
}

function getYoffset()
{
  var yOff = -1;

  if(document.compatMode == 'CSS1Compat')
  {
      yOff = document.documentElement.scrollTop;
  }
  else if(window.pageYOffset)
  {
    yOff = window.pageYOffset;
  }
  else if(document.body && document.body.scrollTop)
  {
    yOff =  document.body.scrollTop;
  }

  if(isNaN(yOff)) yOff = -1;


return yOff;
}


function getCenterX()
{
  var center = -1;

  if(window.pageXOffset)
  {
    return (window.pageXOffset + (getCW() / 2));
  }

  if(document.body && document.body.scrollLeft)
  {
     return (document.body.scrollLeft + (getCH() / 2));
  }

  if(document.compatMode == 'CSS1Compat')
  {
      return (document.documentElement.scrollLeft + (getCH() / 2));
  }

  return center;
}

function getXoffset()
{
  var xOff = -1;

  if(document.compatMode == 'CSS1Compat')
  {
    xOff =  document.documentElement.scrollLeft;
  }
  else if(window.pageXOffset)
  {
    xOff = window.pageXOffset;
  }
  else if(document.body && document.body.scrollLeft)
  {
    xOff =  document.body.scrollLeft;
  }

  if(isNaN(xOff)) xOff = -1;

  return xOff;
}

function setDisplayV(idin)
{
  try
  {
    document.getElementById(idin).style.display = 'block';
  }
  catch (error)
  {
    gjonerror( error, "setDisplayV");
  }
}

function setDisplayH(idin)
{
  try
  {
    document.getElementById(idin).style.display = 'none';
  }
  catch (error)
  {
    gjonerror( error, "setDisplayH");
  }
}

//no good unless I put it in an eval
//put the following type thing inline,  instead
//myE.style.position = 'absolute';
function setStyle(idin, attrName, newData)
{
  var myE= document.getElementById(idin);

  try
  {
    myE.style.attrName = newData;
  }
  catch (error)
  {
    gjonerror( error, "setStyle ");
  }
}

function assert(fact, msgin)
{
  if(!fact)
  {
    var msg = "Assert Failure " + msgin;
    if(arguments.callee.caller !== null)
    {
      msg = msg + " in function " + arguments.callee.caller.toString().match(/function\s+(\w+)/)[1];
    }
    alert(msg);
  }
}
/* MSIE 7.0; Windows NT 6.0 */
function isIE()
{
  return (navigator.userAgent.toLowerCase().indexOf("msie") > -1)?true:false;
}

function isGecko()
{
  return ((navigator.product)&&(navigator.product.toLowerCase()=="gecko"))?true:false;
}

function isOpera()
{
  return (navigator.userAgent.toLowerCase().indexOf("opera") > -1)?true:false;
}

function whichBrowser()
{
  try
  {
    if (document.all)
    {
      alert("Internet Explorer Detected");
    }
    else if (document.layers)
    {
      alert("Netscape Navigator Detected");
    }
  }
  catch (error)
  {
    gjonerror( error, "whichBrowser ");
  }
}

//dup in xulutils used for install
function gjwhichOS()
{
  var splatform;
  if (typeof(window.navigator.platform) != 'undefined')
  {
    splatform = window.navigator.platform.toLowerCase();
    if (splatform.indexOf('win') != -1)
    {
      return 'w';
    }
    else if (splatform.indexOf('mac') != -1)
    {
      return 'm';
    }
    else if (splatform.indexOf('unix') != -1 || splatform.indexOf('linux') != -1)
    {
      return 'x';
    }
  }
  return 0;
}

function LTrim(str)
{
  for (var k=0; k<str.length && str.charAt(k)<=" " ; k++){} ;

  return str.substring(k,str.length);
}

function RTrim(str)
{
  for (var j=str.length-1; j>=0 && str.charAt(j)<=" " ; j--) {} ;

  return str.substring(0,j+1);
}

function Trim(str)
{
  return LTrim(RTrim(str));
}

function stristr( str1, str2)
{

  var pos = 0;

  str1 += '';
  pos = str1.toLowerCase().indexOf( (str2+'').toLowerCase() );
  if( pos == -1 )
  {
    return 0;
  }
  else
  {
    return 1;
  }
}