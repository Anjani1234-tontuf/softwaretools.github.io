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

//May 2010 Moved from Timer.html to get IE to work

var alarmObject = new CAlarmTimer(this,0,0,0,0,1,1," ", -10);

var myOptions = new CTimerOptions(this);

var mySSS = new CScreenSaverState();

//for toggleDivVisibilityZ
var myZ = 1;
var AndroidKludge=false;

function mediaPlaybackRequiresUserGesture() {
  // test if play() is ignored when not called from an input event handler
  var video = document.createElement('video');
  video.play();
  return video.paused;
}

function realsetUP(){
AndroidKludge = mediaPlaybackRequiresUserGesture();
testOrientation();
if(!AndroidKludge) {
  alarmObject.playWav("Sounds/Chimes.wav");
}
changeInnerHTML('myTime2','Loading...');
setUP();
}

function testOrientation(){
document.getElementById('block_land').style.display=(screen.width>screen.height)?'none':'block';}

// 12-07-2005
//I may need to reset the location bars etc.
function really()
{
/*
  I want to guery if there is an active timer, if not, just let them go, else give them the warning
*/

//  this is alarmObject.dumpAllAlarms();

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
/*
 put this in the body
*/
  var now  = new Date();

  var hour  = now.getHours();
  var min  = now.getMinutes();
  var sec  = now.getSeconds();

  //mode              iState
  //display normal    0
  //display ss        2
  //change  display   1

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
  var msg3 = ' ';

  if(myOptions.m_bShowDate)
  {
    msg2 += '' + getDayName(now.getDay()) + ', ' + getMonthName(now.getMonth()) + ' ' + now.getDate() + ', ' + now.getFullYear();
//msg2 += '' + getShortDayName(now.getDay()) + ', ' + getShortMonthName(now.getMonth()) + ' ' + now.getDate() + ', ' + now.getFullYear() + ' The ' + getJulian(now.getDate(),now.getMonth()-1,now.getYear) + ' day of the year';
  }
  else
  {
    msg2 ='';
  }

  if(myOptions.m_bShowJulian)
  {
    msg3 += ' ' + 'Day ' + getJulian(now.getDate(),now.getMonth()-1,now.getYear);
  }
  else
  {
    msg3 = '';
  }

  // CheckForExternalAlarmAndSet experimantal see CDtimeOptions.htm
  //CheckForExternalAlarmAndSet();
  alarmObject.updateAlarms(now);
  alarmObject.checkAlarms(now);

  //if msg1 msg2 and msg3 are '', shrink the display
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

//    document.getElementById('myTime').firstChild.nodeValue = msg1;
//    document.getElementById('myTime2').firstChild.nodeValue = msg2;
//    document.getElementById('myTime3').firstChild.nodeValue = msg3;
  }

//  update interval

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

  //
  //Warning: Error in parsing value for 'left'.  Declaration dropped.
  //
	//its in moves  -
	//
	//Source File: file:///C:/ma/Personal/XXSoftwareTools/Timer.html
	//Line: 0
	//Showing this warning dialog generates the above, and the script no longer lets me hit close on the box
  //and continue
  //this has happended before,
	//I should abandon creadydn div and do it all in a real div, hide and show on in the html
	//just commenting out the warning for now
//function onclick(event) {
//hideIt("myMessage1314736234052", 750, 300, "cl", "cl", "r", "b", "myClip", 60);
//}

  if(myOptions.m_bShowStartupWarning)
  {
/*
    var Title = 'Important Notice';
    var line1 = 'Hit the "Check Alarm Play" Button.<br>If you do not see a Popup window, enable popups for this page.<br>';
    var line2 = "If you don't hear the sound play, adjust the volume of your speakers.<br>";

    var line3 = 'Please familiarize yourself with the Options and Help before you uses these Timers.<br> ';
    var line4 = 'Hit the Display Help Button and read the Help Section that Pops Up.&nbsp; ';
    var line5 = 'Hit the Hide Help Button.<br><br>';
    var line6 = 'Hit the Display Options Button.';
*/
    var Title = 'Important Notice\n';
    var line1 = 'Hit the "Check Alarm Play" Button.\nIf you do not see a new text on your screen, enable popups for this page.\n';
    var line2 = "If you don't hear the sound play, adjust the volume of your speakers.\n";

    var line3 = 'Please familiarize yourself with the Options and Help before you uses these Timers.\n';
    var line4 = 'Hit the Display Help Button and read the Help Section that Pops Up. ';
    var line5 = 'Hit the Hide Help Button.\n';
    var line6 = 'Hit the Display Options Button.';
    var Msg= line1 + line2 + line3 + line4 + line5 + line6;
    //
		// if I want to fix this, this is what I should start with gjmove.js
    //displayDivMessage2(Title, Msg,'t','l',300, 750);
    alert(Title + Msg);
    //setDisplayV("TimerWarning");
  }

  alarmObject.tblVar = document.createElement('TABLE');  //Jun 15 2007 c undeclared ; but its a global for now see storeResults in gjtime to fix
  alarmObject.tblVar.setAttribute('border', '0');
  alarmObject.tblVar.setAttribute('cellpadding', '2');
  alarmObject.tblVar.setAttribute('cellspacing', '2');
  alarmObject.tblVar.setAttribute('width', 450);
  alarmObject.tblbodyVar  = document.createElement('TBODY');  //Jun 15 2007 WTF
  //c1.appendChild( makeColumnHeader());

  //alarmObject.playWav("Sounds/Chimes.wav"); move inline
  //one of these days I will get this right; see oContainer and Loading stuff
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
      setHeight(idin,10);
      setWidth(idin,10);
      setZ(idin, --myZ);
      setHidden(idin);
    }
    else
    {
      if(width)
      {
        setWidth(idin,width);
        //should throw error here if width is bad
      }
      if(height)
      {
        setHeight(idin,height);
      }
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
/*
  if(isIE())
  {
      document.body.style.margin="2em";
      window.menubar.visible = mySSS.bwmv;
      window.toolbar.visible = mySSS.bwtv;
      window.personalbar.visible = mySSS.bwpv;
      window.locationbar.visible = mySSS.bwlv;
      window.scrollbars.visible = mySSS.bwsv;
      window.statusbar.visible = mySSS.bwnv;
  }
*/
}

function setSS()
{
  setClass("mymain","mw");

//  document.body.style.margin=0;
/*
  if(isIE())
  {
      window.menubar.visible = !mySSS.bwmv;
      window.toolbar.visible = !mySSS.bwtv;
      window.personalbar.visible = !mySSS.bwpv;
      window.locationbar.visible = !mySSS.bwlv;
      window.scrollbars.visible = !mySSS.bwsv;
      window.statusbar.visible = !mySSS.bwnv;
  }
*/
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

  // All timers are set by computing a future time when the timer is to be displayed
  // Interval timers are a slightly different animal

  //Time 1
  // var cdHours1 = form.CHours.value -0;
  var cdHours1 = form.CSeconds.value -0;
  //cdMinutes is really the delay start
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


  //Time 2
  //var cdHours2 = form.CHours2.value -0;
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


  //This loop is not a good example of iterative programming.
  //It is a good example of how to exploit my timing algrithm to do a bunch of things, without having to resort to
  //callbacks and more sophiscated programming

  // Post a description of this interval
  // Exercise Time = cdSeconds1 + cdSeconds2 * Repititions  = (x/60 minutes)
  var exerciseTime = Roundit((((cdSeconds1 + cdSeconds2) * iRepeater) / 60), 2);
  var exerciseStr = 'Exercise Time: ' + exerciseTime + ' minutes';
  // Total Time Exercise Time  + wait time  - cdMinutes1 / 60) total time
  var totalTime = Roundit((cdMinutes1 / 60),2) + exerciseTime;
  var totalsStr = 'Total Time: ' + totalTime + ' minutes';
  storeDescription('ExerciseTime', exerciseStr, 'TotalTime', totalsStr);

  //If they entered seconds to wait before start, do it here, note kludge with CdMinutes is really delay start seconds
  if (cdMinutes1 > 0)
  {
    alarmObject.setAlarm (0, 0, cdMinutes1, 'Sounds/Begin.wav',1,'Waiting', 'CountDownTime',myAlarm.INTERVAL );
    cdsecondsT1 = cdsecondsT1 + cdMinutes1;
    //testAlarm(cdMinutes1,'Sounds/Begin.wav','Waiting ');
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

// this can be used as a sleep , test or delay for something else timer


//In IE I use the windows media player extension, most other browsers use quicktime
//

function testAlarm (mytheSecs,mytheWav, mytheName)
{
  //run a 4 second count down test alarm

  var cdHours = 0;
  var cdMinutes = 0;
  var cdSeconds = mytheSecs -0;
  var sFileSpec = mytheWav;
  var iRepeater = 1;
  var sName = mytheName;


  setVisible('CountDownTime');
  alarmObject.setAlarm (cdHours, cdMinutes, cdSeconds, sFileSpec,iRepeater,sName, 'CountDownTime',myAlarm.COUNTDOWN );

/*
  if(!isIE())
  {
    var check = checkPluginWav();

    if(check === "")
    {
      doMessage("You need to set up a plugin to play Wav files, see http://kb.mozillazine.org/Video_or_audio_does_not_play");
    }

    if(checkDebug())
    {
      alert("You wav plugins are " + op);
    }
  }
*/


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

function CheckForExternalAlarmAndSet( )
{

  /*
  check to see if someone else has tried to set an alarm
  Superkulge does not work with this
  See CookBook\XXSoftwareTools\GaryTestCSSDOM.html
  its not there yet
  always opens a new timer.html instead of checking to see if there is an active one
  only allows my preset wav files
  only reads one timer event at a time, need to work out how this would work with

  a setExternalAlarm function for multiple events - like a recipe with reminders
  or a dinner party


  see runit.html
  */
  var sExternalAlarm;

  sExternalAlarm = getCookie("AGJCookie");
  //sExternalAlarm = getCookie("ExternalAlarm");

  if(sExternalAlarm == undefined || sExternalAlarm == "" )
  {
    return;  //IE May 2010
  }
  else
  {
    sFileSpec = new Array ("Sounds/alarm_beep.wav",
    "Sounds/woosh.wav",
    "Sounds/buzzer_x.wav",
    "Sounds/hit_with_frying_pan_x.wav",
    "Sounds/kinison.wav",
    "Sounds/fanfare_x.wav",
    "Sounds/gunshots2_x.wav",
    "Sounds/Attention.wav",
    "Sounds/Chimes.wav",
    "Sounds/PlayFunkMusicWhiteBoy.wav");

    myRe=/&/g;
    myArray = sExternalAlarm.split(/&/);

    for(i=0; i < myArray.length; i++)
    {

      myVal = myArray[i].split(/=/);

      //alert( "position " + i + " " + myVal[0] + " = " + myVal[1]);
      switch (myVal[0])
      {

        case 'm_cdHours':
        {
          m_cdHours = myVal[1];
          break;
        }

        case 'm_cdMinutes':
        {
          m_cdMinutes = myVal[1];
          break;
        }

        case 'm_cdSeconds':
        {
          m_cdSeconds = myVal[1];
          break;
        }

        case 'm_iFileSpec':
        {
          m_iFileSpec = myVal[1];
          break;
        }

        case 'm_iRepeater':
        {
          m_iRepeater = myVal[1];
          break;
        }

        case 'm_sName':
        {
          m_sName = myVal[1];
          break;
        }

        case 'm_sIdName':
        {
          m_sIdName = myVal[1];
          break;
        }

        case 'm_imytype':
        {
          m_imytype = parseInt(myVal[1]);
          break;
        }

        default:
        {
          alert("CheckForExternalAlarmAndSet case default position " + i + " " + myVal[0] + " = " + myVal[1]);
          break;
        }
      }
    }

    deleteCookie("ExternalAlarm");
    setVisible('CountDownTime');
    //alert('m_iFileSpec ' + m_iFileSpec + 'm_iRepeater ' + m_iRepeater + 'm_sName ' + m_sName + 'm_sIdName ' + m_sIdName);
    alarmObject.setAlarm (m_cdHours, m_cdMinutes, m_cdSeconds, sFileSpec[m_iFileSpec],m_iRepeater,m_sName, m_sIdName,m_imytype );
    delete sFileSpec;
    // is this working ? alarmObject.dumpAllAlarms();
    // focus does not work yet throwing exception

    //netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");

    try
    {
      focus();
    }
    catch(err)
    {
      alert('cannot self.focus yet');
    }
  } //else of if(sExternalAlarm
}

