import {UPDATE_ELEMENTS, SET_ELEMENTS} from "../actions/elements";
import Element from "../../models/element";

const initialState = {
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_ELEMENTS:
            return {
                availableElements: action.elements
            }
        case UPDATE_ELEMENTS:
            const availableElementsIndex = state.availableElements.findIndex(prod => prod.id === action.pid)
            const updatedElement = new Element(
                action.pid,
                action.active,
            );
            const updatedAvailableElements = [...state.availableElements]
            updatedAvailableElements[availableElementsIndex] = updatedElement
            return {...state, availableElements: updatedAvailableElements}
    }
    return state;
};
