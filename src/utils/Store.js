import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
  key: "root", // storage key
  storage, // localStorage
  whitelist: ["user"], // ✅ only persist user slice (feed won't persist)
};
const rootReducer = combineReducers({
  user: userReducer,
  feed: feedReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// const Store = configureStore({
//   reducer: {
//     user: userReducer,
//     feed: feedReducer,
//   },
// });
const Store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});
export const persistor = persistStore(Store);
export default Store;
