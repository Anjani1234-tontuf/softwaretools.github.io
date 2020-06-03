
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//
//  File:   gjfb.js
//  Creation Date:  Jun 13,2015
//  Last Modified:  Jun 13,2015
//  Purpose: facebook related functions and notes
//
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

/*
this file should be included right after the body tag


ad this to the html source

<div id="fb-root"></div>
<a href="http://www.google.com/" data-image="Article img url" data-title="Article Title" data-desc="Some description for this article" class="fb_share">
    <img src="http://www.synermous.com/data/images/fb-icon.svg" alt="" width="50" height="50">
</a>



href = url you want share, must have link
data-image = image you want show on facebook
  It's best to use a square image, as Facebook displays them in that matter.
  That image should be at least 600px wide in any of the usually supported image forms (JPG, PNG, etc.)
data-title = title you want show on facebook
data-desc = description you want show on facebook

or use meta tags like below

<meta property="og:title" content="Facebook Open Graph Demo">
<meta property="og:image" content="http://example.com/main-image.png">
<meta property="og:site_name" content="Example Website">
<meta property="og:description" content="Here is a nice description">

http://davidwalsh.name/facebook-meta-tags


Test Users


Dorothy Amiiacagcdjg Putnamescu 104610899879349
Jennifer Amigdgdeibcd Valtchanovsky 115955528739362

https://developers.facebook.com/apps/427467230643885/roles/test-users/


API Error Code: 100
API Error Description: Invalid parameter
Error Message: picture is not properly formatted


*/

$(document).ready(function() {
  // other code here

  window.fbAsyncInit = function() {
      FB.init({
          appId: '427467230643885',
          status: true,
          cookie: true,
          version: 'v2.3',
          xfbml: true
      });
  };

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));



  //(function(d, debug){
  //var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
  //if   (d.getElementById(id)) {return;}
  //js = d.createElement('script');
  //js.id = id; js.async = true;
  //js.src = "//connect.facebook.net/en_US/all" + (debug ? "/debug" : "") + ".js";
  //ref.parentNode.insertBefore(js, ref);}(document, /*debug*/ false));
  //



  function postToFeed(title, desc, url, image) {
      var obj = {method: 'feed',link: url, picture: image,name: title,description: desc};
      function callback(response) {}
      FB.ui(obj, callback);
  }

  var fbShareBtn = document.querySelector(".fb_share");

  if(fbShareBtn === null) alert('we are hosed');

  fbShareBtn.addEventListener('click', function(e) {
      e.preventDefault();
      var title = fbShareBtn.getAttribute('data-title'),
          desc = fbShareBtn.getAttribute('data-desc'),
          url = fbShareBtn.getAttribute('href'),
          image = fbShareBtn.getAttribute('data-image');
      postToFeed(title, desc, url, image);

      return false;
  });


});  //ready

//
//
// my app it
// 427467230643885
//
// A simple share button can be done like this
//
// put this after body tag
//
// <div id="fb-root"></div>
// <script>(function(d, s, id) {
//   var js, fjs = d.getElementsByTagName(s)[0];
//   if (d.getElementById(id)) return;
//   js = d.createElement(s); js.id = id;
//   js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.3&appId=427467230643885";
//   fjs.parentNode.insertBefore(js, fjs);
// }(document, 'script', 'facebook-jssdk'));</script>
//
//
// put this where you want it displayed
// <div class="fb-share-button" data-href="https://developers.facebook.com/docs/plugins/" data-layout="button"></div>
//
//
//


