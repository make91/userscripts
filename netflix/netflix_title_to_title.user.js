// ==UserScript==
// @name         Netflix Title to Title2
// @version      1.0
// @description  add film or series (+episode) title to title
// @match        https://www.netflix.com/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @require      https://gist.githubusercontent.com/raw/2625891/waitForKeyElements.js
// @grant        none
// ==/UserScript==
function updateTitle(jNode) {
    if (oldNode != jNode.text()) {
        oldNode = jNode.text();
        var new_title = $("h4", jNode).text();
        $("span", jNode).each(function(i) {
            new_title += " "+$(this).text();
        });
        document.title = new_title + " - Netflix";
    }
    return true;
}
var oldNode;
waitForKeyElements('div.PlayerControls--control-element.text-control.video-title', updateTitle);
