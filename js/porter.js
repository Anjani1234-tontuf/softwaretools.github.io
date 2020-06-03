// Porter stemmer in Javascript. Few comments, but it's easy to follow against the rules in the original
// paper, in
//
//  Porter, 1980, An algorithm for suffix stripping, Program, Vol. 14,
//  no. 3, pp 130-137,
//
// see also http://www.tartarus.org/~martin/PorterStemmer

// Release 1
//from the page above
// All these encodings of the algorithm can be used free of charge for any purpose.

/*
For stemword in porter
sauce goes to sauc verifed in example results on the porter pages
octopus goes to octupu
cheese goes to chees  - verified in example results on the porter page
maintain list of exceptions in Dictionay errors.doc

*/

function SearchNoResults(idin, termin)
{
  var termout;
  var which = 0;

  termout = stemWord(termin);

  if(termout != termin)
  {
    termout = "We calculate the word stem of the term as: <em>" + termout + "</em>&nbsp\;  Try that if it looks like the singular form of the term ";
    which = 1;
  }

  var firstch = termin.substr(0,1);
  var lc = firstch.toLowerCase();
  var ctermout;

  if (firstch == lc)
  {
    var uc = firstch.toUpperCase();
    ctermout = uc + termin.substr(1);
    if(which == 0)
    {
      termout =  "Try the uppercase version: <em>" + ctermout + "</em>";
    }
    else
    {
      termout =  termout + " and / or" + " the uppercase  version: <em>" + ctermout + "</em>";
    }
  }
  else
  {
    ctermout = lc + termin.substr(1);

    if(which == 0)
    {
      termout =  "Try the lowercase version: <em>" + ctermout + "</em>";
    }
    else
    {
      termout =  termout + " and / or " + " the lowercase version: <em>" + ctermout + "</em>";
    }
  }

  var isabbr = checkAbbeviations(termin);

  if(isabbr)
  {
    termout =  termout + " and / or " + "check <em>Measurement Equivalents</em> for <em>" + isabbr  + "</em>. This is either the plural of or an abbreviation of it: <em>" + termin + "</em>";
  }

  changeInnerHTML(idin, termout);

  return;
}


/*
sauce and cheese bad
*/

function stemWord(w)
{
  var step2list = new Array();
  step2list["ational"]="ate";
  step2list["tional"]="tion";
  step2list["enci"]="ence";
  step2list["anci"]="ance";
  step2list["izer"]="ize";
  step2list["bli"]="ble";
  step2list["alli"]="al";
  step2list["entli"]="ent";
  step2list["eli"]="e";
  step2list["ousli"]="ous";
  step2list["ization"]="ize";
  step2list["ation"]="ate";
  step2list["ator"]="ate";
  step2list["alism"]="al";
  step2list["iveness"]="ive";
  step2list["fulness"]="ful";
  step2list["ousness"]="ous";
  step2list["aliti"]="al";
  step2list["iviti"]="ive";
  step2list["biliti"]="ble";
  step2list["logi"]="log";

  var step3list = new Array();
  step3list["icate"]="ic";
  step3list["ative"]="";
  step3list["alize"]="al";
  step3list["iciti"]="ic";
  step3list["ical"]="ic";
  step3list["ful"]="";
  step3list["ness"]="";

  var c = "[^aeiou]";      // consonant
  var v = "[aeiouy]";      // vowel
  var C = c + "[^aeiouy]*";  // consonant sequence
  var V = v + "[aeiou]*";    // vowel sequence

  var mgr0 = "^(" + C + ")?" + V + C;         // [C]VC... is m>0
  var meq1 = "^(" + C + ")?" + V + C + "(" + V + ")?$";  // [C]VC[V] is m=1
  var mgr1 = "^(" + C + ")?" + V + C + V + C;     // [C]VCVC... is m>1
  var s_v   = "^(" + C + ")?" + v;           // vowel in stem

  var stem;
  var suffix;
  var firstch;
  var origword = w;

  if (w.length < 3)
  {
    return w;
  }

  var re;
  var re2;
  var re3;
  var re4;

  firstch = w.substr(0,1);
  if (firstch == "y")
  {
    w = firstch.toUpperCase() + w.substr(1);
  }

  // Step 1a
  re = /^(.+?)(ss|i)es$/;
  re2 = /^(.+?)([^s])s$/;

  if (re.test(w))
  {
    w = w.replace(re,"$1$2");
  }
  else if (re2.test(w))
  {
    w = w.replace(re2,"$1$2");
  }

  // Step 1b
  re = /^(.+?)eed$/;
  re2 = /^(.+?)(ed|ing)$/;
  if (re.test(w))
  {
    var fp = re.exec(w);
    re = new RegExp(mgr0);
    if (re.test(fp[1]))
    {
      re = /.$/;
      w = w.replace(re,"");
    }
  }
  else if (re2.test(w))
  {
    var fp = re2.exec(w);
    stem = fp[1];
    re2 = new RegExp(s_v);
    if (re2.test(stem))
    {
      w = stem;
      re2 = /(at|bl|iz)$/;
      re3 = new RegExp("([^aeiouylsz])\\1$");
      re4 = new RegExp("^" + C + v + "[^aeiouwxy]$");
      if (re2.test(w))
      {
        w = w + "e";
      }
      else if (re3.test(w))
      {
        re = /.$/; w = w.replace(re,"");
      }
      else if (re4.test(w))
      {
        w = w + "e";
      }
    }
  }

  // Step 1c
  re = /^(.+?)y$/;
  if (re.test(w))
  {
    var fp = re.exec(w);
    stem = fp[1];
    re = new RegExp(s_v);
    if (re.test(stem))
    {
      w = stem + "i";
    }
  }

  // Step 2
  re = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;
  if (re.test(w))
  {
    var fp = re.exec(w);
    stem = fp[1];
    suffix = fp[2];
    re = new RegExp(mgr0);
    if (re.test(stem))
    {
      w = stem + step2list[suffix];
    }
  }

  // Step 3
  re = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;
  if (re.test(w))
  {
    var fp = re.exec(w);
    stem = fp[1];
    suffix = fp[2];
    re = new RegExp(mgr0);
    if (re.test(stem))
    {
      w = stem + step3list[suffix];
    }
  }

  // Step 4
  re = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
  re2 = /^(.+?)(s|t)(ion)$/;
  if (re.test(w))
  {
    var fp = re.exec(w);
    stem = fp[1];
    re = new RegExp(mgr1);
    if (re.test(stem))
    {
      w = stem;
    }
  }
  else if (re2.test(w))
  {
    var fp = re2.exec(w);
    stem = fp[1] + fp[2];
    re2 = new RegExp(mgr1);
    if (re2.test(stem))
    {
      w = stem;
    }
  }

  // Step 5
  re = /^(.+?)e$/;
  if (re.test(w))
  {
    var fp = re.exec(w);
    stem = fp[1];
    re = new RegExp(mgr1);
    re2 = new RegExp(meq1);
    re3 = new RegExp("^" + C + v + "[^aeiouwxy]$");
    if (re.test(stem) || (re2.test(stem) && !(re3.test(stem))))
    {
      w = stem;
    }
  }

  re = /ll$/;
  re2 = new RegExp(mgr1);
  if (re.test(w) && re2.test(w))
  {
    re = /.$/;
    w = w.replace(re,"");
  }

  // and turn initial Y back to y

  if (firstch == "y")
  {
    w = firstch.toLowerCase() + w.substr(1);
  }
  delete step2list;
  delete step3list;
  return w;
}

/*
Meal-Master and other abbreviations
*/

function checkAbbeviations(termin)
{

  /*
  3 arrays matched by position
  abbreviation
  normal
  plural

  keep in synch, you have to add same place in all arrays at same time
  preferably at the end

  t is at 30 T is at 33

  ga g  g is sometimes used for gallons, not grams

  */

  var myreturn = 0;

  var abbrevList = new Array
  ("bn",
  "c" ,
  "cc",
  "cg",
  "cl",
  "cn",
  "ct",
  "dg",
  "dl",
  "dr",
  "ds",
  "ea",
  "kg",
  "fl",
  "g" ,
  "ga",
  "l" ,
  "lb",
  "lg",
  "md",
  "mg",
  "ml",
  "pg",
  "pk",
  "pn",
  "pt",
  "oz",
  "qt",
  "sl",
  "sm",
  "t" ,
  "tb",
  "ts",
  "T" ,
  "x" ,
  "tsp",
  "tbsp");



  var nameList =  new Array
  ("bunch",
  "cup",
  "cubic cm",
  "centigram",
  "centiliter",
  "can",
  "carton",
  "decigram",
  "deciliter",
  "drop",
  "dash",
  "each",
  "kilogram",
  "fluid ounce",
  "gram",
  "gallon",
  "liter",
  "pound",
  "large",
  "medium",
  "milligram",
  "milliliter",
  "package",
  "package",
  "pinch",
  "pint",
  "ounce",
  "quart",
  "slice",
  "small",
  "teaspoon",
  "tablespoon",
  "teaspoon",
  "tablespoon",
  "per serving",
  "teaspoon",
  "tablespoon" );


  var pluralList = new Array
  ("bunches",
  "cups",
  "cubic  cm",
  "centigrams",
  "centiliters",
  "cans",
  "cartons",
  "decigrams",
  "deciliters",
  "drops",
  "dashes",
  "each",
  "kilograms",
  "fluid  ounces",
  "grams",
  "gallons",
  "liters",
  "pounds",
  "large",
  "medium",
  "milligrams",
  "milliliters",
  "packages",
  "packages",
  "pinches",
  "pints",
  "ounces",
  "quarts",
  "slices",
  "small",
  "teaspoons",
  "tablespoons",
  "teaspoons",
  "tablespoons",
  "per serving",
  "tsps",
  "tbsps");

  if (( abbrevList.length !=  pluralList.length)  &&  (nameList.length !=  pluralList.length))
  {
    alert("Lists of unequal length in porter.js checkAbbeviations - We are hosed  ");
  }

  var tempTerm;
  var tempName;
  var tempAbbr;
  var tempPlur;


  //  special case for T t
  if(termin == "t")
  {
    myreturn = nameList[30];
  }
  else
  if(termin == 'T')
  {
    myreturn = nameList[33];
  }
  else
  {
    for(var i =0; i < abbrevList.length; i++)
    {
      tempTerm = termin.toUpperCase();
      tempName = nameList[i];
      tempAbbr = abbrevList[i];
      tempPlur = pluralList[i];

      if( tempTerm == tempAbbr.toUpperCase() || tempTerm == tempPlur.toUpperCase() )
      {
        myreturn = nameList[i];
        break;
      }
    }
  }

  delete abbrevList;
  delete pluralList;
  delete nameList;
  return myreturn;
}
