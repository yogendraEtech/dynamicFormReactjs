import { GET_FORM } from '../actions/Types'

const initState = {
    form:[]
}

const formReducer = (state = initState, action) => {
    if (action.type === GET_FORM) {
        return {
            ...state,
            form: action.data
        }
    }
    return state;
}

export default formReducer;
