import moment from "moment";

enum Actions {
    ADD_INCOMES = 'ADD_INCOMES',
    ADD_OUTCOMES = 'ADD_OUTCOMES',
}

type AddIncomesActionType = ReturnType<typeof addIncomes>
type AddOutcomesActionType = ReturnType<typeof addOutcomes>
export type ActionsType =
    AddIncomesActionType
    | AddOutcomesActionType

type InitialStateType = {
    incomes: Array<UnitType>,
    outcomes: Array<UnitType>,
}
export type UnitType = {
    addDate: string
    value: number
}

export const now = moment().format('DD MM YYYY')

const initialState: InitialStateType = {
    incomes: [],
    outcomes: [],
}

export const inputsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {

        case Actions.ADD_INCOMES:
            const newIncome = {addDate: now, value: action.value}
            return {...state, incomes: [...state.incomes, newIncome]}

        case Actions.ADD_OUTCOMES:
            const newOutcome = {addDate: now, value: action.value}
            return {...state, outcomes: [...state.outcomes, newOutcome]}

        default:
            return state
    }
}
export const addIncomes = (value: number) => {
    return {
        type: Actions.ADD_INCOMES,
        value,
    }
}
export const addOutcomes = (value: number) => {
    return {
        type: Actions.ADD_OUTCOMES,
        value,
    }
}