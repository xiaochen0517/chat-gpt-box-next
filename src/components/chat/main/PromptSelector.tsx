import {Dropdown, MenuProps} from "antd";
import {DownOutlined} from "@ant-design/icons";

export function PromptSelector() {

  const handlePromptClick: MenuProps["onClick"] = (e) => {
    console.log("click", e);
  };

  return (
    <Dropdown
      menu={{onClick: handlePromptClick}}
      trigger={["click"]}
      dropdownRender={() => {
        return (
          <div className="w-72 rounded py-1 px-2 bg-neutral-100 dark:bg-neutral-800">
            data
          </div>
        );
      }}
    >
      <div className="max-w-40 flex items-center gap-2 hover:cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800 px-2 py-1 rounded-md">
        <div className="truncate">前端开发</div>
        <DownOutlined className="text-xs"/>
      </div>
    </Dropdown>
  );
}