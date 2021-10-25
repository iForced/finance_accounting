import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {inputsReducer} from "./inputsReducer";

export type AppStateType = ReturnType<typeof store.getState>

const rootReducer = combineReducers({
    inputsReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.state = store.getState().inputsReducer