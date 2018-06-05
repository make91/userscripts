// ==UserScript==
// @name         delete_items
// @version      0.2
// @description  delete unwanted items from the page
// @match        https://marcuskivi.com/script-test/
// @grant        GM_addStyle
// ==/UserScript==
window.addEventListener('load', () => {
    deleteViaStorage();
    addButtonStyle();
    addButtons();
})
function deleteViaStorage() {
    if (localStorage.deletedItems && JSON.parse(localStorage.deletedItems).length) {
        const deletedItems = JSON.parse(localStorage.deletedItems);
        const select = document.querySelectorAll('h5');
        select.forEach(ele => {
            const itemText = ele.textContent;
            if (deletedItems.includes(itemText)) {
                console.log("Deleting item " + itemText);
                ele.parentElement.parentElement.remove();
            }
        })
    }
}
function deletePressed(elem){
    var deleteItem = elem.currentTarget.parentElement.querySelector("h5").textContent;
    elem.currentTarget.parentElement.remove();
    console.log("Deleting item " + deleteItem);
    var deletedItems = [];
    if (localStorage.deletedItems && JSON.parse(localStorage.deletedItems).length) {
        deletedItems = JSON.parse(localStorage.deletedItems);
    }
    if (!deletedItems.includes(deleteItem)) {
        deletedItems.push(deleteItem);
        localStorage.deletedItems = JSON.stringify(deletedItems);
    }
}
function createButton() {
    var zNode = document.createElement ('div');
    zNode.innerHTML = '<button type="button" aria-label="Delete"><span aria-hidden="true">&#10006;</span></button>';
    zNode.setAttribute ('class', 'delete-button-container');
    zNode.addEventListener ("click", deletePressed, false);
    return zNode;
}
function addButtons() {
    const select = document.querySelectorAll('h5');
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