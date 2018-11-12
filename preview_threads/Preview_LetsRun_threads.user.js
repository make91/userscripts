// ==UserScript==
// @name         Preview LetsRun threads
// @version      0.1
// @description  preview threads by hovering
// @include      http://www.letsrun.com/forum/forum.php?board=*
// @include      https://www.letsrun.com/forum/forum.php?board=*
// @include      http://www.letsrun.com/forum/
// @include      https://www.letsrun.com/forum/
// @grant        GM_addStyle
// ==/UserScript==
var timeout;
const select = document.querySelectorAll('.thread_list li.row:not(.header) .title .post_title');
select.forEach(ele => {
    ele.addEventListener ("mouseover", previewThread, false);
    ele.addEventListener ("mouseout", cancelPreviewThread, false);
});
function previewThread(elem) {
    const cEle = elem.currentTarget; // copy reference so works in other functions
    const url = cEle.querySelector("a").getAttribute("href");
    timeout = setTimeout(() => {
        fetchThread(url, cEle);
    }, 250);
}
function cancelPreviewThread(elem) {
    clearTimeout(timeout);
}
function fetchThread(url, elem) {
    fetch(url, {credentials: "omit"}) // omit credentials, so always loads page 1
    .then((response) => {
        return response.text();
    })
    .then((data) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, "text/html");
        const content = doc.querySelector(".thread_list_container > .thread > li:first-of-type .post_text");
        showContent(content, elem);
    })
    .catch(function(err) {
        console.log('Fetch Error', err);
    });
}
function showContent(content, elem) {
    let containerEle = document.createElement ('div');
    containerEle.appendChild(content);
    containerEle.setAttribute ('class', 'preview-container');
    elem.parentElement.appendChild(containerEle);
    elem.removeEventListener ("mouseover", previewThread, false); // element is saved on page, so no need to fetch again
    elem.removeEventListener ("mouseout", cancelPreviewThread, false);
}
GM_addStyle (`
.preview-container {
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.1s 0.1s;
}
.thread_list li.row:not(.header):hover .preview-container {
    max-height: 1000px;
    transition: max-height 0.2s 0.4s;
}
.preview-container .post_text {
    padding: 16px;
}
/* the following should be in stylus instead, so they load before the page */
.thread_list_container ul.thread_list li.row {
    background-color: #ffffe9;
    border-bottom: 1px solid #bbb;
    padding: 0.35em 0;
}
.thread_list_container ul.thread_list li.row:not(:first-child):hover {
    background-color: #f7f7cb;
}
`);
