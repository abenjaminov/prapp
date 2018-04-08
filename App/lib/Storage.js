import { AsyncStorage } from 'react-native'

const SaveStorageItem = (key, value, errorCallback) => {
    console.log(key + " --- " + JSON.stringify(value))
    AsyncStorage.setItem(key, JSON.stringify(value),(error) => {
        errorCallback(error)
    })
}

const GetStorageItem = (key, callback) => {
    AsyncStorage.getItem(key, (error, item) => {
        // Write to log if there is an error
        callback(JSON.parse(item));
    });
}

const GetAllStorageItems = (callback, condition) => {
    var allValues = [];
    console.log("Cond : " + condition);
    AsyncStorage.getAllKeys().then(keys => {

        let requests = keys.map((key) => {
            return new Promise((resolve) => {
                AsyncStorage.getItem(key, (error, item) => {
                    if(condition === null || condition === undefined || condition(JSON.parse(item)))
                    {
                        allValues.push(JSON.parse(item));
                    }
                    resolve();
                });
            });
        })
        
        Promise.all(requests).then(() => callback(allValues));
    });
}

const ClearAppStorage = () => {
    AsyncStorage.getAllKeys().then(keys => {

        AsyncStorage.multiRemove(keys, (err) => {
            // keys k1 & k2 removed, if they existed
            // do most stuff after removal (if you want)
          });
    });
}

export default Storage = {
    SaveStorageItem,
    GetStorageItem,
    GetAllStorageItems,
    ClearAppStorage
}