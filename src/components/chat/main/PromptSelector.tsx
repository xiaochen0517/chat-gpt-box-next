import {Dropdown, List} from "antd";
import {DownOutlined} from "@ant-design/icons";
import {useAppSelector} from "@/store/Hooks.ts";
import {PromptInfo, selectPromptList} from "@/store/reducers/data/PromptsDataSlice.ts";
import {useState} from "react";

interface PromptSelectorProps {
  onPromptSelect?: (prompt: PromptInfo) => void;
}

export function PromptSelector({onPromptSelect}: PromptSelectorProps) {

  const promptList = useAppSelector(selectPromptList);
  const [currentPrompt, setCurrentPrompt] = useState<PromptInfo | null>(null);

  const handlePromptClick = (prompt: PromptInfo) => {
    if (onPromptSelect) {
      onPromptSelect(prompt);
    }
    setCurrentPrompt(prompt);
  };

  return (
    <Dropdown
      trigger={["click"]}
      dropdownRender={() => {
        return (
          <List
            className="w-full shadow-md border border-neutral-400 dark:border-neutral-800 rounded-md bg-neutral-100 dark:bg-neutral-900"
            itemLayout="horizontal"
            size="small"
            dataSource={promptList}
            renderItem={(prompt, _) => (
              <List.Item
                className="min-w-44 hover:cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800"
                onClick={() => handlePromptClick(prompt)}
              >
                <div className="flex gap-2 items-center">
                  <span>{prompt.promptName}</span>
                </div>
              </List.Item>
            )}
          />
        );
      }}
    >
      <div className="min-w-32 max-w-40 flex items-center justify-between shadow-md gap-2 hover:cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800 px-2 py-1 rounded-md">
        <div className="truncate">{currentPrompt?.promptName ?? "（未选择）"}</div>
        <DownOutlined className="text-xs"/>
      </div>
    </Dropdown>
  );
}