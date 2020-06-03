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

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
*/
//defer
var id;
var mywidth;

function StartGlide()
{
  draw();
  insertQuotes(1);
  mywidth=document.body.offsetWidth;
  document.getElementById("Banner").style.left= mywidth + "px";
  document.getElementById("Banner").style.visibility = "visible";
  id=window.setInterval("Glide()",5);
}
function StartGlide2()
{
  mywidth=document.body.offsetWidth;
  document.getElementById("Banner").style.left= mywidth + "px";
  document.getElementById("Banner").style.visibility = "visible";
  id=window.setInterval("Glide()",5);
}
function Glide()
{
  width = parseInt(document.getElementById("Banner").style.left);
  width -=10;
  var szwidth = width + "px";
  document.getElementById("Banner").style.left = szwidth;
  if (width<=0) {
    document.getElementById("Banner").style.left="0px";
    window.clearInterval(id);
    document.getElementById("Banner").src="images/noseandeyesRight.gif"
    document.getElementById("Banner2").style.left=mywidth-110 + "px";
    document.getElementById("Banner2").style.top=document.getElementById("Banner").style.top;
    document.getElementById("Banner2").style.visibility = "visible";
  }
}
function mkDjango()
{
  changeInnerHTML('emDj', '<embed SRC="images/django.mid" HEIGHT=50 WIDTH=200 AUTOSTART=true LOOP=false>');
}

/*
merge canvas code in gjcanvas,js CanvasBorder etc
*/

function tstHTML5Canvas()
{
  return !!document.createElement('canvas').getContext;
}

  var myDoCanvas = tstHTML5Canvas();

  if(myDoCanvas) {
    var mycanvas = document.getElementById("c1");
    if(!mycanvas) {
      //alert("Unable to create a canvas elemment");
    } else {
      var ctx = mycanvas.getContext("2d");
    }
  }


function draw()
{

  if(!myDoCanvas) return;
//200 x 150
  //webkit kludge
  if(!ctx) return;
  ctx.beginPath();
  var my_gradient = ctx.createLinearGradient(0, 0, 200, 150);
  my_gradient.addColorStop(0, "black");
  my_gradient.addColorStop(1, "white");
  ctx.fillStyle = my_gradient;
  ctx.fillRect(0, 0, 200, 150);
  ctx.closePath();

  ctx.beginPath();
  ctx.fillStyle = "rgb(200,0,0)";
  ctx.fillRect (10, 10, 50, 50);

  ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
  ctx.fillRect (30, 30, 50, 50);
  ctx.closePath();
  //something is not right here
  ctx.fillStyle = "rgba(74, 59, 296,.1)";
  ctx.beginPath();
  ctx.moveTo(120, 20);
  ctx.lineTo(185, 140);
  ctx.quadraticCurveTo(60, 70, 70, 140);
  ctx.lineTo(120, 20);
  ctx.closePath();
  ctx.fill();

  ctx.font = "italic bold 20px cursive";
  ctx.fillStyle = "rgb(200,0,0)";
  ctx.fillText("G", 170, 20);
  ctx.fill();

  ctx.fillStyle = "rgba(0, 0, 200, 0.3)";
  ctx.fillText("J", 180, 25);
  ctx.fill();
  ctx.save();
}

function shrinkMe(idin)
{
  ctx.clearRect(0,0,200,150); // clear canvas
/*
  I clear the rectangle and draw the the gj; yet the
  quadraticCurveTo is still there in FF and chrome , interesting
*/

  ctx.font = "italic bold 48px cursive";
  ctx.fillStyle = "rgb(200,0,0)";
  ctx.fillText("G", 20, 40);
  ctx.fill();

  ctx.fillStyle = "rgba(0, 0, 200, 0.3)";
  ctx.fillText("J", 50, 60);
  ctx.fill();

}

function restoreMe(idin)
{
//  ctx.restore();
  ctx.clearRect(0,0,200,150); // clear canvas
  draw();
}

function insertQuotes(swhich)
{
  if(swhich) {

  changeInnerHTML('q1', "<b>The mind is its own place, and in itself, can make Heaven of Hell, and a Hell of Heaven. -John Milton</b>");
  changeInnerHTML('q2', "<b>The first rule is to keep an untroubled spirit.  The second is to look things in the face and know them for what they are. -Marcus Aurelius</b>");
  changeInnerHTML('q3', "<b>Man's most valuable trait is a judicious sense of what not to believe. -Euripides</b>");
  } else {
  changeInnerHTML('q1', "<b>Nunc Tutus Exitus Computarus</b><br> It is now safe to turn off your computer.<br>");
  changeInnerHTML('q2', "<b>Omit needless words. Vigorous writing is concise.</b> &nbsp; <b>&#91;</b>A sentence should contain no unnecessary words, a paragraph no unnecessary sentences, for the same reason that a drawing should have no unnecessary lines and a machine no unnecessary parts.<b>&#93;</b> William Strunk");
  changeInnerHTML('q3',"<b>Occam's Razor</b><br>One should not increase, beyond what is necessary, the number of entities required to explain anything.&nbsp; The simplest explanation is, predominantly correct.");
  }

}

