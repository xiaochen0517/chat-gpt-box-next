import {createSlice, PayloadAction, Slice} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";
import {v4 as uuidv4} from "uuid";

export interface PromptInfo {
  "id": string;
  "promptName": string;
  "promptContent": string;
}

export interface PromptsDataState {
  prompts: PromptInfo[];
}

const initialState: PromptsDataState = {
  prompts: [],
};

export const promptsDataSlice: Slice<PromptsDataState> = createSlice({
  name: "promptsData",
  initialState,
  reducers: {
    addPrompt: (state, action: PayloadAction<PromptInfo>) => {
      if (!action.payload) {
        console.error("Invalid promptInfo");
        return;
      }
      // generate a unique ID for the new prompt
      action.payload.id = uuidv4();
      state.prompts.push(action.payload);
    },
    updatePrompt: (state, action: PayloadAction<{ index: number, promptInfo: PromptInfo }>) => {
      const {index, promptInfo} = action.payload;
      if (index < 0 || index >= state.prompts.length || !promptInfo) {
        console.error("Invalid index or promptInfo");
        return;
      }
      promptInfo.id = state.prompts[index].id; // keep the same ID
      state.prompts[index] = promptInfo;
    },
    removePrompt: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index < 0 || index >= state.prompts.length) {
        console.error("Invalid index");
        return;
      }
      state.prompts.splice(index, 1);
    },
  },
});

// 为每个 case reducer 函数生成 Action creators
export const {
  addPrompt,
  updatePrompt,
  removePrompt,
} = promptsDataSlice.actions;

// Selectors
export const selectPromptList = (state: { promptsData: PromptsDataState }) => state.promptsData.prompts;

// 持久化配置
const promptsDataPersistConfig = {
  key: "promptsData",
  storage,
};

const persistedPromptsDataReducer = persistReducer(promptsDataPersistConfig, promptsDataSlice.reducer);
export default persistedPromptsDataReducer;
