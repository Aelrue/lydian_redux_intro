import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import logger from "redux-logger";
import { act } from "react-dom/test-utils";

// reducer!
const count = (state = 0, action) => {
  console.log(`Hey!!! I'm a reducer y'all!!!`);
  console.log("action", action);
  if (action.type === "INCREASE") {
    return state + 1;
    // OR state ++
    // state +=1
    // state = state +1
  } else if (action.type === "DECREASE") {
    return state - 1;
  }
  // no matter which route you hit, you should then get kicked out of the function
  // but if using multiple conditionals, you could possibly hit both routes
  // so using if else as a safeguard
  return state;
};

const elementList = (state = ["oxygen", "hydrogen"], action) => {
  console.log("action inside elementList", action.payload);
  if (action.type === "ADD_ELEMENT") {
    // state being the array that's being pushed to
    // .push mutates the original state, but react and redux need us to create new instances
    // of each values for it to trigger and rerender the value of elementList. That's where spread operators come in ...
    // state.push(action.payload);
    // return state;
    let newArray = [...state, action.payload];
    return newArray;
  }
  return state;
};

// store!
const storeInstance = createStore(
  combineReducers({
    count,
    elementList,
  }),
  applyMiddleware(logger)
  //
);

// Provider lets redux and react talk to one another
ReactDOM.render(
  <React.StrictMode>
    <Provider store={storeInstance}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
