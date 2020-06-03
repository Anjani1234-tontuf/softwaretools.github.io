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

requires
<script type="application/x-javascript" src="chrome://gj53run/content/utilsxul.min.js"/>
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
*/

/*
keep track of what questions have been answered by storing the id in an array
if its a good - make sure value for id is 0
if its a bad  - make sure value for id is 1
count the ones and zeroes for the good and bad count
*/

function myCounter()
{
  this.myCounterUI  = 0;  //wish it could really be unsigned int

  this.TF = Array
  (0x0001,
  0x0002,
  0x0004,
  0x0008,
  0x0010,
  0x0020,
  0x0040,
  0x0080,
  0x0100,
  0x0200,
  0x0400,
  0x0800,
  0x1000,
  0x2000,
  0x4000,
  0x8000,
  0x10000,
  0x20000,
  0x40000,
  0x80000);

  this.itemCount  = 0;
  this.key    = new Array();
}

myCounter.prototype =
{
  storeIt:  function storeIt(keyin)
  {
    this.key.push(keyin);
    this.itemCount++;
  },

  keyLookup : function keyLookup(keyin)
  {
    for(var it = 0; it < this.itemCount; it++)
    {
      if(this.key[it] == keyin)
      {
        return  it;
      }
    }
    return -1;
  },
  getBads:  function getBads()
  {
    this.strikeCount = 0;
    for(var it = 0; it < this.itemCount; it++)
    {
      if(this.myCounterUI & this.TF[it])
      {
        ++this.strikeCount;
      }
    }
    return this.strikeCount;
  },
  setBad: function  setBad(keyin)
  {
    var theIndex = this.keyLookup(keyin);
    if(theIndex == -1)
    {
      this.storeIt(keyin);
      this.myCounterUI  |= this.TF[this.itemCount - 1];  //turn it on
    }
    else
    {
      if(!(this.myCounterUI & this.TF[theIndex]))  //if its not on, turn it on
      {
        this.myCounterUI  |= this.TF[theIndex];
      }
    }
  },
  getGoods: function getGoods()
  {
    this.goodCount = 0;
    for(var it = 0; it < this.itemCount; it++)
    {
      if(!(this.myCounterUI & this.TF[it])) //if its off, its good
      {
        ++this.goodCount;
      }
    }
    return this.goodCount;
  },
  setGood:  function setGood(keyin)
  {
    var theIndex = this.keyLookup(keyin);
    if(theIndex == -1)
    {
      this.storeIt(keyin);
    }
    else
    {
      if(this.myCounterUI & this.TF[theIndex]) //if is on, turn it off
      {
        this.myCounterUI  ^= this.TF[theIndex];
      }
    }
  }
}
