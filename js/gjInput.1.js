/*
Do not minify,  regular expresions do not like to be minified
*/

function gjStartup()
{
if (!supportHTML5email())
appendInnerHTML("pmyOP","Better in a Standards based browser like Firefox or Chrome!");
checkJS();
}

function checkJS()
{
  if(document)
  {
    document.getElementById('warn').style.display = 'none';
    document.getElementById('main').style.display = 'block';
  }
}

function supportHTML5email()
{
//does not work
var i = document.createElement("input");
i.setAttribute("type", "email");
return i.type !== "input";
}
/*
Multivalue returns 0 is okay
1 for reguired and not entered 2 for string to long 3 for bad characters
*/
function checkText(instr)
{
  var musthave = 0;
  if(instr.value.maxLength)
  {
    if (instr.value.length > instr.value.maxLength)
    return 2;
  }

  var re = /("tel"|'tel')/i  //tag tel

  var it =  document.getElementById(instr.id).parentElement.innerHTML;
  if(re.test(it))
  {
    return(checkPhone(instr.value));
  }

  var re = /("email"|'email')/i //tag email

  var it =  document.getElementById(instr.id).parentElement.innerHTML;
  if(re.test(it))
  {
    return(checkEmail(instr.value));
  }

  var re = /(zip)/i //zip somewhere in the field

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

  if((instr.value.length == 0) && musthave) return 1;
  if(instr.value.length == 0) return 0;

  // var re = /[a-zA-Z0-9\.\-'`À-ÖØ-öø-ÿ\s]+'?/
  var re = /[a-zA-Z0-9'\.\-\s]+/
  if(re.test(instr.value))
  {
    return 0;
  }
  else
  {
    return 3;
  }
return 0;
}

function checkPhone(str)
{
var phonexp = /\d{3}[-]\d{3}[-]\d{4}(.*)?$/
   if(phonexp.test(str))
   {
      return 0; //not ok
   }
   else
   {
      return 1;
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
  var emailexp = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/
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
  if(elem.selectedIndex == 0)
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

function validateOnSubmit(obj)
{
  var invalid = false; // Start by assuming everything is valid.
  var result=0;
  var msg1="";

  changeInnerHTML("pmyOP","");

  for(var i = 0; i < obj.elements.length; i++)
  {
    var e = obj.elements[i];
    if(e.type == "text" | e.type == "tel" | e.type == "email")
    {
      result = checkText(e);
      myname = getLabel(e.id,theLabels);

      if(result != 0)
      {
        if(result == 1)
        {
          if(!(myname === "1")) msg1="Please enter a valid value for " + myname;
          invalid = true;
        }
       if(result == 2)
        {
          if(!(myname === "1")) msg1= myname + " is to long";
          invalid = true;
        }
       if(result == 3)
       {
          if(!(myname === "1")) msg1=myname + " has invalid characters, please use letters and numbers ";
          invalid = true;
       }
       appendInnerHTML("pmyOP", msg1 + "</br>");
       myHighlightdo(e.id)
      }
      else
      {
         myHighlightundo(e.id)
      }

    } //end of type text
    else
    if(e.type == "select-one"|e.type == "select-multiple" |e.type == "select")
    {
      result = checkSelect(e)
      myname = getLabel(e.id,theLabels);

      if(result != 0)
      {
        if(!(myname === "1")) msg1=" Please select your " + myname;
        {
          invalid = true;
          appendInnerHTML("pmyOP", msg1 + "</br>");
          myHighlightdo(e.id)
        }
      }
      else
        {
          myHighlightundo(e.id)
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

