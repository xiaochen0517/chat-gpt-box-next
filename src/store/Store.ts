import {combineReducers, configureStore} from "@reduxjs/toolkit";
import appSettingReducer from "@/store/reducers/AppSettingSlice.ts";
import {persistStore} from "redux-persist";
import persistedSettingAppReducer from "@/store/reducers/SettingsPageSlice.ts";

const rootReducer = combineReducers({
  appSetting: appSettingReducer,
  settingsPage: persistedSettingAppReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
        ],
      },
    }),
});

// 创建 persistor
export const persistor = persistStore(store);

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
