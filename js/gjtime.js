/*
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Copyright � 2000-2016 by Gary Johnson


COPYRIGHT

The information contained on this site is protected by Canadian, United States of America and international copyright laws.

All website materials, including, without limitation, design, text, graphics, photos, files, the Fast Track! logo, and
the selection and arrangement thereof are � 2000-2009 Gary Johnson ALL RIGHTS RESERVED.

Permission is granted to electronically copy and print to hard copy portions of this website for the sole purpose of
using materials it contains for informational and non-commercial personal use only.

Any other use of materials in this website, including any commercial use, reproduction for purposes other than those noted above,
modification, distribution or republication, without the prior written consent of Gary Johnson is strictly prohibited.


The Full Copyright statement is

http://garyjohnsoninfo.info/XXSoftwareTools/Copyright.html

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
*/

if (!window.myAlarm)
{
  var myAlarm =
  {
    COUNTDOWN:  1,
    STOPWATCH:  2,
    TIME:   3,
    HOURLY:   4,
    DAILY:    5,
    INTERVAL: 6
  }
}

if (!window.FN)
{
  var FN =
  {
    NUMBERALARMS: 0
  }
}

if (!window.myField)
{
  var myField =
  {
    ALARMNUMBER:    0,
    MALARMTIME:     1,
    SFILESPECOFCLIP:  2,
    BREPEAT:      3,
    SNAME:        4,
    IDNAME:       5,
    IALARMTYPE:     6,
    HOUR:       7,
    MIN:        8,
    SEC:        9
  }
}


function makeCancelTimer(myfunc, mylabel, myarg)
{
  var str0 = "<a href='javascript:";
  var str1 = myfunc;
  var str2 = "(";
  var str3 = myarg;
  var str4 = ")'>"
  var str5 = mylabel;
  var str6 = "</a>";
  str0 += str1 + str2 + str3 + str4 + str5 + str6;
  return str0;
}

function createDisplayTable(where,inArray)
{
  changeInnerHTML(where, "");

  var tstring = new Array();

  tstring.push('<table cellpadding="4" cellspacing="4" class="CTB"><tbody>');

  var NumberofCells = inArray.length;
  var NumberofRows = Math.ceil(NumberofCells / 3 );
  var NumberofInnerLoops = Math.ceil(NumberofCells / NumberofRows);

  tstring.push('<tr>');

  for (var i=0 ; i < NumberofCells; i++)
  {
    if((i % 2) == 0 )
    {
      tstring.push('<td class="b">' + inArray[i] + '</td>');
    }
    else
    {
      tstring.push('<td class="a">' + inArray[i] + '</td>');
    }
  }

  tstring.push('</tr>');

  tstring.push('</tbody></table>');

  var joinwritestring = tstring.join('');

  changeInnerHTML(where, joinwritestring);
}

function createDisplayTable2(where,inArray)
{
  changeInnerHTML(where, "");

  var tstring = new Array();

  tstring.push('<table cellpadding="4" cellspacing="4" class="CTB"><tbody>');

  tstring.push('<tr>');

  tstring.push('<td class="c"><p class="CBwarn gjrespfont">' + inArray[0] + ' <span style="color:green"> Reps &nabla; ' + inArray.length +'</span></p></td>');

  tstring.push('</tr>');

  tstring.push('</tbody></table>');

  var joinwritestring = tstring.join('');

  changeInnerHTML(where, joinwritestring);
}



function CAlarmTimer  (   aObjectReference,
bAutoRepeat,
bALLoff,
bHourly,
bDaily,
iAlarmType,
iSoundAlarm,
sFileSpecofClip,
sNameofAlarm,
iIntervalWarning,
iRepeat)
{
  // aObjectReference
  (bAutoRepeat )    ? (this.m_bAutoRepeat = bAutoRepeat)        :  (this.m_bAutoRepeat    = false);
  (bALLoff )      ? (this.m_bALLoff = bALLoff)            :  (this.m_bALLoff      = false);
  (bHourly )      ? (this.m_bHourly = bHourly)            :  (this.m_bHourly      = false);
  (bDaily )     ? (this.m_bDaily = bDaily)              :  (this.m_bDaily       = false);
  (iAlarmType )   ? (this.m_iAlarmType = iAlarmType)          :  (this.m_iAlarmType     = 0);
  (iSoundAlarm )    ? (this.m_iSoundAlarm = iSoundAlarm)        :  (this.m_iSoundAlarm    = 0);
  (sFileSpecofClip )  ? (this.m_sFileSpecofClip = sFileSpecofClip)    :  (this.m_sFileSpecofClip  = '');
  (sNameofAlarm )   ? (this.m_sNameofAlarm = sNameofAlarm)        :  (this.m_sNameofAlarm   = '');
  (iIntervalWarning ) ? (this.m_iIntervalWarning = iIntervalWarning)    :  (this.m_iIntervalWarning = 0);
  (iRepeat )      ? (this.m_iRepeat = iRepeat)            :  (this.m_iRepeat      = 0);

  //first element is the number of alarms

  this.alarmTimes = new Array();
  this.alarmTimes[FN.NUMBERALARMS] = 0;
  this.tblVar = 0;  //these are dom html elements
  this.tblbodyVar =0;
}


CAlarmTimer.prototype.dumpAlarm = function(what)
{
  var now     = new Date();
  var timeNow   = this.computeMilliseconds(now);
  mymsg     = '';

  mymsg  += timeNow                     + ' Time Now' + '<br>';
  mymsg  += this.alarmTimes[0]                + ' Number of Alarms' + '<br>';
  mymsg  += this.alarmTimes[what][myField.ALARMNUMBER]    + ' Number' + '<br>';
  mymsg  += this.alarmTimes[what][myField.MALARMTIME]   + ' malarmTime' + '<br>';
  mymsg  += this.alarmTimes[what][myField.SFILESPECOFCLIP]  + ' sFileSpecofClip' + '<br>';
  mymsg  += this.alarmTimes[what][myField.BREPEAT]      + ' bRepeat' + '<br>';
  mymsg  += this.alarmTimes[what][myField.SNAME]      + ' sName' + '<br>';
  mymsg  += this.alarmTimes[what][myField.IDNAME]     + ' idName' + '<br>';
  mymsg  += this.alarmTimes[what][myField.IALARMTYPE]   + ' iAlarmType' + '<br>';
  mymsg  += this.alarmTimes[what][myField.HOUR]       + ' hour' + '<br>';
  mymsg  += this.alarmTimes[what][myField.MIN]        + ' min' + '<br>';
  mymsg  += this.alarmTimes[what][myField.SEC]        + ' sec' + '<br>';

  doMessage(mymsg);
}


CAlarmTimer.prototype.dumpAllAlarms = function()
{
  for (var i = 1; i <= this.alarmTimes[FN.NUMBERALARMS]; i++)
  {
    this.dumpAlarm(i);
  }
}

CAlarmTimer.prototype.checkAlarms = function(aDate)
{
  var timeNow =  this.computeMilliseconds(aDate)

  for (var i = 1; i <= this.alarmTimes[FN.NUMBERALARMS]; i++)
  {
    if(this.alarmTimes[i][myField.IALARMTYPE] == myAlarm.STOPWATCH)
    {
      continue;
    }
    if(this.alarmTimes[i][myField.MALARMTIME] < timeNow)
    {
      if(this.alarmTimes[i][myField.MALARMTIME] != 0)
      {
        // Trigger Display of Alarm
        this.doAlarm(this.alarmTimes[i][myField.ALARMNUMBER], this.alarmTimes[i][myField.SFILESPECOFCLIP],this.alarmTimes[i][myField.SNAME] );

        // set the Alarm Time to 0 so we no longer act on it

        this.alarmTimes[i][myField.MALARMTIME] = 0;
        // it its a repeatable alarm that needs repeating, set a new one

        if(this.alarmTimes[i][myField.BREPEAT] != -1)
        {
          this.alarmTimes[i][myField.BREPEAT]--;
          if(this.alarmTimes[i][myField.BREPEAT])
          {
            this.setAlarm(this.alarmTimes[i][myField.HOUR], this.alarmTimes[i][myField.MIN],this.alarmTimes[i][myField.SEC],this.alarmTimes[i][myField.SFILESPECOFCLIP],this.alarmTimes[i][myField.BREPEAT],this.alarmTimes[i][myField.SNAME],this.alarmTimes[i][myField.IDNAME],this.alarmTimes[i][myField.IALARMTYPE] );
          }
        }
        else
        {
          this.setAlarm(this.alarmTimes[i][myField.HOUR], this.alarmTimes[i][myField.MIN],this.alarmTimes[i][myField.SEC],this.alarmTimes[i][myField.SFILESPECOFCLIP],this.alarmTimes[i][myField.BREPEAT],this.alarmTimes[i][myField.SNAME],this.alarmTimes[i][myField.IDNAME],this.alarmTimes[i][myField.IALARMTYPE] );
        }

        // clear out the display
        changeInnerHTML(this.alarmTimes[i][myField.IDNAME],"");
      }
    }
  }
};

CAlarmTimer.prototype.updateAlarms = function(aDate)
{

  //dear Gary - you cannot call one of your own member functions from within a switch

  var timeNow = this.computeMilliseconds(aDate)
  var msg5    = ''; //for CountDown Timers and Interval Timers
  var msg6    = ''; //for Alarm Timers
  var msg7    = ''; //for stopwatches
  var doCD    = '';
  var doAT    = '';
  var doSW    = '';
  var doIN    = '';
  var activeCD  = 0;
  var activeAT  = 0;
  var activeSW  = 0;
  var activeIN  = 0;
  var CDarray   = new Array();
  var ATarray   = new Array();
  var SWarray   = new Array();
  var INarray   = new Array();

  for (var i = 1; i <= this.alarmTimes[FN.NUMBERALARMS]; i++)
  {
    switch (this.alarmTimes[i][myField.IALARMTYPE])
    {
      //countdowns
      case 1:
      {
        if(this.alarmTimes[i][myField.MALARMTIME] != 0)
        {
          //create a string for each timer
          //msg5 += "# " + this.alarmTimes[i][myField.ALARMNUMBER] + " " + this.alarmTimes[i][myField.SNAME] + " ";
          msg5 += this.alarmTimes[i][myField.SNAME] + " ";

          var bigDiff = this.alarmTimes[i][myField.MALARMTIME] - timeNow;

          var cHoursMill    = (60 * 60 * 1000);
          var cMinutesMill  = (60 * 1000);
          var cSecondsMill  = 1000;

          if(bigDiff > cHoursMill)
          {
            var hrs = Math.floor(bigDiff / cHoursMill);
            bigDiff = bigDiff - (hrs * cHoursMill);
            if(hrs <= 9)
            {
              hrs = "0" + hrs;
            }
            msg5 += hrs + ":";
          }
          else
          {
            msg5 += "00:";
          }

          if(bigDiff > cMinutesMill)
          {
            var mns = Math.floor(bigDiff / cMinutesMill);
            bigDiff = bigDiff - (mns * cMinutesMill);
            if (mns <= 9)
            {
              mns = "0" + mns;
            }
            msg5 += mns + ":";
          }
          else
          {
            msg5 += "00:";
          }

          if(bigDiff > cSecondsMill)
          {
            var sec = Math.floor(bigDiff / cSecondsMill);
            bigDiff = bigDiff - (sec * cSecondsMill);
            if (sec <= 9)
            {
              sec = "0" + sec;
            }
            msg5 += sec + " ";
          }
          else
          {
            msg5 += "00";
          }
          //save each time in its own cell

          doCD = this.alarmTimes[i][myField.IDNAME];
          CDarray[activeCD] = msg5;
          activeCD++;

          //one more time, with feeling
          msg5 = '';
        }//if (this ..
        break;
      } //case 1 6
      //2 StopWatch
      case 2:
      {
        if(this.alarmTimes[i][myField.BREPEAT] != 0)
        {
          //the reverse of a CountDown
          doSW = this.alarmTimes[i][myField.IDNAME];
          msg7 += "# " + this.alarmTimes[i][myField.ALARMNUMBER]  + " ";

          bigDiff = timeNow - this.alarmTimes[i][myField.MALARMTIME];

          var cHoursMill    = (60 * 60 * 1000);
          var cMinutesMill  = (60 * 1000);
          var cSecondsMill  = 1000;

          if(bigDiff > cHoursMill)
          {
            var hrs = Math.floor(bigDiff / cHoursMill);
            bigDiff = bigDiff - (hrs * cHoursMill);
            if(hrs <= 9)
            {
              hrs =  "0" + hrs;
            }
            msg7 += hrs + ":";
          }
          else
          {
            msg7 += "00:";
          }

          if(bigDiff > cMinutesMill)
          {
            var mns = Math.floor(bigDiff / cMinutesMill);
            bigDiff = bigDiff - (mns * cMinutesMill);
            if (mns <= 9)
            {
              mns = "0" + mns;
            }
            msg7 += mns + ":";
          }
          else
          {
            msg7 += "00:";
          }

          if(bigDiff > cSecondsMill)
          {
            var sec = Math.floor(bigDiff / cSecondsMill);
            bigDiff = bigDiff - (sec * cSecondsMill);
            if (sec <= 9)
            {
              sec = "0" + sec;
            }
            msg7 += sec + " ";
          }
          else
          {
            msg7 += "00: ";
          }
          //save it for display after hitting stop
          this.alarmTimes[i][myField.SNAME] = msg7;

          msg7 += makeCancelTimer("runstopStopWatch","Stop",this.alarmTimes[i][myField.ALARMNUMBER]);
          //save each time in its own cell
          SWarray[activeSW] = msg7;
          activeSW++;
          //one more time, with feeling
          msg7 = '';
        } //if
        else
        {
          SWarray[activeSW] = this.alarmTimes[i][myField.SNAME];
          activeSW++;
          //one more time, with feeling
        }
        break;
      }
      //Alarm
      case 3:
      {
        if(this.alarmTimes[i][myField.MALARMTIME] != 0)
        {
          //create a string for each timer
          doAT = this.alarmTimes[i][myField.IDNAME];
          msg6 += "# " + this.alarmTimes[i][myField.ALARMNUMBER] + " ";

          //   var hrs =  this.alarmTimes[i][myField.HOUR];

          msg6 = format12HourTime(this.alarmTimes[i][myField.HOUR], this.alarmTimes[i][myField.MIN], '0');
          //save each time in its own cell
          ATarray[activeAT] = msg6;
          activeAT++;
          //one more time, with feeling
          msg6 = '';
        }//if (this ..
        break;
      }
      //Hourly
      case 4:
      {
        alert("4 Lets do it");
        break;
      }
      //Daily
      case 5:
      {
        alert("5 Lets do it");
        break;
      }
      //Interval
      case 6:
      {
        if(this.alarmTimes[i][myField.MALARMTIME] != 0)
        {
          //create a string for each timer
          //msg5 += "# " + this.alarmTimes[i][myField.ALARMNUMBER] + " " + this.alarmTimes[i][myField.SNAME] + " ";
          msg5 += this.alarmTimes[i][myField.SNAME] + " ";

          var bigDiff = this.alarmTimes[i][myField.MALARMTIME] - timeNow;

          //var cHoursMill    = (60 * 60 * 1000);
          //var cMinutesMill  = (60 * 1000);
          var cSecondsMill  = 1000;

          if(bigDiff > cSecondsMill)
          {
            var sec = Math.floor(bigDiff / cSecondsMill);
            bigDiff = bigDiff - (sec * cSecondsMill);
            if (sec <= 9)
            {
              sec = "0" + sec;
            }
            msg5 += sec + " ";
          }
          else
          {
            msg5 += "00";
          }

          doIN = this.alarmTimes[i][myField.IDNAME];
          INarray[activeIN] = msg5;
          activeIN++;

          //one more time, with feeling
          msg5 = '';
        }//if (this ..
        break;
      } //case 6
      default:
      alert("default");
    } //switch what type
  }//for all timers

  //update the displays
  if(doCD != "")
  {
    createDisplayTable(doCD,CDarray);
  }

  if(doIN != "")
  {
    createDisplayTable2(doIN,INarray);
  }


  if(doAT != "")
  {
    createDisplayTable(doAT,ATarray);
  }

  if(doSW != "")
  {
    createDisplayTable(doSW,SWarray);
  }
};

CAlarmTimer.prototype.clearAlarms = function()
{

  var msg5 = '';  //for CountDown Timers and Interval Alarms
  var msg6 = '';  //for Alarm Timers
  var msg7 = '';  //for stopwatches
  var doCD = '';
  var doAT = '';
  var doSW = '';

  for (var i = 1; i <= this.alarmTimes[FN.NUMBERALARMS]; i++)
  {
    switch (this.alarmTimes[i][myField.IALARMTYPE])
    {
      //countdowns
      case 1:
      case 6:
      {
        if(this.alarmTimes[i][myField.MALARMTIME] != 0)
        {
          doCD = this.alarmTimes[i][myField.IDNAME];
          msg5 += "";
        }
        break;  //case 1
      } //case 1
      //StopWatch
      case 2:
      {
        if(this.alarmTimes[i][myField.MALARMTIME] != 0)
        {
          doSW = this.alarmTimes[i][myField.IDNAME];
          msg7 += "";
        }
        break;
      }
      //Alarm
      case 3:
      {
        if(this.alarmTimes[i][myField.MALARMTIME] != 0)
        {
          doAT = this.alarmTimes[i][myField.IDNAME];
          msg6 += "";
        }
        break;
      }
      //Hourly
      case 4:
      {
        alert("4 Lets do it");
        break;
      }
      //Daily
      case 5:
      {
        alert("5 Lets do it");
        break;
      }
      default:
      alert("default");
    } //switch what type
  }//for all timers

  //clear the displays
  if(doCD != "")
  {
    changeInnerHTML(doCD,msg5);
  }

  if(doAT != "")
  {
    changeInnerHTML(doAT,msg6);
  }

  if(doSW != "")
  {
    changeInnerHTML(doSW,msg7);
  }

};


CAlarmTimer.prototype.anyActiveAlarms = function()
{
  // could also do something with   activeAT ..
  var active=false;

  for (var i = 1; i <= this.alarmTimes[FN.NUMBERALARMS]; i++)
  {
    switch (this.alarmTimes[i][myField.IALARMTYPE])
    {
      //countdowns
      case 1:
      case 6:
      {
        if(this.alarmTimes[i][myField.MALARMTIME] != 0)
        {
          active=true;
          return true;
        }
        break;  //case 1
      } //case 1
      //StopWatch
      case 2:
      {
        if(this.alarmTimes[i][myField.BREPEAT]    != 0)
        {
          active=true;
          return true;
        }
        break;
      }
      //Alarm
      case 3:
      {
        if(this.alarmTimes[i][myField.MALARMTIME] != 0)
        {
          active=true;
          return true;
        }
        break;
      }
      //Hourly
      case 4:
      {
        alert("4 Lets do it");
        break;
      }
      //Daily
      case 5:
      {
        alert("5 Lets do it");
        break;
      }
      default:
      alert("default");
    } //switch what type
  }//for all timers

  return active;
};


CAlarmTimer.prototype.cancelTimer = function(which)
{
  if(this.alarmTimes[which][myField.MALARMTIME] != 0)
  {
    this.alarmTimes[which][myField.MALARMTIME] = 0;
  }
}

CAlarmTimer.prototype.stopWatchStop = function(which)
{
  if(this.alarmTimes[which][myField.BREPEAT] != 0)
  {
    this.alarmTimes[which][myField.BREPEAT] = 0;
  }
}


CAlarmTimer.prototype.setAlarm = function(hour, min, sec,sFileSpecofClip,bRepeat,sName,idName,iAlarmType )
{
  // compute the alarm time in millseconds from the current time
  // 1 hour equals 60 (minutes) X 60 (seconds) X 1000 (milliseconds)
  // Interval alarms use the hour and min field for computing countdown time of the current active interval

  var newItemNum  = 0;
  var now     = new Date();
  var chour   = now.getHours();  //should be 24
  var cmin    = now.getMinutes();
  var cdate   = now.getDate();
  var cmonth    = now.getMonth();
  var cyear   = now.getFullYear();
  var malarmTime  = 0;

  switch (iAlarmType)
  {
    //countdowns
    case 1:
    {
      var dhour;
      var dmin;
      var dsec;

      (hour - 0) ?  (dhour = ( hour * (60 * 60 * 1000)))  : dhour = 0;
      (min - 0) ?   (dmin = ( min * (60*1000)))       : dmin = 0;
      (sec - 0) ?   (dsec  = ( sec * 1000))         : dsec = 0;

      malarmTime = this.computeMilliseconds(now) + dhour + dmin + dsec;

      // add that time to the array that is checked in checkAlarms
      // first element always holds the number of elements

      this.alarmTimes[FN.NUMBERALARMS] = this.alarmTimes[FN.NUMBERALARMS] + 1;
      newItemNum = this.alarmTimes[FN.NUMBERALARMS];

      this.alarmTimes[newItemNum] = new Array(10);

      this.alarmTimes[newItemNum][myField.ALARMNUMBER]    = newItemNum;
      this.alarmTimes[newItemNum][myField.MALARMTIME]     = malarmTime;
      this.alarmTimes[newItemNum][myField.SFILESPECOFCLIP]  = sFileSpecofClip;
      this.alarmTimes[newItemNum][myField.BREPEAT]      = bRepeat;
      this.alarmTimes[newItemNum][myField.SNAME]        = sName;
      this.alarmTimes[newItemNum][myField.IDNAME]       = idName;
      this.alarmTimes[newItemNum][myField.IALARMTYPE]     = iAlarmType;
      this.alarmTimes[newItemNum][myField.HOUR]       = hour;
      this.alarmTimes[newItemNum][myField.MIN]        = min;
      this.alarmTimes[newItemNum][myField.SEC]        = sec;
      //this.dumpAlarm(newItemNum);
      break;
    }
    //StopWatch
    case 2:
    {
      //save the orginal time in malarmtime
      //use bRepeat to control (start set to 1) stop stopwatch sets it to 0
      //time now - malartime
      // convet milliseconds to hr min sec for display

      malarmTime = this.computeMilliseconds(now);

      //var tempTime = new Date(hour, min, sec);
      // add that time to the array that is checked in checkAlarms
      // first element always holds the number of elements

      this.alarmTimes[FN.NUMBERALARMS] = this.alarmTimes[FN.NUMBERALARMS] + 1;
      newItemNum = this.alarmTimes[FN.NUMBERALARMS];

      this.alarmTimes[newItemNum] = new Array(10);


      this.alarmTimes[newItemNum][myField.ALARMNUMBER]    = newItemNum;
      this.alarmTimes[newItemNum][myField.MALARMTIME]     = malarmTime;
      this.alarmTimes[newItemNum][myField.SFILESPECOFCLIP]  = sFileSpecofClip;
      this.alarmTimes[newItemNum][myField.BREPEAT]      = bRepeat;
      this.alarmTimes[newItemNum][myField.SNAME]        = sName;
      this.alarmTimes[newItemNum][myField.IDNAME]       = idName;
      this.alarmTimes[newItemNum][myField.IALARMTYPE]     = iAlarmType;
      this.alarmTimes[newItemNum][myField.HOUR]       = hour;
      this.alarmTimes[newItemNum][myField.MIN]        = min;
      this.alarmTimes[newItemNum][myField.SEC]        = sec;
      break;
    }
    //Alarm
    case 3:
    {
      var today = -1;

      if(hour < chour)
      {
        today = 0;
      }

      if((hour == chour) && min < cmin)
      {
        today = 0;
      }

      if(today != -1)
      {
        var msgxyz  = '<br>' + "We don't support alarms on different days yet." + '<br>';
        msgxyz    += "Hour " + hour + " Min " + min + '<br>';
        msgxyz    += "Alarm Sound " + sFileSpecofClip + '<br>';
        doMessage(msgxyz);
        return false;
      }

      var tempTime = new Date(cyear, cmonth, cdate, hour, min,0);

      var malarmTime = this.computeMilliseconds(tempTime);
      // add that time to the array that is checked in checkAlarms
      // first element always holds the number of elements

      this.alarmTimes[FN.NUMBERALARMS] = this.alarmTimes[FN.NUMBERALARMS] + 1;
      newItemNum = this.alarmTimes[FN.NUMBERALARMS];

      this.alarmTimes[newItemNum] = new Array(10);

      this.alarmTimes[newItemNum][myField.ALARMNUMBER]  = newItemNum;
      this.alarmTimes[newItemNum][myField.MALARMTIME]   = malarmTime;
      this.alarmTimes[newItemNum][myField.SFILESPECOFCLIP]  = sFileSpecofClip;
      this.alarmTimes[newItemNum][myField.BREPEAT]    = bRepeat;
      this.alarmTimes[newItemNum][myField.SNAME]      = sName;
      this.alarmTimes[newItemNum][myField.IDNAME]     = idName;
      this.alarmTimes[newItemNum][myField.IALARMTYPE]   = iAlarmType;
      this.alarmTimes[newItemNum][myField.HOUR]   = hour;
      this.alarmTimes[newItemNum][myField.MIN]    = min;
      this.alarmTimes[newItemNum][myField.SEC]    = sec;
      break;
    }
    //Hourly
    case 4:
    {
      alert("4 Lets do it");
      break;
    }
    //Daily
    case 5:
    {
      alert("5 Lets do it");
      break;
    }
    //Intervals
    case 6:
    {
      var dhour;
      var dmin;
      var dsec;

      //(hour - 0) ?  (dhour = ( hour * (60 * 60 * 1000)))  : dhour = 0;
      //(min - 0) ?   (dmin = ( min * (60*1000)))       : dmin = 0;
      (sec - 0) ?   (dsec  = ( sec * 1000))         : dsec = 0;

      //malarmTime = this.computeMilliseconds(now) + dhour + dmin + dsec;
      malarmTime = this.computeMilliseconds(now) + dsec;

      // add that time to the array that is checked in checkAlarms
      // first element always holds the number of elements

      this.alarmTimes[FN.NUMBERALARMS] = this.alarmTimes[FN.NUMBERALARMS] + 1;
      newItemNum = this.alarmTimes[FN.NUMBERALARMS];

      this.alarmTimes[newItemNum] = new Array(10);

      this.alarmTimes[newItemNum][myField.ALARMNUMBER]    = newItemNum;
      this.alarmTimes[newItemNum][myField.MALARMTIME]     = malarmTime;
      this.alarmTimes[newItemNum][myField.SFILESPECOFCLIP]  = sFileSpecofClip;
      this.alarmTimes[newItemNum][myField.BREPEAT]      = bRepeat;
      this.alarmTimes[newItemNum][myField.SNAME]        = sName;
      this.alarmTimes[newItemNum][myField.IDNAME]       = idName;
      this.alarmTimes[newItemNum][myField.IALARMTYPE]     = iAlarmType;
      this.alarmTimes[newItemNum][myField.HOUR]       = hour;
      this.alarmTimes[newItemNum][myField.MIN]        = min;
      this.alarmTimes[newItemNum][myField.SEC]        = sec;
      //this.dumpAlarm(newItemNum);
      break;
    }
    default:
    alert("setAlarm default");
    alert( "h " + hour + " m " + min + " s " + sec + " f " + sFileSpecofClip + " r " + bRepeat + " n " + sName + " i " + idName +  " T " + iAlarmType )
    break;
  }//end switch
  return true;
};

CAlarmTimer.prototype.computeAlarmTime = function(aDate)
{
  //compute the alarm time in millseconds from the current time
  //add that time to the array that is checked in checkAlarms
  alert("computeAlarmTime");
};

CAlarmTimer.prototype.computeMilliseconds = function(aDate)
{
  var tstring = aDate.toUTCString();
  //  alert(tstring);
  var nowMilliseconds = Date.parse(tstring ) + (aDate.getTimezoneOffset() * (60*1000));

  return nowMilliseconds;
};


CAlarmTimer.prototype.playWav = function(myFileSpec)
{
 // if(isGecko())
  //{
    playFileWav(myFileSpec);
  //}
};



CAlarmTimer.prototype.doAlarm = function(AlarmNum , myFileSpec, sName )
{

  try
  {

      playFileWav(myFileSpec);

      if(this.alarmTimes[1][myField.IALARMTYPE] !== myAlarm.INTERVAL) {
        storeResults(AlarmNum , sName, this.tblVar, this.tblbodyVar);
      }

      //first, lets see if we can play two things in a row

      //  wintxt += "<p style='font-size: 16pt; color:blue;'>";
      //  wintxt += "&nbsp; Alarm Number :" + AlarmNum + "<br>";
      //  wintxt += "&nbsp; Alarm Name   :" + sName + "<br></p>";

      //  displayDivMessage("Alarm", wintxt, 0)

  }
  catch(error)
  {
    gjonerror( error, " doAlarm ");
  }

  return; // why false ?;
};

CAlarmTimer.prototype.cancel = function()
{

  if(checkDebug())
  {
    this.dumpAllAlarms();
  }


  this.clearAlarms();
  // clear all running events
  this.alarmTimes[FN.NUMBERALARMS] = 0;
  // to do delete all new objects;
  //  alert('cancel');
};


CAlarmTimer.prototype.SuperKludgewithJimmies = function(miAlarmType)
{
  var kludgeLimit = 5;
  var icounter  = 0;

  for (var i = 1; i <= this.alarmTimes[FN.NUMBERALARMS]; i++)
  {
    if( (this.alarmTimes[i][myField.IALARMTYPE]) == miAlarmType)
    {
      if((this.alarmTimes[i][myField.MALARMTIME]) != 0)
      {
        icounter++;
        if(icounter > kludgeLimit)
        {
          doMessage('We have not worked out how to display more than 6 Timers, We are working on it, Send Cash now');
          return -1;
        }
      }
    }
  }
  return 0;
};

function CTimerOptions  ( aObjectReference,
bWindowIsTopmost,
bClock24Hour,
bDisplayClockSecond,
bAlarmActive,
bSpeakClock,
iSpeakIntervals,
iUpdateInterval,
bShowTime,
bShowDate,
bShowJulian,
bShowBigScr,
bShowStartupWarning)
{

  //get the stored options and then let them be overidden if specified in the constructor
  // should I declare them as vars here?

  this.getit();

}
//not updated for interval timers
CTimerOptions.prototype.setit = function()
{
  //write to cookie
  //m_bWindowIsTopmost%3D-1%26m_bClock24Hour%3D0%26m_bDisplayClockSecond%3D-1%26m_bAlarmActive%3D-1%26m_bSpeakClock%3D0%26m_iSpeakIntervals%3D0%26m_iUpdateInterval%3D2%26m_bShowTime%3D-1%26m_bShowDate%3D-1%26m_bShowJulian%3D-1%26m_bShowBigScr%3D0%26m_bShowStartupWarning%3D1
  //m_bWindowIsTopmost=-1&m_bClock24Hour=0&m_bDisplayClockSecond=-1&m_bAlarmActive=-1&m_bSpeakClock=0&m_iSpeakIntervals=0&m_iUpdateInterval=2&m_bShowTime=-1&m_bShowDate=-1&m_bShowJulian=-1&m_bShowBigScr=0&m_bShowStartupWarning=1
  var cv = "";

  cv += 'm_bWindowIsTopmost='     + this.m_bWindowIsTopmost;
  cv += '&' +'m_bClock24Hour='      + this.m_bClock24Hour;
  cv += '&' + 'm_bDisplayClockSecond='  + this.m_bDisplayClockSecond;
  cv += '&' + 'm_bAlarmActive='     + this.m_bAlarmActive;
  cv += '&' + 'm_bSpeakClock='      + this.m_bSpeakClock;
  cv += '&' + 'm_iSpeakIntervals='    + this.m_iSpeakIntervals;
  cv += '&' + 'm_iUpdateInterval='    + this.m_iUpdateInterval;
  cv += '&' + 'm_bShowTime='      + this.m_bShowTime;
  cv += '&' + 'm_bShowDate='      + this.m_bShowDate;
  cv += '&' + 'm_bShowJulian='      + this.m_bShowJulian;
  cv += '&' + 'm_bShowBigScr='      + this.m_bShowBigScr;
  cv += '&' + 'm_bShowStartupWarning='  + this.m_bShowStartupWarning;


  var expdate = new Date();
  //expiration date one year from today
  expdate.setTime(expdate.getTime() + (24 * 60 * 60 * 1000 * 365));
  setCookie("TimerOptions", cv, expdate, "/", null, false);
};


CTimerOptions.prototype.setOpt = function(myin)
{


  myRe=/:/g;
  var myArray = myin.split(/:/);  // fix for undeclard Jun 15 2007

  switch (myArray[0])
  {
    case 'TDTop':
    {
      this.m_bWindowIsTopmost= myArray[1];
      break;
    }
    case 'TDH':
    {
      this.m_bClock24Hour= myArray[1];
      break;
    }
    case 'TDS':
    {
      this.m_bDisplayClockSecond= myArray[1];
      break;
    }
    case 'TDA':
    {
      this.m_bAlarmActive= myArray[1];
      break;
    }
    case 'TDsc':
    {
      this.m_bSpeakClock= myArray[1];
      break;
    }
    case 'TDsi':
    {
      this.m_iSpeakIntervals= myArray[1];
      break;
    }
    case 'TDI':
    {
      this.m_iUpdateInterval= myArray[1];
      break;
    }
    case 'TDN':
    {
      this.m_iNoticeInterval= myArray[1];
      break;
    }

    case 'TDT':
    {
      this.m_bShowTime= myArray[1];
      break;
    }
    case 'TDD':
    {
      //      alert('setOpt ' + myin + ' ' + myArray[0] + ' ' + myArray[1]);
      this.m_bShowDate= myArray[1];
      break;
    }
    case 'TDJ':
    {
      this.m_bShowJulian= myArray[1];
      break;
    }
    case 'TDM':
    {
      this.m_bShowBigScr= myArray[1];
      break;
    }
    case 'TDW':
    {
      this.m_bShowStartupWarning= myArray[1];
      break;
    }
    case 'TDF':
    {
      if(myArray[1] == 'HMS')
      {
        // set it SMH
      }
    }
    default:
    break;
  } //switch

  //  alert('setOpt ' + myin + ' ' + myArray[0] + ' ' + myArray[1]);
};


CTimerOptions.prototype.getit = function()
{
  //read from cookie
  var sTimerOptions;

  sTimerOptions = getCookie("TimerOptions");

  if(sTimerOptions == undefined || sTimerOptions == "" )
  {
    //set the defaults
    this.m_bWindowIsTopmost   = -1;
    this.m_bClock24Hour     =  0;
    this.m_bDisplayClockSecond  = -1;
    this.m_bAlarmActive     = -1;
    this.m_bSpeakClock      =  0;
    this.m_iSpeakIntervals    =  0;
    this.m_iUpdateInterval    =  1;
    this.m_bShowTime      = -1;
    this.m_bShowDate      = -1;
    this.m_bShowJulian      = -1;
    this.m_bShowBigScr      =  0;
    this.m_bShowStartupWarning  =  1;
    //save the defaults
    this.setit();
    //I should probably popup help and go to it
  }
  else
  {

    var myArray = sTimerOptions.split(/&/);  //Jun 15 2007 undeclared variable

    for(var i=0; i < myArray.length; i++)
    {

      var myVal = myArray[i].split(/=/);  // Jun 15 2007 undeclared

      //alert( "position " + i + " " + myVal[0] + " = " + myVal[1]);
      switch (myVal[0])
      {

        case 'm_bWindowIsTopmost':
        {
          this.m_bWindowIsTopmost = parseInt(myVal[1]);
          break;
        }

        case 'm_bClock24Hour':
        {
          this.m_bClock24Hour = parseInt(myVal[1]);
          break;
        }

        case 'm_bDisplayClockSecond':
        {
          this.m_bDisplayClockSecond = parseInt(myVal[1]);
          break;
        }

        case 'm_bAlarmActive':
        {
          this.m_bAlarmActive = parseInt(myVal[1]);
          break;
        }

        case 'm_bSpeakClock':
        {
          this.m_bSpeakClock = parseInt(myVal[1]);
          break;
        }

        case 'm_iSpeakIntervals':
        {
          this.m_iSpeakIntervals = parseInt(myVal[1]);
          break;
        }

        case 'm_iUpdateInterval':
        {
          this.m_iUpdateInterval = parseInt(myVal[1]);
          break;
        }

        case 'm_bShowTime':
        {
          this.m_bShowTime = parseInt(myVal[1]);
          break;
        }

        case 'm_bShowDate':
        {
          this.m_bShowDate = parseInt(myVal[1]);
          break;
        }

        case 'm_bShowJulian':
        {
          this.m_bShowJulian = parseInt(myVal[1]);
          break;
        }

        case 'm_bShowBigScr':
        {
          this.m_bShowBigScr = parseInt(myVal[1]);
          break;
        }

        case 'm_bShowStartupWarning':
        {
          this.m_bShowStartupWarning = parseInt(myVal[1]);
          break;
        }

        default:
        {
          alert("getit case default position " + i + " " + myVal[0] + " = " + myVal[1]);
          break;
        }
      }
    } //for
  }
};

CTimerOptions.prototype.setForm = function(form)
{

  document.getElementById(form).fiUpdateInterval.value   = this.m_iUpdateInterval;

  if(this.m_bShowTime != 0)
  {
    document.getElementById(form).fbShowTime.checked   = true;
  }
  else
  {
    document.getElementById(form).fbShowTime.checked   = false;
  }

  if(this.m_bShowDate != 0)
  {
    document.getElementById(form).fbShowDate.checked   = true;
  }
  else
  {
    document.getElementById(form).fbShowDate.checked   = false;
  }

  if(this.m_bShowJulian != 0)
  {
    document.getElementById(form).fbShowJulian.checked = true;
  }
  else
  {
    document.getElementById(form).fbShowJulian.checked = false;
  }

  if(this.m_bClock24Hour != 0)
  {
    document.getElementById(form).fb24HourClock.checked  = true;
  }
  else
  {
    document.getElementById(form).fb24HourClock.checked  = false;
  }

  if(this.m_bDisplayClockSecond != 0)
  {
    document.getElementById(form).fb24DisplaySeconds.checked = true;
  }
  else
  {
    document.getElementById(form).fb24DisplaySeconds.checked = false;
  }


  if(this.m_bShowStartupWarning != 0)
  {
    document.getElementById(form).fbShowStartupWarning.checked = true;
  }
  else
  {
    document.getElementById(form).fbShowStartupWarning.checked = false;
  }
};

function storeResults( AlarmNum , sName, c, c1)
{
  /*
  timer.html - first child table of the div
  */
  try
  {
    setVisible('place');

    var col1 = '# Alarm ' + AlarmNum + " " + sName;

    var now   = new Date();
    var hour  = now.getHours();
    var min   = now.getMinutes();
    var sec   = now.getSeconds();

    var col2 = format12HourTime(hour, min, sec);
    col2 = 'Completed at ' + col2;

    c1.appendChild(makerow(col1, col2 ));
    c.appendChild( c1 );
    var aa = document.getElementById('place');  // Jun 15 2007 undeclared
    aa.replaceChild(c, aa.getElementsByTagName('TABLE')[0]);
  }
  catch (error)
  {
    gjonerror( error, "Store Results for Timers ");
    return;
  }

}


function storeDescription( id1, str1, id2, str2)
{
  /*
  Interval Timers
  */
  try
  {
    changeInnerHTML(id1,str1);
    changeInnerHTML(id2,str2);
  }
  catch (error)
  {
    gjonerror( error, "storeDescription ");
    return;
  }

}



function makerow(cell1, cell2)
{
  var c2 = document.createElement('TR');  // Jun 15 2007 undeclared

  c2.appendChild( makecell(cell1 ));
  c2.appendChild( makecell(cell2 ));

  return c2;
}

function makecell(cellin)
{
  var c3 = document.createElement('TD');  // Jun 15 2007 undeclared
  c3.setAttribute('width',"40%");

  if(isGecko())
  {
    c3.setAttribute("class","a");
  }
  else
  {
    c3.setAttribute("className","a");
  }

  var c4 = document.createTextNode(cellin); // Jun 15 2007 undeclared
  c3.appendChild( c4 );

  return c3;
}

/*
ExternalAlarm(0,0,0,1,1,"My Alarm", 'CountDownTime',1 );

Writes a cookie that is read from Timer.html

*/
function setExternalAlarm(cdHours, cdMinutes, cdSeconds, iFileSpec,iRepeater,sName, idName,mytype )
{
  //write to cookie

  var cv = "";

  cv += 'm_cdHours='        + cdHours;
  cv += '&' + 'm_cdMinutes='    + cdMinutes;
  cv += '&' + 'm_cdSeconds='    + cdSeconds;
  cv += '&' + 'm_iFileSpec='    + iFileSpec;
  cv += '&' + 'm_iRepeater='    + iRepeater;
  cv += '&' + 'm_sName='      + sName;
  cv += '&' + 'm_sIdName='      + idName;
  cv += '&' + 'm_imytype='      + mytype;

  var expdate = new Date();
  //expiration date one year from today
  expdate.setTime(expdate.getTime() + (24 * 60 * 60 * 1000 * 365));
  //  setCookie("ExternalAlarm", cv, expdate, "/", null, false);
  setCookie("ExternalAlarm", cv, expdate, "/", null, false);

  //cv += '&' + 'm_sName='        + '"' + sName + '"';
}