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

/*
this stuff does not seem to be working for and id on the body
Changelog
*/

function HTMLAddListener(id,fn,type,capture)
{
  var myElement = document.getElementById(id);
  myElement.addEventListener(type, fn, capture);
}

function HTMLRemoveListener(id,fn,type,capture)
{
  var myElement = document.getElementById(id);
  myElement.removeEventListener(type, fn, capture);
}

function HTMLmenu_on1(evt)
{
  dumpSomeEventPropertiesHTML(evt, "menu_on1 ");
  alert('HTMLmenu_on1');
}
function HTMLmenu_on2(evt)
{
  dumpSomeEventPropertiesHTML(evt, "menu_on2 ");
}
function HTMLmenu_on3(evt)
{
  dumpSomeEventPropertiesHTML(evt, "menu_on3 ");
}

function dumpSomeEventPropertiesHTML(evt, name)
{
  var msg = name + getTimeStamp() + "\n";
  msg += 'evt.which '    + evt.which + "\n";
  msg += 'evt.keyCode '  + evt.keyCode + "\n";
  msg += 'evt.charCode '   + evt.charCode + "\n";
  msg += 'evt.pageX  '   + evt.pageX  + "\n";
  msg += 'evt.pageY '    + evt.pageY + "\n";
  msg += 'evt.isChar '   + evt.isChar + "\n";
  msg += 'evt.screenX '  + evt.screenX + "\n";
  msg += 'evt.screenY '  + evt.screenY + "\n";
  msg += 'evt.clientX '  + evt.clientX + "\n";
  msg += 'evt.clientY '  + evt.clientY + "\n";
  msg += 'evt.isTrusted '  + evt.isTrusted + "\n";
  msg += 'evt.eventPhase ' + evt.eventPhase + "\n";

  var phase;
  switch (evt.eventPhase)
  {
    case  1: phase=" CAPTURING_PHASE ";break;
    case  2: phase=" AT_TARGET ";break;
    case  3: phase=" BUBBLING_PHASE ";break;
    default:  phase=" not 123 ";break;
  }
  // to cancel input must be at CAPTURING_PHASE phase not AT_TARGET

  msg += 'evt.eventPhase ' + evt.eventPhase + phase + "\n";
  msg += 'evt.bubbles '  + evt.bubbles + "\n";
  msg += 'evt.cancelable ' + evt.cancelable + "\n";
  msg += 'evt.type '     + evt.type + "\n";

  msg += 'evt.target.id '     + evt.target.id + "\n";
  msg += 'evt.currentTarget.id '  + evt.currentTarget.id +  "\n";

  alert(msg);
}

function myonKeypress(e)
{

  if(isGecko())
  {
    alert("e.charCode=" + e.charCode);
    e.preventDefault();

    alert("e.cancelable="+ e.cancelable);
    alert("e.target.id=" + e.target.id);

    var phase;
    switch (e.eventPhase)
    {
      case  1: phase="CAPTURING_PHASE ";break;
      case  2: phase="AT_TARGET";break;
      case  3: phase="BUBBLING_PHASE ";break;
    }
    // to cancel input must be at CAPTURING_PHASE phase not AT_TARGET
    alert("e.eventPhase="+phase);
    alert("e.currentTarget.id="+e.currentTarget.id);
    alert("e.type="+e.type);
    alert("e.charCode=" + e.charCode);
  }
  else if(isIE())
  {
    // myleft = document.getElementById("TSSinfo").style.posLeft;
  }
  else
  {
    alert('unknown browser')
    return;
  }
}
