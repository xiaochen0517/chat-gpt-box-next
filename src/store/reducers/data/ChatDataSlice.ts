import {createSlice, PayloadAction, Slice} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";
import {v4 as uuidv4} from "uuid";
import {CoreAssistantMessage, CoreSystemMessage, CoreToolMessage, CoreUserMessage, UIMessage} from "ai";
import {ModelInfo} from "@/store/reducers/data/ModelsDataSlice.ts";

export interface ChatInfo {
  "id": string,
  "chatName": string,
  "modelId": string, // 使用的模型id
  "promptContent": string, // 提示词内容
}

export type MessageListType =
  Array<CoreSystemMessage | CoreUserMessage | CoreAssistantMessage | CoreToolMessage>
  | Array<UIMessage>;

export interface ChatMessageInfo {
  messageList: MessageListType,
}

export interface ChatDetails {
  // key is chatId
  [key: string]: ChatMessageInfo;
}

export interface ChatDataState {
  "chatList": ChatInfo[],
  "chatDetails": ChatDetails,
}

const initialState: ChatDataState = {
  chatList: [],
  chatDetails: {},
};

export interface NewChatPayload {
  modelInfo: ModelInfo,
  promptContent: string,
  messageContent: MessageListType,
}

export const chatDataSlice: Slice<ChatDataState> = createSlice({
  name: "chatData",
  initialState,
  reducers: {
    addChat: (state, action: PayloadAction<ChatInfo>) => {
      if (!action.payload) {
        console.error("Invalid chatInfo");
        return;
      }
      // generate a unique ID for the new chat
      action.payload.id = uuidv4();
      state.chatList.push(action.payload);
      // 初始化 chatDetails
      state.chatDetails[action.payload.id] = {
        messageList: [],
      };
    },
    deleteChatById: (state, action: PayloadAction<string>) => {
      const chatId = action.payload;
      if (!chatId || chatId.length <= 0) {
        console.error("Invalid chatId");
        return;
      }
      // 查找 id 为 chatId 的聊天记录在 chatList 中的索引
      const chatIndex = state.chatList.findIndex((chat) => chat.id === chatId);
      if (chatIndex < 0) {
        console.error("Chat not found");
        return;
      }
      // 首先删除对应的 chatDetails 信息
      delete state.chatDetails[chatId];
      // 然后删除对应的 chatList 信息
      state.chatList.splice(chatIndex, 1);
    },
    newChat: (state, action: PayloadAction<NewChatPayload>) => {
      if (!action.payload) {
        console.error("Invalid newChat payload");
        return;
      }
      const {modelInfo, promptContent, messageContent} = action.payload;
      // generate a unique ID for the new chat
      const chatId = uuidv4();
      const chatInfo: ChatInfo = {
        id: chatId,
        chatName: modelInfo.modelName,
        modelId: modelInfo.id,
        promptContent: promptContent,
      };
      state.chatList.push(chatInfo);
      // 初始化 chatDetails
      state.chatDetails[chatId] = {
        messageList: messageContent,
      };
    },
    updateChatName: (state, action: PayloadAction<{ chatId: string, chatName: string }>) => {
      const {chatId, chatName} = action.payload;
      if (!chatId || chatId.length <= 0) {
        console.error("Invalid chatId");
        return;
      }
      // 查找 id 为 chatId 的聊天记录在 chatList 中的索引
      const chatIndex = state.chatList.findIndex((chat) => chat.id === chatId);
      if (chatIndex < 0) {
        console.error("Chat not found");
        return;
      }
      // 更新聊天名称
      state.chatList[chatIndex].chatName = chatName;
    },
  },
});

// 为每个 case reducer 函数生成 Action creators
export const {
  addChat,
  deleteChatById,
  newChat,
} = chatDataSlice.actions;

// Selectors
export const selectChatList = (state: { chatData: ChatDataState }) => state.chatData.chatList;

// 持久化配置
const chatDataPersistConfig = {
  key: "chatData",
  storage,
};

const persistedChatDataReducer = persistReducer(chatDataPersistConfig, chatDataSlice.reducer);
export default persistedChatDataReducer;
