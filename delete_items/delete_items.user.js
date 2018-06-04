// ==UserScript==
// @name         delete_items
// @version      0.1
// @description  delete unwanted items from the page
// @match        https://marcuskivi.com/script-test/
// @grant        GM_addStyle
// ==/UserScript==
window.addEventListener('load', () => {
    addButtonStyle();
    addButton();
})
function deletePressed(elem){
    elem.target.parentElement.parentElement.remove();
}
function createButton() {
    var zNode = document.createElement ('div');
    zNode.innerHTML = '<button type="button" aria-label="Delete"><span aria-hidden="true">&#10006;</span></button>';
    zNode.setAttribute ('class', 'delete-button-container');
    zNode.addEventListener ("click", deletePressed, false);
    return zNode;
}
function addButton() {
    var select = document.querySelectorAll('h5');
    select.forEach(ele => {
        var zNode = createButton();
        ele.parentElement.parentElement.appendChild (zNode);
    });
}
function addButtonStyle() {
    GM_addStyle (`
.delete-button-container button {
    padding: 5px;
    background-color: #eee;
    border: 0;
    font-size: 1.7rem;
    font-weight: 700;
    line-height: 1;
    color: #111;
    text-shadow: 0 1px 0 #eee;
    opacity: .5;
    position: absolute;
    top: 10px;
    left: 10px;
}
.delete-button-container:hover button {
    opacity: 1;
}
`);
}