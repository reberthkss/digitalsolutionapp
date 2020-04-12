import {URL_BASE} from "../consts/consts";


export const loadDataService = async (type) => {
    let res = await fetch(URL_BASE, {
        method: 'POST',
        body: JSON.stringify({type: type}),
    });
    let resJ = await res.json();
    return resJ;
};

