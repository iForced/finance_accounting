import {combineReducers, createStore} from "redux";
import {inputsReducer} from "./inputsReducer";

export type AppStateType = ReturnType<typeof store.getState>

const rootReducer = combineReducers({
    inputsReducer,
})

export const store = createStore(rootReducer)
