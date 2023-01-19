import { combineReducers, configureStore } from '@reduxjs/toolkit';

import homeReducer from './components/Home/homeSlice';
import userReducer from './components/UserPhotos/userSlice';

const rootReducer = combineReducers({
  home: homeReducer,
  user: userReducer
});

export function setupStore(preloadedState) {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}

const store = configureStore({
  reducer: {
    // define top level state field named `home` handled by `homeReducer`
    home: homeReducer,
    user: userReducer
  }
});

export default store;