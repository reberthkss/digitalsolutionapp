import {
    URL_BASE
} from "../consts/consts";


export const doLoginService = async (username, password) => {
   try {
       const res = await fetch(URL_BASE+'login', {
           method: 'post',
           headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
           },
           body: JSON.stringify({username, password})
       });

       return await res.json();
   } catch (e) {
       throw Error(e)
   }
};
