import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import favouritesReducer from "./movie/favouritesSlice";
import ratingReducer from "./movie/ratingSlice";
import userReducer from "./movie/userSlice";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import createWebStorage from "redux-persist/es/storage/createWebStorage";


const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();


const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  favourites: favouritesReducer,
  ratings: ratingReducer,
  user: userReducer,
});


const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["favourites", "ratings", "user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
