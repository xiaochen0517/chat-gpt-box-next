import {Attachments, Sender} from "@ant-design/x";
import {useRef, useState} from "react";
import {App, Button, Divider} from "antd";
import {ModelSelector} from "@/components/chat/main/selector/ModelSelector.tsx";
import {PromptSelector} from "@/components/chat/main/selector/PromptSelector.tsx";
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
import {CloudUploadOutlined, LinkOutlined} from "@ant-design/icons";
import {UploadChangeParam} from "antd/es/upload/interface";
import {Attachment} from "@ant-design/x/es/attachments";
import {ImagePart, UserContent} from "ai";

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
    let userContent: UserContent = inputTextContent;
    if (imgBase64List && imgBase64List.length > 0) {
      userContent = [
        {
          type: "text",
          text: inputTextContent,
        },
        ...imgBase64List.map((item) => {
          return {
            type: "image",
            image: item.base64,
          } as ImagePart;
        }),
      ];
    }
    dispatch(sendMessage({chatId: chatId, userContent: userContent}));
    setInputTextContent("");
    setImgBase64List([]);
    setImgFileList([]);
  };

  const divRef = useRef<HTMLDivElement>(null);

  type ImageBase64 = {
    id: string;
    base64: string;
  }

  const [imgBase64List, setImgBase64List] = useState<ImageBase64[]>([]);

  const [imgFileList, setImgFileList] = useState<UploadChangeParam["fileList"]>([]);

  const handleFileUpload = ({file, fileList}: UploadChangeParam) => {
    console.log("file upload: ", file);
    // 读取文件内容，并转换为base64
    const reader = new FileReader();
    setImgFileList(fileList);

    reader.onerror = () => {
      message.error("Failed to read image file");
    };

    reader.onload = () => {
      if (reader.result) {
        const base64String = reader.result.toString();
        console.log("Image base64:", base64String);
        // Handle the base64 image string here
        setImgBase64List([...imgBase64List, {
          id: file.uid,
          base64: base64String,
        }]);
      }
    };

    if (file instanceof File) {
      if (!file.type.startsWith("image/")) {
        message.error("Please upload an image file");
        return;
      }
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = (item: Attachment) => {
    const newImgBase64List = imgBase64List.filter((file) => file.id !== item.uid);
    setImgBase64List(newImgBase64List);
    const newImgFileList = imgFileList.filter((file) => file.uid !== item.uid);
    setImgFileList(newImgFileList);
  };

  return (
    <div className={"py-2 flex flex-col gap-2"} ref={divRef}>
      <div className={"flex flex-wrap gap-2"}>
        {imgFileList.map((file, index) => (
          <Attachments.FileCard
            // className={"rounded-md overflow-hidden"}
            style={{width: "6rem", height: "6rem"}}
            key={index}
            item={file}
            imageProps={{width: "100%", height: "100%"}}
            onRemove={handleImageRemove}
          />
        ))}
      </div>
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
                <Attachments
                  items={imgFileList}
                  beforeUpload={() => false}
                  onChange={handleFileUpload}
                  getDropContainer={() => divRef.current}
                  placeholder={{
                    icon: <CloudUploadOutlined/>,
                    title: "拖拽文件到此处上传",
                    description: "支持文件类型：图片",
                  }}
                >
                  <Button type="text" icon={<LinkOutlined/>}/>
                </Attachments>
                <Divider type="vertical"/>
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