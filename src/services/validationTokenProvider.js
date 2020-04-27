import {validationTokenService} from "./validationTokenService";

export const validationTokenProvider = async (token) => {
    const result = await validationTokenService(token);
    return result;

}
