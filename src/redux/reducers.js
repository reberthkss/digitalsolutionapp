
export const listCustomers = (state = [], action) => {
    if (action.type === 'getCustomers') {
        return  action.payload;
    };

    if (action.type === 'removeCustomer') {
        return state.filter(it => it._id !== action.payload);
    };

    if (action.type === 'addCustomer') {
        return [...state, action.payload];
    };

    if (action.type === 'updateCustomer') {
        const newCustomers = state.filter((customer) => customer._id !== action.payload._id);
        return [...newCustomers, action.payload]
    }

    return state;
}


export const listProducts = (state = [], action) => {
    if (action.type === 'getProducts') {
        return action.payload
    };

    if (action.type === 'removeProduct') {
        return state.filter(it => it._id !== action.payload)
    };

    if (action.type === 'addProduct') {
        return [...state, action.payload]
    };

    if (action.type === 'updateProduct') {
        const newProducts = state.filter((product) => product._id !== action.payload._id);
        return [...newProducts, action.payload]
    }

    return state
}

export const listServices = (state = [], action) => {
    if(action.type === 'getServices') {
        return action.payload
    }

    if (action.type === 'removeService') {
        return state.filter(it => it._id !== action.payload)
    }

    if (action.type === 'addService') {
        return [...state, action.payload]
    }

    if (action.type === 'updateService') {
        const newServices = state.filter(service => service._id !== action.payload._id)
        return [...newServices, action.payload]
    }

    return state
}


export const listDebitsCredits = (state = [], action) => {
    if(action.type === 'saveCreditsDebits') {
        return action.payload;
    };

    if (action.type === 'removeValue') {
        return state.filter((it) => it._id !== action.payload);
    };

    if (action.type === 'addValue') {
        return [...state, action.payload]
    }

    if (action.type === 'updateValue') {
        const newValues = state.filter((value) => value._id !== action.payload._id);
        return [...newValues, action.payload]
    }

    return state;
};



