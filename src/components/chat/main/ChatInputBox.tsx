import {Sender} from "@ant-design/x";
import {useState} from "react";
import {App} from "antd";
import {ModelSelector} from "@/components/chat/main/ModelSelector.tsx";
import {PromptSelector} from "@/components/chat/main/PromptSelector.tsx";
import {useAppDispatch, useAppSelector} from "@/store/Hooks.ts";
import {StrUtil} from "@/utils/StrUtil.ts";
import {
  newChat,
  NewChatPayload,
  selectCurrentChatId,
  selectGenerateStatusById,
  sendMessage,
} from "@/store/reducers/data/ChatDataSlice.ts";
import {ModelInfo} from "@/store/reducers/data/ModelsDataSlice.ts";
import {v4 as uuidv4} from "uuid";

export function ChatInputBox() {

  const {message} = App.useApp();

  const dispatch = useAppDispatch();
  const currentChatId = useAppSelector(selectCurrentChatId);
  const generating = useAppSelector((state) => selectGenerateStatusById(state, currentChatId));
  const hasChatId = StrUtil.isNotBlank(currentChatId);

  const [inputTextContent, setInputTextContent] = useState<string>("");

  const [selectedModel, setSelectedModel] = useState<ModelInfo | null>(null);
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);

  // const iconStyle = {
  //   fontSize: 18,
  //   color: token.colorText,
  // };

  const handleMessageSendClick = async () => {
    if (StrUtil.isNullOrBlank(inputTextContent)) {
      message.info("请输入消息");
      return;
    }
    // dispatch(sendMessage(inputTextContent));
    console.log("send message: ", inputTextContent);
    let chatId = currentChatId;
    if (StrUtil.isNullOrBlank(currentChatId)) {
      if (!selectedModel) {
        message.info("请选择模型");
        return;
      }
      if (StrUtil.isNullOrBlank(selectedPrompt)) {
        message.info("请选择提示词");
        return;
      }
      // 创建一个新的聊天
      chatId = uuidv4();
      dispatch(newChat({
        chatId,
        modelInfo: selectedModel,
        promptContent: selectedPrompt,
      } as NewChatPayload));
    }
    dispatch(sendMessage({chatId: chatId, userContent: inputTextContent}));
    setInputTextContent("");
  };

  return (
    <div>
      <Sender
        value={inputTextContent}
        onChange={setInputTextContent}
        autoSize={{minRows: 2, maxRows: 4}}
        placeholder="Press Enter to send message"
        footer={({components}) => {
          const {SendButton, LoadingButton} = components;
          return (
            <div className="flex justify-between">
              <div className="flex gap-2">
                {!hasChatId && (
                  <>
                    <ModelSelector onModelSelect={setSelectedModel}/>
                    <PromptSelector onPromptSelect={(prompt) => setSelectedPrompt(prompt.promptContent)}/>
                  </>
                )}
              </div>
              <div className="flex items-center">
                {/*<Button type="text" style={iconStyle} icon={<ApiOutlined/>}/>*/}
                {/*<Divider type="vertical"/>*/}
                {/*<SpeechButton style={iconStyle}/>*/}
                {/*<Divider type="vertical"/>*/}
                {generating ? (
                  <LoadingButton type="default"/>
                ) : (
                  <SendButton type="primary"/>
                )}
              </div>
            </div>
          );
        }}
        onSubmit={handleMessageSendClick}
        onCancel={() => {
          message.info("<UNK>");
        }}
        actions={false}
      />
    </div>
  );
}