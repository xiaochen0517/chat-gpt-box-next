import type {PromptsProps} from "@ant-design/x";
import {Prompts} from "@ant-design/x";
import {BulbOutlined, InfoCircleOutlined, RocketOutlined, SmileOutlined, WarningOutlined} from "@ant-design/icons";
import {App} from "antd";

const items: PromptsProps["items"] = [
  {
    key: "1",
    icon: <BulbOutlined style={{color: "#FFD700"}}/>,
    label: "标签",
    description: "测试问题？",
  },
  {
    key: "2",
    icon: <InfoCircleOutlined style={{color: "#1890FF"}}/>,
    label: "标签",
    description: "测试问题？",
  },
  {
    key: "3",
    icon: <RocketOutlined style={{color: "#722ED1"}}/>,
    label: "标签",
    description: "测试问题？",
  },
  {
    key: "4",
    icon: <SmileOutlined style={{color: "#52C41A"}}/>,
    label: "标签",
    description: "测试问题？",
  },
  {
    key: "5",
    icon: <WarningOutlined style={{color: "#FF4D4F"}}/>,
    label: "标签",
    description: "测试问题？",
  },
];

export function PromptsBox() {
  const {message} = App.useApp();

  return (
    <Prompts
      className="mb-6"
      title="✨ 快速开始一个新对话"
      wrap={true}
      items={items}
      onItemClick={(info) => {
        message.success(`You clicked a prompt: ${info.data.label}`);
      }}
    />
  );
}