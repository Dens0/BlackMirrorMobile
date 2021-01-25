import ELEMENTS from '../../data/dummy-data';

const initialState = {
  availableElements: ELEMENTS,
  userElements: ELEMENTS.filter(element => element.id === id)
};

export default (state = initialState, action) => {
  switch (action.type) {
  }
  return state;
};
