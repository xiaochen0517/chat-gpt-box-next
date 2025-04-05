import {Button, List, Tag} from "antd";
import {PlusCircleOutlined} from "@ant-design/icons";
import {useAppSelector} from "@/store/Hooks.ts";
import {selectModelList} from "@/store/reducers/data/ModelsDataSlice.ts";
import {ModelEditorDialog} from "@/components/settings/pages/models/ModelEditorDialog.tsx";
import {useState} from "react";

export function ModelsPage() {

  const modelList = useAppSelector(selectModelList);
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4 items-start">
      <ModelEditorDialog
        open={open} onClose={() => setOpen(false)}
      />
      <Button type="primary" onClick={() => setOpen(true)}>
        <PlusCircleOutlined className="mr-2"/>
        添加模型
      </Button>
      <List
        className="w-full"
        itemLayout="horizontal"
        dataSource={modelList}
        renderItem={(model, index) => (
          <div className=" border-b dark:border-neutral-700" key={index}>
            <div className="px-4 py-2 flex hover:cursor-pointer hover:bg-neutral-300 dark:hover:bg-neutral-800 rounded-md">
              <div className="flex-1 flex flex-col gap-2">
                <div>{model.modelName}</div>
                <div>
                  {model.labels.map((label, idx) => (
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