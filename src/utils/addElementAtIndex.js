// Lodash
import _isNil from 'lodash/isNil';
import _slice from 'lodash/slice';

// Constants
import { EMPTY_ARRAY } from '../constants';

const addElementAtIndex = (list = EMPTY_ARRAY, element, index) => {
    if (index < 0 || _isNil(index)) {
        return list;
    }
    return [..._slice(list, 0, index), element, ..._slice(list, index)];
}

export default addElementAtIndex;