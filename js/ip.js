var client;
var subCat=0;


function appendInnerHTML(idin, myHTML) {
    var myE= document.getElementById(idin);
    myE.innerHTML  = myE.innerHTML + myHTML;
}

function goThere(menu, frame) {
/*
 if menu is 0 frame is 0 its the main menu
 if menu is a number and frame is 0 its a submenu
 if frame is not zero, its just the frame
*/

  //menus
  var theMenu = new Array();
  theMenu[0] = "ipmenu0";
  theMenu[1] = "ipmenu1";

  if(menu === 0 && frame === 0)   {
    document.getElementById(theMenu[0]).style.display='block';
    document.getElementById(theMenu[subcat]).style.display='none';
  } else if(menu > 0 && frame === 0) {
    document.getElementById(theMenu[0]).style.display='none';
    document.getElementById(theMenu[menu]).style.display='block';
  } else if(frame > 0) {
    document.getElementById(theMenu[menu]).style.display='none';
  }

  subcat = menu;

  mframe = (frame ? menu + 10 + frame: 0);

  //subcats what do we load in the iframe
  var theFrame = new Array();

  theFrame[0]  = "Zero.html"; // for menus
  theFrame[11] = "One.html";
  theFrame[12] = "Two.htnl";
  theFrame[13] = "Three.html";

  document.getElementById("gjFrame").src=theFrame[mframe];
}

function step1(callbackto2) {
 client = new Dropbox.Client({
    key: 'gTZQiNl15qA=|LvXM8WRSiBMv8rA4Lyzps668pPhbT451F/uhxv/jmg==',
    sandbox: true
  });

  if(typeof client === "undefined") {
    appendInnerHTML("pmyOP","error 1 <BR>" + error);
    alert("undefined");
  } else {
   appendInnerHTML("pmyOP","1<BR>" );
   callbackto2(step3, 'stuff', 'goes', 'here');
  }
}

function step2(callbackto3, a, b, c) {
//    alert(a + " " + b + " " + c);
  client.authDriver(new Dropbox.Drivers.Redirect({rememberUser: true }));
  appendInnerHTML("pmyOP","2<BR>" );
  callbackto3(step4);
}

function step3(callbackto4) {
  client.authenticate(function(error, data) {
    if (error) {
      appendInnerHTML('pmyOP',"error 3 <BR>" + error);
      return showError(error);
    }
        appendInnerHTML('pmyOP',"3 <BR>" );
        callbackto4();
  })
}

function step4() {
  client.getUserInfo(function(error, userInfo) {
    if (error) {
      appendInnerHTML('pmyOP',"error 4<BR>" + error);
      return showError(error);
    }
    appendInnerHTML('pmyOP',"4 <BR>" );
    return appendInnerHTML('user-name',userInfo.name);
  });
}


/*
This is a change that we may want to put into step3
coffee script to change into javascript
client.authenticate({interactive: false}, function(error, client) {
  if (error) {
    return handleError(error);
  }
  if (client.isAuthenticated()) {
    // Cached credentials are available, make Dropbox API calls.
    doSomethingCool();
  } else {
    // show and set up the "Sign into Dropbox" button
    var button = document.querySelector("#signin-button");
    button.setAttribute("class", "visible");
    button.addEventListener("click", function() {
      // The user will have to click an 'Authorize' button.
      client.authenticate(function(error, client) {
        if (error) {
          return handleError(error);
        }
        doSomethingCool();
      });
    });
  }
});
*/

function Startup() {
  goThere('0');
//
}

/* put frame js in ipframe and do something like this */

function doTest(inStuff) {

 if(typeof client === "undefined") {
    appendInnerHTML("pmyOP","gjframe calling into parent <BR>");
  client = window.parent.client;
  }


  client.writeFile('writeTest', '', function(error, stat) {
    if (error) {
      return showError(error);
    }
      return appendInnerHTML('pmyOP','WriteTest worked');
  });
}


/*
client.mkdir('/done', function(error, stat) {
      return _this.dbClient.readdir('/done', function(error, entries, dir_stat, entry_stats) {
        if (error) {
          return _this.showError(error);
        }
        _this.done = (function() {
          var _i, _len, _results;

          _results = [];
          for (_i = 0, _len = entry_stats.length; _i < _len; _i++) {
            stat = entry_stats[_i];
            _results.push((new Task()).fromStat(stat));
          }
          return _results;
        })();
        readDone = true;
        if (readActive && readDone) {
          return done();
        }
      });
    });
    return this;
  };

  cleanupName = function(name) {
    name = name.replace(/\ \/\ /g, ' or ').replace(/\//g, ' or ');
    return name;
  };

  path = function() {
    return (this.done ? '/done/' : '/active/') + this.name;
  };

*/



showError = function(error) {
  appendInnerHTML("pmyOP","error <BR>" + error);
};


function validateOnSubmit(idin) {
  var invalid = false; // Start by assuming everything is valid.

  obj= document.getElementById(idin);
  invalid = true;
  if(invalid)
  {
      appendInnerHTML("pmyOP","Hello <BR>");
      msg1="";
      return false;
  }
return true;
alert("I have been submitted");
}

