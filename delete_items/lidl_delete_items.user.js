// ==UserScript==
// @name         lidl_delete_items
// @version      0.1.2
// @description  delete unwanted products from the page
// @include     https://www.lidl.fi/fi/Kaeyttoetavaratarjoukset.htm*
// @include     https://www.lidl.fi/fi/Ruokatarjoukset.htm*
// @include     https://www.lidl.se/sv/erbjudanden.htm*
// @grant        GM_addStyle
// ==/UserScript==
GM_addStyle (`
.productgrid {
    visibility: hidden;
    opacity: 0;
}
`);
window.addEventListener('load', () => {
    deleteViaStorage();
    addButtonStyle();
    addButtons();
    GM_addStyle (`
.productgrid {
    visibility: inherit!important;
    opacity: 1;
    transition: visibility 0s linear 0ms, opacity 600ms;
}
`);
})
function deleteViaStorage() {
    if (localStorage.deletedItems && JSON.parse(localStorage.deletedItems).length) {
        const deletedItems = JSON.parse(localStorage.deletedItems);
        const select = document.querySelectorAll('div.productgrid > ul.productgrid__list > li.productgrid__item .product__title');
        select.forEach(ele => {
            const itemText = ele.textContent;
            if (deletedItems.includes(itemText)) {
                console.log("Deleting item " + itemText);
                ele.closest("li").remove();
            }
        })
    }
}
function deletePressed(elem){
    var deleteItem = elem.currentTarget.parentElement.querySelector(".product__title").textContent;
    console.log("Deleting item " + deleteItem);
    elem.currentTarget.parentElement.remove();
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
    const select = document.querySelectorAll('div.productgrid > ul.productgrid__list > li.productgrid__item .product__title');
    select.forEach(ele => {
        var zNode = createButton();
        ele.closest("li").appendChild (zNode);
    });
}
function addButtonStyle() {
    GM_addStyle (`
.delete-button-container button {
    padding: 5px;
    background-color: #fff;
    border: 0;
    font-size: 1.7rem;
    font-weight: 700;
    line-height: 1;
    color: #111;
    text-shadow: 0 1px 0 #fff;
    opacity: .5;
    position: absolute;
    top: 10px;
    left: 10px;
}
.delete-button-container:hover button {
    opacity: 1;
}
.delete-button-container {
    display: none;
}
div.productgrid > ul.productgrid__list > li.productgrid__item:hover .delete-button-container {
    display: inline;
}
`);
}