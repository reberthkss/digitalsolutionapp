import {URL_BASE} from "../consts/consts";

export const validationTokenService = async (token) => {
    try {
        const res = await fetch(URL_BASE+'checkToken', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({token})
        })
        return await res.json()
    } catch(e) {
        throw Error(e.message)
    }
};

