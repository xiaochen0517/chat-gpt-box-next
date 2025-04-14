import {createSlice, PayloadAction, Slice} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";
import {v4 as uuidv4} from "uuid";

export type ModelType = "text-generation" | "multimodality";

export type ModelApiType = "openai" | "deepseek" | "gemini" | "ollama" | "anthropic";

export type ModelCapabilitiesType = "text" | "img-out" | "img-in" | "audio-out" | "audio-in" | "video-out" | "video-in";

export interface ModelInfo {
  "id": string;
  "modelType": ModelType,
  "modelName": string,
  "apiModelName": string,
  "apiType": ModelApiType,
  "functionCall": boolean,
  "modelCapabilities": ModelCapabilitiesType[],
  "contextWindowSize": number | string,
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
      if (!action.payload) {
        console.error("Invalid modelInfo");
        return;
      }
      // generate a unique ID for the new model
      action.payload.id = uuidv4();
      state.models.push(action.payload);
    },
    updateModel: (state, action: PayloadAction<{ index: number, modelInfo: ModelInfo }>) => {
      const {index, modelInfo} = action.payload;
      if (index < 0 || index >= state.models.length || !modelInfo) {
        console.error("Invalid index or modelInfo");
        return;
      }
      modelInfo.id = state.models[index].id; // keep the same ID
      state.models[index] = modelInfo;
    },
    removeModel: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index < 0 || index >= state.models.length) {
        console.error("Invalid index");
        return;
      }
      state.models.splice(index, 1);
    },
  },
});

// 为每个 case reducer 函数生成 Action creators
export const {
  addModel,
  updateModel,
  removeModel,
} = modelsDataSlice.actions;

// Selectors
export const selectModelList = (state: { modelsData: ModelsDataState }) => state.modelsData.models;
export const selectModelById = (state: { modelsData: ModelsDataState }, id: string) => {
  return state.modelsData.models.find((model) => model.id === id);
};

// 持久化配置
const modelsDataPersistConfig = {
  key: "modelsData",
  storage,
};

const persistedModelsDataReducer = persistReducer(modelsDataPersistConfig, modelsDataSlice.reducer);
export default persistedModelsDataReducer;
