import { configureStore } from "@reduxjs/toolkit";
import heroes from "../components/heroesList/heroesSlice";
// import filters from "../reducers/filters";
import filters from "../components/heroesFilters/heroFiltersSlice"

const stringMidleware = (store) => (next) => (action) => {
  if (typeof action === "string") {
    return next({
      type: action,
    });
  }
  return next(action);
};

// const store = createStore(
//                     combineReducers({ heroes, filters }),
//                     compose(
//                     applyMiddleware(ReduxThunk,stringMidleware),
//                         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );

const store = configureStore({
  reducer: { heroes, filters },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMidleware),
  devTools: process.env.NODE_ENV !== "production",
  
});

export default store;
