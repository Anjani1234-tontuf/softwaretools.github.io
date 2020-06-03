/*
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Copyright © 2000-2012 by Gary Johnson

The Full Copyright statement is

http://garyjohnsoninfo.info/XXSoftwareTools/Copyright.html

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
*/

/*
Changelog
XXanum.toFixed(4)
*/

function checkPosNumber(number)
{
  //positive numbers
  //  x - 0 to force conversion of text to number internally in place of a decent atoi, atof function
  try
  {
    for (var i = 0; i < number.length; i++)
    {
      var oneChar = number.charAt(i);
      if ((oneChar >= "0" && oneChar <= "9") || (oneChar == "."))
      {
        continue;
      }
      else
      {
        DisplayNotNumber(number);
        return false;
      }
    }
  }
  catch (error)
  {
    gjonerror( error, " checkPosNumber ");
  }

  return true;
}


function checkAllNumber(number)
{
  //all numbers
  try
  {
    if(isNaN(number))
    {
      DisplayNotNumber(number);
      return false;
    }
  }
  catch (error)
  {
    gjonerror( error, " checkAllNumber ");
  }

  return true;
}

/*
round any number to x decimal points

1) Multiple the original number by 10^x (10 to the power of x)
2) Apply Math.round() to the result
3) Divide result by 10^x
*/

function Roundit(number, decimals)
{
  try
  {
    var result1 = number * Math.pow(10, decimals);
    var result2 = Math.round(result1);
    var result3 = result2 / Math.pow(10, decimals);
  }
  catch (error)
  {
    gjonerror( error, " Roundit ");
  }

  return (result3);
}



function days_between(date1, date2)
{

  // The number of milliseconds in one day
  var ONE_DAY = 1000 * 60 * 60 * 24;

  // Convert both dates to milliseconds
  var date1_ms = date1.getTime();
  var date2_ms = date2.getTime();

  // Calculate the difference in milliseconds
  var difference_ms = Math.abs(date1_ms - date2_ms);

  // Convert back to days and return
  return Math.round(difference_ms/ONE_DAY);
}

function date_from_days_and_date(date1, days)
{


  // The number of milliseconds in one day
  var ONE_DAY = 1000 * 60 * 60 * 24;

  // Convert both dates to milliseconds
  var date1_ms = date1.getTime();

  var milli_indays = ONE_DAY * days;

  var date2_ms = date1_ms + milli_indays;

  // get the new date
  var then = new Date(date2_ms);

  return then;
}

//Jun 15 2007 fix undeclareds on new s

function getShortMonthName(iMonth)
{

  var smname = new Array (  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
  "bad" );

  return (smname[iMonth]);
}

function getMonthName(iMonth)
{

  var mname = new Array (   "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
  "bad" );

  return (mname[iMonth]);
}

function getShortDayName(iDay)
{

  var sdname = new Array( "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "bad");
  return (sdname[iDay]);
}

function getDayName(iDay)
{
  //Jun 15 2007 undeclared
  var dname = new Array(  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "bad" );
  return (dname[iDay]);
}


var accumulate    = new Array( 31, 59, 90,120,151,181,212,243,273,304,334);
var accumulateLY  = new Array( 31, 60, 91,121,152,182,213,244,274,305,335);


function LeapYear(year)
{
  if ((year / 4)   != Math.floor(year / 4))   {return false;}
  if ((year / 100) != Math.floor(year / 100)) {return true;}
  if ((year / 400) != Math.floor(year / 400)) {return false;}
  return true;
}

function getJulian(day,month,year)
{
  if(month == -1)
  return (day);

  if(LeapYear(year))
  {
    return (day + accumulateLY[month]);
  }
  else
  {
    return (day + accumulate[month]);
  }
}

function format12HourTime(hour, min, sec)
{
  var ampm = "PM";

  if (min <= 9)
  {
    min = "0" + min;
  }

  if (sec <= 9)
  {
    sec = "0" + sec;
  }

  if (hour > 12)
  {
    hour = hour - 12;
    ampm = "PM";
  }
  else
  {
    //hour = hour;
    ampm = "AM";
  }

  if (hour == 12)
  {
    ampm = "PM";
  }

  if (hour == 00)
  {
    hour = "12";
  }

  if(hour <= 9)
  {
    hour =  "0" + hour;
  }

  var msg1 = hour;
  msg1 += ':' + min;
  msg1 += ':' + sec;
  msg1 += ' ' + ampm + ' ';

  return msg1;
}

function formatshort12HourTime(hour, min)
{
  var ampm = "PM";

  if (min <= 9)
  {
    min = "0" + min;
  }

  if (hour > 12)
  {
    hour = hour - 12;
    ampm = "PM";
  }
  else
  {
    //hour = hour;
    ampm = "AM";
  }

  if (hour == 12)
  {
    ampm = "PM";
  }

  if (hour == 00)
  {
    hour = "12";
  }

  if(hour <= 9)
  {
    hour =  "0" + hour;
  }

  var msg1 = hour;
  msg1 += ':' + min;
  msg1 += ' ' + ampm + ' ';

  return msg1;
}

function formatshort12HourTimeHour(hour)
{
  var ampm = "PM";

  if (hour > 12)
  {
    hour = hour - 12;
    ampm = "PM";
  }
  else
  {
    //hour = hour;
    ampm = "AM";
  }

  if (hour == 12)
  {
    ampm = "PM";
  }

  if (hour == 00)
  {
    hour = "12";
  }

  if(hour <= 9)
  {
    hour =  "0" + hour;
  }

  var msg1 = hour;
  msg1 += ' ' + ampm + ' ';

  return msg1;
}


function format24HourTime(hour, min, sec)
{

  if (min <= 9)
  {
    min = "0" + min;
  }

  if (sec <= 9)
  {
    sec = "0" + sec;
  }

  if(hour <= 9)
  {
    hour =  "0" + hour;
  }

  var msg1 = hour;
  msg1 += ':' + min;
  msg1 += ':' + sec + ' ';

  return msg1;
}

function formatshort24HourTime(hour, min)
{

  if (min <= 9)
  {
    min = "0" + min;
  }

  if(hour <= 9)
  {
    hour =  "0" + hour;
  }

  var msg1 = hour;
  msg1 += ':' + min + ' ';

  return msg1;
}

function DecToHex(numin)
{
  var digits = new Array('0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F');

  var hexResult = '';
  var theStart = true;
  for(var i = 32; i > 0;)
  {
    i-= 4;
    var oneDigit = (numin >> i) &0xf;
    if(!theStart || oneDigit !== 0)
    {
      theStart   = false;
      hexResult += digits[oneDigit];
    }
  }
  return '0x'+ hexResult;
}

function DecToOctal(numin)
{
  var digits = new Array('0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F');

  var octResult = '';
  var theStart = true;
  for(var i = 33; i > 0; )
  {
    i -= 3;
    var oneDigit = (numin >> i) &0x7;
    if(!theStart || oneDigit !== 0)
    {
      theStart   = false;
      octResult += digits[oneDigit];
    }
  }
  return '0'+ octResult;
}

function DecToBin(numin)
{
  var digits = new Array('0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F');

  var binResult = '';
  var theStart = true;
  for(var i = 32; i > 0;)
  {
    i -= 1;
    var oneDigit= (numin >> i ) &0x1;
    if(!theStart || oneDigit !== 0)
    {
      theStart   = false;
      binResult += digits[oneDigit];
    }
  }
  return binResult;
}

function BinToDec(binin)
{
  var binResult = 0;
  var thePlace =  0;
  var i = binin.length -1;
  while(i >= 0 && thePlace < 32)
  {
    if(binin.charAt(i) == '1')
    {
      binResult |= 1 << thePlace;
    }
    thePlace++;
    i -= 1;
  }
  return binResult;
}

// http://www.mredkj.com/javascript/nfbasic.html  public domain
// Code marked as public domain is without copyright, and can be used without restriction.
function addCommas(nStr)
{
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}

function formatOP()
{
//get div place
  var tape = document.getElementById('place');
  var theTable = tape.getElementsByTagName('TABLE')[0];
//I only use tBodies , there can be header and footer rows
  for( var z = 0; z < theTable.tBodies.length; z++ )
  {
    //x= 1 skip the first row, its my header
    for( var x = 1; x < theTable.tBodies[z].rows.length; x++ )
    {
      // walk the cells
      for( var y = 0; y < theTable.tBodies[z].rows[x].cells.length; y++ )
      {
        //get the text in each cell
        var myText=theTable.tBodies[z].rows[x].cells[y].textContent;
        //search through the text for numbers and format them with commas

        var re4 = /([\d\.]+)/;
        var newExpr = new String(myText);
        var opStr = "";
        RegExp.lastIndex=0;
        var a;
        while(a=re4.exec(newExpr))  //a is null if no match
        {
          newExpr = RegExp.rightContext;
          opStr = opStr + RegExp.leftContext + addCommas(RegExp.lastMatch);
        }
        theTable.tBodies[z].rows[x].cells[y].textContent = opStr+newExpr;
      }
    }
  }
}
function checkit(form)
{
      //just say no to some obvious stuff
      var re2 = /(function|script|include|import|sql|insert|update|replace|kill|lock|del|select|sudo|eval|document|window|getElement|node|create|name|id|drop|add)/i;
      if (re2.test(form.expr.value))
      {
         appendInnerHTML("pmyError","<BR> Rejected statement contains a string that looks fishy, example 'function' or 'document' ");
         setDisplayV('myError');
        return false;
      }

      if(form.expr.value.length > 75)
      {
        appendInnerHTML("pmyError","<BR> Nothing longer than 75 characters " + form.expr.value.length);
        setDisplayV('myError');
        return false;
      }

/*
      with this regular expression, the Parentheses ( ) let you reference part of the matched string as
      var re3 = /(.*?\d+)(,)(\d{3}.*?)/;   $1 $2 $3
      http://www.regular-expressions.info/brackets.html  backreference
      //  newExpr.replace(re3,"$1$3");
*/

      //Find numbers with commas
      var re3 = /(.*?\d+)(,)(\d{3}.*?)/;
      var newExpr = new String(form.expr.value);
      RegExp.lastIndex=0;

      var a;
      while(a=re3.exec(newExpr))  //a is null if no match
      {
        newExpr = stripChars(",", RegExp.lastMatch) + RegExp.rightContext;
      }
      form.expr.value = newExpr;

return true;
}

function stripChars(pattern, str)
{
  return str.replace(pattern,"");  // replace( old , new )
}

function checkError(form, Err)
{
      var tmp = "";
      //do we think they used x instead of * in the expression

      var re1 = /\x/i;
      if (re1.test(form.expr.value))
      {
        tmp += "<BR>Mulitply is * not x";
      }

      var re2 = /(–|—)/;
      if (re2.test(form.expr.value))
      {
        tmp += "<BR>You need a Minus sign -  You have either a – en dash or  — em dash, Type over it with a minus! ";
      }

      var displayErrName = Err.name;
      var displayErrMsg = Err.message;
      var re3 = /missing ;/i;
      if (re3.test(displayErrMsg))
      {
        displayErrMsg = "Cannot Evaluate this expression";
      }

      tmp += "<BR>Please enter a valid statement<BR>" + displayErrName + " " + displayErrMsg + "<BR>Pasteing into the Equation Box from another source can cause code conversion problems<BR>Type over your equation and it may solve the problem<BR>";
      //tmp += Err.name + " " + Err.message + "<BR>"
      tmp +="<a href=\"http://www.utf8-chartable.de/\">UTF-8 Table</a>\n";
      appendInnerHTML("pmyError",tmp + "<BR>Hex Dump of Equation <BR>");

      new Hexdump(form.expr.value,
      {
        container: 'pmyError2'
        , base: 'hexadecimal'
        , width: 16
        , ascii: true
        , byteGrouping: 1
        , html: true
        , lineNumber: false
        , style: {
            lineNumberLeft: ''
          , lineNumberRight: ':'
          , stringLeft: '|'
          , stringRight: '|<BR>'
          , hexLeft: ''
          , hexRight: ''
          , hexNull: '.g'
          , stringNull: '.'
        }
      });

       setDisplayV('myError');

/*
– 	&ndash; 	&#8211; 	en dash
— 	&mdash; 	&#8212; 	em dash
*/
}
function hideError(idin)
{
 changeInnerHTML("pmyError", "");
 changeInnerHTML("pmyError2", "");
 setDisplayH(idin);
}