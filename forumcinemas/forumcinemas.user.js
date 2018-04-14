// ==UserScript==
// @name        forumcinemas
// @description hide or highlight films
// @include     https://www.forumcinemas.ee/eng/Websales/SelectShow/*
// @include     https://www.forumcinemas.ee/eng/Websales/SelectShow/
// @version     1.0
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant       GM_addStyle
// ==/UserScript==
var toHideContains = [
  'In Estonian',
  'In Russian',
  '(dub)',
  'MET Opera:',
  'Opera encore',
  '(3D)',
];
var toHideExact = [
  'Exact title of',
  'movie I don\'t wanna see',
];
var toHighlightContains = [
  'Part of title of',
  'movie I want to see',
  'e.g. Rampage (matches both 2D/3D)',

];
var toHighlightExact = [
  'Exact title of',
  'movie I want to see',
];
function waitForAjax() {
  setInterval(function () {
    $('.t_grad tr').filter(':hidden').size() === 0 && doStuff();
  }, 50)
}
waitForAjax();
function doStuff() {
  $.each(toHideContains, function (index, value) {
    $('.t_grad tr:contains(' + value + ')').hide();
  })
  myFilter(toHideExact).parents('tr').hide();
  $.each(toHighlightContains, function (index, value) {
    $('.t_grad tr:contains(' + value + ')').css('border', 'red groove 4px');
  })
  myFilter(toHighlightExact).parents('tr').css('border', 'red groove 4px');
}
function myFilter(array) {
  var secondColumn = $('.t_grad tr td:nth-of-type(2)');
  var title = $('a:first', secondColumn);
  return title.filter(function () {
    return array.indexOf($(this).text().replace(/\s+/g,' ').trim()) >= 0;
  });
}
