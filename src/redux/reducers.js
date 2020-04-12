
export const listCustomers = (state = [], action) => {
    if (action.type === 'getCustomers') {
        return  action.payload
    }
    return state
}


export const listProducts = (state = [], action) => {
    if (action.type === 'getProducts') {
        return action.payload
    }
    return state
}

export const listServices = (state = [], action) => {
    if(action.type === 'getServices') {
        return action.payload
    }
    return state
}


export const listDebitsCredits = (state = [], action) => {
    if(action.type === 'saveCreditsDebits') {
        return action.payload
    };
    return state;
};

