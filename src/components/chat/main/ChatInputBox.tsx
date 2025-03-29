import {Sender} from "@ant-design/x";
import {useState} from "react";
import {Button, Divider, Flex, theme} from "antd";
import {ApiOutlined} from "@ant-design/icons";
import {ModelSelector} from "@/components/chat/main/ModelSelector.tsx";
import {PromptSelector} from "@/components/chat/main/PromptSelector.tsx";

export function ChatInputBox() {

  const {token} = theme.useToken();
  const [value, setValue] = useState<string>("Hello? this is X!");
  const [loading, setLoading] = useState<boolean>(false);

  const iconStyle = {
    fontSize: 18,
    color: token.colorText,
  };

  return (
    <div>
      <Sender
        value={value}
        onChange={setValue}
        autoSize={{minRows: 2, maxRows: 6}}
        placeholder="Press Enter to send message"
        footer={({components}) => {
          const {SendButton, LoadingButton, SpeechButton} = components;
          return (
            <Flex justify="space-between" align="center">
              <Flex gap="small" align="center">
                <ModelSelector/>
                <PromptSelector/>
              </Flex>
              <Flex align="center">
                <Button type="text" style={iconStyle} icon={<ApiOutlined/>}/>
                <Divider type="vertical"/>
                <SpeechButton style={iconStyle}/>
                <Divider type="vertical"/>
                {loading ? (
                  <LoadingButton type="default"/>
                ) : (
                  <SendButton type="primary" disabled={false}/>
                )}
              </Flex>
            </Flex>
          );
        }}
        onSubmit={() => {
          setLoading(true);
        }}
        onCancel={() => {
          setLoading(false);
        }}
        actions={false}
      />
    </div>
  );
}