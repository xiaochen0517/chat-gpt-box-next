import {Button, List, Tag} from "antd";
import {PlusCircleOutlined} from "@ant-design/icons";

export function PromptsPage() {

  const data = [
    {
      title: "前端开发助手",
      labels: ["默认", "快速"],
    },
    {
      title: "后端开发助手",
      labels: ["默认", "思考"],
    },
    {
      title: "英语学习助手",
      labels: ["<UNK>", "<UNK>"],
    },
    {
      title: "中文学习助手",
      labels: ["<UNK>", "<UNK>"],
    },
  ];

  return (
    <div className="flex flex-col gap-4 items-start">
      <Button type="primary">
        <PlusCircleOutlined className="mr-2"/>
        添加提示词
      </Button>
      <List
        className="w-full"
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, _) => (
          <div className=" border-b dark:border-neutral-700">
            <div className="px-4 py-2 flex hover:cursor-pointer hover:bg-neutral-300 dark:hover:bg-neutral-800 rounded-md">
              <div className="flex-1 flex flex-col gap-2">
                <div>{item.title}</div>
                <div>
                  {item.labels.map((label, idx) => (
                    <Tag key={idx} color="blue">
                      {label}
                    </Tag>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <Button type="primary">
                  修改
                </Button>
                <Button type="primary" danger>
                  移除
                </Button>
              </div>
            </div>
          </div>
        )}
      />
    </div>
  );
}