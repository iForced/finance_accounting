import moment from "moment";
import {db, ITransaction} from "../database/database";
import {v1} from "uuid";
import {Dispatch} from "redux";

export enum Actions {
    ADD_INCOMES = 'ADD_INCOMES',
    ADD_OUTCOMES = 'ADD_OUTCOMES',
    LOAD_TRANSACTIONS = 'LOAD_TRANSACTIONS',
}

type AddIncomesActionType = ReturnType<typeof addIncomes>
type AddOutcomesActionType = ReturnType<typeof addOutcomes>
export type ActionsType =
    AddIncomesActionType
    | AddOutcomesActionType

type InitialStateType = {
    transactions: Array<ITransaction>
}

export const now = moment().format('DD MM YYYY')

const initialState: InitialStateType = {
    transactions: []
}

export const inputsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {

        case Actions.ADD_INCOMES:
            const newIncome: ITransaction = {id: v1(), type: 'income', value: action.value, addDate: action.day}
            return {...state, transactions: [...state.transactions, newIncome]}

        case Actions.ADD_OUTCOMES:
            const newOutcome: ITransaction = {id: v1(), type: 'outcome', value: action.value, addDate: action.day}
            return {...state, transactions: [...state.transactions, newOutcome]}

        default:
            return state
    }
}
export const addIncomes = (value: number, day: string) => {
    return {
        type: Actions.ADD_INCOMES,
        day,
        value,
    } as const
}
export const addOutcomes = (value: number, day: string) => {
    return {
        type: Actions.ADD_OUTCOMES,
        day,
        value,
    } as const
}