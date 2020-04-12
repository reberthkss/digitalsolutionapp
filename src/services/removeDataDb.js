import {URL_BASE} from "../consts/consts";

export const removeDataDb = async (type, id) => {
    fetch(URL_BASE, {
        method: 'POST',
        body: JSON.stringify({type: type, id: id})
    })
};
