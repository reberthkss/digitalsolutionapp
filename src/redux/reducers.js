import {getObjType} from "../utils/globalFunctions";

export const listCustomers = (state = [], action) => {
    if (action.type === 'doLogout') {
        return [];
    }

    if (action.type === 'getCustomers') {
        return action.payload;
    }

    if (action.type === 'removeCustomer') {
        return state.filter(it => it.id !== action.payload);
    }

    if (action.type === 'addCustomer') {
        return [...state, action.payload];
    }

    if (action.type === 'updateCustomer') {
        const newCustomers = state.filter((customer) => customer.id !== action.payload.id);
        return [...newCustomers, action.payload]
    }

    return state;
};


export const listProducts = (state = [], action) => {
    if (action.type === 'doLogout') {
        return [];
    }
    if (action.type === 'getProducts') {
        return action.payload
    }


    if (action.type === 'removeProduct') {
        return state.filter(it => it.id !== action.payload)
    }


    if (action.type === 'addProduct') {
        return [...state, action.payload]
    }


    if (action.type === 'updateProduct') {
        const newProducts = state.filter((product) => product.id !== action.payload.id);
        return [...newProducts, action.payload]
    }

    return state
};

export const listServices = (state = [], action) => {
    if (action.type === 'doLogout') {
        return [];
    }

    if (action.type === 'getServices') {
        return action.payload
    }

    if (action.type === 'removeService') {
        return state.filter(it => it.id !== action.payload)
    }

    if (action.type === 'addService') {
        return [...state, action.payload]
    }

    if (action.type === 'updateService') {
        const newServices = state.filter(service => service.id !== action.payload.id)
        return [...newServices, action.payload]
    }

    return state
};


export const listDebitsCredits = (state = [], action) => {
    if (action.type === 'doLogout') {
        return [];
    }

    if (action.type === 'saveCreditsDebits') {
        return action.payload;
    }


    if (action.type === 'removeValue') {
        return state.filter((it) => it.id !== action.payload);
    }


    if (action.type === 'addValue') {
        return [...state, action.payload]
    }

    if (action.type === 'updateValue') {
        const newValues = state.filter((value) => value.id !== action.payload.id);
        return [...newValues, action.payload]
    }

    return state;
};


export const listFilteredValues = (state = {payed:[], unpayed:[], opened: []}, action) => {
    if (action.type === 'doLogout') {
        return {};
    }

    if (action.type === 'saveFilteredValues') {
        let prevState = {...state};
        if (action.payload.status === null) {
            prevState.payed.push(action.payload);
            return prevState;
        }
        switch (action.payload.status) {
            case 'payed' || null:
                prevState.payed.push(action.payload)
               return prevState;
            case 'unpayed':
                prevState.unpayed.push(action.payload);
               return prevState;
            case 'opened':
                prevState.opened.push(action.payload);
                return prevState;
            default :
                return action.payload
        }
    }

    if (action.type === 'removeFilteredValue') {
        if (action.payload.status === null) {
            const filteredPayed = state.payed.filter((value) => value.id !== action.payload.id);
            return {...state, payed: [...filteredPayed]}
        }

        switch (action.payload.status) {
            case 'payed':
                return {...state, payed: state.payed.filter(value => value.id !== action.payload.id)};
            case 'unpayed':
                return {...state, unpayed: state.unpayed.filter(value => value.id !== action.payload.id)};
            case 'opened':
                return {...state, opened: state.opened.filter(value => value.id !== action.payload.id)};
        }
    }

    if (action.type === 'updateFilteredValue') {
        const oldValue = state.payed.concat(state.unpayed, state.opened).filter((value) => value.id === action.payload.id);
        let filteredValues;
        const prevState = {...state};


        if (action.payload.status === null) {
            const oldListValues = state.payed.filter((value) => value.id !== action.payload.id);
            return {...state, payed: [...oldListValues, action.payload]}
        }

        if (oldValue.status !== action.payload.status) {
            prevState[oldValue[0].status] = prevState[oldValue[0].status].filter((value) => value.id !== action.payload.id);
            prevState[action.payload.status].push(action.payload);
            return prevState
        }
        switch (action.payload.status) {
            case 'payed':
                filteredValues = state.payed.filter((value) => value.id !== action.payload.id);
                return {...state, payed: [...filteredValues, action.payload]};
            case 'opened':
                 filteredValues = state.opened.filter((value) => value.id !== action.payload.id);
                return {...state, opened: [...filteredValues, action.payload]};
            case 'unpayed':
                filteredValues = state.unpayed.filter((value) => value.id !== action.payload.id);
                return {...state, unpayed: [...filteredValues, action.payload]};
            default:
                return prevState;
        }
    }

    return state
};

export const loadAllData = (state = true, action) => {
    const type = action.type;

    if (type === 'finishload') {
        return false;
    }

    if (type === 'doLogout') {
        return true;
    }

    return state
};

export const session = (state = {user: null, token: null, rememberMe: false}, action) => {
    if (action.type === 'doLogout') {
        return {user: null, token: null, rememberMe: false}
    }

    if (action.type === 'authenticated'){
        return action.payload
    }
    return state;
}

