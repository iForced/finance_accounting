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

// type InitialStateType = {
//     incomes: Array<UnitType>,
//     outcomes: Array<UnitType>,
// }
// export type UnitType = {
//     addDate: string
//     value: number
// }
type InitialStateType = {
    [day: string]: {
        incomes: Array<number>
        outcomes: Array<number>
    }
}

export const now = moment().format('DD MM YYYY')

const initialState: InitialStateType = {
    [now]: {
        incomes: [50],
        outcomes: [20]
    }
}

export const inputsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {

        case Actions.ADD_INCOMES:
            const newIncome = action.value
            return {...state, [action.day]: {...state[action.day], incomes: [...state[action.day].incomes, newIncome]}}

        case Actions.ADD_OUTCOMES:
            const newOutcome = action.value
            return {...state, [action.day]: {...state[action.day], outcomes: [...state[action.day].outcomes, newOutcome]}}

        default:
            return state
    }
}
export const addIncomes = (value: number, day: string) => {
    return {
        type: Actions.ADD_INCOMES,
        day,
        value,
    }
}
export const addOutcomes = (value: number, day: string) => {
    return {
        type: Actions.ADD_OUTCOMES,
        day,
        value,
    }
}