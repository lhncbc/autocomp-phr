// Page objects for the standard (i.e. non-directive) autocompleter test page
var BasePage = require('./basePage').BasePage;
var config = require('../config');

var AutocompPage = function() {
  BasePage.call(this);

  this.nonField = $('#content');

  this.longOddCNE = $('#long_odd_cne');
  this.longOddCNENoScrollCSS = '#long_odd_cne_no_scroll';
  this.longOddCNENoScroll = $(this.longOddCNENoScrollCSS);
  this.prefetchCWEID = 'prefetch_cwe';  // single-select
  this.prefetchCWE = $('#'+this.prefetchCWEID);  // single-select

  // Multi-select CWE prefetch list
  var multiPrefetchCWESectionCSS = '#multiPrefetchCWESection';
  this.multiPrefetchCWE = $('#multi_sel_cwe');
  this.multiPrefetchCWEFirstSelected =
    element(by.css(multiPrefetchCWESectionCSS + ' li:first-child button'));
  this.multiPrefetchCWESelected =
    element.all(by.css(multiPrefetchCWESectionCSS + ' button'));

  // Multi-select CWE search list
  var multiSearchCWESectionCSS = '#multiSearchCWESection';
  this.multiSearchCWE = $('#multi_search_sel_cwe');
  this.multiSearchCWEFirstSelected =
    element(by.css(multiSearchCWESectionCSS + ' li:first-child button'));
  this.multiSearchCWESelected =
    element.all(by.css(multiSearchCWESectionCSS + ' button'));

  this.openTestPage = function() {
    browser.get('http://localhost:'+config.port+
      '/test/protractor/autocomp_atr.html');
  }

  // Returns the scroll position of the window
  this.windowScrollTop = function() {
    return browser.driver.executeScript('return jQuery(window).scrollTop()');
  }

};

module.exports = new AutocompPage();
