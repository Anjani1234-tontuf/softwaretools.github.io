function getWhich()
{
  return document.regtest1.inwhat1.value; //is true if nothing, is false if something is in the for
}

function getIt()
{
  var whatStr = new String();
  var iwhat = getWhich();
  if(!iwhat)
  {
    what = returnInnerHTML('it');
    whatStr = what;
  }
  else
  {
    whatStr = iwhat;
  }
  return whatStr;
}

function displayOP(results, testname, iwhat, whatStr)
{
  if( results > -1)
  {
    if(iwhat)
    {
      changeInnerHTML("theop", returnInnerHTML("theop") + "<br>" + results + " results " + testname + " TestRegExp pass on " + whatStr);
    }
    else
    {
      changeInnerHTML("theop", returnInnerHTML("theop") + "<br>" + results + " results " + testname + "TestRegExp pass on it" );
    }
  }
  else
  {
    if(iwhat)
    {
      changeInnerHTML("theop", returnInnerHTML("theop") + "<br>" + results + " results " + testname + " TestRegExp failed on " + whatStr);
    }
    else
    {
      changeInnerHTML("theop", returnInnerHTML("theop") + "<br>" + results + " results " + testname + "TestRegExp failed on it" );
    }
  }
}

function displayOP2(str1, str2)
{

  changeInnerHTML("theop2", returnInnerHTML("theop2") + "<br>" + str1 + " <-1 2-> " + str2 );
}

function displayOP1(str1)
{

  changeInnerHTML("theop", returnInnerHTML("theop") + "<br>" + str1 );
}

function clearOP()
{
  changeInnerHTML("theop", "");
  changeInnerHTML("theop2", "");

}

/*
Also see
C:\Documents and Settings\US\My Documents\ProgrammingAndTechRelated\regular expressions.doc
visbone fold out
Computer notebook

C:\CookBook\XXSoftwareTools\WebOrderForm.html

test if the string has anthing before loading up the engine  if(field.length == 0)
preceed all punctuation symbols with a \



on default input string == most of abalone
1
whatStr.search( /SHO/ )  returns 354 - its case sensitive

2
var re1 = /SHO/;
var results = re1.search( whatStr );

re1.search is not a function

3
whatStr.search( /SHO/i )  returns 354 - its case insensitive

4
x2c is hex ascii value of comma
re2 = /\x2C/;

re2.test()  returns > -1  if it finds a comma


4)
' ''
var re1 = /[\"\']/;

(re1.test(field)) returns position in field of either " or '

var re2 = /%/;
(re1.test(field)) returns position in field of %

5)
replace( old , new )

6)
var results = whatStr.search( /\<HR\>/i );  returns 339  where the <HR> is

displayOP2(RegExp.leftContext, RegExp.rightContext); returns
is a shellfish that resembles a large scallop when out of its shell.  Abalone is considered a delicacy and has been compared to calamari with a more subtle flavour.  Farmed abalone is sold commercially.  It is illegal to sell wild abalone in the United States, however, you can dig your own in mid to Northern California. <-1 2-> Specialty Fish Markets Eat as quickly as possible Take out of the shell Yields and Equivalents No Substitutions See : For additional information you could try researching farm raised seafood 15156


displayOP2(RegExp.lastMatch, RegExp.index); returns
an hr for last match and undefined

7)
dates in the form 02-02-04 or 01/01/2004  or 3/1/7

re = /^   (        ()|    (\d{1,2}       (  \/|-   )  \d{1,2}(  \/|-   )\d{2,4} )               )$/
not     blank?   between 1 2 digits  / or -             between 2 and 4


8

*/

//returns a new string without pattern, may not work with a newline
//stripChars( /:/, whatStr );  removes the first : , stripChars( /a/ig, whatStr ); removes all lower and upercase a

function stripChars(pattern, str)
{
  return str.replace(pattern,"")  // replace( old , new )
}

function stripNonDigits(str)
{
  return str.replace(/[^0-9]/g,"")
}


function hasLetter(str)
{
  var letterexp = /[a-z]/i
  return letterexp.test(str)
}

function hasChar(str)
{
  var charexp = /./
  return charexp.test(str)
}


function TestRegExp1()
{

  var whatStr = getIt();  //get input

  //var results = whatStr.search( /sho/i );
  //var results = stripChars( /\$/, whatStr );
  //var results = stripChars( /a/ig, whatStr );
//  var results = whatStr.search( /\<hr\>/i );

//  var results = whatstr.replace(/(\n)|(\r)/g, "");
  var results = whatStr.replace(/(Y)|(e)/g, "");


  displayOP(results, "HR : " , getWhich(), whatStr); //display output

  displayOP2(RegExp.leftContext, RegExp.rightContext); //display output
  displayOP2(RegExp.lastMatch, RegExp.index); //display output

}
/*
// does not   : / \ % . }
// does remove ( [ ' {   at begginging and end
//  word = word.replace(/(^[(\s*)\&\(\)\[\]\{\}\"\,\.\!\?\'\:\;])|([(\s*)\&\(\)\[\]\{\}\"\,\.\!\?\'\:\;]$)/g, "");
//  word = word.replace(/(^\s*)|(\s*$)/g, "");

*/

function TestRegExp2(what)
{

  var whatStr = getIt();  //get input

  switch(what)
  {
    case "txt" :      // Text only allowed
    re = /^[a-z ]*$/i
    break;
    case "num" :      // Only numbers (allow decimal)
    re = /^[\d\.]*$/
    break;
    case "int" :      // Integers only
    re = /^\d*$/
    break;
    case "adate" :      // dates in the form 02-02-04 or 01/01/2004  or 3/1/7
    re = /^(()|(\d{1,2}(\/|-)\d{1,2}(\/|-)\d{2,4}))$/
    break;
    case "email" :      // Something valid-ish for an email
    re = /^[a-z\d\.\-_]+@[a-z\d\.\-_]{2,}\.[a-z]{2,10}$/i
    break;
    case "alnum" :      // Alpha-numeric characters
    re = /^[\w ]*$/i
    break;
    case "curr" :     // Currency (using "$", "," and ".")
    re = /^\$?\d*,?\.?\d{0,2}$/i
    break;
    case "addr" :     // Base Address rule
    re = /^[\w- \.,#]*$/gi
    break;
    case "name" :     // Good for validating names
    re = /^[a-z,\-\. ]*$/gi
    break;
    case "free" :     // Freeform, text, num and some chars
    re = /^[\w\-\+\(\)\[\]\\/&, ]*$/i
    break;
    case "nobadsql" :   // Denies SQL which could be harmful
    re = /((delete|drop|update|replace|kill|lock) )/gi
    invertResult = true;
    break;
    case "notnull" :    // Requires *anything*
    re = /.+/
    break;
    default :     // Default - See "free"
    re = /^[\w\-\+\(\)\[\]\\/&, ]*$/i
  }

  var results = re.test(whatStr);

  displayOP(results, what + " " , getWhich(), whatStr); //display output
}


function TestRegExp3(what)
{

  //var whatStr = getIt();  //get input
    var newExpr = "4,312,000.+1,000.00000009";
//  var newExpr = "4312000.+1000.00000009";

  RegExp.lastIndex=0;
  var re3 = /(.*?\d+)(,)(\d{3}.*?)/;

  var a;
  while(a=re3.exec(newExpr))  //a is null if no match
  {
  //if(!a) return


  displayOP1("newExpr " + newExpr );
  displayOP1(" lC " + RegExp.leftContext + " rC " + RegExp.rightContext);
  displayOP1(" lM " + RegExp.lastMatch + " lI " + RegExp.lastIndex);
  displayOP1(" O1 " +  stripChars(",", RegExp.lastMatch) + RegExp.rightContext);
  newExpr = stripChars(",", RegExp.lastMatch) + RegExp.rightContext;
  }

  displayOP1("Final newExpr " + newExpr );

}

function TestRegExp4()
{

  var whatStr = getIt();  //get input

  var results = whatStr.search( /\(HR\)/i );
  if(results == -1)
  {
    alert("exiting,just write this out")
    return;
  }

  var sfirst = RegExp.leftContext; + "<hr>";

  displayOP1("sfirst{" + sfirst + "}" );

  var snext = RegExp.rightContext;

  displayOP1("snext{" + snext + "}" );

  RegExp.lastIndex=0;

  //var r =/\(b.class/gi;
//  var r =/<.+>/;
  var r =/\(b class.+\/b\)/;

  var a = '';
  var strOut="";
  //a = r.exec(snext);


  while( ( a = r.exec(snext)) != null)
  {
    strOut="";
    for(var i=0; i < a.length; i++)
    {
      strOut += " [" + i + "] " + a[i];
    }
    displayOP1("sout ");
    displayOP1(strOut);
    snext = RegExp.rightContext;

  }

}

function TestRegExp5(what)
{

  //var whatStr = getIt();  //get input
  var sBingo = "Calling b7 i20 n33, anybody win yet?";

  RegExp.lastIndex=0;
  var r = /([bingo])(\d{1,2})/g;
  var a=r.exec(sBingo)  //first exec breaks down first match anything in bingo followed by 1 or 2 digts
  //-- out [0] b7 [1] b [2] 7 -- in Calling b7 i20 n33, anybody win yet? exp /([bingo])(\d{1,2})/g

  a=r.exec(sBingo);
  //-- out [0] i20 [1] i [2] 20 -- in Calling b7 i20 n33, anybody win yet? exp /([bingo])(\d{1,2})/g

  var strOut="";

  for(var i=0; i < a.length; i++)
  {
    strOut += " [" + i + "] " + a[i];
  }

  displayOP1(" -- out " + strOut + " -- in " + sBingo + " exp " +r);//display output

  displayOP2(RegExp.leftContext, RegExp.rightContext); //display output
  displayOP2(RegExp.lastMatch, RegExp.lastIndex); //display output is it index or lastindex

}