import {createAsyncThunk, createSlice, PayloadAction, Slice} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";
import {CoreAssistantMessage, CoreSystemMessage, CoreToolMessage, CoreUserMessage, UIMessage} from "ai";
import {ModelInfo, ModelsDataState, selectModelById} from "@/store/reducers/data/ModelsDataSlice.ts";
import {MsgUtil} from "@/utils/MsgUtil.ts";
import {v4 as uuidv4} from "uuid";
import {ModelService} from "@/service/ModelService.ts";

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
  // 当前聊天正在生成中
  generating?: boolean,
  messageList: MessageListType,
}

export interface ChatDetails {
  // key is chatId
  [key: string]: ChatMessageInfo;
}

export interface ChatDataState {
  currentChatId: string,
  chatList: ChatInfo[],
  chatDetails: ChatDetails,
}

const initialState: ChatDataState = {
  currentChatId: "",
  chatList: [],
  chatDetails: {},
};

export interface NewChatPayload {
  chatId: string,
  modelInfo: ModelInfo,
  promptContent: string,
}

export const chatDataSlice: Slice<ChatDataState> = createSlice({
  name: "chatData",
  initialState,
  reducers: {
    setCurrentChatId: (state, action: PayloadAction<string>) => {
      state.currentChatId = action.payload;
    },
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
      const {chatId, modelInfo, promptContent} = action.payload;
      const chatInfo: ChatInfo = {
        id: chatId,
        chatName: modelInfo.modelName,
        modelId: modelInfo.id,
        promptContent: promptContent,
      };
      state.chatList.push(chatInfo);
      // 初始化 chatDetails
      // @ts-ignore
      state.chatDetails[chatId] = {
        generating: false,
        // @ts-ignore
        messageList: [MsgUtil.createSystemMessage(promptContent)],
      };
      // 更新当前聊天记录 ID
      state.currentChatId = chatId;
    },
    addUserMessage: (state, action: PayloadAction<{ chatId: string, message: CoreUserMessage }>) => {
      const {chatId, message} = action.payload;
      if (!chatId || chatId.length <= 0 || !state.chatDetails[chatId]) {
        console.error("Invalid chatId");
        return;
      }
      const messageList = state.chatDetails[chatId].messageList;
      // 添加用户消息
      // @ts-ignore
      messageList.push(message);
    },
    updateChatGenerateStatus: (state, action: PayloadAction<{ chatId: string, generating: boolean }>) => {
      const {chatId, generating} = action.payload;
      if (!chatId || chatId.length <= 0 || !state.chatDetails[chatId]) {
        console.error("Invalid chatId");
        return;
      }
      state.chatDetails[chatId].generating = generating;
    },
    updateAssistantMessage: (state, action: PayloadAction<{ chatId: string, content: string }>) => {
      const {chatId, content} = action.payload;
      if (!chatId || !state.chatDetails[chatId]) {
        console.error("无效的聊天ID");
        return;
      }

      const messageList = state.chatDetails[chatId].messageList;

      if (messageList[messageList.length - 1].role !== "assistant") {
        // @ts-ignore
        messageList.push({
          role: "assistant",
          content: "",
        });
      }
      // 替换最后一条消息
      messageList[messageList.length - 1].content += content;
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

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async ({chatId, userContent}: {
    chatId: string,
    userContent: string,
  }, {dispatch, getState}) => {
    // 获取信息
    const chatInfo = selectChatInfoById(getState() as { chatData: ChatDataState; }, chatId);
    const modelInfo = selectModelById(getState() as { modelsData: ModelsDataState; }, chatInfo?.modelId || "");
    if (!chatInfo || !modelInfo) {
      console.error("Invalid chatInfo or modelInfo");
      return false;
    }
    // 将状态设置为正在生成
    dispatch(updateChatGenerateStatus({chatId, generating: true}));
    // 将用户的消息添加到消息列表中
    const userMessage = MsgUtil.createUserMessage(userContent);
    dispatch(addUserMessage({chatId, message: userMessage}));
    // 获取消息列表
    const messages = selectMessageList(getState() as { chatData: ChatDataState; }, chatId);
    // 发送消息
    await ModelService.sendMessage(
      modelInfo,
      messages,
      (message: string) => {
        // 分发 action 来更新消息
        dispatch(updateAssistantMessage({
          chatId,
          content: message,
        }));
      },
    ).finally(() => {
      // 发送完成后更新状态
      dispatch(updateChatGenerateStatus({chatId, generating: false}));
    });
    return true;
  },
);

// 为每个 case reducer 函数生成 Action creators
export const {
  setCurrentChatId,
  addChat,
  deleteChatById,
  newChat,
  addUserMessage,
  updateChatGenerateStatus,
  updateAssistantMessage,
  updateChatName,
} = chatDataSlice.actions;

// Selectors
export const selectCurrentChatId = (state: { chatData: ChatDataState }) => state.chatData.currentChatId;
export const selectChatList = (state: { chatData: ChatDataState }) => state.chatData.chatList;
export const selectChatInfoById = (state: { chatData: ChatDataState }, chatId: string) => {
  return state.chatData.chatList.find((chat) => chat.id === chatId);
};
export const selectMessageList = (state: { chatData: ChatDataState }, chatId: string) => {
  const chatDetails = state.chatData.chatDetails;
  if (!chatDetails || !chatDetails[chatId]) {
    return [];
  }
  return chatDetails[chatId].messageList || [];
};
export const selectGenerateStatusById = (state: { chatData: ChatDataState }, chatId: string) => {
  const chatDetails = state.chatData.chatDetails;
  if (!chatId || !chatDetails || !chatDetails[chatId]) {
    return false;
  }
  return chatDetails[chatId].generating || false;
};

// 持久化配置
const chatDataPersistConfig = {
  key: "chatData",
  storage,
};

const persistedChatDataReducer = persistReducer(chatDataPersistConfig, chatDataSlice.reducer);
export default persistedChatDataReducer;
