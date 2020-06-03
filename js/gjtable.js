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


function insertHTMLTable()

{
  removeTable('writeroot');
  var time1 = new Date().getTime();
  var stringArr = new Array();
  stringARR.push('<table  cellpadding="2" cellspacing="2" class="CTB"><tbody>');

  for (var i=0;i<50;i++)
  {
    stringArr.push('<tr>');
    for (var j=0;j<50;j++)
    {
      stringArr.push('<td class="b">' + 'GJ'  + i + ':' + j + '</td>');
      //      string.push('<td>*</td>');
    }
    stringArr.push('</tr>');
  }

  stringArr.push('</tbody></table>');

  var joinstring  = stringArr.join('');

  document.getElementById('writeroot').innerHTML = joinstring;
  var time2 = new Date().getTime();
  //  doTiming(5,time1,time2);
}


function removeTable(idin)
{
  document.getElementById(idin).innerHTML = '';
}

/*
The Dom way
*/


function insertDOMTable()
{
  var ourDiv=document.getElementById('newTable');
  // - start by creating the table element
  var t=document.createElement('table');
  // - create a tbody element
  var tb=document.createElement('tbody');
  // - !! YOU MUST INCLUDE THE TBODY TAG FOR THIS EXAMPLE TO WORK IN WIN IE5+ !!
  t.style.border='2px  ridge';
  t.style.width='200px';
  // - now create the tr and td elements
  var tr=document.createElement('tr');
  var td=document.createElement('td');
  td.style.textAlign='right';
  td.style.padding='5px';

  // - create the text that will go in the table cell
  var tdText=document.createTextNode('This is the text node');

  // - Now start building the table.
  // - It's like filling a big container with successively smaller ones, just in reverse

  td.appendChild(tdText);         // - put the text node in the table cell
  tr.appendChild(td);           // - put the cell into the row
  tb.appendChild(tr);           // - put the row into the tbody
  t.appendChild(tb);            // - put the tbody into the table
  ourDiv.appendChild(t);          // - put the table into the div
}
