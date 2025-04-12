import {Button, message, theme} from "antd";
import {DeleteOutlined, EditOutlined, PlusCircleOutlined, StopOutlined} from "@ant-design/icons";
import {Conversations, ConversationsProps} from "@ant-design/x";
import {useMemo} from "react";
import {ChatMenuButton} from "@/components/chat/list/ChatMenuButton.tsx";
import {useAppDispatch, useAppSelector} from "@/store/Hooks.ts";
import {selectChatList, selectCurrentChatId, setCurrentChatId} from "@/store/reducers/data/ChatDataSlice.ts";

export function ChatListBlock() {

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

  const dispatch = useAppDispatch();
  const currentChatId = useAppSelector(selectCurrentChatId);
  const chatList = useAppSelector(selectChatList);

  const conversationItems = useMemo(() => {
    return chatList.map((chat) => ({
      key: chat.id,
      label: chat.chatName,
    }));
  }, [chatList]);

  return (
    <div className="flex flex-col bg-white dark:bg-[#141414] border-r border-neutral-200 dark:border-neutral-800">
      <div className="px-3 pt-4">
        <Button
          type="primary"
          shape="round"
          icon={<PlusCircleOutlined/>}
          onClick={() => {
            dispatch(setCurrentChatId(""));
          }}
        >
          新对话
        </Button>
      </div>
      <Conversations
        className="flex-1"
        activeKey={currentChatId}
        onActiveChange={(chatId) => dispatch(setCurrentChatId(chatId))}
        items={conversationItems}
        style={style}
        menu={menuConfig}
      />
      <ChatMenuButton/>
    </div>
  );
}