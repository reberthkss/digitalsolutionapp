import {URL_BASE} from "../consts/consts";

export const manageDataInDb = async (screen, data, token) => {
   const res = await fetch(URL_BASE+screen, {
        method: 'POST',
       headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
       },
        body: JSON.stringify({...data, token}),
    });
   const resJ = await res.json();
   console.log(resJ)
   return resJ.id;
};
