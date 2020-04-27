import {
    doLoginService
} from "./doLoginService";


export const doLoginProvider = async (username, password) => {
    const resp = await doLoginService(username, password);
    return resp;
}
