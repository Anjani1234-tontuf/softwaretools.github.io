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


var myStrike = 0;

function clearOP()
{
  changeInnerHTML("theop", "");
}


function saveText()
{
  this.itemCount  = 0;
  this.key    = new Array();
  this.values   =new Array();
}

saveText.prototype =
{
  getValueAt : function getValueAt(index)
  {
    return this.values[index];
  },
  getValueFor : function getValueFor(keyin)
  {
    for(var it = 0; it < this.itemCount; it++)
    {
      if(this.key[it] == keyin)
      {
        return  this.values[it];
      }
    }
    return '~0';
  },
  storeIt : function storeIt(keyin, valuein)
  {
    this.key.push(keyin);
    this.values.push(valuein);
    this.itemCount++;
  }
}

var theText = new saveText();

function myReset(formnum, idin)
{
  // Find all p where id ends with op in the form
  var root = document.getElementById(idin);
  var tds = root.getElementsByTagName("p");
  //    var tds = document.getElementsByTagName("p");
  var thisTD;
  var len;
  var strID;

  for (var ri = 0; ri  <  tds.length; ri++)
  {
    thisTD = tds[ri];
    len = thisTD.id.length;
    if ((thisTD.id.indexOf("op") == 0)  || (len == 0))
    {
      continue;
    }
    else
    {
      len = thisTD.id.length;
      strID = thisTD.id.substring(len - 2 , len);
      if(strID == 'op')
      {
        changeInnerHTML(thisTD.id, "");
      }
    }
  }
  document.forms[formnum].reset();
}

function mySaveText(idin)
{
  // Find all p where id ends with op
  var root = document.getElementById(idin);
  var tds = root.getElementsByTagName("p");
  var thisTD;
  var len;
  var strID;

  for (var si = 0; si  <  tds.length; si++)
  {
    thisTD = tds[si];
    len = thisTD.id.length;
    if ( (len != 0) && (thisTD.id.indexOf("op") != 0))
    {
      strID = thisTD.id.substring(len - 2 , len);
      if(strID == 'op')
      {
        theText.storeIt(thisTD.id, returnInnerHTML(thisTD.id));
        changeInnerHTML("theop", returnInnerHTML("theop") + "<br>mst" + returnInnerHTML(thisTD.id));
      }
    }
  }
}

function myRestoreText(idin)
{
  // Find all p where id ends with op
  var root = document.getElementById(idin);
  var tds = root.getElementsByTagName("p");
  var thisTD;
  var len;
  var strID;
  var newText;
  var iam;
  var myCount=0;

  for (var pi = 0; pi  <  tds.length; pi++)
  {
    thisTD = tds[pi];
    len = thisTD.id.length;
    if ((len != 0) && (thisTD.id.indexOf("op") != 0))
    {
      strID = thisTD.id.substring(len - 2 , len);
      if(strID == 'op')
      {
        newText = returnInnerHTML(thisTD.id)
        //changeInnerHTML("theop", returnInnerHTML("theop") + "<br>mrt1 " + newText + " " + newText.substring(0 , 4) + " "+ thisTD.id);
        changeInnerHTML("theop", returnInnerHTML("theop") + "<br>mrt1 " + myCount + " " + newText);
        changeInnerHTML("theop", returnInnerHTML("theop") + "<br>mrt2 " + myCount + " index " + theText.getValueAt(myCount++) + " key " + theText.getValueFor(thisTD.id));
        iam = newText.substring(0, 3);
        if(iam != "I am")
        {
          changeInnerHTML(thisTD.id, theText.getValueFor(thisTD.id));
        }
        else
        {
          changeInnerHTML(thisTD.id, newText);
        }
      }
    }
  }
}

/*

foreach $pair (@pairs)
{
($name, $value) = split(/=/, $pair);
$value =~ tr/+/ /;
$value =~ s/%([a-fA-F0-9][a-fA-F0-9])/pack("C", hex($1))/eg;
$value =~ s/<!--(.|\n)*-->//g;
$FORM{$name} = $value;
}


*/

//***** check for illegal characters in form entry
//untested an unused as of 06 - 2006
function checkValidFormValue(idin, stringin )
{
  var illegalChars = new Array('<', '>', '{', '}', '[', ']', '^', '&', '*', '#', '~', '+', '$', '(', ')', '%','=', '"');

  for (var i=0; i <illegalChars.length; i++)
  {
    if (stringin.indexOf(illegalChars[i], 0) != -1)
    {
      //alert('The following character cannot be used in a search string: ' + illegalChars[i] + '  Please modify this character and resubmit.');
      setError(nname, 'The following character cannot be used in a search string: ' + illegalChars[i] + '  Please modify this character and resubmit.', '');
      return false;
    }
  }

  delete illegalChars;
  return true;
}


function validateForm(formIn, idin)
{
  var root = document.getElementById(idin);
  var inputElements = new Array('select', 'input', 'textarea');
  var theReturn = true;
  var cbObj;

  try
  {
    for (var i = 0; i < inputElements.length; i++)
    {
      var oNodeList = root.getElementsByTagName(inputElements[i]);
      var nodeCount = oNodeList.length; // ie 0 - see the end

      changeInnerHTML("theop", returnInnerHTML("theop") + "<br>5" + "There are " + nodeCount + " nodes " );

      var thisName = '';
      for (var n = 0; n < nodeCount; n++)
      {
        var node = oNodeList.item(n);
        changeInnerHTML("theop", returnInnerHTML("theop") + "<br>4" + "number " + (n+1) +  ", local name: " + node.localName + " " + node.type + " " + node.name );

        if(isIE())
        {
          cbObj = node.tagName;
        }
        else
        {
          cbObj = node.localName;
        }

        if( cbObj == "INPUT")
        {

          var isReq = node.name.substr(0,1);
          var len = node.name.length;
          if(isReq == "R")
          {

            if(len < 5)
            {
              alert('aborting -> id name to short in form : ' + node.name);
              return false;
            }

            if(node.type == "radio")
            {
              if(thisName == node.name)
              {
                continue;
              }
              else
              {
                thisName = node.name
                if(!checkRadio(formIn, node.name))
                {
                  theReturn = false;
                  //alert("radio " + node.name);
                }
              }
            }

            if(node.type == "text")
            {
              if(node.name == "REmail")
              {
                if(!validateEmail(node.name,  node.name.value))
                {
                  theReturn = false;
                  //alert("email " + node.name);
                }
              }
              else if(node.name == "RPhone")
              {
                if(!validatePhone(node.name,  node.name.value))
                {
                  theReturn = false;
                  //alert("phone " + node.name);
                }
              }
              else
              {
                if(!checkText(formIn, node.name))
                {
                  theReturn = false;
                  //alert("text " + node.name);
                }
              }
            }
          }
        }

        //if(node.localName == "SELECT")
        if(cbObj == "SELECT")
        {
          var isReq = node.name.substr(0,1);
          var len = node.name.length;
          if(isReq == "R")
          {
            if(len < 5)
            {
              alert('aborting -> id name to short in form : ' + node.name);
              return false
            }
            if(!validateState(formIn, node.name))
            {
              theReturn = false;
              //alert("select " + node.name);
            }
          }
        }

        if(cbObj == "TEXTAREA")
        {

          var isReq = node.name.substr(0,1);
          var len = node.name.length;
          if(isReq == "R")
          {
            if(len < 5)
            {
              alert('aborting -> id name to short in form : ' + node.name);
              return false;
            }
            alert('Textare not done yet');

          }
        }
      } //for
    } //for
    mySaveText(idin);
  } //try
  catch(err)
  {
    gjonerror(err," validateForm for " + idin);
  }
  return theReturn;
}

function checkRadio(formIn, nname)
{
  //if its required then there is a hidden field with the value set to 1

  var theField = 'H' + nname;
  var theE = document.getElementById(theField);

  if(theE)
  {
    if(theE.value != 1)
    {
      setError(nname, 'I am required, please enter me ', '');
      return false;
    }
  }
  else
  {
    alert('checkRadio how did I get here ' + nname);
  }
  return true;
}

function checkText(formIn, nname)
{

  var theE = document.getElementById(nname);
  if(theE)
  {
    if(theE.value.length < 1)
    {
      setError(nname, 'I am required, please enter me ', '');
      return false;
    }
    /*
    else
    {
    clearError(nname, '','');
    return true;
    }
    */
  }
  else
  {
    alert('checkText how did I get here ' + nname);
  }
  return true;
}



/*

I could default the hiddens to 0
and set 1 for positive and -1 for negative
and use that to keep track of responses
but it would only work for requireds

*/

function setResponse( where, what, effect)
{
  var newWhat = what;

  try
  {
    setClass(where,"italicblue");
    var isReq = where.substr(0,1);

    if(isReq == "R")
    {
      var len = where.length;
      var realId = where.substr(0,(len - 2));
      var realHidden = "H" + realId;
      var theE = document.getElementById(realHidden);
      if(theE)
      {
        theE.value = 1;
      }
      else
      {
        alert("setResponse how did I get here where: " + where);
      }
    }

    if (what == "LIMITED")
    {
      newWhat = 'You will like the food dictionary and the widgets; however, the recipes are not for you at this time';
      setClass(where,"CBwarn")
    }
    else if (what == "No")
    {
      newWhat = 'You might like the widgets; however, the recipes and dictionary are not for you at this time';
      setClass(where,"CBerror")
    }
    //see isitrightforyou.html
    if(effect == "COUNTER")
    {
      myStrike++;
      newWhat = newWhat + myStrike;
      setClass(where,"CBwarn")
    }

    changeInnerHTML(where, newWhat  );
  }
  catch(err)
  {
    gjonerror(err,"setResponse where" + where + " what " + what);
  }
}


function setError( where, what, effect)
{
  try
  {
    var realId = where + "op";
    //alert("setError realId " + realId + " what " + what);
    var theE = document.getElementById(realId);
    if(theE)
    {
      setClass(realId,"CBerror");
      //alert("setError realId and what " + realId  + " " + what);
      changeInnerHTML(realId, what);
    }
    else
    {
      alert("setError how did I get here where: " + where + " what " + what);
    }
  }
  catch(err)
  {
    gjonerror(err,"setError where" + where + " what " + what);
  }
}

/*
see where this is commented out above, not used with the keep the response approach
*/
function clearError( where, what, effect)
{
  try
  {
    var realId = where + "op";
    //alert("setError realId " + realId + " what " + what);
    var theE = document.getElementById(realId);
    if(theE)
    {
      setClass(realId,"td1p");
      changeInnerHTML(realId, what  );
    }
    else
    {
      alert("setError how did I get here where: " + where + " what " + what);
    }
  }
  catch(err)
  {
    gjonerror(err,"setError where" + where + " what " + what);
  }
}

function validatePhone(idin, datain)
{
  try
  {
    var theE = document.getElementById(idin);
    if(theE.value.length > 0)
    {
      var phonestring = theE.value;
      //alert(phonestring);

      if(!checkValidFormValue(idin, phonestring))
      {
        setError(idin, 'invalid characters in phone ', '');
        return false;
      }
    }
    else
    {
      setError(idin, 'I am required, please enter me ', '');
    }
  }
  catch(err)
  {
    gjonerror(err,"validatePhone error for : "  + idin);
  }

  return true;
}

/*
datain not used, convention is to pass the id in
*/
function validateEmail(idin, datain)
{
  //alert("id " + idin  + " value " + datain);
  var emailstring = document.getElementById(idin).value;
  var ampIndex  = emailstring.indexOf("@");

  if (ampIndex  == -1)
  {
    setError(idin, "An email address should have an @!", "");
    return false;
  }

  var afterAmp  = emailstring.substring((ampIndex + 1), emailstring.length);
  // find a dot in  the portion of the string after the ampersand only
  var dotIndex  = afterAmp.indexOf(".");
  if (dotIndex  == -1)
  {
    setError(idin, "An email address should have a . after the @ for the domain name!", "");
    return false;
  }

  //  determine dot position in entire  string (not just after amp portion)
  dotIndex  = dotIndex + ampIndex + 1;
  //  afterAmp  will be portion of string from ampersand to dot
  afterAmp  = emailstring.substring((ampIndex + 1), dotIndex);
  //  afterDot  will be portion of string from dot to end of string
  var afterDot  = emailstring.substring((dotIndex + 1), emailstring.length);
  var beforeAmp = emailstring.substring(0,(ampIndex));
  var regex = /\;|#|\$|%|\^|&|\*|\(|\)|\+|\\|\/|\?|>|<|\{|\}|\,|\[|\]|\`|\|/;
  //  index of  -1 means "not found"
  if ((emailstring.length > 5)  &&
  (afterAmp.length > 0) &&
  (beforeAmp.length > 1) &&
  (afterDot.length > 1) &&
  ! (regex.test(emailstring)) )
  {
    return true;
  }
  else
  {
    setError(idin, "Please check your&quot;re email address!", "");
    return false;
  }
}

function validateState(formIn, nname)
{
  if (formIn.RState.selectedIndex == 0)
  {
    setError(nname, "Please selext a state!", "");
    return false;
  }
  else
  {
    return true;
  }
}

function submitIt(formIn, idin)
{
  try
  {
    mySaveText(idin);
    if(validateForm(formIn,idin)) //returns true or false for cgi action
    {
      alert('Victory');
    }
    else
    {
      alert('still false');
      myRestoreText(idin);
    }
  }
  catch(err)
  {
    gjonerror(err,"submitIt");
  }

  return false
}

