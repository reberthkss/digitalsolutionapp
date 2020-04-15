
export const listCustomers = (state = [], action) => {
    if (action.type === 'getCustomers') {
        return  action.payload
    }

    if (action.type === 'removeCustomer') {
        return state.filter(it => it.id !== action.payload)
    }
    return state
}


export const listProducts = (state = [], action) => {
    if (action.type === 'getProducts') {
        return action.payload
    };

    if (action.type === 'removeProduct') {
        return state.filter(it => it.id !== action.payload)
    };

    return state
}

export const listServices = (state = [], action) => {
    if(action.type === 'getServices') {
        return action.payload
    }

    if (action.type === 'removeService') {
        return state.filter(it => it.id !== action.payload)
    }
    return state
}


export const listDebitsCredits = (state = [], action) => {
    if(action.type === 'saveCreditsDebits') {
        return action.payload;
    };

    if (action.type === 'removeValue') {
        return state.filter((it) => it.id !== action.payload.id);
    };

    return state;
};



