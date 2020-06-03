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

/*
Changelog

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

function frmtNumber(expression,NumDigitsAfterDecimal)
{
  try
  {
    var strNum = new String(expression);
    var re = ".";
    var intDec = strNum.indexOf(re);
    if(intDec > 0)
    {
      intDec = (parseInt(intDec)+(NumDigitsAfterDecimal+1));
      strNum = strNum.substr(0,intDec);
      return strNum;
    }
    else
    {
      return strNum;
    }
  }
  catch (error)
  {
    gjonerror( error, " frmtNumber ");
  }
  return 0;
}

/*
fix this
100000 liter in milliliter = 100000000.10350735
10000 liter in milliliter = 10000000.010350736
1000 liter in milliliter = 1000000.0010350735
100 liter in milliliter = 100000.00010350735
10 liter in milliliter = 10000.000010350735
*/

function frmtNumberFraction(expression,NumDigitsAfterDecimal)
{

  try
  {
    // Use rounding instead of truncation for values > .001 to .000001 else just expression
    if(expression < .001)
    {
      if(expression < .000001)
      {
        return Math.round(expression  * 1000000)/1000000;
      }
      else
      if(expression < .00001)
      {
        return Math.round(expression  * 100000)/100000;
      }
      else
      if(expression < .0001)
      {
        return Math.round(expression  * 10000)/10000;
      }
      if(expression < .001)
      {
        return Math.round(expression  * 1000)/1000;
      }
    }

    var strNum = new String(expression);
    var re = ".";
    var intDec = strNum.indexOf(re);
    var whole = strNum.substring(0, intDec);
    if (whole == '0') {whole = "";}
    var frac =  strNum.substring((intDec + 1), (intDec + 5));
    //  alert(" frac " + frac + " whole " + whole);

    if(intDec > 0)
    {
      intDec = (parseInt(intDec)+(NumDigitsAfterDecimal+1));
      strNum = strNum.substr(0,intDec);

      switch (frac)
      {
        case '0039':
        strNum += " (" + whole + " 1/256)";
        break;
        case '0052':
        strNum += " (" + whole + " 1/192)";
        break;
        case '0078':
        strNum += " (" + whole + " 1/128)";
        break;
        case '0104':
        strNum += " (" + whole + " 1/96)";
        break;
        case '0208':
        strNum += " (" + whole + " 1/48)";
        break;
        case '0312':
        strNum += " (" + whole + " 1/32)";
        break;
        case '0416':
        strNum += " (" + whole + " 1/24)";
        break;
        case '0625':
        strNum += " (" + whole + " 1/16)";
        break;
        case '0833':
        strNum += " (" + whole + " 1/12)";
        break;
        case '125':
        strNum += " (" + whole + " 1/8)";
        break;
        case '1666':
        strNum += " (" + whole + " 1/6)";
        break;
        case '25':
        case '250':
        strNum += " (" + whole + " 1/4)";
        break;
        case '3333':
        strNum += " (" + whole + " 1/3)";
        break;
        case '375':
        strNum += " (" + whole + " 3/8)";
        break;
        case '5':
        case '50':
        case '500':
        strNum += " (" + whole + " 1/2)";
        break;
        case '625':
        strNum += " (" + whole + " 5/8)";
        break;
        case '6666':
        strNum += " (" + whole + " 2/3)";
        break;
        case '75':
        case '750':
        strNum += " (" + whole + " 3/4)";
        break;
        case '875':
        strNum += " (" + whole + " 7/8)";
        break;
        default : strNum += " ";
      }
      return strNum;
    }
    else
    {
      return strNum;
    }
  }
  catch (error)
  {
    gjonerror( error, " frmtNumberFraction ");
  }
  return 0;
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



function checkQuote(instr)
{
  //   var re1 = /[\"\']/; regular expressions has side effects in FireFox 1.03
  //


  if(instr.length == 0)
  return false;


  try
  {

    if(instr.indexOf("'") != -1)
    {
      return false;
    }
    else
    if(instr.indexOf('"') != -1)
    {
      return false;
    }
  }
  catch (error)
  {
    gjonerror( error, " checkQuote ");
  }

  return true;
}


function aplusb(form)
{
  try
  {
    if ( (checkAllNumber(form.a.value)) && (checkAllNumber(form.b.value)) )
    {
      var a=form.a.value - 0;
      var b=form.b.value - 0;
      var c=a+b;
      form.ans.value = frmtNumberFraction(c,3);
    }
  }
  catch (error)
  {
    DisplayNotNumber(form.a.value + " " + form.b.value );
    return false;
  }
  return true;
}

function aminusb(form)
{
  try
  {
    if ( (checkAllNumber(form.a.value)) && (checkAllNumber(form.b.value)) )
    {
      var a=form.a.value - 0;
      var b=form.b.value - 0;
      var c=a-b;
      form.ans.value=frmtNumberFraction(c,3);
    }
  }
  catch (error)
  {
    DisplayNotNumber(form.a.value + " " + form.b.value );
    return false;
  }
  return true;
}
function atimesb(form)
{
  try
  {
    if ( (checkAllNumber(form.a.value)) && (checkAllNumber(form.b.value)) )
    {
      var a=form.a.value - 0;
      var b=form.b.value - 0;
      var c=a * b;
      form.ans.value=frmtNumberFraction(c,3);
    }
  }
  catch (error)
  {
    DisplayNotNumber(form.a.value + " " + form.b.value );
    return false;
  }
  return true;
}
function adivb(form)
{
  try
  {
    if ( (checkAllNumber(form.a.value)) && (checkAllNumber(form.b.value)) )
    {
      var a=form.a.value - 0;
      var b=form.b.value - 0;
      var c=a/b;
      form.ans.value = frmtNumberFraction(c,3);
    }
  }
  catch (error)
  {
    DisplayNotNumber(form.a.value + " " + form.b.value );
    return false;
  }
  return true;
}
function apowb(form)
{
  try
  {
    if ( (checkAllNumber(form.a.value)) && (checkAllNumber(form.b.value)) )
    {
      var a=form.a.value - 0;
      var b=form.b.value - 0;
      if((a === 0) && (b === 0))
      {
        form.ans.value = "Not a Number";
      }
      else
      {
        var c=Math.pow(a, b);
        form.ans.value = c;
      }
    }
  }
  catch (error)
  {
    DisplayNotNumber(form.a.value + " " + form.b.value );
    return false;
  }
  return true;
}


/*

I do not want to leave evals in the code

function calc3(form)
{
try
{
var mynresult = eval(form.expr.value);
}
catch (error)
{
gjonerror( error, "Error Bad Data - Try Again  ");
return;
}

changeInnerHTML('myresult',mynresult);

}



function calc(form)
{
try
{
form.result.value=eval(form.expr.value);
}
catch(error)
{
gjonerror( error, "Error - Bad Data - Try Again ");
}
}

function calcDisplayFrac(form)
{
try
{
var temp = eval(form.expr.value);
form.result.value=  frmtNumberFraction(temp, 3);
}
catch (error)
{
gjonerror( error, "Conversion Calculator Error ");
}
}

*/

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
    hour = hour;
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
    hour =  "0" + hour
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
    hour = hour;
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
    hour =  "0" + hour
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
    hour = hour;
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
    hour =  "0" + hour
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
    hour =  "0" + hour
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
    hour =  "0" + hour
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
    if(!theStart || oneDigit != 0)
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
    if(!theStart || oneDigit != 0)
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
    if(!theStart || oneDigit != 0)
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