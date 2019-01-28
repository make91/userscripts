// ==UserScript==
// @name         netflix_back_to_fullscreen
// @version      0.1
// @description  go back to fullscreen when credits start and an ad is shown
// @match        https://www.netflix.com/*
// @require      https://gist.githubusercontent.com/raw/2625891/waitForKeyElements.js
// @grant        none
// ==/UserScript==
function enableFullscreen(jNode) {
    jNode.click();
    return true;
}
waitForKeyElements('.can-resume.postplay', enableFullscreen);
