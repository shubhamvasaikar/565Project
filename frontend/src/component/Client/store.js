import { createStore, combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

// Redux form store
const reducer = combineReducers({
  form: reduxFormReducer, // mounted under "form"
});
const store = (window.devToolsExtension
  ? window.devToolsExtension()(createStore)
  : createStore)(reducer);

export default store;
