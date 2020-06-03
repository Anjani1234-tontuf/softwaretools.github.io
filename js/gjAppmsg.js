/*
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Copyright © 2000-2012 by Gary Johnson
The Full Copyright statement is

http://garyjohnsoninfo.info/XXSoftwareTools/Copyright.html

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

Changelog

*/

var myGCSGS = -1;
var EOLN = "\n";
var EOL = "<br>";

function gjonerror2(ex, msg, myevent)
{
  if(isGecko())
  {
    //dump("gjonerror2 " + msg + " " + ex.name + " " + ex.message + "\n");
    var wintxt = "\n" + " - - -  " +  "\n" + "\n" + " " + " - - -  "  + ex.name + " - - -  " + " " +  ex.message + " - - - " + "\n" + "\n" + " - - - " + ex.fileName + " - - -  " + " line: " + ex.lineNumber + " - - -  " + "\n" + "\n" + " - - -  " + " UA " + navigator.userAgent + " - - -  " + "\n" + "\n" + "\n" + " - - -  ";
    alert(wintxt);
  }
  else
  {
    var wintxt = "\n" + " - - -  " +  "\n" + "\n" + " " + " - - -  "  + ex.name + " - - -  " + " " +  ex.message + " - - - " + "\n" + "\n" + " - - -  " + " UA " + navigator.userAgent + " - - -  " + "\n" + "\n" + " - - -  ";
    alert(wintxt);
  }

  return false;
}

//this is trying to open a window, and I think the pop up blocker is getting confused
//it can work, but sometimes it does not
//this is another case where I need to rewrite it

function DisplayNotNumber(number)
{

  try
  {
    alert('\n' + 'Is this: ' + number + ' a valid number?' + '\n');
  }
  catch(e)
  {
    alert('DisplayNotNumber ' + number + ' is not a number');
  }

  return false;
}

/*
decide to change to alerts until I can get a better handle on window open
*/

function doMessage(Message)
{
  try
  {
    var newMsg = Message.replace(/<br>/g , '\n');

    if(isGecko())
    {
      // May 2010 chrome retuns true for isGecko  but no dump dump("doMessage " + newMsg + "\n");
      var wintxt = "\n" + " - - -  " +  "\n" + "\n" + " " + " - - -  " + newMsg + " - - -  " + "\n" + "\n" + "\n" + " - - -  ";
      alert(wintxt);
    }
    else
    {
      var wintxt = "\n" + " - - -  " +  "\n" + "\n" + " " + " - - -  "  + newMsg + " - - -  " + "\n" + "\n" + " - - -  " + " UA " + navigator.userAgent + " - - -  " + "\n" + "\n" + " - - - ";
      alert(wintxt);
    }
  }
  catch(error)
  {
    gjonerror(error ,"doMessage");
  }
}


function popDiv(evt,idin, buttonID, name, width, height)
{
  try
  {
    var pw = getCW();
    var theObj = document.getElementById(idin);
    var isVisib = theObj.style.visibility;

    if(isIE())
    {
      if(theObj.scrollHeight)
      {
        setHeight(idin, theObj.scrollHeight + 4);
      }
    }

    if (isVisib == "visible" || isVisib == "show")
    {
      if(buttonID && name)
      {
        document.getElementById(buttonID).value="Display " + name;
      }
      setHidden(idin);
    }
    else
    {
      if(buttonID && name)
      {
        document.getElementById(buttonID).value="Hide " + name;
        var leftVal = mygetLeft(buttonID) + 2;
      }
      else if(buttonID)
      {
        var leftVal = mygetLeft(buttonID) + 2;
      }
      else
      {
        var leftVal = getEventX(evt);
      }

      var topVal = getEventY(evt) + 20;

      setTop(idin, topVal);
      //      setLeft(idin, leftVal + 100);
      setLeft(idin, leftVal);
      setVisible(idin);
    }
  }
  catch (error)
  {
    gjonerror( error, "popDiv ");
  }
}




function toggleDIVDisplay(divid, buttonid, textin )
{
  toggleDivVisibility(divid);

  if(displayNone(divid))
  {
    document.getElementById(buttonid).value=textin;
  }
  else
  {
    document.getElementById(buttonid).value="Hide " + textin;
  }
}


function toggleDivVisibility(divid )
{
  if(displayNone(divid))
  {
    document.getElementById(divid).style.display = 'block';
  }
  else
  {
    document.getElementById(divid).style.display = 'none';
  }
}

function displayNone(id)
{
  var myE= document.getElementById(id);
  if(myE.style.display != 'none')
  {
    return false;
  }
  else
  {
    return true;
  }
}