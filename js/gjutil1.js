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


//  Make sure ID is unique!
//  myClass.className = 'buttonH' + temp; does not work     document.getElementById(myId).className = 'buttonH' + temp; does

function toggleHighLight(myEvent, myId)
{
  try
  {
    var myClass = document.getElementById(myId).className;

    var temp = myClass.substr(7, 10);

    if(myEvent == "m")
    {
      document.getElementById(myId).className = 'buttonH' + temp;
    }
    else if(myEvent == "o")
    {
      document.getElementById(myId).className = 'buttonN' + temp;
    }
  }
  catch (error)
  {
    if(checkDebug())
    {
      gjonerror( error, "toggleHighLight");
    }
  }
  return false;
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


//check and display results of checkdebug
function checkDebugD()
{
  try
  {
    if( checkDebug())
    {
      alert('debugging on');
    }
    else
    {
      alert('debugging off');
    }
  }
  catch (error)
  {
    gjonerror( error, "checkDebugD");
    return false;
  }
  return true;
}

function checkDebug()
{
  var debugCD;

  try
  {

    debugCD = getCookieItem("gj53runOptions", "DebugHTML");

    if(debugCD == null)
    {
      return false;
    }

    if( debugCD === undefined  || debugCD === "" || debugCD === "0" || debugCD === false || debugCD === "false")
    {
      return false;
    }
    else
    {
      return true;
    }
  }
  catch (err)
  {
    gjonerror( err, " checkDebug ");
  }
  return false;
}

//used in gjmove so moved here

function testInteger(number)
{
  //positive numbers
  //  x - 0 to force conversion of text to number internally in place of a decent atoi, atof function
  //  if passed internally, it can be a number
  //  so I will be REALLY lazy and convert it to a string here, for this test

  try
  {
    number = number.toString();

    if((number.length === 0) || (number.length === undefined)) {
      return false; }

    for (var i = 0; i < number.length; i++) {
      var oneChar = number.charAt(i);
      if(oneChar >= "0" && oneChar <= "9"){
        continue;
      } else {
        return false;
      }
    }
  }
  catch (error) {
    gjonerror( error, "testInteger");
    return false;
  }

  return true;
}


function fixFileUrl(u)
{
  var windows;
  windows = (navigator.platform.indexOf('Win') != -1);
  /* chop off file: slash slash slash, unescape each %hh, convert back slash to forward slash and | to : */
  u = u.substr(windows ? 8 : 7);
  u = unescape(u);
  if(windows)
  {
    u = u.replace(/\//g,'\\');
    u = u.replace(/\|/g,':');
  }
  return u;
}

function checkQuote(instr)
{
  //   var re1 = /[\"\']/; regular expressions has side effects in FireFox 1.03
  //

  if(instr.length === 0)
  return false;

  try
  {
    if(instr.indexOf("'") != -1)
    {
      return false;
    }
    else
    if(instr.indexOf('"') != -1)
    {
      return false;
    }
  }
  catch (error)
  {
    gjonerror( error, "checkQuote ");
  }

  return true;
}

function checkValidFileName(instr)
{
  /*
  All code points between (00)(00) and (00)(1F), inclusive. (Control Characters)

  # (00)(2A) '*'(Asterisk)
  # (00)(2F) '/' (Forward Slash)
  # (00)(3A) ':' (Colon)
  # (00)(3B) ';' (Semicolon)
  # (00)(3F) '?' (Question Mark)
  # (00)(5C) '\' (Backslash)

  added

  | 7c
  , 2c
  < 3e
  > 3c

  * / : ; ? \ | < > ,

  I could use a regular expression like the word.replace in
  C:\CBSOURCE\gj53run\jar\content\gj53run\gj53runOverlay.js  gj53runGetSelectedWord


  */
  if(instr.length === 0)
  return false;

  try
  {
    if(instr.indexOf("*") != -1)
    {
      return false;
    }
    else
    if(instr.indexOf("/") != -1)
    {
      return false;
    }
    else
    if(instr.indexOf(":") != -1)
    {
      return false;
    }
    else
    if(instr.indexOf(";") != -1)
    {
      return false;
    }
    else
    if(instr.indexOf("?") != -1)
    {
      return false;
    }
    else
    if(instr.indexOf("\\") != -1)
    {
      return false;
    }
    else
    if(instr.indexOf("|") != -1)
    {
      return false;
    }
    else
    if(instr.indexOf(",") != -1)
    {
      return false;
    }
    else
    if(instr.indexOf("<") != -1)
    {
      return false;
    }
    else
    if(instr.indexOf(">") != -1)
    {
      return false;
    }
  }
  catch (error)
  {
    gjonerror( error, "checkValidFileName ");
  }

  return true;
}

// I need to support UNC paths at some point
//mac
function checkValidPath(strin)
{

  // give up on mac and everything else for now
  if ((navigator.platform != "Win32") && (navigator.platform != "OS/2"))
  {
    return true;
  }

  var re = ":";
  try
  {
    var strPath = new String(Trim(strin));
    strPath = strPath.toUpperCase();

    var check1 = strPath.indexOf(re);

    if(check1 > 0)
    {
      var strDrive = strPath.substring(0, check1);
      if(strDrive.length != 1)
      {
        alert('we do not support UNC paths at this point, Please enter a valid path like C:\\CookBook input=' + strDrive  );
        return false;
      }

      re = /^[A-Z ]*$/;

      if(!(re.test(strDrive)))
      {
        alert('not A - Z');
        return false;
      }

      re = "\\";
      var check2 = strPath.indexOf(re);
      var check3 = (check1 > check2 ? check1 : check2);

      var fileNM =  strPath.substring((check3 + 1), strPath.length);

      var myArray = fileNM.split(/\\/);

      if(myArray.length === 0)
      {
        if(!(checkValidFileName(fileNM)))
        {
          alert(' * / : ; ? \ | < >  and control characters are invalid in file names ->' + fileNM);
          return false;
        }
        else
        {
          return true;
        }
      }
      else
      {
        for(var i=0; i < myArray.length; i++)
        {

          if(!(checkValidFileName(myArray[i])))
          {
            alert('-> * / : ; ? \ | < >  and control characters are invalid in file names ->' + myArray[i] );
            return false;
          }
        }
        return true;

      }
    }
    else
    if(!(checkValidFileName(strin)))
    {
      alert(' * / : ; ? \ | < >  and control characters are invalid in file names -> ' +strin);
      return false;
    }
  }
  catch(e)
  {
    gjonerror(e + "checkValidPath input = " + strin);
  }
  return true;
}

function checkWild(instr)
{
   if(instr.length === 0)
  return false;

  try
  {

    if(instr.indexOf("%") >= 0)
    {
      return true;
    }
  }
  catch (error)
  {
    gjonerror( error, "checkWild ");
  }

  return false;
}


/*

I use pixels in these functions, yet I define the orginal top left in PTs
<div id="TSSinfo" style="visibility:hidden; position:absolute; width:auto; height:auto; top:100pt; left:250pt; background-color:lightseagreen; border-left: 5px solid #000; padding-right:15pt; z-index:1">

changing IE to go from left to right, since I cannot draw on top of
java applet

*/
function displayTSS(event)
{
  try
  {

    setToggleTop(event);
    if(isGecko())
    {
      self.statusbar.visible=false;
    }
    StartTSS();
  }
  catch (error)
  {
    gjonerror( error, "displayTSS ");
  }
}

function StartTSS()
{
  var mytop;
  var myleft;
  try
  {
    if(isGecko())
    {
      mytop = parseInt(document.getElementById("TSSinfo").style.top);
    }
    else if(isIE())
    {
      myleft = document.getElementById("TSSinfo").style.posLeft;
    }
    else
    {
      alert('unknown browser');
      return;
    }

    if(isGecko())
    {
      if(mytop >= getToggleTop())
      {
        toggleId = window.setInterval("TSSUp()",1);
      }
      else
      {
        document.getElementById("TSSinfo").style.visibility = "visible";
        toggleId = window.setInterval("TSSDown()",1);
      }
    }
    else if(isIE())
    {
      if(myleft >= getToggleTop())
      {
        toggleId = window.setInterval("TSSUp()",1);
      }
      else
      {
        document.getElementById("TSSinfo").style.visibility = "visible";
        toggleId = window.setInterval("TSSDown()",1);
      }
    }
  }
  catch (error)
  {
    gjonerror( error, "StartTSS ");
  }
}

function TSSDown()
{
  var top;
  var left;
  try
  {
    if(isGecko())
    {
      top = parseInt(document.getElementById("TSSinfo").style.top);
      top +=25;
      var sztop = top + "px";
      document.getElementById("TSSinfo").style.top = sztop;
      if (top >= getToggleTop())
      {
        window.clearInterval(toggleId);
      }
    }
    else if(isIE())
    {
      left = document.getElementById("TSSinfo").style.posLeft;

      left +=7;

      document.getElementById("TSSinfo").style.posLeft = left;

      if (left >= getToggleTop())
      {
        window.clearInterval(toggleId);
      }
    }
    else
    {
      alert('unknown browser');
    }
  }
  catch (error)
  {
    gjonerror( error, "TSSDown");
    //    alert('e.msg ' + e.message + '\n e.name ' + e.name + '\n e.desc ' + e.description + '\n e.line ' + e.line);
  }
}

function TSSUp()
{
  var top;
  var left;
  try
  {
    if(isGecko())
    {
      top = parseInt(document.getElementById("TSSinfo").style.top);
      top -=25;
      var sztop = top + "px";
      document.getElementById("TSSinfo").style.top = sztop;
      if (top <= getToggleBottom())
      {
        document.getElementById("TSSinfo").style.visibility = "hidden";
        window.clearInterval(toggleId);
      }

    }
    else
    {
      left = document.getElementById("TSSinfo").style.posLeft;

      left -=7;

      document.getElementById("TSSinfo").style.posLeft = left;

      if(left <= getToggleBottom())
      {
        document.getElementById("TSSinfo").style.visibility = "hidden";
        window.clearInterval(toggleId);
      }
    }
  }
  catch (error)
  {
    gjonerror( error, "TSSUp ");
  }
}

function getToggleTop()
{
  return vtoggleTop;
}


function cbPrint()
{
  var theDivs = document.getElementsByTagName('DIV');

  for(var i=0 ; i < theDivs.length; i++)
  {
    var aDiv = theDivs[i];

    var temp = aDiv.id;

    // make the hidden divs visisble
    var check1 = temp.substr(0,1);

    if(check1 == 'h')
    {
      if(aDiv.style.display == 'none')
      {
        aDiv.style.display = 'block';
      }
    }

    //lets hide the links - that are in the divs with class = MyButon
    if(aDiv.className == "MyButton" )
    {
      aDiv.style.display = 'none';
    }

  } //for

  // make the buttons go away
  var theInputs = document.getElementsByTagName('INPUT');

  for(var i=0; i < theInputs.length; i++)
  {
    var aInputs = theInputs[i];
    aInputs.style.display = 'none';
  }

  // make the regular links go away
  var theAs = document.getElementsByTagName('A');

  for(var i=0 ; i < theAs.length; i++)
  {
    var aAs = theAs[i];
    aAs.style.display = 'none';
  }

  return true;
}

function DisplayModifedDate(what,id)
{
  toggleHighLight(what, id);

  if(what == 'o')
  {
    document.getElementById(id).value="Show Date Last Modified";
  }
  else
  {
    var lastmod = parent.document.lastModified;// string of last modified date
    var lastmoddate = Date.parse(lastmod); //date
    var DisplayDate;

    if(lastmoddate === 0)
    {
      DisplayDate = "Last modified: Unknown";
    }
    else
    {
      DisplayDate = "Last modified: " + lastmod;
    }

    document.getElementById(id).value = DisplayDate;
  }
}

/*
Warning: octal literals and octal escape sequences are deprecated
Source Code:   if (hour == 00)
*/
function getTimeStamp()
{
  var now   = new Date();

  var hour  = now.getHours();
  var min   = now.getMinutes();
  var sec   = now.getSeconds();

  if (min <= 9)
  {
    min = "0" + min;
  }

  if (sec <= 9)
  {
    sec = "0" + sec;
  }

  if (hour > 12)
  {
    hour = hour - 12;
    ampm = "PM";
  }
  else
  {
    //hour = hour; its already hour
    ampm = "AM";
  }

  if (hour == 12)
  {
    ampm = "PM";
  }

  if (hour == 00)
  {
    hour = "12";
  }

  if(hour <= 9)
  {
    hour =  "0" + hour;
  }

  var msg1 = hour;
  msg1 += ':' + min;
  msg1 += ':' + sec + "." + now.getMilliseconds();
  msg1 += ' ' + ampm + ' ';

  msg1 = " " + msg1 + " ";

  return msg1;
}


//  not working in mozilla
//  what does this work for. it does not seem to work for a piece of style
//  maybe its for an HTML attribute like the src of a img
function changeAttribute(elementId, attrName, newData)
{
  try
  {
    if (document.getElementById)
    {
      var el = document.getElementById(elementId);
      el.setAttribute(attrName, newData);
    }
  }
  catch (error)
  {
    gjonerror( error, "changeAttribute");
  }
}

//mac hopefully this is already taken care of

function getCBdir()
{
  /*
  get the default path to the content set at install time
  */

  try
  {
    netscape.security.PrivilegeManager.enablePrivilege("UniversalPreferencesRead");
    var fp = navigator.preference("gj53run.URL1");
    //alert("Permission to read preferences is granted. Your home page is "+fp);
  }
  catch(err)
  {
    alert("Permission to read preferences was denied.");
  }

  return fp;
}

function getCBPath(which, filein, etc)
{
  /*
  At install time gj53run.default.URL1 set in the preferences
  example
  gj53run.default.URL1=C:\\CookBook\\
  getCBPath("charts", "TemperatureEquivalents.html", "not used")
  */

  var DEFAULTURL1 =  "file:///" + getCBdir();

  /*
  which

  root      only  DEFAULTURL1;

  tools     \\XXSoftwareTools\\
  dict      \\TermsDictionaryGlossary\\
  hints     \\FoodFactsHintsTips\\

  bev       \\Beverages\\
  safe      \\FoodSafety\\
  herb      \\HerbsSpicesSeasonings\\
  equip     \\KitchenEquipment\\
  pantry      \\pantry\\
  pics      \\Pictures\\
  charts      \\ToolsChartsTables\\

  */

  var os = gjwhichOS();

  if(os == 'w')
  {
    if(which == "root")
    {
      var DEFAULTSUBDIR1 =    "";
    }
    else if(which == "tools")
    {
      var DEFAULTSUBDIR1 =    "\\XXSoftwareTools\\";
    }
    else if(which == "dict")
    {
      var DEFAULTSUBDIR1 =    "\\TermsDictionaryGlossary\\";
    }
    else if(which == "hints")
    {
      var DEFAULTSUBDIR1 =    "\\FoodFactsHintsTips\\";
    }
    else if(which == "bev")
    {
      var DEFAULTSUBDIR1 =    "\\Beverages\\";
    }
    else if(which == "safe")
    {
      var DEFAULTSUBDIR1 =    "\\FoodSafety\\";
    }
    else if(which == "herb")
    {
      var DEFAULTSUBDIR1 =    "\\HerbsSpicesSeasonings\\";
    }
    else if(which == "equip")
    {
      var DEFAULTSUBDIR1 =     "\\KitchenEquipment\\";
    }
    else if(which == "pantry")
    {
      var DEFAULTSUBDIR1 =     "\\pantry\\";
    }
    else if(which == "pics")
    {
      var DEFAULTSUBDIR1 =     "\\Pictures\\";
    }
    else if(which == "charts")
    {
      var DEFAULTSUBDIR1 =     "\\ToolsChartsTables\\";
    }
    else
    {
      var DEFAULTSUBDIR1 =    "";
    }
  }
  else
  {
    if(which == "root")
    {
      var DEFAULTSUBDIR1 =    "";
    }
    else if(which == "tools")
    {
      var DEFAULTSUBDIR1 =    "/XXSoftwareTools/";
    }
    else if(which == "dict")
    {
      var DEFAULTSUBDIR1 =    "/TermsDictionaryGlossary/";
    }
    else if(which == "hints")
    {
      var DEFAULTSUBDIR1 =    "/FoodFactsHintsTips/";
    }
    else if(which == "bev")
    {
      var DEFAULTSUBDIR1 =    "/Beverages/";
    }
    else if(which == "safe")
    {
      var DEFAULTSUBDIR1 =    "/FoodSafety/";
    }
    else if(which == "herb")
    {
      var DEFAULTSUBDIR1 =    "/HerbsSpicesSeasonings/";
    }
    else if(which == "equip")
    {
      var DEFAULTSUBDIR1 =     "/KitchenEquipment/";
    }
    else if(which == "pantry")
    {
      var DEFAULTSUBDIR1 =     "/pantry/";
    }
    else if(which == "pics")
    {
      var DEFAULTSUBDIR1 =     "/Pictures/";
    }
    else if(which == "charts")
    {
      var DEFAULTSUBDIR1 =     "/ToolsChartsTables/";
    }
    else
    {
      var DEFAULTSUBDIR1 =    "";
    }
  }
  var myurl = DEFAULTURL1 + DEFAULTSUBDIR1 + filein;

  return myurl;
}

function getOSDirDelimter()
{
  var nos = gjwhichOS();
  var ndelimt;

  if(nos == 'w')
  {
    ndelimt = '\\';
  }
  else
  {
    ndelimt = '/';
  }

  return ndelimt;
}

function computeMillisec(aDate)
{
  var tstring = aDate.toUTCString();
  //  alert(tstring);
  var nowMilliseconds = Date.parse(tstring ) + (aDate.getTimezoneOffset() * (60*1000));

  return nowMilliseconds;
}

function getFFpref(which)
{
  /*
  generic for any pref note we have bools, strings
  You can combine all enablePrivilege calls. Put the privileges space separated in one string and your users will get only one dialog.
  */

  try
  {
    netscape.security.PrivilegeManager.enablePrivilege("UniversalPreferencesRead");
    var fp = navigator.preference(which);
  }
  catch(err)
  {
    alert("Permission to read preferences was denied.");
    return "Error in  getFFpref";
  }

  return fp;
}


function getCompStyle(idin, cstyle) //name collision with Mozilla getComputedStyle
{

  var myE = document.getElementById(idin);

  if(isGecko())
  {
    if(document.defaultView)
    {
      if(cstyle === '')
      {
        cstyle = null;
      }

      var mystyle = document.defaultView.getComputedStyle(myE,'');
      return mystyle.getPropertyValue(cstyle);
    }
    else
    {
      if(checkDebug())
      {
        alert('getCompStyle document.defaultView does not exist');
      }
      return false;
    }
  }
  else if(isIE())
  {
    var ieCstyle  = getInterCap(cstyle);  //still needs work . try []
    var ieValue   = myE.currentStyle + '.' + ieCstyle;
    return ieValue;
  }
  else if(checkDebug())
  {
    alert('getCompStyle not done for this browser');
    return false;
  }
  return false;
}


function myToggleBars()
{

  netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserWrite");

  ((window.menubar.visible) ?   window.menubar.visible=false    : window.menubar.visible=true);
  ((window.toolbar.visible) ?   window.toolbar.visible=false    : window.toolbar.visible=true);
  ((window.personalbar.visible) ? window.personalbar.visible=false  :   window.personalbar.visible=true);
  ((window.locationbar.visible) ? window.locationbar.visible=false  :   window.locationbar.visible=true);
  ((window.scrollbars.visible) ?  window.scrollbars.visible=false :   window.scrollbars.visible=true);
  ((window.statusbar.visible) ?   window.statusbar.visible=false  :   window.statusbar.visible=true);
}

// text 1 for yes, anything else is not, 2000 days
function setUIMin(onoff)
{
var expdate = new Date();
expdate.setTime(expdate.getTime()+(24*60*60*1000*2000));
setCookie("UIMin", onoff, expdate, "/", null, false);
}


//recursive
var MAX_DUMP_DEPTH = 10;

function dumpObj(obj, name, indent, depth) {
if (depth > MAX_DUMP_DEPTH) {
  return indent + name + ": <Maximum Depth Reached>\n";
}

if (typeof obj == "object") {
  var child = null;
  var output = indent + name + "\n";
  indent += "\t";
    for (var item in obj) {
      try {
        child = obj[item];
        } catch (e) {
         child = "<Unable to Evaluate>";
      }

      if (typeof child == "object") {
          output += dumpObj(child, item, indent, depth + 1);
      } else {
          output += indent + item + ": " + child + "\n";
      }
    }
  return output;
  } else {
  return obj;
  }
}
