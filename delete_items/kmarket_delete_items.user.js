// ==UserScript==
// @name         kmarket_delete_items
// @version      0.1
// @description  delete unwanted products from the page
// @include      /(http[s]?:\/\/)?(www.)?k-(super|city)?market.fi*/
// @grant        GM_addStyle
// ==/UserScript==
window.addEventListener('load', () => {
    deleteViaStorage();
    addButtonStyle();
    addButtons();
    document.querySelector("button.rk-btn-showmore.rk-teaser-showmore").addEventListener("click", showMorePressed);
})
function showMorePressed() {
    setTimeout(() => {
        deleteViaStorage();
        addButtons();
    }, 2500);
}
function deleteViaStorage() {
    if (localStorage.deletedItems && JSON.parse(localStorage.deletedItems).length) {
        const deletedItems = JSON.parse(localStorage.deletedItems);
        const select = document.querySelectorAll("div.xs-12.Mb-lg.rk-colum-narrow.ng-scope:not(.has-delete-button) [ng-bind='teaserData.productName']");
        console.log("Deleting items via storage:");
        select.forEach(ele => {
            const itemText = ele.textContent;
            if (deletedItems.includes(itemText)) {
                console.log("\t" + itemText);
                ele.closest("div.xs-12.Mb-lg.rk-colum-narrow.ng-scope").remove();
            }
        })
        console.log("Deleting items via storage done!");
    }
}
function deletePressed(elem){
    const deleteItem = elem.currentTarget.parentElement.querySelector("[ng-bind='teaserData.productName']").textContent;
    console.log("Deleting item " + deleteItem);
    elem.currentTarget.parentElement.remove();
    let deletedItems = [];
    if (localStorage.deletedItems && JSON.parse(localStorage.deletedItems).length) {
        deletedItems = JSON.parse(localStorage.deletedItems);
    }
    if (!deletedItems.includes(deleteItem)) {
        deletedItems.push(deleteItem);
        localStorage.deletedItems = JSON.stringify(deletedItems);
    }
}
function createButton() {
    const zNode = document.createElement ('div');
    zNode.innerHTML = '<button type="button" aria-label="Delete"><span aria-hidden="true">&#10006;</span></button>';
    zNode.setAttribute ('class', 'delete-button-container');
    zNode.addEventListener ("click", deletePressed, false);
    return zNode;
}
function addButtons() {
    const select = document.querySelectorAll("div.xs-12.Mb-lg.rk-colum-narrow.ng-scope:not(.has-delete-button) [ng-bind='teaserData.productName']");
    select.forEach(ele => {
        const parentElem = ele.closest("div.xs-12.Mb-lg.rk-colum-narrow.ng-scope");
        const zNode = createButton();
        parentElem.appendChild (zNode);
        parentElem.classList.add('has-delete-button');
    });
}
function addButtonStyle() {
    GM_addStyle (`
.delete-button-container button {
    padding: 5px;
    background-color: rgba(255, 255, 255, .75);
    border: 0;
    font-size: 1.7rem;
    font-weight: 700;
    line-height: 1.1;
    color: #000;
    text-shadow: 2px 2px 20px #fff;
    opacity: .5;
    position: absolute;
    top: 5px;
    left: 10px;
    z-index: 1000;
}
.delete-button-container:hover button {
    opacity: 1;
    font-size: 2.5rem;
}
.delete-button-container {
    display: none;
}
div.xs-12.Mb-lg.rk-colum-narrow.ng-scope:hover .delete-button-container {
    display: inline;
}
`);
}
