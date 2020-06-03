
onmessage = function(e)
{
  if ( e.data === "start" )
  {
    // Do some computation
    doUnzipT("what")
  }
  else
  {
      postMessage("not done")
  }
};



function doUnzipT(where)
{

  postMessage("one");
  var opdir = gj53runGetPrefString("URL1");

  //by the time I get here, I should have created it,  check to make sure they did not fat finger delete it

  var opdirObj = getLocalFileObj(opdir);
  if(!opdirObj.exists())
  {
    gj53runShowAlert(null, "-- Error --", "Your directory " + opdir + " does not exist - Please Reinstall \n" );
    window.close();
    return;
  }

  var zipdir = getZipDirLocalFileObj();  //get the directory where install left the zip files

// I now have 4 zip files
    szipFiles = new Array ("gj53run1.zip",
    "gj53run2.zip",
    "gj53run3.zip",
    "gj53run4.zip");

  //var zipfileName = getZipFileName();  //return gj53run_1.0.0.zip , build the command string

  // start building the script

  var unzip = "unzip ";
  postMessage("two");

  var os = gjwhichOS();

  //do once for each zipfile
  for(var i=0; i < szipFiles.length; i++)
  {
    showProgress('p' + i);

    var scriptfile = zipdir.clone();

    if (os == "w")
    {
      scriptfile.append("gjtemp.cmd");
    }
    else if((os == 'm') || (os == 'x'))
    {
      scriptfile.append("gjtemp.sh");
    }
    var fos = Components.classes["@mozilla.org/network/file-output-stream;1"]
    .createInstance(Components.interfaces.nsIFileOutputStream);
    fos.init(scriptfile, 0x04 | 0x08 | 0x20,0700, 0);
    //  fos.init(scriptfile, -1, -1, false);

    var line;

    if (os == "w")
    {
      line = "cd /d ";
      line += "\"" + zipdir.path + "\"\n";
      line += unzip + "-uo " +  szipFiles[i] + " -d\"" + opdir +  "\"" + "\n";
    }
    else if((os == 'm') || (os == 'x'))
    {
      line = '#!/bin/sh' + "\n";
      line += "cd -P ";
      line += "\"" + zipdir.path + "\"\n";
      line += unzip + "-uo " +  szipFiles[i] + " -d\"" + opdir +  "\"" + "\n";
    }
    else
    {
      gj53runShowAlert(null, "-- Error --", "\nPlatform " + os + " Not supported" );
    }

    line += "\n";
    fos.write(line, line.length);
    fos.close();

    Components.utils.reportError("Debug Msg doUnzip command " + line);

    // create an nsIProcess
    /*
    WARNING: This API is lossy. Use GetTarget !, file c:/moz/mozilla/xpcom/io/nsLocalFileWin.cpp, line 2870
    */

    var process = Components.classes["@mozilla.org/process/util;1"]
    .createInstance(Components.interfaces.nsIProcess);

    if(os == 'w')
    {
      process.init(scriptfile);
    }
    else if((os == 'm') || (os == 'x'))
    {
      //run a shell to run the commands
      var sh = Components.classes["@mozilla.org/file/local;1"]
      .createInstance(Components.interfaces.nsILocalFile);
      sh.initWithPath("/bin/sh");
      process.init(sh);
    }
    else
    {
      gj53runShowAlert(null, "-- Error --", "\nPlatform " + os + " Not supported" );
    }


    var args = [scriptfile.path];

    try
    {
      //process.run(true, args, args.length);
      process.run(false, args, args.length);
    }
    catch (err)
    {
      gjonxulerror("error", "Failure in doUnzip process.run " + err);
    }
  }

  try
  {
    //repeat for all zip files
    for(var i=0; i < szipFiles.length; i++)
    {
      var zipfile = getZipFileLocalFileObjT(szipFiles[i]);  //the real zipfile obj, so it can be deleted
      //zipfile.remove(false);
    }

    scriptfile.remove(false);
  }
  catch (err)
  {
    gjonxulerror("error", "Failure in doUnzip remove zip file " + err);
  }

  var myurl2 = "chrome://gj53run/content/MyStartup.xul";

  //Components.utils.reportError("Debug Msg doUnzip myurl2:  " + myurl2);

  //the if was addded to handle the case where they have done filepicker and it won't display MyStartup
  // hitting ok and starting filepicker changes the window environment

  if(where == 'j')
  {
    //gj53runopenURLIn(myurl2);  fails
    //gj53runShowAlert(null, "Victory", "You have installed to the new directory: " + opdir);
    mySBopenURLIn(myurl2, "current");
  }
  else
  {
  //This fails if when its and Update and a nsFilePicker is used to pick a new directory
    window.close();
    gj53runopenURLIn(myurl2);
    //mySBopenURLIn(myurl2, "window");
  }

}

function getZipFileLocalFileObjT(infile)
{
  try
  {
    var sstrpart1 = getFFpath('ProfD')
    var sstrpart2 = makePlatformPath('\\extensions\\{2ea91495-764f-44ab-9639-dcb810fa1b43}\\temp\\');

    var zipfile = Components.classes["@mozilla.org/file/local;1"]
    .createInstance(Components.interfaces.nsILocalFile);

    //debug code
    var os = gjwhichOS()

    if(os == 'w')
    {
      zipfile.initWithPath(sstrpart1 + sstrpart2 + infile);
    }
    else if((os == 'm') || (os == 'x'))
    {
      Components.utils.reportError("Debug Msg getZipFileLocalFileObj" + sstrpart2 );
      zipfile.initWithPath(sstrpart1 + sstrpart2 + infile);
    }

    return zipfile
  }
  catch (err)
  {
    gjonxulerror("error  getZipFileLocalFileObj ", err);
    return false;
  }
}

function showProgress(what)
{
  try
  {
    //document.getElementById(what).style.display='block';
  postMessage(what);

  }
  catch (err)
  {
  }
}