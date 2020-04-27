import {URL_BASE} from "../consts/consts";

export const doRegisterService = async (username, email, password, secret) => {
    try {
        const res = await fetch(
            URL_BASE+'signup',
            {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, email, password, secret})
            });
        return await res.json()
    } catch(e) {
        throw Error(e.message)
    }
};
