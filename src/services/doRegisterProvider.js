import {doRegisterService} from "./doRegisterService";


export const doRegisterProvider = async (username, email,  password, secret) => {
    return await doRegisterService(username, email, password, secret);
}
