import {Bubble} from "@ant-design/x";
import {CSSProperties} from "react";
import {SettingOutlined, UserOutlined} from "@ant-design/icons";
import {useAppSelector} from "@/store/Hooks.ts";
import {selectCurrentChatId, selectMessageList} from "@/store/reducers/data/ChatDataSlice.ts";
import {StrUtil} from "@/utils/StrUtil.ts";

export function ChatMessagesBlock() {

  const fooAvatar: CSSProperties = {
    color: "#f56a00",
    backgroundColor: "#fde3cf",
  };

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

  return (
    <div className="relative flex-1 flex flex-col gap-2">
      <div className="absolute left-0 right-0 top-0 bottom-0 overflow-y-auto">
        <div className="px-2 flex flex-col gap-4">
          {messageList.map((message, index) => (
            <Bubble
              key={index}
              placement={message.role === "user" ? "end" : "start"}
              content={message.content}
              avatar={{icon: message.role === "user" ? (<UserOutlined/>) : (<SettingOutlined/>), style: fooAvatar}}
            />
          ))}
        </div>
      </div>
    </div>
  );
}