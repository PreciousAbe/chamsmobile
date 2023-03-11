import { legacy_createStore as createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import rootReducer from "./reducers/rootReducer"
const composeEnhancers =
  (window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] as typeof compose) || compose
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
)

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export default store;