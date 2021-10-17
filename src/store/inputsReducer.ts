type AddIncomesActionType = ReturnType<typeof addIncomes>
type AddOutcomesActionType = ReturnType<typeof addOutcomes>
export type ActionsType =
    AddIncomesActionType
    | AddOutcomesActionType

type InitialStateType = typeof initialState

enum Actions {
    ADD_INCOMES = 'ADD_INCOMES',
    ADD_OUTCOMES = 'ADD_OUTCOMES',
}

const initialState = {
    incomes: 0,
    outcomes: 0,
}

export const inputsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {

        case Actions.ADD_INCOMES:
            return {...state, incomes: state.incomes += action.payload}

        case Actions.ADD_OUTCOMES:
            return {...state, outcomes: state.outcomes += action.payload}

        default:
            return state
    }
}
export const addIncomes = (payload: number) => {
    return {
        type: Actions.ADD_INCOMES,
        payload,
    }
}
export const addOutcomes = (payload: number) => {
    return {
        type: Actions.ADD_OUTCOMES,
        payload,
    }
}