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
        return state.filter((it) => it._id !== action.payload);
    }


    if (action.type === 'addValue') {
        return [...state, action.payload]
    }

    if (action.type === 'updateValue') {
        const newValues = state.filter((value) => value._id !== action.payload._id);
        return [...newValues, action.payload]
    }

    return state;
};


export const listFilteredValues = (state = {}, action) => {
    if (action.type === 'doLogout') {
        return {};
    }

    if (action.type === 'saveFilteredValues') {
        switch (action.payload.status) {
            case 'payed':
                state.payed.push(action.payload);
                return {...state, payed: state.payed}
            case 'unpayed':
                state.unpayed.push(action.payload)
                return {...state, unpayed: state.unpayed}
            case 'opened':
                state.opened.push(action.payload)
                return {...state, opened: state.opened}
            default :
                return action.payload
        }
    }

    if (action.type === 'removeFilteredValue') {
        switch (action.payload.status) {
            case 'payed':
                return {...state, payed: state.payed.filter(value => value._id !== action.payload._id)};
            case 'unpayed':
                return {...state, unpayed: state.unpayed.filter(value => value._id !== action.payload._id)};
            case 'opened':
                return {...state, opened: state.opened.filter(value => value._id !== action.payload._id)};
        }
    }

    return state
};

export const loadAllData = (state = true, action) => {
    if (action.type === 'doLogout') {
        return true;
    }

    const type = action.type;
    if (type === 'getProducts' || type === 'getCustomers' || type === 'getServices' || type === 'saveCreditsDebits' ) {
        return true
    }
    if (type === 'finishLoadAllData') {
        return false
    }

    return state
};

export const session = (state = {user: null, token: null}, action) => {
    if (action.type === 'doLogout') {
        return {user: null, token: null}
    }

    if (action.type === 'authenticated'){
        console.log(action);
        return action.payload
    }
    return state;
}

