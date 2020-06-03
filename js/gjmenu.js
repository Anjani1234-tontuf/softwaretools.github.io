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

function toggleHighLightmo(myEvent, myId)
{
  try
  {
    document.getElementById(myId).style.cursor = 'pointer';

    var temp = myId;

    if(temp.length == 3)
    {
      var mydivID = temp.substr(1,2);
    }
    else if(temp.length == 4)
    {
      var mydivID = temp.substr(1,3);
    }
    else if(temp.length == 5)
    {
      var mydivID = temp.substr(1,4);
    }
    else
    {
      alert('invalid id in menu ' + mydivID);
      return false;
    }

    if(document.getElementById(mydivID).style.display == 'block')
    {
      if(myEvent == "m")
      {
        document.getElementById(myId).className = 'mymenu SHCm';
      }
      else
      {
        document.getElementById(myId).className = 'mymenu SHFm';
      }
    }
    else if(myEvent == "m")
    {
      document.getElementById(myId).className = 'mymenu SHCm';
    }
    else if(myEvent == "f")
    {
      document.getElementById(myId).className = 'mymenu SHFm';
    }
    else if(myEvent == "o")
    {
      document.getElementById(myId).className = 'mymenu HCLm';
    }

  }
  catch (error)
  {
    if(checkDebug())
    {
      gjonerror( error, "toggleHighLightmo ");
    }
  }

  return true;
}

function menuSetHidden(idin)
{
  //  setHidden(idin)
  //  self.scrollTo(0, 0);
  //  document.getElementById(theMenuID).className = 'HCL';
  //  theMenuID = -1;
}

function popDivmo(evt,idin, buttonEvt, buttonID)
{
  try
  {
    var theObj = document.getElementById(idin);

    var isVisib = theObj.style.display;

    if (isVisib == "block" || isVisib == "show")
    {
      if(buttonEvt == "c")
      {
        document.getElementById(buttonID).className = 'mymenu HCLm';
      }

      if(buttonID)
      {
        document.getElementById(buttonID).value="Display " + name;
      }
      setDisplayH(idin);
    }
    else
    {
      if(buttonID)
      {
        document.getElementById(buttonID).value="Hide " + name;
      }

      if(buttonEvt == "c")
      {
        document.getElementById(buttonID).className = 'mymenu SHFm';
        var theMenuID = buttonID;  //Jun 15 2007 probably useless
      }

      setDisplayV(idin);
    }
  }
  catch (error)
  {
    gjonerror( error, "popDivmo");
  }

  return true;
}

function expandAll(buttonID)
{
  var theDivs = document.getElementsByTagName('DIV');

  for(var i=0 ; i < theDivs.length; i++)
  {

    var aDiv = theDivs[i];

    var temp = aDiv.id;


    var check1 = temp.substr(0,1);

    if(check1 == 'm')
    {
      var thebuttonId = 'd' + temp;

      if(aDiv.style.display == 'none')
      {
        aDiv.style.display = 'block';
        document.getElementById(thebuttonId).className = 'mymenu SHFm';
      }

    }
  }
  return true;
}

function contractAll(buttonID)
{
  var theDivs = document.getElementsByTagName('DIV');

  for(var i=0 ; i < theDivs.length; i++)
  {

    var aDiv = theDivs[i];

    var temp = aDiv.id;

    var check1 = temp.substr(0,1);

    if(check1 == 'm')
    {
      var thebuttonId = 'd' + temp;

      if(aDiv.style.display == 'block')
      {
        aDiv.style.display = 'none';
        document.getElementById(thebuttonId).className = 'mymenu HCLm';
      }
    }
  }
  return true;
}
