import * as reducers from '../redux/reducers'
import {persistReducer, persistStore} from "redux-persist";
import storage from 'redux-persist/lib/storage'
import {combineReducers, createStore} from "redux";
const Reducers = combineReducers(reducers);
const persistConfig = {
    key: 'root',
    storage
};

const pReducer = persistReducer(persistConfig, Reducers);

export default () => {
    const store = createStore(pReducer);
    const persistor = persistStore(store);
    return {
        store,
        persistor
    }
}
