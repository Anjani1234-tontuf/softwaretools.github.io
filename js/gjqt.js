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

var gjisDroid = /Android/.test(navigator.appVersion);
var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(navigator.appVersion);


function removeBehaviorsRestrictions() {
//  var video = document.querySelector('video');
//  log('call load()');
//  video.load();
  window.removeEventListener('keydown', removeBehaviorsRestrictions);
  window.removeEventListener('mousedown', removeBehaviorsRestrictions);
  window.removeEventListener('touchstart', removeBehaviorsRestrictions);
 // log('wait 1 second');
//  setTimeout(setSource, 1000);
}

function tstHTML5Wav()
{
var a = document.createElement('audio');
return (a.canPlayType && a.canPlayType('audio/wav; codecs="1"').replace(/no/, ''));
}


//1 wav 2 mp3 3 oog
function tstHTML5audio()
{
var a = document.createElement('audio');

if (!a.canPlayType)
return 0;

if ("" != a.canPlayType('audio/wav; codecs="1"'))
return 1;

if ("" != a.canPlayType('audio/mpeg'))
return 2;

if ("" != a.canPlayType('audio/ogg; codecs="vorbis"'))
return 3;

return 0;
}


//1 ogg 2 mp3 3 wav
function tstHTML5audioApp()
{
var a = document.createElement('audio');

if (!a.canPlayType)
return 0;

if ("" != a.canPlayType('audio/ogg; codecs="vorbis"'))
return 1;

if ("" != a.canPlayType('audio/mpeg'))
return 2;

if ("" != a.canPlayType('audio/wav; codecs="1"'))
return 3;


return 0;
}




//my quess is that this does not play in debug FF because it does not reload page
//verify reflow or something, or somthing about plugins
//for pronunciation in debug builds you have to leave and come back to the generated page
function playFileWavOLD(wavin)
{
  var embedRef;
  try
  {
    var deleteME = document.getElementById("myGJCBEmbed09");
    if(deleteME)
    {
      document.body.removeChild(deleteME);
    }

  }
  catch(err)
  {
  }

  embedRef =document.createElement('embed');
  if( embedRef != null  )
  {
    embedRef.setAttribute("id","myGJCBEmbed09");
    embedRef.setAttribute("width","0");
    embedRef.setAttribute("height","0");
    embedRef.setAttribute("hidden","true");
    embedRef.setAttribute("src", wavin);
    document.body.appendChild(embedRef);
  }
  else
  {
    alert("playFileWav document.createElement embedRef not created");
  }
}

// return the rv value of a Gecko user agent
// as a floating point number.
// returns -1 for non-gecko browsers,
//          0 for pre Netscape 6.1/Gecko 0.9.1 browsers
//          number > 0 where each portion of
//          the rv value delimited by .
//          will be treated as value out of 100.
//          e.g. for rv: 3.12.42,
//          getGeckoRv() returns 3.1242
//          for rv:1.9.1.3 it returns 1.090103

function geckoGetRv()
{
  if (navigator.product != 'Gecko')
  {
    return -1;
  }
  var rvValue = 0;
  var ua      = navigator.userAgent.toLowerCase();
  var rvStart = ua.indexOf('rv:');
  var rvEnd   = ua.indexOf(')', rvStart);
  var rv      = ua.substring(rvStart+3, rvEnd);
  var rvParts = rv.split('.');
  var exp     = 1;

  for (var i = 0; i < rvParts.length; i++)
  {
    var val = parseInt(rvParts[i]);
    rvValue += val / exp;
    exp *= 100;
  }

  return rvValue;
}

//Bug in this one, cannot change the src on a local file

function playFileWavNext(wavin)
{

  try
  {
    // determine if it is any Gecko > 1.9
    var rv    = geckoGetRv();

    if (rv >= 1.09)
    {
      var mygjCBCreatedHTML5Audio = document.getElementById("myGJCBhtml5Embed09");
      if(!mygjCBCreatedHTML5Audio)
      {
        var html5embedRef =document.createElement('audio');
        if( html5embedRef != null  )
        {
          html5embedRef.setAttribute("id","myGJCBhtml5Embed09");
          html5embedRef.setAttribute("width","0");
          html5embedRef.setAttribute("height","0");
          html5embedRef.setAttribute("hidden","true");
          html5embedRef.setAttribute("src", wavin);
          document.body.appendChild(html5embedRef);
          mygjCBCreatedHTML5Audio = document.getElementById("myGJCBhtml5Embed09");
        }
        else
        {
          alert(' unable to create html5embedRef in playFileWav');
          return;
        }
      }
      else
      {
        mygjCBCreatedHTML5Audio.src= wavin;
      }

      mygjCBCreatedHTML5Audio.play();
    }
    else
    {
      var embedRef;
      try
      {
        var deleteME = document.getElementById("myGJCBEmbed09");
        if(deleteME)
        {
          document.body.removeChild(deleteME);
        }

      }
      catch(err)
      {
      }

      embedRef =document.createElement('embed');
      if( embedRef != null  )
      {
        embedRef.setAttribute("id","myGJCBEmbed09");
        embedRef.setAttribute("width","0");
        embedRef.setAttribute("height","0");
        embedRef.setAttribute("hidden","true");
        embedRef.setAttribute("src", wavin);
        document.body.appendChild(embedRef);
      }
      else
      {
        alert("playFileWav document.createElement embedRef not created");
      }
    }
  }
  catch(err)
  {
  }
}

function playFileApp(wavin) {
  try {
    var whichFormat = tstHTML5audio();  //1 wav 2 mp3 3 ogg

    // if whichformat can play it, then used html5 else try and embed
    if (whichFormat) {
      var theFile='';
      if(whichFormat == 1) {
          theFile = theFile.concat(wavin,'.wav');
        theFile = wavin + '.wav';
      } else if(whichFormat == 2) {
          theFile = theFile.concat(wavin,'.mp3');
      }
      else if(whichFormat == 3) {
          theFile = theFile.concat(wavin,'.ogg');
      }

      var mygjCBCreatedHTML5Audio = document.getElementById("myGJCBhtml5Embed09");

      if(mygjCBCreatedHTML5Audio) {
          mygjCBCreatedHTML5Audio.setAttribute("src", theFile);
         //alert('remove');
      } else {
       var html5embedRef =document.createElement('audio');
          if( html5embedRef != null  ) {
            html5embedRef.setAttribute("id","myGJCBhtml5Embed09");
            html5embedRef.setAttribute("width","0");
            html5embedRef.setAttribute("height","0");
            html5embedRef.setAttribute("hidden","true");
            html5embedRef.setAttribute("src", theFile);
            document.body.appendChild(html5embedRef);
            mygjCBCreatedHTML5Audio = document.getElementById("myGJCBhtml5Embed09");
            //alert('!= null');
          } else {
            alert(' unable to create html5embedRef in playFileWav');
            return;
          }
      }
      mygjCBCreatedHTML5Audio.play();
    }
    else
    {
      var embedRef;
      try
      {
        var deleteME = document.getElementById("myGJCBEmbed09");
        if(deleteME)
        {
          document.body.removeChild(deleteME);
        }

      }
      catch(err)
      {
           alert("playFileWav err" + err.message + " file " + err.filename + " line " + err.LineNumber);
      }

      embedRef =document.createElement('embed');
      if( embedRef != null  )
      {
        embedRef.setAttribute("id","myGJCBEmbed09");
        embedRef.setAttribute("width","0");
        embedRef.setAttribute("height","0");
        embedRef.setAttribute("hidden","true");
        embedRef.setAttribute("src", wavin);
        document.body.appendChild(embedRef);
      }
      else
      {
        alert("playFileWav document.createElement embedRef not created");
      }
    }
  }
  catch(err)
  {
    alert("playFileWav err" + err.message + " file " + err.filename + " line " + err.LineNumber);
  }
}

function playFileWav(wavin)
{

  try
  {
    // determine if it is any Gecko > 1.9
    //var rv    = geckoGetRv();

    if (tstHTML5Wav())
    {

      var mygjCBCreatedHTML5Audio = document.getElementById("myGJCBhtml5Embed09");

      if(mygjCBCreatedHTML5Audio)
      {
         document.body.removeChild(mygjCBCreatedHTML5Audio);
      }

      var html5embedRef =document.createElement('audio');
      if( html5embedRef != null  )
      {
        html5embedRef.setAttribute("id","myGJCBhtml5Embed09");
        html5embedRef.setAttribute("width","0");
        html5embedRef.setAttribute("height","0");
        html5embedRef.setAttribute("hidden","true");
        html5embedRef.setAttribute("src", wavin);
        document.body.appendChild(html5embedRef);
        mygjCBCreatedHTML5Audio = document.getElementById("myGJCBhtml5Embed09");
      }
      else
      {
        alert(' unable to create html5embedRef in playFileWav');
        return;
      }


    if (AndroidKludge) {
      mygjCBCreatedHTML5Audio.load();
      window.addEventListener('keydown', removeBehaviorsRestrictions);
      window.addEventListener('mousedown', removeBehaviorsRestrictions);
      window.addEventListener('touchstart', removeBehaviorsRestrictions);
    }

      mygjCBCreatedHTML5Audio.play();
    }
    else
    {
      var embedRef;
      try
      {
        var deleteME = document.getElementById("myGJCBEmbed09");
        if(deleteME)
        {
          document.body.removeChild(deleteME);
        }

      }
      catch(err)
      {
      }

      embedRef =document.createElement('embed');
      if( embedRef != null  )
      {
        embedRef.setAttribute("id","myGJCBEmbed09");
        embedRef.setAttribute("width","0");
        embedRef.setAttribute("height","0");
        embedRef.setAttribute("hidden","true");
        embedRef.setAttribute("src", wavin);
        document.body.appendChild(embedRef);
      }
      else
      {
        alert("playFileWav document.createElement embedRef not created");
      }
    }
  }
  catch(err)
  {
  }
}


function playMozSound(wavin)
{
  //this reguires a wav file in chrome
  //alert('playMozSound ' + wavin);

  netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");

  var mysound = Components.classes["@mozilla.org/sound;1"].createInstance();
  mysound = mysound.QueryInterface(Components.interfaces.nsISound);

  // const is not supported by IE so all const changed to var
  //    const SND_NETWORK_STD_CID = "@mozilla.org/network/standard-url\3b1";

  var SND_NETWORK_STD_CID = "@mozilla.org/network/standard-url;1";

  var SND_I_URL = "nsIURL";
  var SND_URL = new Components.Constructor(SND_NETWORK_STD_CID, SND_I_URL);
  var url = new SND_URL();
  url.spec = wavin;
  mysound.play(url);
}

function PlayIt(anObj)
{
  anObj.Play();
}
/* a javascript function that takes a QT movie and calls its "Stop" method */
function StopIt(anObj)
{
  anObj.Stop();
}
