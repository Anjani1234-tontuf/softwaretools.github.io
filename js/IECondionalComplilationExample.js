

/*@cc_on

  /*@if (@_jscript_version <= 20)

   @else @*/
    var mycanvas = document.getElementById("c1");
    if(!mycanvas)
    {
      alert("webkit browsers and defer not working yet http://code.google.com/p/chromium/issues/detail?id=55446");
    }
    else //webkit kludge
    {
      var ctx = mycanvas.getContext("2d");
    }
   /*@end
@*/

