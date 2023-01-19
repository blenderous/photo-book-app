import React from "react";
import {render} from "@testing-library/react";
// import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
// import homeReducer from './components/Home/homeSlice';
// import userReducer from './components/UserPhotos/userSlice';
import { setupStore } from './store';

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    // automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  } = {}
){
  function Wrapper({children}) {
    return (
      <Provider store={store}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </Provider>
    )
  }
  return {store, ...render(ui, {wrapper: Wrapper, ...renderOptions})}
}

// const AllTheProviders = ({children}) => {
//   return (
//     <BrowserRouter>
//       {children}
//     </BrowserRouter>
//   )
// }

// const customRender = (ui, options) => 
//   render(ui, {wrapper: AllTheProviders, ...options})

// // re-export everything
// export * from '@testing-library/react'

// // override render method
// export {customRender as render}