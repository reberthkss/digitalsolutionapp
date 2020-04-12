import {loadDataService} from "./getDataDb";

export default class GetDataDbProvider {
    static loadDataProvider = async (type) => {
        const values = await loadDataService(type);
        return values
    }
}

