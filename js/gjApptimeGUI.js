/*
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Copyright © 2000-2012 by Gary Johnson
The Full Copyright statement is

http://garyjohnsoninfo.info/XXSoftwareTools/Copyright.html

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
*/

var alarmObject = new CAlarmTimer(this,0,0,0,0,1,1," ", -10);

var myOptions = new CTimerOptions(this);

var mySSS = new CScreenSaverState();

//for toggleDivVisibilityZ
var myZ = 1;

function realsetUP()
{
changeInnerHTML('myTime2','Loading...');
//  alarmObject.playWav("Sounds/Chimes.wav");
setUP();
}

function doSwitch()
{
var curr = document.getElementById("xzCCz2").value;

//add options and help

  if (curr == "Count Down Timers")
  {
    document.getElementById("xzCCz2").value = "Stop Watch";
    setDisplayH("CountDownT");
    setDisplayV("StopWatchT");
  }
  else if (curr == "Stop Watch")
  {
    document.getElementById("xzCCz2").value = "Time Alarms";
    setDisplayH("StopWatchT");
    setDisplayV("AlarmTimeT");
  }
  else if (curr == "Time Alarms")
  {
    document.getElementById("xzCCz2").value = "Count Down Timers";
    setDisplayH("AlarmTimeT");
    setDisplayV("CountDownT");
  }

}

function really()
{
  if (alarmObject.alarmTimes[FN.NUMBERALARMS] == 0)
  {
    return (void 0);
  }
  else
  if(alarmObject.anyActiveAlarms() == false)
  {
    return (void 0);
  }
  else
  {
    mess = " You have Active Timers\n Click 'OK' and you Cancel all your timers and leave\n Else \n You will stay";
  }

return mess;
}


function currentTime()
{
  var now  = new Date();

  var hour  = now.getHours();
  var min  = now.getMinutes();
  var sec  = now.getSeconds();

 if((min % 5 == 0) && (sec < 3))
  {
    mySSS.bDoSS = 1;
    if(mySSS.iState == 0) {mySSS.iState = 1;}
  }
  else
  {
    mySSS.bDoSS = 0;
    if(mySSS.iState == 2) {mySSS.iState = 1;}
  }

  if(mySSS.bDoSS == 1)
  {
    if(mySSS.iState == 1)
    {
      setSS();
      mySSS.iState = 2;
    }
  }

  if(mySSS.bDoSS == 0)
  {
    if(mySSS.iState == 1)
    {
      resetDisplay();
      mySSS.iState = 0;
    }
  }

  if(myOptions.m_bShowTime)
  {

    if(myOptions.m_bClock24Hour)
    {
      if(myOptions.m_bDisplayClockSecond)
      {
        var msg1 = format24HourTime(hour, min, sec);
      }
      else
      {
        var msg1 = formatshort24HourTime(hour, min);
      }
    }
    else
    {
      if(myOptions.m_bDisplayClockSecond)
      {
        var msg1 = format12HourTime(hour, min, sec);
      }
      else
      {
        var msg1 = formatshort12HourTime(hour, min);
      }
    }
  }
  else
  {
    msg1='';
  }

  var msg2 = ' ';

  if(myOptions.m_bShowDate)
  {
      msg2 += '' + getShortDayName(now.getDay()) + ', ' + getShortMonthName(now.getMonth()) + ' ' + now.getDate() + ', ' + now.getFullYear();
  }
  else
  {
    msg2 ='';
  }
    msg3 = '';

  alarmObject.updateAlarms(now);
  alarmObject.checkAlarms(now);

  if( msg1 == '' && msg2 == '' && msg3 == '')
  {
    setGone('TimeDiv');
  }
  else
  {
    var myTimeTime =    document.getElementById('myTime');
    var myTimeDate =    document.getElementById('myTime2');
    var myTimeJulian =  document.getElementById('myTime3');

    if(myTimeTime)    myTimeTime.firstChild.nodeValue = msg1;
    if(myTimeDate)    myTimeDate.firstChild.nodeValue = msg2;
    if(myTimeJulian)  myTimeJulian.firstChild.nodeValue = msg3;
  }

  setTimeout("currentTime()", (myOptions.m_iUpdateInterval * 1000));
}


function CScreenSaverState  (aObjectReference,
bDoSS,
iState,
bwmv,
bwtv,
bwpv,
bwlv,
bwsv,
bwnv)
{

  this.bDoSS = 0;
  this.iState = 0;

  if(!isIE())
  {
      this.bwmv = window.menubar.visible;
      this.bwtv = window.toolbar.visible;
      this.bwpv = window.personalbar.visible;
      this.bwlv = window.locationbar.visible;
      this.bwsv = window.scrollbars.visible;
      this.bwnv = window.statusbar.visible;
  }
}

function setUP()
{
  if(!myOptions.m_bDisplayClockSecond)
  {
    changeInnerHTML('tdCSeconds'," ");
    setHidden('tdCSeconds');
  }

  alarmObject.tblVar = document.createElement('TABLE');  //Jun 15 2007 c undeclared ; but its a global for now see storeResults in gjtime to fix
  alarmObject.tblVar.setAttribute('width', 320);
  alarmObject.tblbodyVar  = document.createElement('TBODY');  //Jun 15 2007 WTF
  currentTime();

}
function showItT(divIDtoShow, width, height,buttonID, name)
{
  myZ = toggleDivVisibilityZ(divIDtoShow, width, height, myZ);

  if(isVisible(divIDtoShow))
  {
    if(divIDtoShow == 'TimeOptsinfo')
    {
      myOptions.setForm('OptionsTime');
    }
    document.getElementById(buttonID).value="Hide " + name;
  }
  else
  {
    document.getElementById(buttonID).value="Display " + name;
  }
}


function toggleDivVisibilityZ(idin, width, height, myZ)
{
  try
  {
    if(isVisible(idin))
    {
      setZ(idin, --myZ);
      setHidden(idin);
    }
    else
    {
      setZ(idin,++myZ);
      setVisible(idin);
    }
  }
  catch (error)
  {
    gjonerror( error, " toggleDivVisibility ");
  }
  return myZ;
}

function resetDisplay()
{
  setClass("mymain","mw2");
}

function setSS()
{
  //call coffee caffiene keyboard or mouse click here to stop from going to sleep - Power Management
  setClass("mymain","mw");
  // document.body.style.margin=0;
}

function setCountDownAlarm(form)
{
  var cdHours = form.CHours.selectedIndex;
  var cdMinutes = form.CMinutes.selectedIndex;

  if(myOptions.m_bDisplayClockSecond)
  {
    var cdSeconds = form.CSeconds.selectedIndex;
  }
  else
  {
    var cdSeconds = '';
  }

  var sFileSpec = form.ringCDAlarm.options[form.ringCDAlarm.selectedIndex].value;
  var iRepeater = form.ARepeater.options[form.ARepeater.selectedIndex].value;
  var sName = form.AlarmName1.value;

  if((cdHours == 0) && (cdMinutes == 0) && (cdSeconds == 0))
  {
    return false;
  }
  else
  {
    if(alarmObject.SuperKludgewithJimmies(myAlarm.COUNTDOWN)) { return false;}
    setVisible('CountDownTime');
    alarmObject.setAlarm (cdHours, cdMinutes, cdSeconds, sFileSpec,iRepeater,sName, 'CountDownTime',myAlarm.COUNTDOWN );
  }
  return true;
}


function setTimeAlarm (form)
{
  var atHours = form.AHours.options[form.AHours.selectedIndex].value;
  var atMinutes = form.AMinutes.selectedIndex;
  //var atSeconds = form.ASeconds.selectedIndex;
  var atSeconds = 0;
  var asFileSpec= form.ringTimeAlarm.options[form.ringTimeAlarm.selectedIndex].value;
  var aiRepeater= 1;
  var asName= "";

  if(alarmObject.SuperKludgewithJimmies(myAlarm.TIME)) { return false;}
  setVisible('AlarmTime');
  alarmObject.setAlarm (atHours, atMinutes, atSeconds, asFileSpec,aiRepeater,asName, 'AlarmTime',myAlarm.TIME );
  return true;
}

function setStopWatch (form)
{
  var now = new Date();

  var swhour= now.getHours();
  var swmin = now.getMinutes();
  var swsec = now.getSeconds();
  var swFileSpec= "";
  var swRepeater= 1;
  var swName= "";

  if(alarmObject.SuperKludgewithJimmies(myAlarm.STOPWATCH)) { return false;}
  setVisible('StopWatchTime');
  alarmObject.setAlarm (swhour, swmin, swsec, swFileSpec,swRepeater,swName, 'StopWatchTime',myAlarm.STOPWATCH );
  return true;
}


function setIntervalAlarms(form)
{
  var cdHours1 = form.CSeconds.value -0;
  var cdMinutes1 = form.CMinutes.value -0;

  if(myOptions.m_bDisplayClockSecond)
  {
    var cdSeconds1 = form.CSeconds.value -0;
  }
  else
  {
    var cdSeconds1 = '';
  }

  var sFileSpec1 = form.ringCDAlarm1.options[form.ringCDAlarm1.selectedIndex].value;
  var iRepeater = form.ARepeater2.options[form.ARepeater2.selectedIndex].value;
  var sName1 = form.AlarmName1.value;

  if(cdSeconds1 == 0)
  {
    return false;
  }

  var cdHours2 = form.CSeconds2.value -0;
  var cdMinutes2 = 0;

  if(myOptions.m_bDisplayClockSecond)
  {
    var cdSeconds2 = form.CSeconds2.value -0;
  }
  else
  {
    var cdSeconds2 = '';
  }

  var sFileSpec2 = form.ringCDAlarm2.options[form.ringCDAlarm2.selectedIndex].value;
  var iRepeater = form.ARepeater2.options[form.ARepeater2.selectedIndex].value;
  var sName2 = form.AlarmName2.value;

  if(cdSeconds2 == 0)
  {
    return false;
  }

  setVisible('CountDownTime');
  var counter =0;

  var cdsecondsT1=0;
  var cdsecondsT2=0;

  var exerciseTime = Roundit((((cdSeconds1 + cdSeconds2) * iRepeater) / 60), 2);
  var exerciseStr = 'Exercise Time: ' + exerciseTime + ' minutes';
  var totalTime = Roundit((cdMinutes1 / 60),2) + exerciseTime;
  var totalsStr = 'Total Time: ' + totalTime + ' minutes';
  storeDescription('ExerciseTime', exerciseStr, 'TotalTime', totalsStr);

  if (cdMinutes1 > 0)
  {
    alarmObject.setAlarm (0, 0, cdMinutes1, 'Sounds/Begin.wav',1,'Waiting', 'CountDownTime',myAlarm.INTERVAL );
    cdsecondsT1 = cdsecondsT1 + cdMinutes1;
  }
  else
  {
    alarmObject.playWav('Sounds/Begin.wav');
  }

  cdsecondsT1 = cdsecondsT1 + cdSeconds1;

  alarmObject.setAlarm (cdHours1, cdMinutes1, cdsecondsT1, sFileSpec1,1,sName1, 'CountDownTime',myAlarm.INTERVAL );
  cdsecondsT2=cdsecondsT1 + cdSeconds2;
  alarmObject.setAlarm (cdHours2, cdMinutes2, cdsecondsT2, sFileSpec2,1,sName2, 'CountDownTime',myAlarm.INTERVAL );

  counter++;
  for (counter; counter < iRepeater; counter++)
  {
    cdsecondsT1 =   cdsecondsT2 + cdSeconds1;
    cdsecondsT2 =   cdsecondsT1 + cdSeconds2;

    alarmObject.setAlarm (cdHours1, cdMinutes1, cdsecondsT1, sFileSpec1,1,sName1, 'CountDownTime',myAlarm.INTERVAL );
    if(iRepeater - counter > 1)
    {
      alarmObject.setAlarm (cdHours2, cdMinutes2, cdsecondsT2, sFileSpec2,1,sName2, 'CountDownTime',myAlarm.INTERVAL );
    }
    else
    {
      alarmObject.setAlarm (cdHours2, cdMinutes2, cdsecondsT2, "Sounds/Done.wav",1,"Last", 'CountDownTime',myAlarm.INTERVAL );
    }
  }

  return true;
}

function setTD(myin)
{
  myOptions.setOpt(myin);
}

function setTDi(myin,idfield,flag)
{
  if(checkPosNumber(myin))
  {
    if(myin > 60)
    {
      alert('error - intervals > 60 seconds are not available');
      document.getElementById(idfield).value = "Error";
      return;
    }
    myint = flag + myin;
    myOptions.setOpt(myint);
  }
  else
  {
    document.getElementById(idfield).value = "Error";
  }
}

function checkValid()
{
  var test1 = document.getElementById('fiUpdateInterval').value;

  if((test1 == "Error") || (!checkPosNumber(test1)))
  {
    doMessage('Error in Update Interval' + '<br>' + 'Please Fix before proceding');
    return;
  }
  else
  if(test1 > 7)
  {
    doMessage('Any option over 6 may not work at this time !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
  }

  myOptions.setit();
  doMessage('Your Options Have been Saved' + '<br>' + 'Hit Reload for them to take effect');

}

function runcancelTimer (which)
{
  alarmObject.cancelTimer(which);
}

function runstopStopWatch(which)
{
  alarmObject.stopWatchStop(which);
}


function testAlarm (mytheSecs,mytheWav, mytheName)
{

  var cdHours = 0;
  var cdMinutes = 0;
  var cdSeconds = mytheSecs -0;
  var sFileSpec = mytheWav;
  var iRepeater = 1;
  var sName = mytheName;


  setVisible('CountDownTime');
  alarmObject.setAlarm (cdHours, cdMinutes, cdSeconds, sFileSpec,iRepeater,sName, 'CountDownTime',myAlarm.COUNTDOWN );
  return true;
}

function checkPluginWav()
{
  op = "";

  for (i=0; i < navigator.plugins.length; i++)
  {
    for (j = 0; j < navigator.plugins[i].length; j++)
    {
      if(navigator.plugins[i][j].type == "audio/wav" || navigator.plugins[i][j].type == "audio/x-wav")
      {
        //op += navigator.plugins[i].name + " | " + navigator.plugins[i].filename + " | " +navigator.plugins[i][j].type
        op += navigator.plugins[i].name + " | " + navigator.plugins[i][j].type + "  ";
      }
    }
  }
  return op;
}
