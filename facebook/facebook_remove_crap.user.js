// ==UserScript==
// @name         Facebook remove crap
// @version      0.1
// @description  remove stuff asking to login and such
// @include      https:/*.facebook.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant       GM_addStyle
// ==/UserScript==
var regex = /^See more of .+ on Facebook$/;
var regex2 = /^Not Now$/;
var regex3 = /^Send Message$/;
var waitTime = 100;
function doStuff() {
  setTimeout(function() {
    var current_location = ''+document.location;
    if (['www.facebook.com', 'https://facebook.com']
        .some(function(v) { return current_location.indexOf(v) >= 0; })) {
      $("div").filter(function () {
        if (regex.test($(this).text())) {
          $("a", $(this).parent()).filter(function () {
            if (regex2.test($(this).text()) && $(this).is(":visible")) {
              $(this)[0].click();
              return;
            }
          });
          return true;
        }
      }).parent().parent().parent().hide();
      $("button").filter(function () {
        return regex3.test($(this).text());
      }).parent().parent().parent().parent().parent().parent().parent().hide();
      waitTime = 100;
    } else {
      var i = current_location.indexOf('facebook.com');
      var new_location = current_location.replace(current_location.substr(0,i),'https://');
      window.location.replace(new_location);
      waitTime = 3000;
    }
  doStuff();
  }, waitTime);
}
GM_addStyle('div#pagelet_bluebar, div.fbPageBanner { display: none !important; } \
             div.fixed_elem {position: initial !important; }');
doStuff();
