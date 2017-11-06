// ==UserScript==
// @name        forumcinemas & finnkino enhancer
// @description hide or highlight films
// @include     https://www.forumcinemas.ee/eng/Websales/SelectShow/*
// @include     https://www.forumcinemas.ee/eng/Websales/SelectShow/
// @include     https://www.finnkino.fi/eng/Websales/SelectShow/*
// @include     https://www.finnkino.fi/eng/Websales/SelectShow/
// @version     1.0
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant       GM_addStyle
// ==/UserScript==
var toHideContains = [
  'In Estonian',
  'In Russian',
  'Valerian and the City',
  '(dub)',
  'MET Opera:',
  'Opera encore',
];
var toHideExact = [
  'It',
  'Annabelle: Creation',
  'Happy Death Day',
];
var toHighlightExact = [
  'Geostorm (3D)',
  'Geostorm (2D)',
];
function waitForAjax() {
  setInterval(function () {
    if ($('.t_grad tr').length > 0 && $('.t_grad tr').filter(':hidden').size() === 0) {
      doStuff();
    }
  }, 50)
}
waitForAjax();
function doStuff() {
  $.each(toHideContains, function (index, value) {
    $('.t_grad tr:contains(' + value + ')').hide();
  })
  myFilter(toHideExact).parents('tr').hide();
  myFilter(toHighlightExact).parents('tr').css('border', 'red groove 4px');
}
function myFilter(array) {
  var secondColumn = $('.t_grad tr td:nth-of-type(2)');
  var title = $('a:first', secondColumn);
  return title.filter(function () {
    return array.indexOf($(this).text().trim()) >= 0;
  });
}
