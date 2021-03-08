/**
 * This is to remove element from an array in an immutable manner;
 */

import _filter from 'lodash/filter';
import _curry from 'lodash/curry';

const isElementAtIndex = _curry(
  (indexToRemove, element, index) => index !== indexToRemove
);

const removeElementAtIndex = (array, indexToRemove) => _filter(array, isElementAtIndex(indexToRemove));

export default removeElementAtIndex;
