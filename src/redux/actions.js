export const addCustomer = (payload) => {
    return {type: 'addCustomer', payload: payload}
};

export const addProduct = (payload) => {
    return {type: 'addProduct', payload: payload}
};

export const addService = (payload) => {
    return {type: 'addService', payload: payload}
};

export const addCredit = (payload) => {
    return {type: 'addCredit', payload: payload}
};

export const addDebit = (payload) => {
    return {type: 'addDebit', payload: payload}
};

export const saveDataFromDb = (action) => {
    return action;
};

