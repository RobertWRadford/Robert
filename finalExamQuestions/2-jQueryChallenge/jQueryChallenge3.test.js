'use strict';

const cheerio = require('cheerio');

/*
--------------------------------------------------------------------------

Write a function named updateFavoriteFood that given the <ul> below, uses jQuery to
change the the <li> with the attribute `data-favoriteFood="favoriteFood"`
from "banannas" to "cherries"

Remember, in this test, $ is jQuery, just as it is in a normal web app
--------------------------------------------------------------------------
*/

let $ = createSnippetWithJQuery(`
  <ul>
    <li>apples</li>
    <li data-favoritefood="favoritefood">bananas</li>
    <li>carrots</li>
    <li>beans</li>
    <li>coffee</li>
  </ul>
`);

const updateFavoriteFood = () => {
  $('li[data-favoritefood="favoritefood"]').text('cherries')
}

///////////////////////////////////////////////////
// TESTS
///////////////////////////////////////////////////

describe('Testing challenge', () => {
  it('It should replace the word banana with cherries', () => {
    updateFavoriteFood();
    expect($('li[data-favoritefood="favoritefood"]').text()).toStrictEqual('cherries');
  })
});

function createSnippetWithJQuery(html) {
  return cheerio.load(html);
};
