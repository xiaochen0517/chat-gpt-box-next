import {Bubble} from "@ant-design/x";
import {CSSProperties, ReactNode} from "react";
import {SettingOutlined, UserOutlined} from "@ant-design/icons";
import {Image} from "antd";
import {useAppSelector} from "@/store/Hooks.ts";
import {
  MessageContentType,
  MessageRoleType,
  selectCurrentChatId,
  selectMessageList,
} from "@/store/reducers/data/ChatDataSlice.ts";
import {StrUtil} from "@/utils/StrUtil.ts";
import {renderMarkdown} from "@/components/chat/main/messages/RenderMarkdown.tsx";
import {selectDarkMode} from "@/store/reducers/AppSettingSlice.ts";

interface MessageComponentProps {
  index: number;
  isDarkMode: boolean;
  role: MessageRoleType;
  message: MessageContentType;
}

const fooAvatar: CSSProperties = {
  color: "#f56a00",
  backgroundColor: "#fde3cf",
};

const getMessageComponent = ({index, isDarkMode, role, message}: MessageComponentProps): ReactNode => {
  console.log("message: ", message);
  console.log("type", typeof message === "string");

  if (!message) {
    return <div>none error</div>;
  }

  const placement = role === "user" ? "end" : "start";
  const avatar = role === "user" ? (<UserOutlined/>) : (<SettingOutlined/>);

  if (message instanceof Array) {
    // 消息是列表则递归解析
    return message.map((item, innerIndex) => {
      return getMessageComponent({index: parseInt(`${index}${innerIndex}`), isDarkMode, role, message: item});
    });
  } else if (typeof message === "string") {
    // 消息内容为字符串，直接返回
    return <Bubble
      key={index}
      placement={placement}
      content={message}
      messageRender={content => renderMarkdown(content, isDarkMode)}
      avatar={{icon: avatar, style: fooAvatar}}
    />;
  }

  if (message.type === "text") {
    return <Bubble
      key={index}
      placement={placement}
      content={message.text}
      messageRender={content => renderMarkdown(content, isDarkMode)}
      avatar={{icon: avatar, style: fooAvatar}}
    />;
  } else if (message.type === "image") {
    console.log("image content", message);
    return <div key={index} className={"w-full px-12 flex " + (role === "user" ? "justify-end" : "justify-start")}>
      <Image width={120} src={message.image as string}/>
    </div>;
  } else {
    return <div>不支持的类型</div>;
  }
};

export function ChatMessagesBlock() {

  const currentChatId = useAppSelector(selectCurrentChatId);

  if (StrUtil.isNullOrBlank(currentChatId)) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-gray-500">请先选择一个聊天</div>
      </div>
    );
  }

  const messageList = useAppSelector(
    (state) => {
      // @ts-ignore
      return selectMessageList(state, currentChatId);
    },
  );

  const isDarkMode = useAppSelector(selectDarkMode);

  return (
    <div className="relative flex-1 flex flex-col gap-2">
      <div className="absolute left-0 right-0 top-0 bottom-0 overflow-y-auto">
        <div className="px-6 py-4 flex flex-col gap-4">
          {messageList.map((message, index) => (
            getMessageComponent({index, isDarkMode, role: message.role, message: message.content as MessageContentType})
          ))}
        </div>
      </div>
    </div>
  );
}