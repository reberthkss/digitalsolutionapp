import {URL_BASE} from "../consts/consts";

const myHeaders = new Headers();


export const loadDataService = async (screen, type, token) => {
    console.log(URL_BASE+screen)
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

    resJ.forEach((value) => {
        value.id = value._id;
        delete value._id;
    });

    return resJ;
};

