import {validationTokenService} from "./validationTokenService";

export const validationTokenProvider = async (token) => {
    try {
        const result = await validationTokenService(token);
        return result;
    } catch(e) {
        throw Error(e.message)
    }

}
