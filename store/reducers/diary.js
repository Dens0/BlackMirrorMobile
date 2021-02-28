import { SET_DIARY} from "../actions/diary";
const initialState = {
    // availableElements: ELEMENTS,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_DIARY:
            return {
                availableDairy: action.diaries
            }
    }
    return state;
};
