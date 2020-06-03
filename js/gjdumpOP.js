/*
*/

function clearOP()
{
  changeInnerHTML("theop", "");
}

function myDump(str1)
{
  changeInnerHTML("theop", returnInnerHTML("theop") + "<br>" + str1);
}


function refresh()
{
  window.location.reload( false );           // Reload the page.
}


if (!window.myObj)
{
  var objSGS =
  {
    registered:  false,
    tracking: false
  }
}

function trackMouse()
{

//what affects mouse precision - use enhance pointer precsion on windows
//what else - a new precise mouse
//does mouse start at 0,0
  var isIE = document.all?true:false;

  //If an EventListener is removed from an EventTarget while it is processing an event, it will not be triggered
  // by the current actions.
  //its hard to remove a mouse event with a button the clicks?
  //and stopping propogation on this is probably not a good idea

/*
  if(!objSGS.state)
  {
    document.addEventListener("mousedown", getMousePosition, true);
    objSGS.state = true;
  }
  else
  {
    document.removeEventListener("mousedown", getMousePosition, true);
    objSGS.state = false;
    myDump(objSGS.state);
    return;
  }
*/

  if(!objSGS.registered)
  {
    document.addEventListener("mousedown", getMousePosition, true);
    objSGS.registered = true;
  }

   objSGS.tracking = true;

  function getMousePosition(mp)
  {
    var _x;
    var _y;
    if (!isIE)
    {
      _x = mp.pageX;
      _y = mp.pageY;
    }
    if (isIE) {
      _x = event.clientX + document.body.scrollLeft;
      _y = event.clientY + document.body.scrollTop;
    }
    if(objSGS.tracking) myDump(_x + ","+ _y);
    return true;
  }
};

function stopDisplayOfMouse()
{
  objSGS.tracking = false;
}

//document.write("<div style=\"FLOAT: right; WIDTH: 25%;position:relative;\">");
document.write("<div style=\"FLOAT: right; WIDTH: 250px;position:absolute;top:0px;right:0px;\">");
document.write("<input type=\"button\" id=\"ib0\" title=\"\" class=\"buttonNgrey\" value=\"Clear\" onClick=\"clearOP();\">");
document.write("<input type=\"button\" id=\"ib1\" title=\"\" class=\"buttonNgrey\" value=\"Seperator\" onClick=\"myDump('  -- -- -- ');\">");
document.write("<input type=\"button\" id=\"ib2\" class=\"buttonNgrey\" value=\"Track Mouse onDown\" title=\"start tracking x,y when mouse down\" onClick=\"trackMouse();\">");
document.write("<input type=\"button\" id=\"ib3\" class=\"buttonNgrey\" value=\"Stop Track\" title=\"stop tracking x,y when mouse down\" onClick=\"stopDisplayOfMouse();\">");
document.write("<div id=\"testplace\" style=\"width:250px; height:20em; overflow:auto;overflow-x:scroll;overflow-y:scroll;\">");
document.write("<p id='theop'> <\/p>");
document.write("<\/div>");
document.write("<\/div>");

