/*
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Copyright © 2000-2012 by  Gary Johnson

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

requires utilsxul.js
<script type="application/x-javascript" src="chrome://gj53run/content/utilsxul.min.js"/>
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


Changelog
Aug 01 2007

changed SearchsetUPHTML to just call SearchSetup

 Jun 30 2009
Moved netscape.sec  inside function
*/



function  SearchsetUPHTML(SearchType, place, term)
{
  /*
  Aug 01 2007

  netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
  var gj53run = Components.classes["@garyjohnson.org/gj53run;1"].createInstance();
  gj53run = gj53run.QueryInterface(Components.interfaces.nsIGj53run);

  try
  {
  gj53run.poke5(getCBdir());
  gj53run.poke4(SearchType +  term);
  }
  catch(err)
  {
  gjonerror(err," Crash");
  }

  var myurl = "file:///" + gj53run.value4;

  if(gj53runGetPrefBool("OpeninTab"))
  {
  mySBopenURLIn(myurl, "tab");
  }
  else
  {
  mySBopenURLIn(myurl, "window");
  }
  */

  SearchsetUP(SearchType, place, term);
}


function setUpRecipe(place, term)
{
  netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
  var gj53run = Components.classes["@garyjohnson.org/gj53run;1"].createInstance();
  gj53run = gj53run.QueryInterface(Components.interfaces.nsIGj53run);

  try
  {
    var pvalue = '1' + term;
    gj53run.poke3(pvalue);
  }
  catch(err)
  {
    gjonerror(err,"SetUPRecipe gj53runSearchHTML.min.js" );
  }

  var myurl = "file:///" + gj53run.value3;

  if(gj53runGetPrefBool("OpeninTab"))
  {
    mySBopenURLIn(myurl, "tab");
  }
  else
  {
    mySBopenURLIn(myurl, "window");
  }

}
