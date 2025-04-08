import {App, Button, List, Popconfirm, Tag} from "antd";
import {PlusCircleOutlined} from "@ant-design/icons";
import {useAppDispatch, useAppSelector} from "@/store/Hooks.ts";
import {removeModel, selectModelList} from "@/store/reducers/data/ModelsDataSlice.ts";
import {ModelEditorDialog} from "@/components/settings/pages/models/ModelEditorDialog.tsx";
import {useState} from "react";
import {getAiIconClassName} from "@/data/model/ModelInfoUtil.tsx";

const ModelCapabilitiesData = {
  "text": "文本生成",
  "img-out": "图像输出",
  "img-in": "图像输入",
  "audio-out": "音频输出",
  "audio-in": "音频输入",
  "video-out": "视频输出",
  "video-in": "视频输入",
};

export function ModelsPage() {

  const {message} = App.useApp();
  const dispatch = useAppDispatch();
  const modelList = useAppSelector(selectModelList);
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleEditorDialogClose = () => {
    setOpen(false);
    setEditIndex(null);
  };

  const handleEditModelClick = (index: number) => {
    setEditIndex(index);
    setOpen(true);
  };

  const handleDeleteModelClick = (index: number) => {
    dispatch(removeModel(index));
    message.success("模型成功删除");
  };

  return (
    <div className="flex flex-col gap-4 items-start">
      <ModelEditorDialog open={open} editIndex={editIndex} onClose={handleEditorDialogClose}/>
      <Button type="primary" onClick={() => setOpen(true)}>
        <PlusCircleOutlined className="mr-2"/>
        添加模型
      </Button>
      <List
        className="w-full"
        itemLayout="horizontal"
        size="small"
        dataSource={modelList}
        renderItem={(model, index) => (
          <div className="mb-2 border-b border-neutral-200 dark:border-neutral-700" key={index}>
            <div className="px-2 py-1 flex hover:cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-md">
              <div className="flex-1 flex flex-col gap-2">
                <div className="flex flex-row items-center gap-2">
                  <i className={"text-3xl iconfont " + getAiIconClassName(model.apiType)}/>
                  <span className="text-base">{model.modelName}</span>
                </div>
                <div>
                  {model.modelCapabilities.map((label, idx) => (
                    <Tag key={idx} color="blue">
                      {ModelCapabilitiesData[label]}
                    </Tag>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <Button type="primary" onClick={() => handleEditModelClick(index)}>
                  修改
                </Button>
                <Popconfirm
                  title="删除模型"
                  description="确定要删除该模型吗？"
                  onConfirm={() => handleDeleteModelClick(index)}
                  okText="确认"
                  cancelText="取消"
                >
                  <Button type="primary" danger>
                    移除
                  </Button>
                </Popconfirm>
              </div>
            </div>
          </div>
        )}
      />
    </div>
  );
}