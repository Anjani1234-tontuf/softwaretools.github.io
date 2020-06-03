
function getInterCap(cstyle)
{
  //  margin-left to MarginLeft
   //    this does NOT fix : top or  posTop
  //  :left or  pixelLeft
  //  :width or  pixelWidth
  //  :height or posHeight

  try
  {
    var converted = new String(cstyle);
    var re = "-";
    var where = converted.indexOf(re);

    if(where > 0)
    {
      var part1 = converted.substr(0, where);
      var capit = converted.substr(where + 1, 1);
      capit = capit.toUpperCase();
      var part2 = converted.substr(where +2, converted.length);
      return part1 + capit + part2;
    }
    else
    {
      delete converted;
      return cstyle;
    }
  }
  catch (error)
  {
    gjonerror( error, "getInterCap");
  }
  return false;
}
function myHighlight(idto, idfrom, mygoto)
{
  if(isIE())
  {
    var temp = document.getElementById(idto);
    if(temp.style.borderStyle ==  'dotted')
    {
      myHighlightundo(idto);
      myHighlightundo(idfrom);
    }
    else
    {
      myHighlightdo(idto);
      myHighlightdo(idfrom);

      if(mygoto)
      {
        window.location = mygoto;
      }
    }
  }
  else
  if(isGecko())
  {
    //kludge see note in getCompStyle
    var testit = getCompStyle(idto,'border-left-style');

    if( (testit == 'dotted') || (document.getElementById(idto).style.borderStyle ==  'dotted') )
    {
      myHighlightundo(idto);
      myHighlightundo(idfrom);
    }
    else
    {
      myHighlightdo(idto);
      myHighlightdo(idfrom);

      if(mygoto)
      {
        window.location = mygoto;
      }
    }
  }
}

function myHighlightdo(idin)
{
  document.getElementById(idin).style.borderStyle  = 'dotted';
  document.getElementById(idin).style.borderWidth  = '2px';
  document.getElementById(idin).style.borderColor  = 'black';
}

function myHighlightundo(idin)
{
  document.getElementById(idin).style.borderStyle  = 'none';
  document.getElementById(idin).style.borderWidth  = '0';
}

function hideStatus()
{
  try
  {
    if(window.statusbar.visible=='visible')
    {
      window.statusbar.visible=!window.statusbar.visible;
    }
  }
  catch (error)
  {
    gjonerror( error, "hide Status error ");
  }
}

//if pageX/Y is supplied, pageX/Y is relative to the whole page (Netscape compatible) - also used by Opera 7+
//if clientX/Y is supplied, clientX/Y should be relative to displayed portion of page (Internet Explorer compatible)
// http://www.howtocreate.co.uk/tutorials/index.php?tut=0&part=17

function getEventX(event)
{
  var eventX;

  if(isIE())
  {
    if( typeof( event.clientX ) == 'number' )
    {
      eventX = event.clientX;

      // add it if its not 0
      if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) )
      {
        //IE 4, 5 & 6 (in non-standards compliant mode)
        eventX += document.body.scrollLeft;
      }
      else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) )
      {
        //IE 6 (in standards compliant mode)
        eventX += document.documentElement.scrollLeft;
      }
    }
    else
    {
      alert('we are hosed in getEventX Not number');
    }
  }
  else if(isGecko())
  {
    eventX            = event.pageX;
  }
  return eventX;
}

function getEventY(event)
{
  var eventY;
  if(isIE())
  {
    if( typeof( event.clientY ) == 'number' )
    {
      eventY = event.clientY;

      // add it if its not 0
      if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) )
      {
        eventY += document.body.scrollTop;
      }
      else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) )
      {
        eventY += document.documentElement.scrollTop;
      }
    }
    else
    {
      alert('we are hosed in getEventY not number');
    }
  }
  else if(isGecko())
  {
    eventY            = event.pageY;
  }
  else
  {
    alert('unsupported browser');
  }
  return eventY;
}

function showMousePosition()
{
  if (document.addEventListener)
  {
    // DOM Level 2 Event Model
    // Register capturing event handlers
    document.addEventListener("mousemove", showMousePostionE, true);
  }
  else if (document.attachEvent)
  {
    // IE 5+ Event Model
    // In the IE Event model, we can't capture events, so these handlers
    // are triggered when only if the event bubbles up to them.
    // This assumes that there aren't any intervening elements that
    // handle the events and stop them from bubbling.
    document.attachEvent("onmousemove", showMousePostionE);
  }
  else
  {
    alert('we are hosed in showMousePosition');
  }
}

function showMousePostionE(event)
{
  if(isGecko())
  {
    var w = window;

    window.status = "eventX,Y: " + event.pageX + "," + event.pageY +
    " w.page X,YOffset: " + window.pageXOffset + "," + window.pageYOffset +
    " w.inner W,H: " + window.innerWidth +  "," + window.innerHeight +
    " w.scroll X,Y: " + window.scrollX +  "," + window.scrollY;
  }
  else if(isIE())
  {

    var w = window;

    if(document.compatMode == 'CSS1Compat')
    //    if(document.documentElement)
    {
      var d = document.documentElement;
    }
    else if(document.body)
    {
      var d = document.body;
    }
    else
    {
      alert('we are hosed in showMousePostionE');
    }

    window.status = "w.event.clientX,Y: " + w.event.clientX + "," + w.event.clientY +
    " w.eventx,y: " + w.event.x + "," + w.event.y +
    " d.scrollL,T: " + d.scrollLeft + "," + d.scrollTop;
  }
  else
  {
    alert('we are hosed in showMousePostionE');
  }
}

//no good unless I put it in an eval
//put the following type thing inline,  instead
//myE.style.position = 'absolute';
function setStyle(idin, attrName, newData)
{
  var myE= document.getElementById(idin);

  try
  {
    myE.style.attrName = newData;
  }
  catch (error)
  {
    gjonerror( error, "setStyle ");
  }
}

function assert(fact, msgin)
{
  if(!fact)
  {
    var msg = "Assert Failure " + msgin;
    if(arguments.callee.caller !== null)
    {
      msg = msg + " in function " + arguments.callee.caller.toString().match(/function\s+(\w+)/)[1];
    }
    alert(msg);
  }
}


function isOpera()
{
  return (navigator.userAgent.toLowerCase().indexOf("opera") > -1)?true:false;
}

function whichBrowser()
{
  try
  {
    if (document.all)
    {
      alert("Internet Explorer Detected");
    }
    else if (document.layers)
    {
      alert("Netscape Navigator Detected");
    }
  }
  catch (error)
  {
    gjonerror( error, "whichBrowser ");
  }
}

//dup in xulutils used for install
function gjwhichOS()
{
  var splatform;
  if (typeof(window.navigator.platform) != 'undefined')
  {
    splatform = window.navigator.platform.toLowerCase();
    if (splatform.indexOf('win') != -1)
    {
      return 'w';
    }
    else if (splatform.indexOf('mac') != -1)
    {
      return 'm';
    }
    else if (splatform.indexOf('unix') != -1 || splatform.indexOf('linux') != -1)
    {
      return 'x';
    }
  }
  return 0;
}

function changeBorder(idin, which)
{
   if(which)
  {
    document.getElementById(idin).style.borderStyle  = 'dotted';
    document.getElementById(idin).style.borderSize = '2px';
    document.getElementById(idin).style.borderColor  = 'black';
  }
  else
  {
    document.getElementById(idin).style.borderStyle  = 'solid';
    document.getElementById(idin).style.borderSize = '2px';
    document.getElementById(idin).style.borderColor  = 'black';
  }
}


function doDump(Message)
{
  var windstyle = "height=" + getCH() + ", width=" + getCW()+ ",scrollbars,resizable=yes";
  //  var windstyle = "height=480, " + "width=640," + ",scrollbars,resizable=yes";
  try
  {
    var errMsg = window.open("","Dump"+mkunique(),windstyle);
    var wintxt = "<html><body bgcolor='#FFFFFF'>";
    wintxt += "<input type=button value='Close' onClick='self.close()'>";
    wintxt += "<br>";
    wintxt += "<p style='font-size: 12pt; color:black; text-align:left;'>";
    wintxt += Message;
    wintxt += "</p>";
    wintxt += "</body></html>";
    errMsg.document.write(wintxt);
    errMsg.document.close();
    //    ? errMsg.set
  }
  catch(e)
  {
    doMessage(Message); // May 2010 window.open - close crashing in IE 8 alert(Message);
  }
}

function dumpAll()
{
  try
  {
    dumpIt(window, 'Window object');  //IE same as window.window
    dumpIt(document, 'Document object'); // FF yes
    dumpIt(document.body, 'Document.body object'); //FF yes
    //dumpIt(screen, 'Screen object');  //FF null
    dumpIt(navigator, 'navigator object'); //FF yes
    dumpIt(document.documentElement, 'Document.documentElement object');  //It dumps the HTML of current document
    // if you have a NOSCRIPT tag for javascript running this will bring up my noscript page
    // META YouMustEnableJavascript.html">
    //dumpIt(document.all, 'Document.all object'); //IE only
    //  same same dumpIt(window.window, 'window.window object');//IE no
    //dumpIt(window.screen, 'window.screen object');  //? see showScrSize
  }
  catch(err)
  {
    gjonerror( err, "dumpAll");
  }
}


function showScrSize(where)
{
  var availableWidth;
  var availableHeight;

  // ie no screen.pixelDepth +" bit depth,
  //can use "\n" in the textarea
  //need to build cross browser names
  var clientWidth;
  var clientHeight;
  var clientTop;
  var clientLeft;
  var clientScrollPostionX;
  var clientScrollPostionY;
  var documentBodyOffset;

  try
  {
    var message='All Measurements in Pixels ' + EOL;

    clientWidth = getCW();
    clientHeight = getCH();

    if(isIE())
    {

    }
    else if(isGecko())
    {
      message += ' Mozilla window.screen.availHeight = '+ window.screen.availHeight + EOL;
      message += ' Mozilla window.screen.availLeft = ' + window.screen.availLeft + EOL;
      message += ' Mozilla window.screen.availTop = ' + window.screen.availTop + EOL;
      message += ' Mozilla window.screen.availWidth = ' + window.screen.availWidth + EOL;
      message += ' Mozilla window.scrollbars.innerWidth = ' + window.scrollbars.innerWidth + EOL;

      message += ' Mozilla window.innerWidth = ' + window.innerWidth + EOL;
      message += ' Mozilla window.innerHeight = ' + window.innerHeight + EOL;

      message += ' Mozilla window.document.height = ' + window.document.height + EOL;
      message += ' Mozilla window.document.width = ' + window.document.width + EOL;

      message += ' Mozilla document.body.offsetWidth = ' + document.body.offsetWidth + EOL;
      message += ' Mozilla document.width = ' + document.width + EOL;
      message += ' Mozilla document.height = ' + document.height + EOL;
      var myBody    = document.defaultView.getComputedStyle(document.body,'');
      dumpIt(myBody,'ComputedStyle');
    }
    else
    {
      alert("unknown browser");
    }

    message += ' clientWidth = ' + clientWidth  + EOL;
    message += ' clientHeight = ' + clientHeight + EOL;

    message += ' screenWidth = ' + screen.width + EOL;
    message += ' screenHeight = ' + screen.height + EOL;
    message += ' screenColorDepth = ' + screen.colorDepth + EOL;

    if(where)
    {
      return( message);
    }
    else
    {
      doDump( message );
    }
  }
  catch (error)
  {
    gjonerror( error, "showScrSize");
  }

  return false;
}


function traverse(node)
{

  try
  {
    var type = node.nodeType;

    // if it's an element dump the tag and recurse the children
    if (type == Node.ELEMENT_NODE)
    {
      //      xvyasddaamsg += "<" + node.tagName + ">" + EOLN;
      xvyasddaamsg += node.tagName + EOLN;
      // go through the children
      if (node.hasChildNodes())
      {
        var children = node.childNodes;
        var i, length = children.length;
        for (i = 0; i < length; i++)
        {
          var child = children[i];
          traverse(child);
        }
        //xvyasddaamsg += "</" + node.tagName + ">" + EOLN;
        xvyasddaamsg += node.tagName + EOLN;
      }
    }
    // it's just text, no tag, dump "Text"
    else if (type == Node.TEXT_NODE)
    {
      xvyasddaamsg += node.data + '- Text' + EOLN;
    }
  }
  catch (error)
  {
    gjonerror( error, "traverse ");
  }

  return xvyasddaamsg;
}

function dumpTree()
{

  var EOLN = "\n";

  xvyasddaamsg = 'traverse' + EOLN;

  var node = document.documentElement;
  dump("Document Tree:\n");
  dump(traverse(node, ""));
  dump("\n");
}

function dumpTreeWindow()
{

  EOLN = '<br>';
  xvyasddaamsg = 'traverse' + EOLN;


  var node = document.documentElement;
  doDump(traverse(node, ""));
}

// if no objname, try and dump to debug console
function dumpIt(obj, objnamein)
{

  var astring0 = '';
  var astring1 = '';
  var astring2 = '';
  var astring3 = '';
  var astring4 = '';
  var astring5 = '';
  var astring6 = '';
  var objname = '';

  if(objnamein)
  {
    astring0 = '' + objnamein + ' : ';
    objname = objnamein;
  }
  else
  {
    EOLN = "\n";
    EOL = EOLN;
    objname ="generic";
  }

  try
  {
    if(typeof(obj) != "undefined")
    {

      if (typeof(obj) == 'function')
      {
        astring1 += 'is a function ';
        astring2 += showProperties(obj, objname);
        astring3 += showLength(obj, objname);
        astring4 += showConstructor(obj, objname);
        astring5 += showtoString(obj, objname);
      }

      if (typeof(obj) == 'object')
      {
        //I want to figure out if its an HTMLElement
        //show properties is not working to show me more
        //the other stuff is throwing errors
        astring1 += 'is an object ';
        astring2 += showProperties(obj, objname);
        //astring3 += showLength(obj, objname);
        //astring4 += showConstructor(obj, objname);
        //astring5 += showtoString(obj, objname);
      }

      if (typeof(obj) == 'string')
      {
        astring1 += 'is a string ';
        astring2 += showProperties(obj, objname);
        astring3 += showLength(obj, objname);
        astring4 += showConstructor(obj, objname);
        astring5 += showtoString(obj, objname);
      }

      if (typeof(obj) == 'number')
      {
        astring1 += 'is a number ';
        //astring2 += showProperties(obj, objname);
        //astring3 += showLength(obj, objname);
        astring4 += showConstructor(obj, objname);
        astring5 += showtoString(obj, objname);
      }
    }
    else
    {
      astring1 += " is an undefined whatever";
    }
  }
  catch(e)
  {
    astring1 += "Error Thrown trying to determine state of input ";
  }

  doDump(astring0 + astring1 + EOL + astring2 + EOL + astring3 + EOL + astring4 + EOL + astring5  + EOL + astring6);

}

function showProperties(obj, objName)
{

  var result = "showProperties: "
  try
  {
    for (var i in obj)
    {
      //maybe if gecko
      //lets skip my functions
      if(typeof(obj[i]) == 'function')
      {
        /*
        var re2 = /native code/;
        if(!re2.test(obj[i]))
        {
        */
        continue;
        //        }
      }

      if(obj[i]  == 'innerHTML') continue;
      if(obj[i]  == '') continue;
      if(i  == 'innerHTML') continue;
      if(i  == '') continue;

      result += objName + "." + i + " = " + obj[i] + EOL;

    }
  }
  catch(e)
  {
    result += "ShowProperties Error " + e;
  }
  return result;
}

function showLength(obj, objName)
{
  var astring3 = 'showLength:';

  try
  {
    if(typeof(obj) != "undefined")
    {
      if (typeof(obj.length) == 'undefined')
      {
        astring3 += "length undefined";
      }
      else
      {
        astring3 += "length = " + obj.length;
      }
    }
  }
  catch(e)
  {
    astring3 += "Error Thrown on getting length";
  }
  return astring3;
}

function showConstructor(obj, objName)
{
  var astring4 = "showConstructor: ";

  try
  {
    if (typeof(obj.constructor) == 'undefined')
    {
      astring4 += "constructor undefined";
    }
    else
    {
      astring4 += "constructor = " + typeof(obj.constructor);
    }
  }
  catch(e)
  {
    astring4 += "Error Thrown on getting constructor ";
  }
  return astring4;
}

function showtoString(obj, objName)
{
  var astring5 = "showtoString: ";
  try
  {
    if(typeof(obj) != "undefined")
    {
      astring5 += obj.toString();
    }
  }
  catch(e)
  {
    astring5 += "Error Thrown on getting toString ";
  }
  return astring5;
}

/*
requires

<div id="testplace" style="height:20em; overflow:auto;overflow-x:scroll;overflow-y:scroll;">
<p id='theop'> </p>
</div>

*/
function byTagNamesforElement(idin, toConsole)
{
  /*
  another sidebar label test
  thebuttonid = document.getElementById('alabel');
  thebuttonid.value = 'replaced value';
  // thebuttonid = 'replaced';
  // thebuttonid.label = 'rplaced';
  */
  var mystr;
  var root = document.getElementById(idin)
  var oNodeList = root.getElementsByTagName('*');
  //var oNodeList = document.body.getElementsByTagNameNS('','*');
  var nodeCount = oNodeList.length;

  if(toConsole)
  {
    dump("There are " + nodeCount + " nodes " + "\n");
  }
  else
  {
    changeInnerHTML("theop", returnInnerHTML("theop") + "<br>" + "There are " + nodeCount + " nodes " );
  }

  try
  {
    for (var i = 0; i < nodeCount; i++)
    {
      var node = oNodeList.item(i);

      //I need to dump the attrirbutes specfic to a name
      //xul button has dependents of xul:hbox , xul:image, xul:label
      //dom inspector shows label attached to button
      if(toConsole)
      {
        if(node.localName == 'button')
        {
          mystr = ", localName: " + node.localName + " -type- " + node.type + " -name- " + node.name;
          mystr += " -label- " + node.label + " -id- " + node.id + "\n";
          dump("number " + (i+1) + mystr);
          //sidebar label test this works

          /*
          if(node.id == 'b2')
          {
          node.label = 'get er done';
          }
          */
        }
        else
        {
          dump("number " + (i+1) +  ", localName: " + node.localName + " -type- " + node.type + " -name- " + node.name + " -id- " + node.id + "\n");
        }
      }
      else
      {
        changeInnerHTML("theop", returnInnerHTML("theop") + "<br>" +   "number " + (i+1) + ", local name: " + node.localName + " " + node.type + " " + node.name );
      }
    }
  }
  catch(error)
  {
    if(isGecko())
    {
      alert("byTagNamesforElement error " + error.name + " " + error.message );
      //var wintxt = "<br>" + "byTagNames error "  + error.name +  " " +  error.message;
      //changeInnerHTML("theop", returnInnerHTML("theop") + "<br>" +   wintxt);
    }
    else
    {
      var wintxt = "<br>" + "byTagNames error " + error.name + " - - -  " + " " +  error.message;
      changeInnerHTML("theop", returnInnerHTML("theop") + "<br>" + wintxt);
    }
  }
}

function showInnerHTML(idin)
{
  /*

  IE does inner outer text and outer html
  MOz does innerhtml

  */

  var msg = ' ';
  try
  {
    var myE= document.getElementById(idin);

    msg+= " InnerText is: " + myE.innerText + "\n\n";
    msg+= " InnerHTML is: " + myE.innerHTML + "\n\n";
    msg+= " outerText is: " + myE.outerText + "\n\n";
    msg+= " outerHTML is: " + myE.outerHTML + "\n\n";
    alert(msg);
  }
  catch (error)
  {
    gjonerror( error, "showInnerHTML error ");
  }
}

/*this is a work in progress */
function displayIMG()
{
  try
  {
    newwin = window.open(url, "winpopup1","WIDTH=600,HEIGHT=350");
    newwin.focus();
    checkbox_on = new Image();
    checkbox_on.src = "/images/guide/guide_checkbox_on.gif";
  }
  catch (error)
  {
    gjonerror( error, " displayIMG");
  }
}

function enum_and_sort(o)
{
  try
  {
    var all = [];
    for(n in o)
    {
      all.push(n);
    }
    all.sort();

    for(n in all)
    {
      print(all[n]);
    }

    print("total count: "+all.length);
  }
  catch (error)
  {
    gjonerror( error, "enum_and_sort");
  }
}


//looks like IE wants the height, width, top , left in an inline style
//
// if evt is null, then use the center of the screen
function popCSGSDiv(evt,idin, buttonID, name, width, height)
{
  try
  {
    var theObj = document.getElementById(idin);
    var isVisib = theObj.style.visibility;

    if(isIE())
    {
      if(theObj.scrollHeight)
      {
        setHeight(idin, theObj.scrollHeight + 4);  // for the border
      }
    }

    if (isVisib == "visible" || isVisib == "show")
    {
      document.getElementById(buttonID).value="Display " + name;
      var popItUp = GCSGS();
      //      var popItUp = new CSGS();

      var myNum = popItUp.addElement(idin);
      popItUp.addEffect(myNum,'myClip','myKeep');
      //    popItUp.addEffect(idin,'myWipe','myKeep');  Not yet
      popItUp.setIntervalSpeed(60);
      popItUp.setMI(myNum, 40);
      popItUp.setMIE(myNum, 10);
      popItUp.addMove(myNum, 'cl','cl','r' ,'b' );
      popItUp.doIt();
      //      delete popItUp;
    }
    else if (evt == null)
    {
      document.getElementById(buttonID).value="Hide " + name;
      var popItUp = GCSGS();
      //      var popItUp = new CSGS();

      var myNum = popItUp.addElement(idin);
      popItUp.setIntervalSpeed(60);
      popItUp.setMI(myNum, 25);
      popItUp.addMove(myNum, 'tl','tl', 'c', 'c');
      popItUp.doIt();
      //      delete popItUp;

    }
    else
    {
      var topVal = getEventY(evt) + 20;
      var leftVal = getEventX(evt);

      document.getElementById(buttonID).value="Hide " + name;
      //      var popItUp = new CSGS();
      var popItUp = GCSGS();

      var myNum = popItUp.addElement(idin);
      popItUp.setIntervalSpeed(60);
      popItUp.setMI(myNum, 25);
      popItUp.addMove(myNum, 'tl','tl', leftVal, topVal);
      popItUp.doIt();
      //      delete popItUp;
    }
  }
  catch (error)
  {
    gjonerror( error, "popCSGSDiv");
  }

}

function createDynDiv(mywidth, myheight, mytop, myleft, idin)
{

  // relatively positioned so that can have absolutely positioned children,
  // but it still appears in the normal element flow
  // WIP relative
  var DynDiv = document.createElement("DIV");
  DynDiv.style.position     = "absolute";     // Set absolute positioning ? relative
  if(isGecko())
  {
    DynDiv.style.width        = mywidth + "px";
    DynDiv.style.height       = myheight + "px";
    DynDiv.style.top        = mytop + "px";
    DynDiv.style.left       = myleft + "px";
    DynDiv.style.border       = "2px solid black";
    DynDiv.style.backgroundColor  = "white";
    DynDiv.style.zIndex       = 2;

    //clip has to add in border width + padding?
    mywidth             += 12;
    myheight            += 12;
    DynDiv.style.clip       = 'rect(' + 0 + ',' + mywidth + ',' + myheight + ',' + 0 +')';
    DynDiv.style.visibility     = 'hidden';
    DynDiv.style.overflow     ='auto';
  }
  else
  if(isIE())
  {
    DynDiv.style.width        = mywidth;
    DynDiv.style.height       = myheight;
    DynDiv.style.top        = mytop;
    DynDiv.style.left       = myleft;
    DynDiv.style.border       = "2px solid black";
    DynDiv.style.backgroundColor  = "white";
    DynDiv.style.zIndex       = 2;

    mywidth             += 12;
    myheight            += 12;
    DynDiv.style.clip       = 'rect(' + 0 + ',' + mywidth + ',' + myheight + ',' + 0 +')';
    DynDiv.style.visibility     = 'hidden';
    DynDiv.style.overflow     ='auto';
  }
  else
  {
    alert('unknown browser');
  }

  if(idin)
  {
    DynDiv.id = idin;
  }

  // Now add the DynDiv we've built to the document body
  document.body.appendChild(DynDiv);

  return DynDiv;
}



function displayDivMessage(title, msg, myevent)
{

  var iDisplayWidth   = 640;
  var iDisplayHeight    = 400;
  var iCAtTop       = 800;
  var iCAtLeft      = 800;


  if(myevent)
  {
    var iSFromTop     = getEventY(myevent) - 200;
    var iSFromLeft      = getEventX(myevent) - 200;
    var iSToTop       = getEventY(myevent);
    var iSToLeft      = getEventX(myevent);
  }
  else
  {
    var iSFromTop     = 'll';
    var iSFromLeft      = 'll';
    //    var iSToTop       = 'c';
    var iSToTop       = 't';
    //    var iSToLeft      = 'c';
    var iSToLeft      = 'l';
  }



  var sSEffect      = '';
  var iSMoveSpeed     = 60;

  var iHFromTop     = 'cl';
  var iHFromLeft      = 'cl';
  var iHToTop       = 'b';
  var iHToLeft      = 'r';
  //var sHEffect      = 'myWipe';
  var sHEffect      = 'myClip';
  var iHMoveSpeed     = 60;

  var idName        = 'myMessage' + mkunique();

  var f         = 'f';
  var m         = 'm';
  var o         = 'o';

  try
  {
    var newDiv  = createDynDiv(iDisplayWidth,iDisplayHeight, iCAtLeft,iCAtTop, idName);

    var wintxt  = '';

    wintxt += "<input type='button' id='xxxx' title='Close' class='buttonNgold' value='Close' onClick='";
    wintxt += "hideIt(" + '"' + idName + '"' + "," + iDisplayWidth + "," + iDisplayHeight + "," + '"' + iHFromLeft + '"' + "," + '"' + iHFromTop + '"' + ',' +   '"' + iHToLeft   + '"' + "," +  '"' +iHToTop  + '"' + "," + '"' + sHEffect + '"' + ',' + iSMoveSpeed + ");'";
    wintxt += "onmouseover='toggleHighLight(" + '"' + m + '"' + ", this.id);'";
    wintxt += "onmouseout='toggleHighLight(" + '"' + o + '"' + ", this.id);'>";
    wintxt += "<br><br>";

    wintxt += "<div style='border:13px outset red;width:70%; margin-left:15%; margin-right:15%;'> ";
    wintxt += "<p style='font-size: 19px; color:black;padding-right:4px; padding-left:4px;'>";
    wintxt += title + "<br><br>";
    wintxt += "</p>";
    wintxt += "</div>";
    wintxt += "<p style='font-size: 19px; color:black;padding-right:4px; padding-left:4px;'>";
    wintxt += msg + "<br><br>";

    newDiv.innerHTML = wintxt;
    showIt(idName, iDisplayWidth, iDisplayHeight, iSFromLeft, iSFromTop, iSToLeft, iSToTop, sSEffect, iSMoveSpeed) //this is questionable as I dont have an id as yet
  }
  catch(error)
  {
    alert(title + msg + error);
  }
}
/*
setDebug on
mozilla
when it gets to  setgone in the move code, it is still flashing

*/


function displayDivMessage2(title, msg, tt, tl, dh, dw)
{
  var iCAtTop       = 800;
  var iCAtLeft      = 800;
  var iSFromTop     = 'll';
  var iSFromLeft      = 'll';

  if(tt && typeof( tt) == 'number' || typeof( tt) == 'string')
  {
    var iSToTop       = tt;
  }
  else
  {
    alert('wake up in displayDivMessage2');
    return;
  }

  if(tl && typeof( tl) == 'number' || typeof( tl) == 'string')
  {
    var iSToLeft        = tl;
  }
  else
  {
    alert('wake up in displayDivMessage2');
    return;
  }


  if(dh && typeof( dh) == 'number')
  {
    var iDisplayHeight    = dh;
  }
  else
  {
    alert('wake up in displayDivMessage2');
    return;
  }

  if(dw && typeof( dw) == 'number')
  {
    var iDisplayWidth   = dw;
  }
  else
  {
    alert('wake up in displayDivMessage2');
    return;
  }

  var sSEffect      = '';
  var iSMoveSpeed     = 60;

  var iHFromTop     = 'cl';
  var iHFromLeft      = 'cl';
  var iHToTop       = 'b';
  var iHToLeft      = 'r';
  //var sHEffect      = 'myWipe';
  var sHEffect      = 'myClip';
  var iHMoveSpeed     = 60;

  var idName        = 'myMessage' + mkunique();

  var f         = 'f';
  var m         = 'm';
  var o         = 'o';

  try
  {
    var newDiv  = createDynDiv(iDisplayWidth,iDisplayHeight, iCAtLeft,iCAtTop, idName);

    var wintxt  = '';

    wintxt += "<input type='button' id='xxxx' title='Close' class='buttonNgold' value='Close' onClick='";
    wintxt += "hideIt(" + '"' + idName + '"' + "," + iDisplayWidth + "," + iDisplayHeight + "," + '"' + iHFromLeft + '"' + "," + '"' + iHFromTop + '"' + ',' +   '"' + iHToLeft   + '"' + "," +  '"' +iHToTop  + '"' + "," + '"' + sHEffect + '"' + ',' + iSMoveSpeed + ");'";
    wintxt += "onmouseover='toggleHighLight(" + '"' + m + '"' + ", this.id);'";
    wintxt += "onmouseout='toggleHighLight(" + '"' + o + '"' + ", this.id);'>";
    wintxt += "<br><br>";

    wintxt += "<div style='border:5px outset red;width:70%; margin-left:15%; margin-right:15%;'> ";
    wintxt += "<p style='font-size: 19px; color:black;padding-right:4px; padding-left:4px;'>";
    wintxt += title + "<br><br>";
    wintxt += "</p>";
    wintxt += "</div>";
    wintxt += "<p style='font-size: 16px; color:black;padding-right:4px; padding-left:4px;'>";
    wintxt += msg + "<br><br>";

    newDiv.innerHTML = wintxt;
    showIt(idName, iDisplayWidth, iDisplayHeight, iSFromLeft, iSFromTop, iSToLeft, iSToTop, sSEffect, iSMoveSpeed) //this is questionable as I dont have an id as yet
  }
  catch(error)
  {
    alert(title + msg + error);
  }
}


//  I could use the event that is used to trigger this to calculate a better set of To cordinates!

function showIt(divIn,iDisplayWidth, iDisplayHeight, iFromLeft, iFromTop, iToLeft, iToTop, sEffect, iMoveSpeed)
{
  //  showItobj = new CSGS(); Jun 15 2007 assignment to undeclared variable showItobj
  var showItobj = GCSGS();

  var thisNum = showItobj.addElement(divIn);
  //  showItobj.addEffect(divIn,sEffect);
  showItobj.setIntervalSpeed(iMoveSpeed);
  showItobj.setMI(thisNum, 25);
  showItobj.addMove(thisNum, iFromLeft,iFromTop, iToLeft, iToTop);
  showItobj.doIt();
  //  delete showItobj;
}

//id, where to go, effect
function hideIt(divIn, iDisplayWidth, iDisplayHeight, iFromLeft, iFromTop, iToLeft, iToTop, sEffect, iMoveSpeed )
{
  //  hideItobj = new CSGS(); // Jun 15 2007
  var hideItobj = GCSGS();

  var thisNum = hideItobj.addElement(divIn);
  //  hideItobj.addEffect('myWipe', delay, speed) //need this stuff
  //  removed aug 2004 to get rid of annoying flash in displaymessage2
  //  not fully tested  hideItobj.addEffect(thisNum,sEffect,'myKeep');
// Aug 2011 comment out addeffect
 //hideItobj.addEffect(thisNum,sEffect);
  hideItobj.setIntervalSpeed(iMoveSpeed);
  hideItobj.setMI(thisNum, 40);
  hideItobj.setMIE(thisNum, 10);
  hideItobj.addMove(thisNum, iFromLeft,iFromTop, iToLeft, iToTop);
  hideItobj.doIt();
  //  delete hideItobj;
}

function displayAttributeAsAlert(elementId, attrName)
{
  try
  {
    if (document.getElementById)
    {
      var el = document.getElementById(elementId);
      var attrVal = el.getAttribute(attrName);
      var alertStr = "Element ID: " + elementId + "\n";
      alertStr += "Attribute name: " + attrName + "\n";
      alertStr += "Attribute value: " + attrVal;
      window.alert(alertStr);
    }
  }
  catch (error)
  {
    gjonerror( error, "displayAttributeAsAlert");
  }
}