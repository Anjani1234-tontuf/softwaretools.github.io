/*
Do not minify,  regular expresions do not like to be minified
Form fields are not strings!
*/

function gjStartup()
{
checkJS();
if (!supportHTML5email()) appendInnerHTML("qmyOP","Better in a Standards based browser like Firefox or Chrome!");
}

function checkJS()
{
  if(document)
  {
    document.getElementById('warn').style.display = "none";
    document.getElementById('main').style.display = "block";
  }
}

function supportHTML5email()
{
  var i = document.createElement("input");
  i.setAttribute("type", "email");
  return i.type === "email";
}
/*
Multivalue returns 0 is okay
1 for reguired and not entered 2 for string to long 3 for bad characters
*/
function checkText(instr)
{
try{
  var musthave = 0;
  if(instr.value.maxLength)
  {
    if (instr.value.length > instr.value.maxLength)
    return 2;
  }
//tag tel
  var re = /("tel"|'tel')/i;

  var it =  document.getElementById(instr.id).parentElement.innerHTML;
  if(re.test(it))
  {
    return(checkPhone(instr.value));
  }
//tag email
  var re = /("email"|'email')/i;

  var it =  document.getElementById(instr.id).parentElement.innerHTML;
  if(re.test(it))
  {
    return(checkEmail(instr.value));
  }
//zip somewhere in the field
  var re = /(zip)/i;

  var it =  document.getElementById(instr.id).parentElement.innerHTML;
  if(re.test(it))
  {
    return (checkZip(instr.value));
  }

  if (instr.hasAttribute("required"))
  {
    //alert(instr.id + " reguried attribute" );
    musthave = 1;
  }

  if((instr.value.length === 0) && musthave) return 1;
  if(instr.value.length === 0) return 0;

//unambigous utf-8 iso portion hex test
            //'    -  .     0-  9    A-  Z  `     a-   z sp  À-  Ö    Ø-  ö    ø- ÿ
  var re = /[\x27\x2D\x2E\x30-\x39\x41-\x5a\x60\x61-\x7a\s\xC0-\xD6\xD8-\xF6\xF8-\xFF]+/;

  var gjret;

  gjret = instr.value.match(re);

  var ok = ((gjret) && gjret[0].length == instr.value.length) ? true : false;

    if(ok)
    {
      var singlequote = /\x27/g;
      var gjret2 = instr.value.match(singlequote);
      if((gjret2) && gjret2.length > 1)
      {
        return 3; //More than one single quote
      }
      else
      {
        return 0; // yippe
      }
    }
    else
    {
      return 3; //not my extended alpaha
    }
  }
   catch (theerror)
  {
    var wintxt = "\n" + "\n" + " - - -  "  + "Error" +  " - - - " + "\n" + theerror.name + " - - -  " + " " +  theerror.message + " - - - " + "\n";
    alert(wintxt);
    }

return 0;
}
//gj dec 10 2013  

function checkPhone(str)
{
var realstring = new String(str);
  var phonexp = /^\d{3}[-]\d{3}[-]\d{4}(.*)?$/;
  if(realstring.length < 10)   {
    return 0;
  }
  var gjret =phonexp.test(realstring);
  if(gjret) {
    return 1; //good
  } else {
    return 0; //bad
  }
}


//either 12345 or 12345-1234
function checkZip(str)
{
var zipexp = /^(\d{5}([\-]\d{4})?)$/;
//var zipexp = /(\d{5}([\-]\d{4})?)/;
  if(str.length > 11) return 0;

   if(zipexp.test(str))
   {
      return 0;
   }
   else
   {
      return 1;
   }
}

function checkEmail(str)
{
  var emailexp = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
  if(emailexp.test(str))
  {
    return 0;
  }
  else
  {
   return 1;
  }
}

function checkSelect(elem)
{
  if(elem.selectedIndex === 0)
  {
    return 1;
  }
  else
  {
    return 0;
  }
}

function comboInit(thelist,theinput)
{
  theinput = document.getElementById(theinput);
  var idx = thelist.selectedIndex;
  var content = thelist.options[idx].innerHTML;
  if(theinput.value === "")
    theinput.value = content;
}

function combo(thelist, theinput)
{
  theinput = document.getElementById(theinput);
  var idx = thelist.selectedIndex;
  var content = thelist.options[idx].innerHTML;
  theinput.value = content;
}

theLabels = document.getElementsByTagName("label");

function validateOnSubmit(idin)
{
  var invalid = false; // Start by assuming everything is valid.
  var result=0;
  var msg1="";

  obj= document.getElementById(idin);
  changeInnerHTML("pmyOP","");

  for(var i = 0; i < obj.elements.length; i++)
  {
    var e = obj.elements[i];
    if(e.type == "text" | e.type == "tel" | e.type == "email")
    {
      result = checkText(e);
      myname = getLabel(e.id,theLabels);

      if(result !== 0)
      {
        if(result == 1)
        {
          if(!(myname === "1"))
          {
          msg1="Please enter a valid value for " + myname;
          invalid = true;
          }
        }
       if(result == 2)
        {
          if(!(myname === "1"))
          {
            msg1= myname + " is to long";
            invalid = true;
          }
        }
       if(result == 3)
       {
          if(!(myname === "1"))
          {
          msg1=myname + " has invalid characters, please use letters and numbers ";
          invalid = true;
          }
       }
       appendInnerHTML("pmyOP", msg1 + "</br>");
       myHighlightdo(e.id);
      }
      else
      {
         myHighlightundo(e.id);
      }

    } //end of type text
    else
    if(e.type == "select-one"|e.type == "select-multiple" |e.type == "select")
    {
      result = checkSelect(e);
      myname = getLabel(e.id,theLabels);

      if(result !== 0)
      {
        if(!(myname === "1"))
        {
          msg1=" Please select your " + myname;
          invalid = true;
          appendInnerHTML("pmyOP", msg1 + "</br>");
          myHighlightdo(e.id);
        }
      }
      else
        {
          myHighlightundo(e.id);
        }
      } //select
    else
    if(e.type == "submit")
    {
      continue;
    }
    else
    {
          invalid = true;
          appendInnerHTML("pmyOP", e.type + " Unkown input type </br>"); //new html5 types checkbox, radio, textarea
    }
  } //for

  if(invalid)
  {
      setDisplayV("tmyOP");
      appendInnerHTML("pmyOP","Please correct the highlighted fields and try again. <BR>");
      msg1="";
      return false;
  }
return true;
}

function getLabel(idin)
{
  for(var i = 0; i < theLabels.length; i++)
  {
    if(idin == theLabels[i].htmlFor)
    {
      if(theLabels[i].innerText) return theLabels[i].innerText;
      if(theLabels[i].innerHTML) return theLabels[i].innerHTML;
    }
  }
return "1";
}

function myHighlightdo(idin)
{
  document.getElementById(idin).style.borderStyle  = 'dotted';
  document.getElementById(idin).style.borderWidth  = '1px';
  document.getElementById(idin).style.borderColor  = 'red';
}

function myHighlightundo(idin)
{
  document.getElementById(idin).style.borderStyle  = 'none';
  document.getElementById(idin).style.borderWidth  = '0';
}

