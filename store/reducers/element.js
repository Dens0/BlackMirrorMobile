// import ELEMENTS from '../../data/dummy-data';
import {UPDATE_ELEMENTS,SET_ELEMENTS} from "../actions/elements";
import Element from "../../models/element";

const initialState = {
  // availableElements: ELEMENTS,
  // userProducts: ELEMENTS.filter(prod => prod.ownerId === 'u1')
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ELEMENTS:
      return {
        availableElements:action.elements
      }
    case UPDATE_ELEMENTS:
      return {
        availableElements:action.elements
      }
  }
  return state;
};
