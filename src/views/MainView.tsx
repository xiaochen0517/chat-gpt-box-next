import {Conversations, ConversationsProps} from "@ant-design/x";
import {useState} from "react";
import {Button, Dropdown, GetProp, MenuProps, message, Space, theme} from "antd";
import {
  BulbFilled,
  BulbOutlined,
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  StopOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {useAppDispatch, useAppSelector} from "@/store/Hooks.ts";
import {selectDarkMode, switchDarkMode} from "@/store/reducers/AppSettingSlice.ts";
import {ChatInputBox} from "@/components/chat/ChatInputBox.tsx";
import {PromptsBox} from "@/components/chat/PromptsBox.tsx";

const items: GetProp<ConversationsProps, "items"> = Array.from({length: 3})
  .map((_, index) => ({
    key: `item${index + 1}`,
    label: `聊天 ${index + 1}`,
  }));

export function MainView() {
  const [activeKey, setActiveKey] = useState<string>("item1");

  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector(selectDarkMode);

  const {token} = theme.useToken();

  const style = {
    width: 256,
    background: token.colorBgContainer,
    borderRadius: token.borderRadius,
  };

  // 切换主题
  const toggleTheme = () => {
    dispatch(switchDarkMode(!isDarkMode));
  };

  const selectItems: MenuProps["items"] = [
    {
      label: "1st menu item",
      key: "1",
      icon: <UserOutlined/>,
    },
    {
      label: "2nd menu item",
      key: "2",
      icon: <UserOutlined/>,
    },
    {
      label: "3rd menu item",
      key: "3",
      icon: <UserOutlined/>,
      danger: true,
    },
    {
      label: "4rd menu item",
      key: "4",
      icon: <UserOutlined/>,
      danger: true,
      disabled: true,
    },
  ];

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    message.info("Click on menu item.");
    console.log("click", e);
  };

  const menuProps = {
    items: selectItems,
    onClick: handleMenuClick,
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
    <div className="flex h-full transition-colors duration-300">
      <div className="flex flex-col bg-white dark:bg-[#141414] border-r border-neutral-200 dark:border-neutral-800">
        <div>
          <Button
            type="text"
            icon={isDarkMode ? <BulbOutlined/> : <BulbFilled/>}
            onClick={toggleTheme}
            title={isDarkMode ? "切换到亮色模式" : "切换到暗色模式"}
          />
        </div>
        <Conversations
          activeKey={activeKey}
          onActiveChange={(v) => setActiveKey(v)}
          items={items}
          style={style}
          menu={menuConfig}
        />
      </div>
      <div className="flex flex-col p-2">
        <div className="flex gap-2">
          <Dropdown menu={menuProps}>
            <Button>
              <Space>
                Button
                <DownOutlined/>
              </Space>
            </Button>
          </Dropdown>
        </div>
        <div className="p-2 flex-1 flex flex-col gap-2 justify-center">
          {/*<div className="flex-1"/>*/}
          <PromptsBox/>
          <ChatInputBox/>
        </div>
      </div>
    </div>
  );
}