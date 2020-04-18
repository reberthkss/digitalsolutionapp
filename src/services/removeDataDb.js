import {URL_BASE} from "../consts/consts";

export const removeDataDb = async (type, id) => {
    console.log(`ID => ${id}`)
    fetch(URL_BASE, {
        method: 'POST',
        body: JSON.stringify({type: type, _id: id})
    });
};
