import AsyncStorage from "@react-native-async-storage/async-storage";

const setFirstTimeUse = () => {
    return AsyncStorage.setItem('isFirstTimeUse', "true");
};

const getFirstTimeUse = () => {
    return AsyncStorage.getItem('isFirstTimeUse');
};

const setToken = token => {
    return AsyncStorage.setItem('token', token);
};

const getToken = () => {
    console.log("Get token from Async Storage",AsyncStorage.getItem('token'))
    return AsyncStorage.getItem('token');
};

console.log("Get token from function",getToken())

export default{
    setFirstTimeUse, 
    getFirstTimeUse,
    setToken,
    getToken
}