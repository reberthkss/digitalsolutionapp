import {URL_BASE} from "../consts/consts";

export const manageDataInDb = async (data) => {
    console.log(`VAI EXECUTAR FETCH`)
    console.log(data)
   const res = await fetch(URL_BASE, {
        method: 'POST',
        body: JSON.stringify(data),
    });
   const resJ = await res.json();
   console.log(resJ)
   return resJ.id;
};
