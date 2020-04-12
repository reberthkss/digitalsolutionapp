import {URL_BASE} from "../consts/consts";

export const manageDataInDb = async (data) => {
    fetch(URL_BASE, {
        method: 'POST',
        body: JSON.stringify(data),
    }).then(res => res.json()).then(resJ => console.log(resJ))
};
