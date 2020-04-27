export const formatCurrencie = (value) => {
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
