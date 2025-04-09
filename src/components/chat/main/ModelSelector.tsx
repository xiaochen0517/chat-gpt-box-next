import {Dropdown, List} from "antd";
import {ApiOutlined, DownOutlined} from "@ant-design/icons";
import {useAppSelector} from "@/store/Hooks.ts";
import {ModelInfo, selectModelList} from "@/store/reducers/data/ModelsDataSlice.ts";
import {getAiIconClassName} from "@/data/model/ModelInfoUtil.tsx";
import {useState} from "react";

interface ModelSelectorProps {
  onModelSelect?: (model: ModelInfo) => void;
}

export function ModelSelector({onModelSelect}: ModelSelectorProps) {

  const modelList = useAppSelector(selectModelList);
  const [currentModel, setCurrentModel] = useState<ModelInfo | null>(null);

  const handleModelClick = (model: ModelInfo) => {
    if (onModelSelect) {
      onModelSelect(model);
    }
    setCurrentModel(model);
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
            dataSource={modelList}
            renderItem={(model, _) => (
              <List.Item
                className="hover:cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800"
                onClick={() => handleModelClick(model)}
              >
                <div className="flex gap-2 items-center">
                  <i className={"text-base iconfont " + getAiIconClassName(model.apiType)}/>
                  <span>{model.modelName}</span>
                  {model.functionCall && <ApiOutlined style={{color: "#4D6BFE", fontSize: "1rem"}}/>}
                </div>
              </List.Item>
            )}
          />
        );
      }}
    >
      <div className="min-w-32 max-w-40 flex items-center justify-between gap-2 hover:cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800 px-2 py-1 rounded-md">
        {currentModel && <i className={"text-base iconfont " + getAiIconClassName(currentModel.apiType)}/>}
        <div className="truncate">{currentModel?.modelName ?? "（未选择）"}</div>
        <DownOutlined className="text-xs"/>
      </div>
    </Dropdown>
  );
}