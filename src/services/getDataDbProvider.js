import {loadDataService} from "./getDataDb";

export default class GetDataDbProvider {
    static loadDataProvider = async (screen, type, token) => {
        const values = await loadDataService(screen, type, token);
        return values
    }
}

