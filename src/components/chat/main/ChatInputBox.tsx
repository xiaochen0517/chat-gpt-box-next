import {Sender} from "@ant-design/x";
import {useState} from "react";
import {Button, Divider, theme} from "antd";
import {ApiOutlined} from "@ant-design/icons";
import {ModelSelector} from "@/components/chat/main/ModelSelector.tsx";
import {PromptSelector} from "@/components/chat/main/PromptSelector.tsx";
import {useAppDispatch, useAppSelector} from "@/store/Hooks.ts";
import {selectCurrentChatId, setCurrentChatId} from "@/store/reducers/AppSettingSlice.ts";
import {StrUtil} from "@/utils/StrUtil.ts";

export function ChatInputBox() {

  const {token} = theme.useToken();

  const dispatch = useAppDispatch();
  const currentChatId = useAppSelector(selectCurrentChatId);
  const hasChatId = StrUtil.isNotBlank(currentChatId);

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
        autoSize={{minRows: 2, maxRows: 4}}
        placeholder="Press Enter to send message"
        footer={({components}) => {
          const {SendButton, LoadingButton, SpeechButton} = components;
          return (
            <div className="flex justify-between">
              <div className="flex gap-2">
                {!hasChatId && (
                  <>
                    <ModelSelector/>
                    <PromptSelector/>
                  </>
                )}
              </div>
              <div className="flex items-center">
                <Button
                  type="text"
                  style={iconStyle}
                  icon={<ApiOutlined/>}
                  onClick={() => {
                    const newChatId = hasChatId ? "" : "test";
                    dispatch(setCurrentChatId(newChatId));
                  }}
                />
                <Button type="text" style={iconStyle} icon={<ApiOutlined/>}/>
                <Divider type="vertical"/>
                <SpeechButton style={iconStyle}/>
                <Divider type="vertical"/>
                {loading ? (
                  <LoadingButton type="default"/>
                ) : (
                  <SendButton type="primary" disabled={false}/>
                )}
              </div>
            </div>
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