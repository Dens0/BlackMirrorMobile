import { SET_ELEMENT_CONFIG} from "../actions/element";
const initialState = {
    // availableElements: ELEMENTS,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_ELEMENT_CONFIG:
            return {
                availableConfig: action.elementConfig
            }
    }
    return state;
};
