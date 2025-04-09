import {App, Button, List, Popconfirm} from "antd";
import {PlusCircleOutlined} from "@ant-design/icons";
import {PromptEditorDialog} from "@/components/settings/pages/prompt/PromptEditorDialog.tsx";
import {useState} from "react";
import {useAppDispatch, useAppSelector} from "@/store/Hooks.ts";
import {removePrompt, selectPromptList} from "@/store/reducers/data/PromptsDataSlice.ts";

export function PromptsPage() {

  const {message} = App.useApp();
  const dispatch = useAppDispatch();
  const promptList = useAppSelector(selectPromptList);
  const [editorDialogOpen, setEditorDialogOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleEditorDialogClose = () => {
    setEditorDialogOpen(false);
    setEditIndex(null);
  };
  const handleEditModelClick = (index: number) => {
    setEditIndex(index);
    setEditorDialogOpen(true);
  };

  const handleDeleteModelClick = (index: number) => {
    dispatch(removePrompt(index));
    message.success("提示词成功删除");
  };

  return (
    <div className="flex flex-col gap-4 items-start">
      <PromptEditorDialog open={editorDialogOpen} editIndex={editIndex} onClose={handleEditorDialogClose}/>
      <Button
        type="primary"
        onClick={() => {
          setEditorDialogOpen(true);
        }}
      >
        <PlusCircleOutlined className="mr-2"/>
        添加提示词
      </Button>
      <List
        className="w-full"
        itemLayout="horizontal"
        dataSource={promptList}
        renderItem={(item, index) => (
          <div className="mb-2 border-b border-neutral-200 dark:border-neutral-700" key={index}>
            <div className="px-2 py-1 flex hover:cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-md">
              <div className="flex-1 flex flex-col gap-2">
                <div>{item.promptName}</div>
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