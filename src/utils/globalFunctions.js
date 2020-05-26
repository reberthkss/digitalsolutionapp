import {red, yellow} from "@material-ui/core/colors";
import GetDataDbProvider from "../services/getDataDbProvider";

export const formatCurrencie = (value) => {
    if (value === null ||  value === undefined) return '0,00';
    const valueString = value.toString()
    let commaPosition = valueString.indexOf(',');
    let dotPosition = valueString.indexOf('.');
    if (commaPosition === -1 && dotPosition === -1) {
        return valueString + ',00'
    }

    let valueSplited;

    if (commaPosition === -1) {
        valueSplited = valueString.split('.');
    } else {
        valueSplited = valueString.split(',');
    }

    if (valueSplited[1].length < 2) {
        return valueSplited[0]+ ',' + valueSplited[1] + '0'
    } else {
        const sb = valueSplited[1].substring(0,2);
        return valueSplited[0] + ',' + sb;
    }

};


export const getColorByStatus = (status) => {
    switch (status) {
        case 'payed':
            return '#00c853';
        case 'opened':
            return yellow[700];
        case 'unpayed':
            return red[500];
    }
}

export const getTextByStatus = (status) => {
    switch (status) {
        case 'payed':
            return 'PAGO';
        case 'opened':
            return 'ABERTO';
        case 'unpayed':
            return 'INADIMPLENTE';
    }
};


export const loadData = async (saveData, token) => {

    const allCreditsFromDb = await GetDataDbProvider.loadDataProvider('values', 'getCredit', token);
    await saveData('saveCreditsDebits', allCreditsFromDb);

    await saveData('saveFilteredValues', {
        payed: allCreditsFromDb.filter( (value) => value.status === 'payed' || value.status === null),
        unpayed: allCreditsFromDb.filter( (value) => value.status === 'unpayed'),
        opened: allCreditsFromDb.filter( (value) => value.status === 'opened')
    });

    const allCustomersFromDb = await GetDataDbProvider.loadDataProvider('customer','getCustomers', token);
    await saveData('getCustomers', allCustomersFromDb);

    const allServicesFromDb = await GetDataDbProvider.loadDataProvider('services', 'get_services', token);
    await saveData('getServices', allServicesFromDb);

    const allProductsFromDb = await GetDataDbProvider.loadDataProvider('product', 'get_products', token);
    await saveData('getProducts', allProductsFromDb);
    return {loaded: true}
};

export const getObjType = (type) => {
    switch (type) {
        case 'payed':
            return 'payed';
        case 'opened':
            return 'opened'
        case 'unpayed':
            return 'unpayed'
    }
}
