'use strict';

const cheerio = require('cheerio');

/*
--------------------------------------------------------------------------
There's a typo in the markup.

The Pear is misspelled Perr. Use jQuery to fix the mistake.

Remember, in this test, $ is jQuery, just as it is in a normal web app
--------------------------------------------------------------------------
*/


let $ = createSnippetWithJQuery(`
<ul id="fruits">
  <li class="apple">Apple</li>
  <li class="orange">Orange</li>
  <li class="pear">Perr</li>
</ul>
`)

const fixTheTypo = () => {
  $('.pear').text('Pear')
};

///////////////////////////////////////////////////
// TESTS
//////////////////////////////////////////////////

describe('Testing challenge', () => {
  it('It should return markup with typo fixed', () => {
    fixTheTypo();
    expect($('.pear').text()).toStrictEqual('Pear');
  });
});

function createSnippetWithJQuery(html) {
  return cheerio.load(html);
};
