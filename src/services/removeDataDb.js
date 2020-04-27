import {URL_BASE} from "../consts/consts";

export const removeDataDb = async (screen, type, id, token) => {
    fetch(URL_BASE+screen, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({type, id, token})
    });
};
