import {createSlice, PayloadAction, Slice} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";

export type ModelType = "text-generation" | "multimodality";

export type ModelApiType = "openai" | "deepseek" | "gemini" | "ollama" | "anthropic";

export type ModelCapabilitiesType = "text" | "img-out" | "img-in" | "audio-out" | "audio-in" | "video-out" | "video-in";

export interface ModelInfo {
  "modelType": ModelType,
  "modelName": string,
  "apiType": ModelApiType,
  "modelCapabilities": ModelCapabilitiesType[],
  "contextWindowSize": number,
  "baseUrl": string,
  "apiKey": string | null,
  "headers": {
    string: string
  },
}

export interface ModelsDataState {
  models: ModelInfo[];
}

const initialState: ModelsDataState = {
  models: [],
};

export const modelsDataSlice: Slice<ModelsDataState> = createSlice({
  name: "modelsData",
  initialState,
  reducers: {
    addModel: (state, action: PayloadAction<ModelInfo>) => {
      state.models.push(action.payload);
    },
  },
});

// 为每个 case reducer 函数生成 Action creators
export const {
  addModel,
} = modelsDataSlice.actions;

// Selectors
export const selectModelList = (state: { modelsData: ModelsDataState }) => state.modelsData.models;

// 持久化配置
const modelsDataPersistConfig = {
  key: "modelsData",
  storage,
};

const persistedModelsDataReducer = persistReducer(modelsDataPersistConfig, modelsDataSlice.reducer);
export default persistedModelsDataReducer;
