/*
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Copyright © 2000-2013 by Gary Johnson
The Full Copyright statement is
http://garyjohnsoninfo.info/XXSoftwareTools/Copyright.html

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
*/
/*
Content Notes

Technical Notes
continue  rewrite of gjcore.js and gjAppcore.js, remove isgecko isie and replace with tests.

Dec 2012
mygettop
    mtop = getTop(idin);
    if((!mtop) || (mtop == -1))
to
    if(mtop == -1)

changed clip
clip format is 2px, 2pc, 2px 2px,
Old format was IE 7 or less ex. from 2 2 2 2

function getWidth(idin) and in getHeight scrollHeight
added
  else if(myE.style.width == "auto")
        width = myE.scrollWidth;

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



//get the integer of the left

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
  else if(myE.style.width == "auto")
        width = myE.scrollWidth;
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
    else if(myE.style.height == "auto")
      height = parseInt(myE.scrollHeight);
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
//      IE 7 and before did not have , or I think px
    var myclip = 'rect(' + t + px + ',' + r + px + ',' + b + px + ',' + l + px + ')';
    // dec 2012 bag this  'rect(' + t + ',' + r + ',' + b + ',' + l + ')'; for above
    myE.style.clip = myclip;
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
function isIE()
{
  return (navigator.userAgent.toLowerCase().indexOf("msie") > -1)?true:false;
}

function isGecko()
{
  return ((navigator.product)&&(navigator.product.toLowerCase()=="gecko"))?true:false;
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
      return strNum;
    }
    else
    {
      return strNum;
    }
  }
  catch (error)
  {
    gjonerror( error, " frmtNumber ");
  }
  return 0;
}


function getCookieVal (offset)
{
  var endstr = document.cookie.indexOf (";", offset);
  if (endstr == -1)
  endstr = document.cookie.length;
  return unescape(document.cookie.substring(offset, endstr));
}


function getCookie(name)
{
  try
  {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);

    if (begin == -1)
    {
      begin = dc.indexOf(prefix);
      if (begin !== 0)
      return null;
    }
    else
    begin += 2;

    var end = document.cookie.indexOf(";", begin);
    if (end == -1)
    end = dc.length;
  }
  catch (error)
  {
    gjonerror( error, "getCookie ");
    return 0;
  }

  return unescape(dc.substring(begin + prefix.length, end));
}

//always set the expires, the expires code below is bogus
function setCookie(name, value, expires, path, domain, secure)
{
  var curCookie = name + "=" + escape(value) +
  ((expires) ? "; expires=" + expires.toGMTString() : "") +
  ((path) ? "; path=" + path : "") +
  ((domain) ? "; domain=" + domain : "") +
  ((secure) ? "; secure" : "");
  document.cookie = curCookie;
}

function deleteCookie(name, path, domain)
{
  try
  {
    if (getCookie(name))
    {
      document.cookie = name + "=" +
      ((path) ? "; path=" + path : "") +
      ((domain) ? "; domain=" + domain : "") +
      "; expires=Thu, 01-Jan-70 00:00:01 GMT";
    }
    else
    {
      doMessage('Error in deleteCookie trying to delete non existent cookie ' + name);
    }
  }
  catch (error)
  {
    gjonerror( error, "deleteCookie");
  }
}

function getCookieItem(ckName, ckItem)
{
  var ckValue = unescape(getCookie(ckName));
  var ckOffset = ckValue.indexOf(ckItem);
  //changeInnerHTML("theop", returnInnerHTML("theop") + "<br> ckOffset " + ckOffset);

  if( ckOffset == -1)
  {
    return null;
  }
  else
  {
    var endStr = ckValue.indexOf("&", ckOffset);

    //changeInnerHTML("theop", returnInnerHTML("theop") + "<br> endStr " + endStr);

    if(endStr == -1)
    {
        var theItemOffset = ckValue.indexOf("=",ckOffset) + 1;
        //changeInnerHTML("theop", returnInnerHTML("theop") + "<br> theItemOffset " + theItemOffset + " " + ckValue);

        if(theItemOffset == -1)
        {
          return null;
        }
        else
        {
          return ckValue.substring(theItemOffset, ckValue.length);
        }
    }
    else
    {
        var thePair = ckValue.substring(ckOffset, endStr);
        var theItemOffset = thePair.indexOf("=") + 1;
        return (thePair.substring(theItemOffset, endStr));
    }
  }
return null;
}