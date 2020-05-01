import {URL_BASE} from "../consts/consts";

export const removeDataDb = async (screen, type, id, token) => {
    const res = await fetch(URL_BASE+screen, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({type, id, token})
    });
    console.log(await res.json())
};
