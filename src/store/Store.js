import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice/Auth";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { AuthApi } from "./services/AuthApi";



// --- Redux Persist Configuration ---
const persistConfig = {
    key: "auth",
    storage,
    whitelist: ["user", "token", "isAuthenticated"],
};

// Apply persistence wrapper to the auth reducer
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

// --- Store Setup ---
export const store = configureStore({
    reducer: {
        
        auth: persistedAuthReducer,
        
       
        [AuthApi.reducerPath]: AuthApi.reducer,
    },
    
   
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
           
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
        
        .concat(AuthApi.middleware),
});

export const persistor = persistStore(store);