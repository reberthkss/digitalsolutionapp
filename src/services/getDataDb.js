import {URL_BASE} from "../consts/consts";

const myHeaders = new Headers();


export const loadDataService = async (screen, type, token) => {
    let res = await fetch(URL_BASE+screen,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({type, token}),
        });
    let resJ = await res.json();
    return resJ;
};

