/*
Nov 10  2006
also see sorttable.js

Looks like everything has to be absolute
and everything has to be sorted including the iframe

not reliable for inline elements, and should only be used for elements that have block or equivalent display. they work fairly reliably cross browser.

offsetWidth and offsetHeight
The dimensions of the element taken outside its border. (The width inside the padding in IE's quirks mode.)
clientWidth and clientHeight
The dimensions of the element taken inside its border, and minus any scrollbar size.
scrollWidth and scrollHeight
The dimensions the element would be using if it did not have a scrollbar and was not constrained in size (in other words, the dimensions of its contents, plus its padding). Only usable and reliable if the element actually has a scrollbar.
scrollLeft and scrollTop
The distance the element has been scrolled.



pre order The list returned is sorted in document order. In other words, elements are arranged in order of the appearance of their start-tags. If the start-tag for element A appears earlier in the document than the start-tag for element B, then element A comes before element B in the list.

someday I may want to consider this kind of thing --if (strin === undefined)  return;

Apr 12 2008

added
if (strin === "" ) return 0;
added setDisplayH()
changeInnerHTML('Ingredients',"");
document.body.style.height  = parseFloat(myBody.height) + 'px';

rewrote getTopHeight to use offsetHeight offsetWidth offsetTop instead of getElement and height etc
changed theop to write dodump and changed gjmsg to format it

*/


var smImageWidth;
var lgImageWidth;
var smImageHeight;
var lgImageHeight;
var dishTop;
var dishLeft;
var myLeft;
var myMT;

function recipeSort(myin)
{
  var positions   = new Array();
  var myArray     = new Array(5);
  var cnt     = 0;
  var where   = 0;
  var from    = 0;

//  var myFun   = getFFpref("gj53run.doAnimations");

  var myFun = getCookieItem("gj53runOptions", "DoAnimations")

  if( myFun == undefined  || myFun == "" || myFun == "0" || myFun == false || myFun == "false")
  {
    myFun = false;
  }
  else
  {
    myFun = true;
  }

  var theop= '';

  setDisplayH('close01');
  changeInnerHTML('Ingredients',"");
  changeInnerHTML('myheader',"<p class='hshl'><span class='hshlbt'>FastTrack&nbsp;</span> on learning to cook</p>");

  if (!document.getElementsByTagName)
  {
    return;
  }

  // Find all
  var divs = document.getElementsByTagName('*');
  var thisDiv;
  var computedTopOffset = 0;

  for (var di = 0; di  <  divs.length; di++)
  {
    thisDiv = divs[di];
    //find sortable all have id in form of    x-nnn-nnn
    if (thisDiv.id.indexOf("-") == 1)
    {

      var strID = thisDiv.id.substring(1 , 11);
      var myTemp = strID.split(/-/);
      //
      //var gjtst = myTemp[2];
      //if(gjtst < 1030)
      //dumpIt(thisDiv,"Elements");
      //
      getTopHeight(thisDiv, myArray);
      //getTopHeight(thisDiv.id, myArray);
      if(cnt > 0)
      {
        //computedTopOffset += positions[cnt  - 1].theHeight + 1;
        computedTopOffset += positions[cnt  - 1].theHeight;
      }
      positions[cnt++]= new aposition( thisDiv.id, myTemp[1]  , myTemp[2], myArray[0], myArray[1],myArray[2],myArray[3],myArray[4],computedTopOffset);
      //theop += "<br>1 " + "cnt "  + (cnt - 1) + " " + positions[cnt - 1].theid +  " FF: "  + positions[cnt -  1].FF + " TT: "  + positions[cnt -  1].TT + " top: "  + positions[cnt - 1].theTop + " Height: "  +  positions[cnt - 1].theHeight +  " Width: "  + positions[cnt - 1].theWidth + " right: "  + positions[cnt - 1].theRight ;
    }
    else if(thisDiv.id == 'myheader')
    {
      getTopHeight(thisDiv, myArray);
      //getTopHeight(thisDiv.id, myArray);
      where +=  myparseFloat(myArray[1]) + myMT;
      //changeInnerHTML("theop", returnInnerHTML("theop") + "<br> WHERE " + where );
    }
  }

  positions.sort(sortByTT);

  // Apr 12 2008  from = where;  //add back the header for the offset calculation

  if(myFun)
  {
    var recipeChg = new CSGS();
  }

  try
  {
    for(var mycnt = 0; mycnt < cnt; mycnt++)
    {
      var myE= document.getElementById(positions[mycnt].theid);

      myE.style.position = 'absolute';  /* static does nothing*/
      setWidth(positions[mycnt].theid, positions[mycnt].theWidth);
      //positions[mycnt].theid

      if(myFun)
      {
        recipeChg.addElement(positions[mycnt].theid);
        if(positions[mycnt].TT  == 1990)
        {
          recipeChg.setMI(positions[mycnt].theid, 5);
          recipeChg.addMove(positions[mycnt].theid, myLeft, where, myLeft, where);
        }
        else
        {
          recipeChg.setMI(positions[mycnt].theid, 5);
          //        recipeChg.addMove(positions[mycnt].theid, myLeft, positions[mycnt].computedTopOffset + from, myLeft, where);
          recipeChg.addMove(positions[mycnt].theid, myLeft, positions[mycnt].theTop + from, myLeft, where);
          //setTopLeft(positions[mycnt].theid,  myLeft, where);
        }
      }
      else  //plain old plain old
      {
        setTopLeft(positions[mycnt].theid,   myLeft, where);
      }
      //theop += "<br>2 " + "mycnt " + mycnt + " " + positions[mycnt].theid + " FF: "  +  positions[mycnt].FF + " TT: " + positions[mycnt].TT + " top:  "  + positions[mycnt].theTop +  " Height: "  + positions[mycnt].theHeight + " Width: "   + positions[mycnt].theWidth +  " right: "  + positions[mycnt].theRight + " WHERE " + where;

      //where += positions[mycnt].theHeight + 1;
      where += positions[mycnt].theHeight;
    }

  }
  catch(error)
  {
    gjonerror(error," setting mi");
  }

  //doDump(theop )
  if(myFun)
  {
    recipeChg.setIntervalSpeed(30);  /* 60 is okay 30  is a little faster */
    recipeChg.doIt();
    delete recipeChg;
  }


  var rst = document.getElementById('recipeSummary');
  var div01 = document.getElementById('d-01-01');
  dishTop = div01.offsetTop + rst.offsetTop;

  makeSmall('thedish1');

  delete positions;
  delete myArray;
}

function aposition(idin, FF, TT, theTop, theHeight, theLeft, theWidth, theRight,computedTopOffset)
{
  //changeInnerHTML("theop", returnInnerHTML("theop") + "<br>0 " + idin + " FF: "  + FF + " TT: "  + TT + " top: "  + theTop + " Height: "  + theHeight );

  this.theid    = idin;
  this.FF         = myparseFloat(FF);
  this.TT         = myparseFloat(TT);
  this.theTop     = myparseFloat(theTop);
  this.theHeight  = myparseFloat(theHeight)
  this.theLeft    = myparseFloat(theLeft);
  this.theWidth   = myparseFloat(theWidth);
  this.theRight   = myparseFloat(theRight);
  this.computedTopOffset =computedTopOffset;
}


function sortByFF(a, b)
{
  var x = myparseInt(a.FF);
  var y = myparseInt(b.FF);
  return (x - y);
}


function sortByTT(a, b)
{
  var x = myparseInt(a.TT);
  var y = myparseInt(b.TT);
  return (x - y);
}

function getTopHeight(idin,  myArray)
{
  if(isGecko())
  {
    if(document.defaultView)
    {

      myArray[0] = idin.offsetTop;
      myArray[1] = idin.offsetHeight;
      myArray[2] = idin.offsetLeft;
      myArray[3] = idin.offsetWidth;
      myArray[4] = 0;
      return true;
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
  else if(checkDebug())
  {
    alert('getCompStyle not done for this browser');
    return false;
  }
  return false;
}

function myparseFloat(strin)
{
  if (strin === "" ) return 0;

  var tmpFloat = parseFloat(strin);

  if(isNaN(tmpFloat))
  {
    return 0;
  }
  return tmpFloat;
}

function myparseInt(strin)
{

  if (strin === "" ) return 0;

  var tmpInt = parseInt(strin);

  if(isNaN(tmpInt))
  {
    return 0;
  }
  return tmpInt;
}

function toggleDisplayButton2(idin,buttonid)
{
  try
  {
    var aDiv = document.getElementById(idin);

    if(aDiv.style.display == 'none')
    {
      aDiv.style.display = 'block';
      document.getElementById(buttonid).value="Hide Optional";
    }
    else
    {
      aDiv.style.display = 'none';
      document.getElementById(buttonid).value="Show Optional";
    }
  }
  catch (error)
  {
    gjonerror( error, "toggleDisplayButton2");
  }
}

/*

Small Picture
Compute a size that fits into the d-01-01 Recipe Description DIV next to the recipeSummary table
the top will be the same as the top of recipeSummary Table
the width will be availableWidth - recipeSummary Table width with an 16px on the left and right side
the height will be the width / aspect ratio

Take pictures in landscape with default 1.33 aspect ratio
I can adjust this after I have taken more pictures

Large Picture
theWidth = (img.width < availableWidth) ? (img.width : availableWidth))
the height = width * aspect ratio

neither gets printed

Changelog

id of picture to display
size constraints - availableWidth
top - pass in id of something idforoffset, display the image underneath it

and left - the left of the idforoffset

the

*/
function displayDish()
{
  var availableWidth=getCW();  // innerWidth; //window.innerWidth
  var availableHeight=getCH(); //innerHeight;

  // lets only do this once, so we will do it global
  var myBody    = document.defaultView.getComputedStyle(document.body,'');

  //dumpIt(myBody,'CS');
  myLeft  = myparseFloat(myBody.marginLeft);
  myMT    = myparseFloat(myBody.marginTop);

  var theDish = document.getElementById('thedish1');

  //<img id='thedish1' src="../Pictures/ShrimpandGarlic.JPG" alt="The Finished dish" onmouseover="makeBig(this.id)"; onmouseout="makeSmall(this.id);">
  // I am going to put it to the left of the recipeSummary table
  // myheader
  // d-01-01
  // recipeSummary

  var aspectRatio = theDish.width / theDish.height;

  var rst = document.getElementById('recipeSummary');
  var div01 = document.getElementById('d-01-01');
  //var smavailableWidth = availableWidth - (rst.offsetWidth - 40);
  var smavailableWidth = 200;

  smImageWidth = ((theDish.width < smavailableWidth) ? (theDish.width) : (smavailableWidth));
  lgImageWidth = ((theDish.width < availableWidth) ? (theDish.width) : (availableWidth));

  smImageHeight = smImageWidth / aspectRatio;
  lgImageHeight = lgImageWidth / aspectRatio;

  dishTop = div01.offsetTop + rst.offsetTop;
  dishLeft = availableWidth + myLeft - smImageWidth;  //fix to use exact computation of position margins etc if scroll, scroll width ie 32 below as well

  makeSmall('thedish1');
}

function makeBig(idin)
{
  var theDish     = document.getElementById('thedish1');
  theDish.width   =lgImageWidth;
  theDish.height  =lgImageHeight;
  setTopLeft('thedish1', myLeft , dishTop);  //is the 32 is marginLeft 2em, or the scroll bar on the left
}

function makeSmall(idin)
{
  var theDish     = document.getElementById('thedish1');
  theDish.style.display = 'block';
  theDish.width   =smImageWidth;
  theDish.height  =smImageHeight;
  setTopLeft('thedish1', dishLeft, dishTop);
}

// id that are none numeric , Equipment, Ingredients are contained in first header 01-01
// call showImg(this.id,'theEquipment',9999) with a zorder
// for indivdual ingredients and steps showImg(this.id, 'thePan2') , zorder is computed from TT
function showImg(idcontainerin, idpicin,zorder)
{
  var availableWidth=getCW();  // innerWidth; //window.innerWidth
  var availableHeight=getCH(); //innerHeight;
  var myzoorder;

  if(arguments[2])
  {
    myzoorder = zorder;
  }
  else
  {
    var strID = idcontainerin.substring(1 , 11);
    var myTemp = strID.split(/-/);
    myzoorder = 9999 - parseInt(myTemp[2]); // ex 1061 range from TT == 99 1990 and it max value is 32 bit integer
  }

  document.getElementById(idcontainerin).style.zIndex = myzoorder;
  var theImg = document.getElementById(idpicin);

  var aspectRatio = theImg.width / theImg.height;

  var myImageWidth = ((theImg.width < availableWidth) ? (theImg.width) : (availableWidth));

  var myImageHeight = myImageWidth / aspectRatio;

  theImg.width    =myImageWidth;
  theImg.height   =myImageHeight;
  theImg.style.display = 'block';
  theImg.style.zIndex = myzoorder; //zorder;
}
//maybe obsolete with toggleDisplayButton3
function hideImg(idin)
{
  document.getElementById(idin).style.display = 'none';
}

function toggleDisplayButton3(buttonid, idcontainerin, idpicin,zorder)
{
  try
  {
    var aPicorDiv = document.getElementById(idpicin);

    if(aPicorDiv.style.display == 'none')
    {
      showImg(idcontainerin, idpicin,zorder)
      //aPicorDiv.style.display = 'block';
      document.getElementById(buttonid).value="-";
    }
    else
    {
      aPicorDiv.style.display = 'none';
      document.getElementById(buttonid).value="+";
    }
  }
  catch (error)
  {
    gjonerror( error, "toggleDisplayButton3");
  }
}