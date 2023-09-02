// import { configureStore } from "@reduxjs/toolkit";
// import { authApi } from "./auth/authApi";

// import { certificateApi } from "./certificates/certificateApi";

// export const store = configureStore({
//   reducer: {
//     [certificateApi.reducerPath]: certificateApi.reducer,
//     [authApi.reducerPath]: authApi.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(
//       certificateApi.middleware,
//       authApi.middleware
//     ),
//   devTools: true,
// });

// // export const persistor = persistStore(store);
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authApi } from "./auth/authApi";
import { certificateApi } from "./certificates/certificateApi";

const rootReducer = combineReducers({
  [certificateApi.reducerPath]: certificateApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(certificateApi.middleware, authApi.middleware),
  devTools: true,
});

export const persistor = persistStore(store);
