// Tests for directive-generated multi-select lists
var dp = require('../directivePage.js'); // dp = DirectivePage instance
helpers = require('../test_helpers.js');
var hasClass = helpers.hasClass;

describe('directive', function() {
  describe(': multi-select lists', function() {
    it('should have an empty selection area initially (without a default setting)',
       function() {
      dp.openDirectiveTestPage();
      expect(dp.multiField.isPresent()).toBe(true);
      var list = dp.multiField.element(by.xpath('../ul'));
      expect(list.isPresent()).toBe(true);
      var listItems = list.element(by.xpath('li'));
      expect(listItems.isPresent()).toBe(false);
    });

    it('should be blank (without a default setting)', function() {
      expect(dp.multiField.getAttribute('value')).toEqual('');
    });

    it ('should leave the field empty after a selection', function() {
      dp.multiField.click();
      expect(dp.searchResults.isDisplayed()).toBeTruthy();
      dp.firstSearchRes.click();
      expect(dp.multiField.getAttribute('value')).toEqual('');
    });

    it('should store mutiple values on the data model', function() {
      dp.openDirectiveTestPage();
      expect(dp.multiField.evaluate('listFieldVal2')).toEqual(null);
      dp.multiField.click();
      expect(dp.searchResults.isDisplayed()).toBeTruthy();
      dp.firstSearchRes.click();
      expect(dp.multiField.evaluate('listFieldVal2')).toEqual([{text: 'Green', code: 'G'}]);
      // Now add a second item.
      dp.firstSearchRes.click();
      expect(dp.multiField.evaluate('listFieldVal2')).toEqual(
        [{text: 'Green', code: 'G'}, {text: 'Blue', code: 'B'}]);
      // Now remove the first item
      var button = dp.multiFieldFirstSelected.click();
      expect(dp.multiField.evaluate('listFieldVal2')).toEqual(
        [{text: 'Blue', code: 'B'}]);
      // Add an invalid value.  The existing value should not get lost if we
      // then add a second valid value.  (Note: dp.multiField is CNE).
      dp.multiField.sendKeys('zzz');
      dp.multiField.sendKeys(protractor.Key.TAB); // attempt to leave field
      expect(hasClass(dp.multiField, 'no_match')).toBe(true);
      expect(hasClass(dp.multiField, 'invalid')).toBe(true);
      dp.multiField.sendKeys(protractor.Key.TAB); // shift focus from field (clearing it)
      expect(dp.multiField.getAttribute('value')).toEqual('');
      // Add a valid item and check the model.
      dp.multiField.click();
      expect(dp.searchResults.isDisplayed()).toBeTruthy();
      dp.firstSearchRes.click();
      expect(dp.multiField.evaluate('listFieldVal2')).toEqual(
        [{text: 'Blue', code: 'B'},{text: 'Green', code: 'G'}]);
      // Remove the first item again, to make sure that the new "span" element
      // within the button can receive clicks and still handle the event
      // correctly.
      dp.multiFieldFirstSelectedSpan.click();
      expect(dp.multiField.evaluate('listFieldVal2')).toEqual(
        [{text: 'Green', code: 'G'}]);
      // There should also just be one selected item on the page.
      expect(dp.multiFieldSelectedItems.count()).toEqual(1);
    });

    it('should not show matches for selected items', function() {
      dp.openDirectiveTestPage();
      expect(dp.multiField.evaluate('listFieldVal2')).toEqual(null);
      dp.multiField.click();
      expect(dp.searchResults.isDisplayed()).toBeTruthy();
      dp.firstSearchRes.click();
      expect(dp.multiField.evaluate('listFieldVal2')).toEqual([{text: 'Green', code: 'G'}]);
      dp.multiField.sendKeys('Gr');
      // There should be no matches
      expect(dp.firstSearchRes.isPresent()).toBeFalsy();
    });
  });
});

