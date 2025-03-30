import {createSlice, PayloadAction, Slice} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";

export type SettingsPage = "settings" | "about" | "models" | "mcp" | "prompts";

export interface SettingsPageState {
  currentPage: SettingsPage;
  drawerOpen: boolean;
}

const initialState: SettingsPageState = {
  currentPage: "settings",
  drawerOpen: false,
};

export const settingsAppSlice: Slice<SettingsPageState> = createSlice({
  name: "settingsPage",
  initialState,
  reducers: {
    openDrawer: (state, action: PayloadAction<SettingsPage>) => {
      state.currentPage = action.payload;
      state.drawerOpen = true;
    },
    closeDrawer: (state, _: PayloadAction<SettingsPage>) => {
      state.drawerOpen = false;
    },
  },
});

// 为每个 case reducer 函数生成 Action creators
export const {
  openDrawer,
} = settingsAppSlice.actions;

// Selectors
export const selectDrawerOpen = (state: { settingsPage: SettingsPageState }) => state.settingsPage.drawerOpen;
export const selectCurrentPage = (state: { settingsPage: SettingsPageState }) => state.settingsPage.currentPage;

// 持久化配置
const settingPagePersistConfig = {
  key: "settingsPage",
  storage,
  // 关闭持久化
  blacklist: ["drawerOpen"],
};

const persistedSettingAppReducer = persistReducer(settingPagePersistConfig, settingsAppSlice.reducer);
export default persistedSettingAppReducer;
