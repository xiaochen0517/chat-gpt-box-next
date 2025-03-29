import {Dropdown, MenuProps} from "antd";
import {DownOutlined} from "@ant-design/icons";

export function ModelSelector() {

  const handleModelClick: MenuProps["onClick"] = (e) => {
    console.log("click", e);
  };

  return (
    <Dropdown
      menu={{onClick: handleModelClick}}
      trigger={["click"]}
      dropdownRender={() => {
        return (
          <div className="w-80 rounded py-1 px-2 bg-neutral-100 dark:bg-neutral-800">
            data
          </div>
        );
      }}
    >
      <div className="max-w-40 flex items-center gap-2 hover:cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800 px-2 py-1 rounded-md">
        <div className="truncate">Deepseek-R1 32B 量化版本</div>
        <DownOutlined className="text-xs"/>
      </div>
    </Dropdown>
  );
}