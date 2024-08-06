import AsyncStorage from "@react-native-async-storage/async-storage";

const ttlDefault = 30;

export const asyncSetItem = async (key, item, ttl) => {
    if (ttl === undefined) {
        ttl = ttlDefault;
    }

    const now = new Date();
    now.setSeconds(now.getSeconds() + ttl);
    const ttlSec = Math.floor(now.getTime() / 1000);
    dataItem = await item.json();
    const data = {
        item: dataItem,
        ttl: ttlSec
    }

    AsyncStorage.setItem(key, JSON.stringify(data));
}

export const asyncGetItem = async (key) => {

    return await AsyncStorage.getItem(key)
    .then((result) => {
        if (result === null) {
            return null;
        }

        const val = JSON.parse(result);
        const currTime = Math.floor(Date.now() / 1000);
        if (val.ttl <= currTime) {
            AsyncStorage.removeItem(key);
            return null;
        }
        return val.item
    })
}

export const asyncDeleteItem = async (key) => {
    AsyncStorage.removeItem(key);
}
