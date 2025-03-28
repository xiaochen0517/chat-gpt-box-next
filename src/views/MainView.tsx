import {Conversations, ConversationsProps, Sender} from "@ant-design/x";
import {useState} from "react";
import {GetProp, theme, App, Flex, Button} from "antd";
import {BulbOutlined, BulbFilled} from "@ant-design/icons";

const items: GetProp<ConversationsProps, "items"> = Array.from({length: 3}).map((_, index) => ({
  key: `item${index + 1}`,
  label: `Conversation Item ${index + 1}`,
}));

export function MainView() {
  const [activeKey, setActiveKey] = useState<string>("item1");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  const {token} = theme.useToken();

  const style = {
    width: 256,
    background: token.colorBgContainer,
    borderRadius: token.borderRadius,
  };

  const [value, setValue] = useState<string>("Hello? this is X!");
  const [loading, setLoading] = useState<boolean>(false);

  const {message} = App.useApp();

  // 切换主题
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // 更新 body 背景色
    document.body.classList.toggle("dark", !isDarkMode);
  };

  return (
    <Flex className="h-full transition-colors duration-300" gap="middle">
      <Flex className="border-r border-neutral-200" vertical>
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
        />
      </Flex>
      <div className="h-full p-2 flex-1 flex flex-col justify-center">
        <Sender
          loading={loading}
          value={value}
          onChange={(v) => {
            setValue(v);
          }}
          onSubmit={() => {
            setValue("");
            setLoading(true);
            message.info("Send message!");
          }}
          onCancel={() => {
            setLoading(false);
            message.error("Cancel sending!");
          }}
        />
      </div>
    </Flex>
  );
}