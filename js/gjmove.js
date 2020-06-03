/*
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Copyright © 2000-2013 by Gary Johnson

COPYRIGHT
The information contained on this site is protected by Canadian, United States of America and international copyright laws.
All website materials, including, without limitation, design, text, graphics, photos, files, the Fast Track! logo, and
the selection and arrangement thereof are © 2000-2013 Gary Johnson ALL RIGHTS RESERVED.

Permission is granted to electronically copy and print to hard copy portions of this website for the sole purpose of
using materials it contains for informational and non-commercial personal use only.

Any other use of materials in this website, including any commercial use, reproduction for purposes other than those noted above,
modification, distribution or republication, without the prior written consent of Gary Johnson is strictly prohibited.

The Full Copyright statement is

http://garyjohnsoninfo.info/XXSoftwareTools/Copyright.html

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
*/


//Assocaitive  arrays used to make it easier for me to use mnemonics instead of numbers and to make defining options more compact
//object.property is the same as object["property"].
//sort() and join()  and other functions are not useful on these kinds of arrays

if (!window.F)
{
  var F =
  {
    HorizontalVertical: 0x0001,
    VerticalHorizontal: 0x0002,
    myWipeLeft:     0x0004,
    myWipeRight:    0x0008,
    myWipeTop:      0x0010,
    myWipeBottom:   0x0020,
    Fade:       0x0040,
    Plot:       0x0080,
    Init:       0x0100,
    DoneH:        0x0200,
    DoneV:        0x0400,
    DoneE:        0x0800,
    myClip:       0x1000,
    Diagonal:     0x2000,
    Keep:       0x4000,
    mySWipe:      0x8000,
    DoneA:         0x10000,
    Start:         0x20000,
    twosixtwo144:    0x40000,
    fivetwofour288:    0x80000,
    aaa:    0x100000,
    bbb:    0x200000,
    cccc:   0x400000,
    dddd:   0x800000,
    eeee:   0x1000000,
    ffff:   0x2000000,
    gggg:   0x4000000,
    hhhh:   0x8000000,
    iiii:   0x10000000,
    jjjj:   0x20000000,
    kkkk:   0x40000000
  };
}

if (!window.NO)
{
  var NO =
  {
    NUMBEROBJECTS:    0
  };
}

if (!window.objSGS)
{
  var objSGS =
  {
    objectNumber:   1,
    theId:        2,
    ointervalSpeed:   3,
    ointervalObj:   4,
    MIV:        5,
    MIH:        6,
    moveFromTop:    7,
    moveFromLeft:   8,
    moveToTop:      9,
    moveToLeft:     10,
    nextFunc:     11,
    theIdType:      12,
    theIdOrigTop:   13,
    theIdOrigLeft:    14,
    theIdOrigWidth:   15,
    theIdOrigHeight:  16,
    theIdOrigStyle:   17,
    theIdCurrTop:   18,
    theIdCurrLeft:    19,
    theIdCurrWidth:   20,
    theIdCurrHeight:  21,
    theIdClipCounter: 22,
    moveType:     23,
    MIE:        24
  };
}

if (!window.scrSGS)
{
  var scrSGS =
  {
    reserved:     1,
    clientWidth:    2,
    clientHeight:   3,
    screenWidth:    4,
    screenHeight:   5,
    screenColorDepth: 6,
    theXoffset:     7,
    theYoffset:     8
  };
}

if (!window.gI)
{
  var gI=
  {
    INTERVALOBJ:  0,
    INTERVALSPEED:  1
  };
}

if (!window.funcSGS)
{
  var funcSGS=
  {
    ObjRef:   0,
    synchFunc:  1
  };
}

//I need to add the unload function
//see hideit showit.  adding another CGGS with the same ID fakes out the
//get number from ID
//need to return the number or something so that it can handle this situtation

function sgsCleanUp()
{

  // called from window.unload
  // add an array
  // add things in it to delete
  // and code other actions to perform

  delete myGCSGS;
  myGCSGS = -1;
  //  alert('in sgsCleanUp');
}

//used in gjmsg.js to automatically sgsCleanUp  a CSGS global object when the html page unloads
//

function GCSGS()
{

  if(myGCSGS == -1)
  {
    myGCSGS = new CSGS();
  }


  if(typeof(myGCSGS.constructor) == 'CSGS')
  {
    alert('constructor');
  }

  if(typeof(myGCSGS) == 'object')
  {

    if(myGCSGS == 'CSGS')
    {
      alert('== CSGS');
    }

    if(window.onunload && (typeof(window.onunload) == 'function') && (window.onunload != sgsCleanUp) )
    {
      alert('we have an onunload already');
    }

    window.onunload=sgsCleanUp;

    //

    return myGCSGS;
  }
  else
  {
    alert('we are hosed in GCSGS');
    return -1;
  }
}

function CSGS(idin)
{
  this.objASGS = new Array();
  this.objASGS[NO.NUMBEROBJECTS] = 0;

  this.scrASGS  = new Array(8);
  this.Agi    = new Array(2);
  this.funcASGS = new Array(2);

  this.funcASGS[funcSGS.ObjRef] = 0;

  //if I set this global, and use it to reference all object.methods that I store in arrays
  //and execute with new
  //it looks like it works in Mozilla 1.5 and IE 6.0
  //generates  a strict warning   'assignment to undeclared variable myself'
  myself=this;

  this.scrASGS[scrSGS.clientWidth]      = getCW();
  this.scrASGS[scrSGS.clientHeight]     = getCH();

  this.scrASGS[scrSGS.screenWidth]      = screen.width;
  this.scrASGS[scrSGS.screenHeight]     = screen.height;
  this.scrASGS[scrSGS.screenColorDepth]   = screen.colorDepth;
  this.scrASGS[scrSGS.theXoffset]     = getXoffset();
  this.scrASGS[scrSGS.theYoffset]     = getYoffset();

  // a debugging check to see the state after a period of time
  /*
  var now   = new Date();

  var dsec = 20 * 1000; //30 seconds

  milliToStopAt = computeMillisec(now) + dsec;
  */
  if(!idin)
  {
    return;
  }
  else
  {
    this.addElement(idin);
  }

}

CSGS.prototype.addElement = function(idin)
{
  var newObjNum = 0;

  this.objASGS[NO.NUMBEROBJECTS]  +=  1;
  newObjNum = this.objASGS[NO.NUMBEROBJECTS];

/* $(document).ready(function() solves this
  if(mygetTop(idin) ==-1) alert("mygetTop");
  if(mygetLeft(idin) == -1) alert("mygetLeft");
  if(mygetWidth(idin) == -1) alert("mygetWidth");
  if(mygetHeight(idin) ==-1) alert("mygetHeight");
*/


  this.objASGS[newObjNum] = new Array(24);

  this.objASGS[newObjNum][objSGS.objectNumber]    = newObjNum;
  this.objASGS[newObjNum][objSGS.theId]       = idin;
  this.objASGS[newObjNum][objSGS.theIdType]     = 1;
  this.objASGS[newObjNum][objSGS.theIdOrigTop]    = mygetTop(idin);
  this.objASGS[newObjNum][objSGS.theIdOrigLeft]   = mygetLeft(idin);
  this.objASGS[newObjNum][objSGS.theIdOrigWidth]    = mygetWidth(idin);
  this.objASGS[newObjNum][objSGS.theIdOrigHeight]   = mygetHeight(idin);

  this.objASGS[newObjNum][objSGS.theIdCurrTop]    = mygetTop(idin);
  this.objASGS[newObjNum][objSGS.theIdCurrLeft]   = mygetLeft(idin);
  this.objASGS[newObjNum][objSGS.theIdCurrWidth]    = mygetWidth(idin);
  this.objASGS[newObjNum][objSGS.theIdCurrHeight]   = mygetHeight(idin);
  this.objASGS[newObjNum][objSGS.theIdClipCounter]  = 0;
  this.objASGS[newObjNum][objSGS.moveType]      = 0;
  //hack to prevent myself from calling addMove before setMI
  this.objASGS[newObjNum][objSGS.moveToTop]     = -1;

  try
  {

    this.setMI(newObjNum,0);
    this.setMIE(newObjNum,0);
    //  this.setIntervalSpeed(newObjNum,0);
    this.setIntervalSpeed(0);
    this.addEffect(newObjNum,0);
  }
  catch(error)
  {
    gjonerror(error, " addElement ");
  }
  //this.dump(newObjNum, "addElement");
  return newObjNum;
};

CSGS.prototype.setMI = function(idORbojNum, newMI)
{
  //is there an over ride ?
  //check machine
  //check browser

  var newObjNum;

  try
  {

    newObjNum = this.getNumberFromIDorNum(idORbojNum);
    if(newObjNum == -1)
    {
      alert("getNumberFromIDorNum failed in setMI " +  idORbojNum + " newMI " + newMI);
      return;
    }

    if(this.objASGS[newObjNum][objSGS.moveToTop] != -1)
    {
      alert("call to setMI after callto addMove newObjNum: " + newObjNum + " idORbojNum: " + idORbojNum + " newMI: " + newMI);
    }


    if(!newMI) //0 uses the default
    {
      if(isIE())
      {
        this.objASGS[newObjNum][objSGS.MIV] = 25;
        this.objASGS[newObjNum][objSGS.MIH] = 25;
      }
      else
      {
        this.objASGS[newObjNum][objSGS.MIV] = 25;
        this.objASGS[newObjNum][objSGS.MIH] = 25;
      }
    }
    else
    {
      this.objASGS[newObjNum][objSGS.MIV] = newMI;
      this.objASGS[newObjNum][objSGS.MIH] = newMI;
    }
  }
  catch(error)
  {
    gjonerror(error, "setMI ");
  }
};

CSGS.prototype.setMIE = function(idORbojNum, newMIE)
{
  var newObjNum;

  newObjNum = this.getNumberFromIDorNum(idORbojNum);
  if(newObjNum == -1)
  {
    return;
  }

  if(!newMIE) //0 uses the default
  {
    if(isIE())
    {
      this.objASGS[newObjNum][objSGS.MIE] = 5;
    }
    else
    {
      this.objASGS[newObjNum][objSGS.MIE] = 5;
    }
  }
  else
  {
    this.objASGS[newObjNum][objSGS.MIE] = newMIE;
  }

};

CSGS.prototype.setIntervalSpeed = function(newIS)
{
  if(!newIS) //0 uses the default
  {
    if(isIE())
    {
      this.Agi[gI.INTERVALSPEED] = 60;
    }
    else
    {
      this.Agi[gI.INTERVALSPEED] = 60;
    }
  }
  else
  {
    this.Agi[gI.INTERVALSPEED] = newIS;
  }
};


CSGS.prototype.addEffect = function(idORbojNum, funcToCall, option)
{
  var newObjNum;

  newObjNum = this.getNumberFromIDorNum(idORbojNum);
  if(newObjNum == -1)
  {
    return;
  }

  //defaults to   top in the effects code
  if(option)
  {
    switch (option)
    {
      case 'myKeep':
      this.objASGS[newObjNum][objSGS.moveType]       |= F.Keep;
      break;
      case 'WLR':
      this.objASGS[newObjNum][objSGS.moveType]       |= F.myWipeLeft;
      break;
      case 'WRL':
      this.objASGS[newObjNum][objSGS.moveType]       |= F.myWipeRight;
      this.objASGS[newObjNum][objSGS.theIdClipCounter] = this.objASGS[newObjNum][objSGS.theIdOrigLeft];
      break;
      case 'WTB':
      this.objASGS[newObjNum][objSGS.moveType]       |= F.myWipeTop;
      break;
      case 'WBT':
      this.objASGS[newObjNum][objSGS.moveType]       |= F.myWipeBottom;
      this.objASGS[newObjNum][objSGS.theIdClipCounter] = this.objASGS[newObjNum][objSGS.theIdOrigHeight];
      break;
      default:
      break;
    }
  }

  if(!funcToCall) //0 uses the default
  {
    myself.ptrEffect      = '';
    this.objASGS[newObjNum][objSGS.moveType] |= F.DoneE;
  }
  else
  {
    //mywipe dead
    this.objASGS[newObjNum][objSGS.moveType] ^= F.DoneE;
    switch (funcToCall)
    {
      case 'mySWipe':
      myself.ptrEffect      = myself.mySWipe;
      this.objASGS[newObjNum][objSGS.moveType] |= F.mySWipe;
      break;
      case 'myClip':
      myself.ptrEffect      = myself.myClip;
      this.objASGS[newObjNum][objSGS.moveType] |= F.myClip;
      break;
      default :
      myself.ptrEffect    = '';
    }
  }

  this.objASGS[newObjNum][objSGS.nextFunc]  =   myself.ptrEffect;
};

CSGS.prototype.toggleEffect = function(objNum)
{
  //this is dead but still called
};

//                        LEFT   TOP  LEFT TOP
CSGS.prototype.addMove = function(idORbojNum, fromx, fromy, tox, toy, diag)
{

  var newObjNum;

  newObjNum = this.getNumberFromIDorNum(idORbojNum);
  if(newObjNum == -1)
  {
    return;
  }

  if(tox == 'l')
  {
    //    this.objASGS[newObjNum][objSGS.moveToLeft]  = this.scrASGS[scrSGS.theXoffset] + 2;//0 cuts off borders. to uch to do to to compute at the moment
    this.objASGS[newObjNum][objSGS.moveToLeft]    = this.scrASGS[scrSGS.theXoffset];//0
  }
  else if(tox == 'r')
  {
    this.objASGS[newObjNum][objSGS.moveToLeft]    = this.scrASGS[scrSGS.theXoffset] + (this.scrASGS[scrSGS.clientWidth] - this.objASGS[newObjNum][objSGS.theIdOrigWidth]);
  }
  else if(tox == 'c')
  {
    this.objASGS[newObjNum][objSGS.moveToLeft]    = this.scrASGS[scrSGS.theXoffset] + ((this.scrASGS[scrSGS.clientWidth] - this.objASGS[newObjNum][objSGS.theIdOrigWidth]) / 2);
  }
  else if(typeof(tox) == 'number')
  {
    this.objASGS[newObjNum][objSGS.moveToLeft]    = tox;
  }
  else
  {
    alert('we are hosed in addMove tox');
  }

  if(toy == 'b')
  {
    this.objASGS[newObjNum][objSGS.moveToTop] = this.scrASGS[scrSGS.theYoffset] + (this.scrASGS[scrSGS.clientHeight] - this.objASGS[newObjNum][objSGS.theIdOrigHeight]);
  }
  else if(toy == 't')
  {
    this.objASGS[newObjNum][objSGS.moveToTop] = this.scrASGS[scrSGS.theYoffset]; //0 cuts off borders.
  }
  else if(toy == 'c')
  {
    this.objASGS[newObjNum][objSGS.moveToTop] = this.scrASGS[scrSGS.theYoffset] + ((this.scrASGS[scrSGS.clientHeight] - this.objASGS[newObjNum][objSGS.theIdOrigHeight]) / 2);
  }
  else if(typeof(toy) == 'number')
  {
    this.objASGS[newObjNum][objSGS.moveToTop] = toy;
  }
  else
  {
    alert('we are hosed in addMove toy');
  }

  /*
  the ll and lr should move Vertically then Horizontal  (?if top is 0)
  the tr and tl should move Horizontal then Vertical  (?if top is not 0)

  I am ignoring moveFromTop and setting theIdCurrTop instead
  if using mnemonics I will only check one
  */

  if(fromx == 'll') // this sets both x and y
  {
    this.objASGS[newObjNum][objSGS.theIdCurrLeft] = this.scrASGS[scrSGS.theXoffset] + 0;
    this.objASGS[newObjNum][objSGS.theIdCurrTop]  = this.scrASGS[scrSGS.theYoffset] + this.scrASGS[scrSGS.clientHeight];
    this.objASGS[newObjNum][objSGS.moveType]    |=  F.VerticalHorizontal;
  }
  else if(fromx == 'lr')
  {
    this.objASGS[newObjNum][objSGS.theIdCurrLeft] = this.scrASGS[scrSGS.theXoffset] + (this.scrASGS[scrSGS.clientWidth] - this.objASGS[newObjNum][objSGS.theIdOrigWidth]);
    this.objASGS[newObjNum][objSGS.theIdCurrTop]  = this.scrASGS[scrSGS.theYoffset] + this.scrASGS[scrSGS.clientHeight];
    this.objASGS[newObjNum][objSGS.moveType]    |=  F.VerticalHorizontal;
  }
  else if(fromx == 'tr')
  {
    this.objASGS[newObjNum][objSGS.theIdCurrLeft] = this.scrASGS[scrSGS.theXoffset] + this.scrASGS[scrSGS.clientWidth];
    this.objASGS[newObjNum][objSGS.theIdCurrTop]  = 0;
    this.objASGS[newObjNum][objSGS.moveType]    |=  F.HorizontalVertical;
  }
  else if(fromx == 'tl')
  {
    this.objASGS[newObjNum][objSGS.theIdCurrLeft] = this.scrASGS[scrSGS.theXoffset] + 0;
    this.objASGS[newObjNum][objSGS.theIdCurrTop]  = this.scrASGS[scrSGS.theYoffset] + 0;
    this.objASGS[newObjNum][objSGS.moveType]    |=  F.HorizontalVertical;
  }
  else if(fromx == 'cl')
  {
    this.objASGS[newObjNum][objSGS.moveType]    |=  F.HorizontalVertical;
  }
  else
  {
    this.objASGS[newObjNum][objSGS.theIdCurrLeft] = (fromx - 0);
    this.objASGS[newObjNum][objSGS.theIdCurrTop]  = (fromy - 0);
    this.objASGS[newObjNum][objSGS.moveType]    |=  F.HorizontalVertical;
  }

  if(this.objASGS[newObjNum][objSGS.moveToLeft] < this.objASGS[newObjNum][objSGS.theIdCurrLeft])
  {
    this.objASGS[newObjNum][objSGS.MIH] *= -1;
  }

  //adjust the moveTo's so that we don't move past where we want to
  /*
  moved 5/3 to moveVertical
  if((Math.abs(this.objASGS[newObjNum][objSGS.moveToLeft] - this.objASGS[newObjNum][objSGS.theIdCurrLeft]) % Math.abs(this.objASGS[newObjNum][objSGS.MIH])) !=0)
  {
  this.objASGS[newObjNum][objSGS.moveToLeft] -= this.objASGS[newObjNum][objSGS.MIH];
  }
  */
  if(this.objASGS[newObjNum][objSGS.moveToTop] < this.objASGS[newObjNum][objSGS.theIdCurrTop])
  {
    this.objASGS[newObjNum][objSGS.MIV] *= -1;
  }
  //adjust the moveTo's so that we don't move past where we want to
  /*

  moved 5/3 to moveHorizontal
  if((Math.abs(this.objASGS[newObjNum][objSGS.theIdCurrTop] - this.objASGS[newObjNum][objSGS.moveToTop]) % Math.abs(this.objASGS[newObjNum][objSGS.MIV])) !=0)
  {
  this.objASGS[newObjNum][objSGS.moveToTop] -= this.objASGS[newObjNum][objSGS.MIV];
  }
  */
  if(diag)
  {
    if(this.objASGS[newObjNum][objSGS.moveType]   & F.HorizontalVertical)
    {
      this.objASGS[newObjNum][objSGS.moveType]  |=  F.HorizontalVertical;
    }

    if(this.objASGS[newObjNum][objSGS.moveType]   & F.VerticalHorizontal)
    {
      this.objASGS[newObjNum][objSGS.moveType]  |=  F.VerticalHorizontal;
    }

    this.objASGS[newObjNum][objSGS.moveType]  |=  F.Diagonal;
  }

};


CSGS.prototype.doIt = function(idORbojNum)
{
  //this way does not allow me to set different interval speeds
  //I could setup one interval and compute in here when to do some of the moves
  //sort of like how I did the timers

  try
  {
    if((!(this.objASGS[1][objSGS.moveType] & F.Start)) &&  (checkDebug()))
    {
      myself.dumpScreens("beginning");
      this.objASGS[1][objSGS.moveType] |= F.Start;
    }


    if(idORbojNum)
    {
      var newObjNum;

      newObjNum = this.getNumberFromIDorNum(idORbojNum);
      if(newObjNum == -1)
      {
        return;
      }
    }
    //as soon as I get the below fixed, I coulds fix the above; however, for most of what I anticpate doing, its not necessary


    for (var i = 1; i <= this.objASGS[NO.NUMBEROBJECTS]; i++)
    {
      if(!(this.objASGS[i][objSGS.moveType] & F.Init))
      {
        this.objASGS[i][objSGS.moveType] |= F.Init;
        setLeft(this.objASGS[i][objSGS.theId] , this.objASGS[i][objSGS.theIdCurrLeft]);
        setTop(this.objASGS[i][objSGS.theId]  , this.objASGS[i][objSGS.theIdCurrTop]);
        //could check to see if its already visible
        setVisible(this.objASGS[i][objSGS.theId]);
      }
      //the next two get excuted each pass (if diagonal)
      //rather than one at a time for the HorizontalVertical VerticalHorizontal
      if((this.objASGS[i][objSGS.moveType] & F.Diagonal) && (!(this.objASGS[i][objSGS.moveType] & F.DoneH)))
      {
        this.moveHorizontal(i);
      }

      if((this.objASGS[i][objSGS.moveType] & F.Diagonal) && (!(this.objASGS[i][objSGS.moveType] & F.DoneV)))
      {
        this.moveVertical(i);
      }

      if((this.objASGS[i][objSGS.moveType] & F.HorizontalVertical) && (!(this.objASGS[i][objSGS.moveType] & F.DoneH)))
      {
        this.moveHorizontal(i);
      }

      if((this.objASGS[i][objSGS.moveType] & F.HorizontalVertical) && (this.objASGS[i][objSGS.moveType] & F.DoneH) && (!(this.objASGS[i][objSGS.moveType] & F.DoneV)))
      {
        this.moveVertical(i);
      }

      if((this.objASGS[i][objSGS.moveType] & F.VerticalHorizontal) && (!(this.objASGS[i][objSGS.moveType] & F.DoneV)))
      {
        this.moveVertical(i);
      }

      if((this.objASGS[i][objSGS.moveType] & F.VerticalHorizontal) && (this.objASGS[i][objSGS.moveType] & F.DoneV) && (!(this.objASGS[i][objSGS.moveType] & F.DoneH)))
      {
        this.moveHorizontal(i);
      }

      //if this one is done moving, call the next func
      if( (this.objASGS[i][objSGS.moveType] & F.DoneH) && (this.objASGS[i][objSGS.moveType] & F.DoneV) && (!(this.objASGS[i][objSGS.moveType] & F.DoneE)) )
      {
        if(this.objASGS[i][objSGS.nextFunc] !== '')
        {
          //this.toggleEffect(i);
          if((this.objASGS[i][objSGS.nextFunc]) == myself.mySWipe)
          {
            this.mySWipe(i);
          }
          else
          if((this.objASGS[i][objSGS.nextFunc]) == myself.myClip)
          {
            this.myClip(i);
          }
        }
      }
    }

    for (var i = 1; i <= this.objASGS[NO.NUMBEROBJECTS]; i++)
    {
      //if any are not done, call this again
      if( (!(this.objASGS[i][objSGS.moveType] & F.DoneH)) || (!(this.objASGS[i][objSGS.moveType] & F.DoneV)) || (!(this.objASGS[i][objSGS.moveType] & F.DoneE)) )
      {
        /*
        this is a nice way to test in something like the moves.html, but not the global object like in mypopup.html
        var now     = new Date();
        var milliNow  = computeMillisec(now)
        if (milliNow > milliToStopAt)
        {
        myself.amIDone();
        return;
        }
        */
        setTimeout(function() { myself.doIt()},this.Agi[gI.INTERVALSPEED]);
        return;
      }

    }

    if(myself.funcASGS[funcSGS.ObjRef])
    {
      this.funcASGS[funcSGS.ObjRef][this.funcASGS[funcSGS.synchFunc]]();
    }

    if(checkDebug())
    {
      myself.dumpScreens("end");
      myself.amIDone();
    }

  }
  catch (ex)
  {
    //alert('crash');
  }
  //done
  //  window.clearInterval(this.Agi[gI.INTERVALOBJ]);
  return;
};


//this is to be called by setInterval
CSGS.prototype.moveVertical = function(newObjNum)
{

  var terminate = Math.abs((this.objASGS[newObjNum][objSGS.theIdCurrTop]) - (this.objASGS[newObjNum][objSGS.moveToTop]));

  if(terminate > Math.abs(this.objASGS[newObjNum][objSGS.MIV]))
  {
    this.objASGS[newObjNum][objSGS.theIdCurrTop] += this.objASGS[newObjNum][objSGS.MIV];
  }
  else
  {
    this.objASGS[newObjNum][objSGS.theIdCurrTop] = this.objASGS[newObjNum][objSGS.moveToTop];
  }

  setTop(this.objASGS[newObjNum][objSGS.theId], this.objASGS[newObjNum][objSGS.theIdCurrTop]);

  if(this.objASGS[newObjNum][objSGS.MIV] < 0)
  {
    if(this.objASGS[newObjNum][objSGS.theIdCurrTop] <= this.objASGS[newObjNum][objSGS.moveToTop])
    {
      this.objASGS[newObjNum][objSGS.moveType] |= F.DoneV;
    }
  }
  else
  {
    if(this.objASGS[newObjNum][objSGS.theIdCurrTop] >= this.objASGS[newObjNum][objSGS.moveToTop])
    {
      this.objASGS[newObjNum][objSGS.moveType] |= F.DoneV;
    }
  }
};

CSGS.prototype.moveHorizontal = function(newObjNum)
{
  var terminate = Math.abs((this.objASGS[newObjNum][objSGS.theIdCurrLeft]) - (this.objASGS[newObjNum][objSGS.moveToLeft]));

  if(terminate > Math.abs(this.objASGS[newObjNum][objSGS.MIH]))
  {
    this.objASGS[newObjNum][objSGS.theIdCurrLeft] += this.objASGS[newObjNum][objSGS.MIH];
  }
  else
  {
    this.objASGS[newObjNum][objSGS.theIdCurrLeft] = this.objASGS[newObjNum][objSGS.moveToLeft];
  }

  //this.objASGS[newObjNum][objSGS.theIdCurrLeft] += this.objASGS[newObjNum][objSGS.MIH];
  //Aug 2011  test and stop
  if(!(this.objASGS[newObjNum][objSGS.theId])) return;

  if(!(this.objASGS[newObjNum][objSGS.theIdCurrLeft])) return;


  setLeft(this.objASGS[newObjNum][objSGS.theId], this.objASGS[newObjNum][objSGS.theIdCurrLeft]);

  //    this.dump(newObjNum);

  if(this.objASGS[newObjNum][objSGS.MIH] < 0)
  {
    if(this.objASGS[newObjNum][objSGS.theIdCurrLeft] <= this.objASGS[newObjNum][objSGS.moveToLeft])
    {
      this.objASGS[newObjNum][objSGS.moveType] |= F.DoneH;
    }
  }
  else
  {
    if(this.objASGS[newObjNum][objSGS.theIdCurrLeft] >= this.objASGS[newObjNum][objSGS.moveToLeft])
    {
      this.objASGS[newObjNum][objSGS.moveType] |= F.DoneH;
    }
  }
};


CSGS.prototype.getNumberFromIDorNum = function(idORbojNum)
{
  var newObjNum;

  try
  {
    if(!testInteger(idORbojNum))
    {
      //if its not an integer
      newObjNum = this.getNumberFromId(idORbojNum);
      if(newObjNum == -1)
      {
        if(checkDebug())
        {
          doMessage('Object Num invalid in CSGS idORbojNum ' + idORbojNum + " newObjNum " + newObjNum); // this is the internal call
          this.dump3('getNumberFromIDorNum');
          this.dump(newObjNum,'addMove');
        }
        return -1;
      }
    }
    else
    {

      if(idORbojNum > this.objASGS[NO.NUMBEROBJECTS])
      {
        if(checkDebug())
        {
          doMessage('Internal Error Object ID invalid in CSGS ' + idORbojNum);
          this.dump(newObjNum,'addMove');
          this.dump3('getNumberFromIDorNum');
        }
        return -1;
      }
      else
      {
        newObjNum = idORbojNum;
      }
    }
  }
  catch(error)
  {
    gjonerror(error, " getNumberFromIDorNum ");
  }

  return newObjNum;
};


CSGS.prototype.getNumberFromId = function(idin)
{
  var icounter = 0;

  try
  {
    for(var i = 1; i <= this.objASGS[NO.NUMBEROBJECTS]; i++)
    {
      if(this.objASGS[i][objSGS.theId] == idin) //
      {
        return this.objASGS[i][objSGS.objectNumber];
      }
    }
  }
  catch(error)
  {
    gjonerror(error, " getNumberFromId ");
  }
  return -1;
};


CSGS.prototype.dump = function(newObjNum,msg)
{

  var mymsg = '';
  mymsg  += msg + '\n';
  mymsg  += this.scrASGS[scrSGS.clientWidth]  + ' clientWidth' + '\n';
  mymsg  += this.scrASGS[scrSGS.clientHeight] + ' clientHeight' + '\n';
  mymsg  += this.scrASGS[scrSGS.screenWidth]  + ' screenWidth' + '\n';
  mymsg  += this.scrASGS[scrSGS.screenHeight] + ' screen Height' + '\n';
  mymsg  += this.scrASGS[scrSGS.screenColorDepth] + ' colorDepth' + '\n';

  mymsg  += this.objASGS[newObjNum][objSGS.ointervalObj] + '  ointervalobj' + '\n';
  mymsg  += this.objASGS[newObjNum][objSGS.theId]    + ' theId' + '\n';
  mymsg  += this.objASGS[newObjNum][objSGS.MIV]      + ' MIV' + '\n';
  mymsg  += this.objASGS[newObjNum][objSGS.MIH]      + ' MIH' + '\n';
  mymsg  += this.objASGS[newObjNum][objSGS.ointervalSpeed] + ' ointervalSpeed' + '\n';
  mymsg  += this.objASGS[newObjNum][objSGS.moveFromTop]    + ' MFT' + '\n';
  mymsg  += this.objASGS[newObjNum][objSGS.moveFromLeft]   + ' MFL' + '\n';
  mymsg  += this.objASGS[newObjNum][objSGS.moveToTop]    + ' MTT' + '\n';
  mymsg  += this.objASGS[newObjNum][objSGS.moveToLeft]     + ' MTL' + '\n';
  mymsg  += this.objASGS[newObjNum][objSGS.theIdType]    + ' theIdtType' + '\n';
  mymsg  += this.objASGS[newObjNum][objSGS.theIdOrigTop]   + ' theIdOrigTop' + '\n';
  mymsg  += this.objASGS[newObjNum][objSGS.theIdOrigLeft]  + ' theIdOrigLeft' + '\n';
  mymsg  += this.objASGS[newObjNum][objSGS.theIdOrigWidth] + ' theIdOrigWidth' + '\n';
  mymsg  += this.objASGS[newObjNum][objSGS.theIdOrigHeight]+ ' theIdOrigHeight' + '\n';
  mymsg  += this.objASGS[newObjNum][objSGS.theIdOrigStyle] + ' theIdOrigStyle' + '\n';
  mymsg  += this.objASGS[newObjNum][objSGS.theIdCurrTop]   + ' theIdCurrTop' + '\n';
  mymsg  += this.objASGS[newObjNum][objSGS.theIdCurrLeft]  + ' theIdCurrLeft' + '\n';
  mymsg  += this.objASGS[newObjNum][objSGS.theIdCurrWidth] + ' theIdCurrWidth' + '\n';
  mymsg  += this.objASGS[newObjNum][objSGS.theIdCurrHeight]+ ' theIdCurrHeight' + '\n';

  mymsg  += this.objASGS[newObjNum][objSGS.theIdClipCounter] + ' theIdClipCounter' + '\n';

  alert(mymsg);
  this.dump2(newObjNum,msg);
};

CSGS.prototype.dump2 = function(newObjNum,msg)
{
  var mymsg = '';

  mymsg  += msg + ' ';

  mymsg  +=   this.objASGS[newObjNum][objSGS.theId] + ' theId' + '\n';
  mymsg  += this.objASGS[newObjNum][objSGS.moveType] + ' moveType' + '\n';

  if(this.objASGS[newObjNum][objSGS.moveType] & F.HorizontalVertical)
  mymsg  += this.objASGS[newObjNum][objSGS.moveType] + ' HorizontalVertical' + '\n';

  if(this.objASGS[newObjNum][objSGS.moveType] & F.VerticalHorizontal)
  mymsg  += this.objASGS[newObjNum][objSGS.moveType] + ' VerticalHorizontal' + '\n';

  if(this.objASGS[newObjNum][objSGS.moveType] & F.myWipeLeft)
  mymsg  += this.objASGS[newObjNum][objSGS.moveType] + ' myWipeLeft' + '\n';

  if(this.objASGS[newObjNum][objSGS.moveType] & F.myWipeRight)
  mymsg  += this.objASGS[newObjNum][objSGS.moveType] + ' myWipeRight' + '\n';

  if(this.objASGS[newObjNum][objSGS.moveType] & F.myWipeTop)
  mymsg  += this.objASGS[newObjNum][objSGS.moveType] + ' myWipeTop' + '\n';

  if(this.objASGS[newObjNum][objSGS.moveType] & F.myWipeBottom)
  mymsg  += this.objASGS[newObjNum][objSGS.moveType] + ' myWipeBottom' + '\n';

  if(this.objASGS[newObjNum][objSGS.moveType] & F.Fade)
  mymsg  += this.objASGS[newObjNum][objSGS.moveType] + ' Fade' + '\n';

  if(this.objASGS[newObjNum][objSGS.moveType] & F.Plot)
  mymsg  += this.objASGS[newObjNum][objSGS.moveType] + ' Plot' + '\n';

  if(this.objASGS[newObjNum][objSGS.moveType] & F.Init)
  mymsg  += this.objASGS[newObjNum][objSGS.moveType] + ' Init' + '\n';

  if(this.objASGS[newObjNum][objSGS.moveType] & F.DoneH)
  mymsg  += this.objASGS[newObjNum][objSGS.moveType] + ' DoneH' + '\n';

  if(this.objASGS[newObjNum][objSGS.moveType] & F.DoneV)
  mymsg  += this.objASGS[newObjNum][objSGS.moveType] + ' DoneV' + '\n';

  if(this.objASGS[newObjNum][objSGS.moveType] & F.DoneE)
  mymsg  += this.objASGS[newObjNum][objSGS.moveType] + ' DoneE' + '\n';

  if(this.objASGS[newObjNum][objSGS.moveType] & F.myClip)
  mymsg  += this.objASGS[newObjNum][objSGS.moveType] + ' myClip' + '\n';

  if(this.objASGS[newObjNum][objSGS.moveType] & F.Diagonal)
  mymsg  += this.objASGS[newObjNum][objSGS.moveType] + ' Diagonal' + '\n';

  if(this.objASGS[newObjNum][objSGS.moveType] & F.Keep)
  mymsg  += this.objASGS[newObjNum][objSGS.moveType] + ' Keep' + '\n';

  if(this.objASGS[newObjNum][objSGS.moveType] & F.mySWipe)
  mymsg  += this.objASGS[newObjNum][objSGS.moveType] + ' mySWipe' + '\n';

  alert(mymsg);

};

CSGS.prototype.dump3 = function(msg)
{
  var mymsg = '';

  mymsg  += msg + "\n";

  for (var i = 1; i <= this.objASGS[NO.NUMBEROBJECTS]; i++)
  {
    mymsg  += " id " + this.objASGS[i][objSGS.theId] + " Object Number " + this.objASGS[i][objSGS.objectNumber] + "\n";
  }

  alert(mymsg);
};


CSGS.prototype.dumpScreens = function(msg)
{
  var mymsg = '';

  mymsg  += msg + ' ';

  mymsg  += this.scrASGS[scrSGS.theYoffset] + ' this.scrASGS[scrSGS.theYoffset]' + '\n';
  mymsg  += this.scrASGS[scrSGS.theXoffset] + ' this.scrASGS[scrSGS.theXoffset]' + '\n';

  alert(mymsg);
};


CSGS.prototype.mySWipe = function(newObjNum)
{
  if(myself.objASGS[newObjNum][objSGS.moveType] & F.mySWipe)
  {

    var left = myself.objASGS[newObjNum][objSGS.theIdCurrLeft];

    var wipeMIE = myself.objASGS[newObjNum][objSGS.MIE];

    if (left < getCW())
    {

      setLeft(myself.objASGS[newObjNum][objSGS.theId], (left + wipeMIE));
      myself.objASGS[newObjNum][objSGS.theIdCurrLeft] +=wipeMIE;

    }
    else
    {

      //  looks like I need to fix this for Mozilla
      //  div id="ht2" class='dynDom' style='position:absolute;top:0px;left:10px; min-height:100px;max-height:300px; width:296px;visibility:hidden;clip:rect(0 320 320 0);z-index:100;'
      //  I am getting truncation of the left and bottom
      //  in popCSGSDiv(event,'ht2' ..
      //  also might be wahcking the effect


      if(myself.objASGS[newObjNum][objSGS.moveType] & F.Keep)
      {
        setHidden(myself.objASGS[newObjNum][objSGS.theId]);
        myself.objASGS[newObjNum][objSGS.theIdCurrWidth]  = myself.objASGS[newObjNum][objSGS.theIdOrigWidth];
        myself.objASGS[newObjNum][objSGS.theIdCurrHeight] = myself.objASGS[newObjNum][objSGS.theIdOrigHeight];
        myself.objASGS[newObjNum][objSGS.theIdCurrLeft]   = myself.objASGS[newObjNum][objSGS.theIdOrigLeft];

        setLeft(myself.objASGS[newObjNum][objSGS.theId],  myself.objASGS[newObjNum][objSGS.theIdOrigLeft]);

        setHeight(myself.objASGS[newObjNum][objSGS.theId],  myself.objASGS[newObjNum][objSGS.theIdOrigHeight]);

        setWidth(myself.objASGS[newObjNum][objSGS.theId],  myself.objASGS[newObjNum][objSGS.theIdOrigWidth]);
      }
      else
      {
        //I could set this off screen here
        setGone(myself.objASGS[newObjNum][objSGS.theId]);
        //    myself.objASGS[newObjNum][objSGS.moveType] |= F.myWipeBottom;
      }

      myself.objASGS[newObjNum][objSGS.moveType] |= F.Keep;
      myself.toggleEffect(newObjNum);
      myself.objASGS[newObjNum][objSGS.moveType] |= F.DoneE;
    }
  }

  return;
};

CSGS.prototype.myClip = function(newObjNum)
{
  if(myself.objASGS[newObjNum][objSGS.moveType] & F.myClip)
  {
    var top = myself.objASGS[newObjNum][objSGS.theIdOrigHeight];
    var bottom  =   myself.objASGS[newObjNum][objSGS.theIdOrigHeight];
    var width = myself.objASGS[newObjNum][objSGS.theIdOrigWidth];
    var height  = myself.objASGS[newObjNum][objSGS.theIdOrigHeight];
    var left  = myself.objASGS[newObjNum][objSGS.theIdOrigLeft];
    var right;  // Jun 15 2007 warning undeclared

    if(myself.objASGS[newObjNum][objSGS.moveType] & F.myWipeBottom)
    {
      bottom    =   myself.objASGS[newObjNum][objSGS.theIdClipCounter];

      if(bottom > 0)
      {
        bottom    -=  this.objASGS[newObjNum][objSGS.MIE];
        myself.objASGS[newObjNum][objSGS.theIdClipCounter]  = bottom;

        setClip(myself.objASGS[newObjNum][objSGS.theId], 0 ,width,bottom,0);
        return;
      }
    }
    else if(myself.objASGS[newObjNum][objSGS.moveType] & F.myWipeLeft)
    {
      left  = myself.objASGS[newObjNum][objSGS.theIdClipCounter];

      if(myself.objASGS[newObjNum][objSGS.theIdOrigLeft] > left)
      {
        left    +=  this.objASGS[newObjNum][objSGS.MIE];
        myself.objASGS[newObjNum][objSGS.theIdClipCounter]  = left;

        setClip(myself.objASGS[newObjNum][objSGS.theId], 0 ,width,bottom,left);
        return;
      }
    }
    else if(myself.objASGS[newObjNum][objSGS.moveType] & F.myWipeRight)
    {
      right = myself.objASGS[newObjNum][objSGS.theIdClipCounter];

      if(right > 0)
      {
        right   -=  this.objASGS[newObjNum][objSGS.MIE];
        myself.objASGS[newObjNum][objSGS.theIdClipCounter]  = right;

        setClip(myself.objASGS[newObjNum][objSGS.theId], 0 ,right,bottom,0);
        return;
      }
    }
    else  // the default if(myself.objASGS[newObjNum][objSGS.moveType] & F.myWipeTop)
    {
      top   =   myself.objASGS[newObjNum][objSGS.theIdClipCounter];

      if(myself.objASGS[newObjNum][objSGS.theIdOrigHeight] > top)
      {
        top   +=  this.objASGS[newObjNum][objSGS.MIE];
        myself.objASGS[newObjNum][objSGS.theIdClipCounter]  = top;

        setClip(myself.objASGS[newObjNum][objSGS.theId], top ,width,height,0);
        //    setTimeout(function() { myself.myClip()},20);
        return;
      }
    }

    //done stage 1

    if(myself.objASGS[newObjNum][objSGS.moveType] & F.Keep)
    {
      setHidden(myself.objASGS[newObjNum][objSGS.theId]);

      myself.objASGS[newObjNum][objSGS.theIdCurrWidth]  = myself.objASGS[newObjNum][objSGS.theIdOrigWidth];
      myself.objASGS[newObjNum][objSGS.theIdCurrHeight] = myself.objASGS[newObjNum][objSGS.theIdOrigHeight];
      myself.objASGS[newObjNum][objSGS.theIdCurrLeft]   = myself.objASGS[newObjNum][objSGS.theIdOrigLeft];
      myself.objASGS[newObjNum][objSGS.theIdCurrTop]    = myself.objASGS[newObjNum][objSGS.theIdOrigTop];

      setTop(myself.objASGS[newObjNum][objSGS.theId],   myself.objASGS[newObjNum][objSGS.theIdOrigTop]);

      setLeft(myself.objASGS[newObjNum][objSGS.theId],  myself.objASGS[newObjNum][objSGS.theIdOrigLeft]);

      setHeight(myself.objASGS[newObjNum][objSGS.theId],  myself.objASGS[newObjNum][objSGS.theIdOrigHeight]);

      setWidth(myself.objASGS[newObjNum][objSGS.theId], myself.objASGS[newObjNum][objSGS.theIdOrigWidth]);
      //will make it hidden for now
      setClip(myself.objASGS[newObjNum][objSGS.theId], 0, width, height,0);
      // this did not stopborder from being whacked setClip(myself.objASGS[newObjNum][objSGS.theId], 0, width + 12 , height + 12,0);
      myself.objASGS[newObjNum][objSGS.moveType] |= F.Keep;
      //      if(checkDebug())
      //      {
      //      this.dump(newObjNum,'myClip');
      //      }
    }
    else
    {
      //I could set this off screen here
      setGone(myself.objASGS[newObjNum][objSGS.theId]);
    }
    //at last we leave
    myself.toggleEffect(newObjNum);
    this.objASGS[newObjNum][objSGS.moveType] |= F.DoneE;

  }
};
CSGS.prototype.synchFunc = function(jsClassObj, funcToCall)
{

  //a little sanity

  if(typeof(jsClassObj) == "object")
  {
    this.funcASGS[funcSGS.ObjRef] = jsClassObj;
    this.funcASGS[funcSGS.synchFunc]= funcToCall;
  }
  else
  {
    alert('BAD CALL TO synchFunc');
  }
};


CSGS.prototype.amIDone = function()
{

  for (var i = 1; i <= this.objASGS[NO.NUMBEROBJECTS]; i++)
  {
    var mymsg;
    if( (!(this.objASGS[i][objSGS.moveType] & F.DoneH)) || (!(this.objASGS[i][objSGS.moveType] & F.DoneV)) || (!(this.objASGS[i][objSGS.moveType] & F.DoneE)) )
    {
      mymsg= "object # " + i;
      this.dump2(i,  mymsg);
    }
    else
    {
      mymsg  = 'Object done Number ' + i ;
      this.dump(i, mymsg);
      if( this.objASGS[i][objSGS.moveType] & F.DoneA)
      {
        this.objASGS[i][objSGS.moveType] |= F.DoneA;
      }
    }
  }
  return 0;
};
