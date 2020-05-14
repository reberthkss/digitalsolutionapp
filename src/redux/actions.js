export const addCustomer = (payload) => {
    return {type: 'addCustomer', payload: payload}
};

export const addProduct = (payload) => {
    return {type: 'addProduct', payload: payload}
};

export const addService = (payload) => {
    return {type: 'addService', payload: payload}
};

export const addValue = (payload) => {
    return {type: 'addValue', payload: payload}
};

export const deleteValue = (payload) => {
    return {type: 'removeValue', payload: payload}
};

export const deleteCustomer = (payload) => {
    return {type: 'removeCustomer', payload: payload}
};

export const deleteProduct = (payload) => {
    return {type: 'removeProduct', payload: payload}
};

export const deleteService = (payload) => {
    return {type: 'removeService', payload: payload}
};

export const updateProduct = (payload) => {
    return {type: 'updateProduct', payload: payload}
};

export const updateValue = (payload) => {
    return {type: 'updateValue', payload: payload}
};

export const updateCustomer = (payload) => {
    return {type: 'updateCustomer', payload: payload}
};

export const updateService = (payload) => {
    return {type: 'updateService', payload: payload}
}

export const updateFilteredValues = (payload) => {
    return {type: 'updateFilteredValues', payload: payload}
}

export const removeFilteredValue = (payload) => {
    return {type: 'removeFilteredValue', payload: payload}
}

export const saveDataFromDb = (action) => {
    return action;
};

export const finishLoad = () => {
    return {type: 'finishload'}
}

export const loadingAllData = () => {
    return {type: 'loadingAllData'}
}
export const markAsAuthenticated = (user, token) => {
    return {type: 'authenticated', payload: {user, token}}
};

export const doLogout = () => {
    return {type: 'doLogout'}
};
