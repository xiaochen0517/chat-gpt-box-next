import {createSlice, PayloadAction, Slice} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";

export interface AppSettingState {
  isDarkMode: boolean;
  currentChatId: string,
}

const initialState: AppSettingState = {
  isDarkMode: true,
  currentChatId: "",
};

export const appSettingSlice: Slice<AppSettingState> = createSlice({
  name: "appSetting",
  initialState,
  reducers: {
    switchDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
      // 更新 body 背景色
      document.body.classList.toggle("dark", action.payload);
    },
    setCurrentChatId: (state, action: PayloadAction<string>) => {
      state.currentChatId = action.payload;
    },
  },
});

// 为每个 case reducer 函数生成 Action creators
export const {
  switchDarkMode,
  setCurrentChatId,
} = appSettingSlice.actions;

// Selectors
export const selectDarkMode = (state: { appSetting: AppSettingState }) => state.appSetting.isDarkMode;
export const selectCurrentChatId = (state: { appSetting: AppSettingState }) => state.appSetting.currentChatId;

// 持久化配置
const appSettingPersistConfig = {
  key: "appSetting",
  storage,
};

const persistedAppSettingReducer = persistReducer(appSettingPersistConfig, appSettingSlice.reducer);
export default persistedAppSettingReducer;
