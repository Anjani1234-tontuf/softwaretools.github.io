function getMannyfest()
{
// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob)
{
  // Great success! All the File APIs are supported.
} else
{
  appendInnerHTML("pmyStatus","window.File System APIs supported " + "<BR>" );
  return;
}
/*
var reader = new FileReader();
//Error: uncaught exception: [Exception... "Security error"  code: "1000" nsresult: "0x805303e8 (NS_ERROR_DOM_SECURITY_ERR)"  location: "http://garyjohnsoninfo.info/XXSoftwareTools/js/gjnew.js Line: 14"]
var theFile= new File("MEvaluator-CalculatorApp.webapp");
result = reader.readAsText(theFile);
appendInnerHTML("pmyStatus"," result " + result + "<BR>" );
var appManifest = JSON.parse(result);
*/
}

function handleGet()
{
      if(this.readyState === 4 && (this.status === 0 ||  + this.status === 200))
      {
        var op = "";
        if(this.responseType) op+= " responseType " + this.responseType;
        if(this.responseXML)  op+= " responseXML " + this.responseXML;

        if(this.status==0 && this.statusText==null)
        {
          appendInnerHTML("pmyStatus", "Check for Firefox app update -> Request was not allowed");
          return;
        }

        appendInnerHTML("pmyStatus", "Check for Firefox app update complete " + this.statusText + op + "<BR>" );
        if (this.responseText==null || this.responseText=="") //data null or failure
        {
           appendInnerHTML("pmyStatus", "Check for Firefox app update did not receive manifest " + this.statusText + "<BR>" );
           return;
        }
        var appManifest = JSON.parse(this.responseText);

        navigator.mozApps.amInstalled(function (app)
          {
            if(app)
            {
              if (app.manifest.version != appManifest.version)
              {
                appendInnerHTML("pmyStatus", "Update Firefox app from to -> version " + app.manifest.version + " to " + appManifest.version + "<BR>" );
                navigator.mozApps.install(MANIFEST);
              }
              else
              {
                appendInnerHTML("pmyStatus", "Update Firefox app not needed Version " + app.manifest.version+ "<BR>" );
              }
            }

          });  //end of function
      }
      else
      {
        try
        {
         var myState="no state";
         switch (this.readyState)
         {
            case 0: myState = "open() not called yet. ";  break;
            case 1: myState =" send() not called yet. "; break;
            case 2: myState =" send() called, headers and status are available. Status " + this.status + " " + this.statusText; break;
            case 3: myState =" Downloading, responseText holds the partial data. Status " + this.status + " " + this.statusText; break;
            case 4: myState =" Complete Status "  + this.status + " " + this.statusText;
         };
         appendInnerHTML("pmyStatus", myState  +  "<br>" );
        }
        catch(error)
        {
              appendInnerHTML("pmyStatus",error.name +  error.message + error.name);
        }
       }
/*
send() called, headers and status are available. OK
Downloading, responseText holds the partial data. OK
Complete OK
*/
return;
}


function onInitFs(fs) {

  fs.root.getFile('log.txt', {}, function(fileEntry) {

    fileEntry.file(function(file) {
       var reader = new FileReader();

       reader.onloadend = function(e) {
         var txtArea = document.createElement('textarea');
         txtArea.value = this.result;
         document.body.appendChild(txtArea);
       };

       reader.readAsText(file);
    }, errorHandler);

  }, errorHandler);

}

function errorHandler(e) {
  var msg = '';

  switch (e.code) {
    case FileError.QUOTA_EXCEEDED_ERR:
      msg = 'QUOTA_EXCEEDED_ERR';
      break;
    case FileError.NOT_FOUND_ERR:
      msg = 'NOT_FOUND_ERR';
      break;
    case FileError.SECURITY_ERR:
      msg = 'SECURITY_ERR';
      break;
    case FileError.INVALID_MODIFICATION_ERR:
      msg = 'INVALID_MODIFICATION_ERR';
      break;
    case FileError.INVALID_STATE_ERR:
      msg = 'INVALID_STATE_ERR';
      break;
    default:
      msg = 'Unknown Error';
      break;
  };

  console.log('Error: ' + msg);
}

/* removed from html file */

function eacU(e)
{
  if (window.applicationCache.status == window.applicationCache.UPDATEREADY)
  {
    // Browser downloaded a new app cache.
    // Swap it in and reload the page to get the new hotness.
    appendInnerHTML("pmyStatus", "HTML5 UPDATEREADY" + "<BR>");
    window.applicationCache.swapCache();
    window.location.reload();
  }
}
/* http://www.html5rocks.com/en/tutorials/appcache/beginner/ */
// HTML5 manifest - Check if a new cache is available

window.applicationCache.addEventListener('updateready', function(e) {eacU(e)});

/*
XMLHttpRequests being stopped

If you end up with an XMLHttpRequest having status=0 and statusText=null, it means that the request was not allowed to be performed. It was UNSENT. A likely cause for this is when the XMLHttpRequest origin (at the creation of the XMLHttpRequest) has changed when the XMLHttpRequest is then open(). This case can happen for example when one has an XMLHttpRequest that gets fired on an onunload event for a window: the XMLHttpRequest gets in fact created when the window to be closed is still there, and then the request is sent (ie open()) when this window has lost its focus and potentially different window has gained focus. The way to avoid this problem is to set a listener on the new window "activate" event that gets set when the old window has its "unload" event fired.
*/

//mozilla webapp manifest
function updateMozilla()
{
  if(window.location.protocol == 'file') return;
  if(window.navigator.onLine == true)
  {
    appendInnerHTML("pmyStatus","Online -> Checking if Firefox app and update" + "<BR>");

    var MANIFEST = '/XXSoftwareTools/MEvaluator-CalculatorApp.webapp';

    req = new XMLHttpRequest();
    // req.onreadystatechange = handleGet; supposedly here gives you open etc statuses
    req.open('GET', MANIFEST,true);  //asynch  third parm is optional and default if true
    req.onreadystatechange = handleGet;
    req.send(null);
  }
  else
  {
    appendInnerHTML("pmyStatus","Offline" + "<BR>");
  }
}

function dumpMozInstall()
{
  var msg1;
  if (typeof(window.navigator.platform) != 'undefined' )  //gjwhichOS()
  {
    msg1 = window.navigator.platform + " " + navigator.userAgent + " " + navigator.appVersion;
  }
  else
  {
    msg1 = "Platform Unkown";
  }

  var msg2 = "email developer at gary_johnson_53 [at] hotmail [dot] com"
  var msg3 = "window.location.pathname: " +  window.location.pathname + " window.location.protocol: " + window.location.protocol;
  var clientWidth = getCW();
  var clientHeight = getCH();
  var msg4 = "clientWidth = " + clientWidth  + " clientHeight = " + clientHeight + " screenWidth = " + screen.width + " screenHeight = " + screen.height + " screenColorDepth = " + screen.colorDepth + "<BR>";

  appendInnerHTML("pmyStatus", msg1 + "<BR>" + msg2 + "<BR>" + msg3 + "<BR>" + msg4);


  navigator.mozApps.amInstalled(function (app)
  {
    if (app)
    {
        appendInnerHTML("pmyStatus","---Firefox app " + app.manifest.description + " Version " + app.manifest.version + "<BR>");
        appendInnerHTML("pmyStatus","app.orgin " + app.origin + "<BR>");
        //changeInnerHTML("pmyStatus", returnInnerHTML("pmyStatus") + app.install_data.receipt + "<BR>" );
        var iTime = new Date(app.install_time);
        appendInnerHTML("pmyStatus","installed from " + app.install_origin + " on " +   iTime.toUTCString() + "<BR>");
    }
    else
    {
       appendInnerHTML("pmyStatus","---Not a Firefox app" + "<BR>");
    }
  });
}

function dumphtml5Cache()
{
var version = "1.00.08"

var appCache = window.applicationCache;

  if(appCache.status == null || appCache.status == "")
  {
    appendInnerHTML("pmyStatus","---No Status Not cached as an HTML5 offline page" + "<BR>");
    return;
  }

var myStatus;

switch (appCache.status)
{
  case appCache.UNCACHED: // UNCACHED == 0
    myStatus= "UNCACHED";
    break;
  case appCache.IDLE: // IDLE == 1
    myStatus= "IDLE";
    break;
  case appCache.CHECKING: // CHECKING == 2
    myStatus= "CHECKING";
    break;
  case appCache.DOWNLOADING: // DOWNLOADING == 3
    myStatus= "DOWNLOADING";
    break;
  case appCache.UPDATEREADY:  // UPDATEREADY == 4
    myStatus= "UPDATEREADY";
    break;
  case appCache.OBSOLETE: // OBSOLETE == 5
    myStatus= "OBSOLETE";
    break;
  default:
    myStatus= "UKNOWN";
    break;
};

  if(myStatus == "UNCACHED")
  {
    appendInnerHTML("pmyStatus","---Status Not cached as an HTML5 offline page " + version + "<BR>");
  }
  else
  if(myStatus == "CHECKING" || myStatus == "DOWNLOADING" || myStatus ==  "UPDATEREADY" || myStatus == "IDLE")
  {
    appendInnerHTML("pmyStatus","---Cached as an HTML5 offline page - Status " + myStatus + " " + version + "<BR>");
  }
  else
  if(myStatus == "OBSOLETE"  || myStatus == "UNKOWN")
  {
    appendInnerHTML("pmyStatus","Error in HTML5 Cache Status " + myStatus + " " + version + "<BR>");
  }
  else
  {
    appendInnerHTML("pmyStatus", "HTML5 Cache Status " + myStatus + " " + version + "<BR>");
  }

}

function EnableClick()
{
document.getElementById("hSS4").disabled = false;
}

/*


function Startup()
{
    gmgjc = document.createElement('TABLE');
    gmgjc.setAttribute('border', '0');
    gmgjc.setAttribute('cellpadding', '2');
    gmgjc.setAttribute('cellspacing', '2');
    gmgjc.setAttribute('width', '100%');
    gmgjc1 = document.createElement('TBODY');
    gmgjc1.appendChild( makeColumnHeader());

  updateMozilla();
  setTimeout('EnableClick()', 2000); // let the browser have some time to do the asynch call
  dumpMozInstall();
  dumphtml5Cache();
}
// http://www.mredkj.com/javascript/nfbasic.html  public domain
*/