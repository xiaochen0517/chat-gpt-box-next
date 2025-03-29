import {GetProp, message, theme} from "antd";
import {DeleteOutlined, EditOutlined, StopOutlined} from "@ant-design/icons";
import {Conversations, ConversationsProps} from "@ant-design/x";
import {useState} from "react";
import {ChatMenuButton} from "@/components/chat/list/ChatMenuButton.tsx";


const items: GetProp<ConversationsProps, "items"> = Array.from({length: 3})
  .map((_, index) => ({
    key: `item${index + 1}`,
    label: `聊天 ${index + 1}`,
  }));

export function ChatListBlock() {
  const [activeKey, setActiveKey] = useState<string>("item1");

  const {token} = theme.useToken();

  const style = {
    width: 256,
    background: token.colorBgContainer,
    borderRadius: token.borderRadius,
  };
  const menuConfig: ConversationsProps["menu"] = (conversation) => ({
    items: [
      {
        label: "Operation 1",
        key: "operation1",
        icon: <EditOutlined/>,
      },
      {
        label: "Operation 2",
        key: "operation2",
        icon: <StopOutlined/>,
        disabled: true,
      },
      {
        label: "Operation 3",
        key: "operation3",
        icon: <DeleteOutlined/>,
        danger: true,
      },
    ],
    onClick: (menuInfo) => {
      menuInfo.domEvent.stopPropagation();
      message.info(`Click ${conversation.key} - ${menuInfo.key}`);
    },
  });

  return (
    <div className="flex flex-col bg-white dark:bg-[#141414] border-r border-neutral-200 dark:border-neutral-800">
      <Conversations
        className="flex-1"
        activeKey={activeKey}
        onActiveChange={(v) => setActiveKey(v)}
        items={items}
        style={style}
        menu={menuConfig}
      />
      <ChatMenuButton/>
    </div>
  );
}