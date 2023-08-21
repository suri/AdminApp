import { configureStore } from "@reduxjs/toolkit";
import Reducers from './reducers'
const Store = configureStore({
    reducer: Reducers
})

const getToken = () => {
   return Store.getState().generalState.token
}

export  {Store, getToken}