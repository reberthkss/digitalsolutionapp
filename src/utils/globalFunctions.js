export const formatCurrencie = (value) => {
    let commaPosition = value.indexOf(',');
    let dotPosition = value.indexOf('.');
    if (commaPosition == -1 && dotPosition == -1) {
        return value + ',00'
    }

    let valueSplited;

    if (commaPosition == -1) {
        valueSplited = value.split('.');
    } else {
        valueSplited = value.split(',');
    }

    if (valueSplited[1].length < 2) {
        return valueSplited[0]+ ',' + valueSplited[1] + '0'
    } else {
        const sb = valueSplited[1].substring(0,2);
        return valueSplited[0] + ',' + sb;
    }

};
