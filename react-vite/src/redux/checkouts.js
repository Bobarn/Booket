const GET_CHECKOUTS = 'checkouts/GET_CHECKOUTS';
const ADD_CHECKOUT = 'checkouts/ADD_CHECKOUT';
const REMOVE_CHECKOUT = 'checkouts/REMOVE_CHECKOUT';

const getCheckouts = (checkouts) => {
    return {
    type: GET_CHECKOUTS,
    checkouts
    }
}

const addCheckout = (checkout) => {
    return {
        type: ADD_CHECKOUT,
        checkout
    }
}

const removeCheckout = (checkoutId) => {
    return {
        type: REMOVE_CHECKOUT,
        checkoutId
    }
}


export const thunkGetCheckouts = () => async (dispatch) => {
    const response = await fetch('/api/books/checkouts')

    if(response.ok) {
        const {checkouts} = await response.json()

        dispatch(getCheckouts(checkouts))

        return checkouts
    } else {
        const error = await response.json()

        return error;
    }
}

export const thunkAddCheckout = (checkoutId) => async (dispatch) => {
    const response = await fetch(`/api/books/checkouts/${checkoutId}`, {
        method: "POST"
    })

    if(response.ok) {
        const checkout = await response.json()

        dispatch(addCheckout(checkout))

        return checkout
    } else {
        const error = await response.json()

        return error;
    }
}

export const thunkRemoveCheckout = (checkoutId) => async (dispatch) => {
    const response = await fetch(`/api/books/checkouts/${checkoutId}`, {
        method: "DELETE"
    })

    if(response.ok) {

        dispatch(removeCheckout(checkoutId))

    } else {
        const error = await response.json()

        return error;
    }
}


const checkoutsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_CHECKOUTS:{
            const newState = { ...state }
            const checkouts = action.checkouts
            checkouts.forEach((checkout) => {
                newState[checkout.id] = checkout
            })
            return newState
        }
        case ADD_CHECKOUT:{
            const newState = { ...state }
            newState[action.checkout.id] = action.checkout
            return newState
        }
        case REMOVE_CHECKOUT:{
            const newState = { ...state }
            delete newState[action.checkoutId]
            return newState
        }
        default:
            return state
    }
}

export default checkoutsReducer
