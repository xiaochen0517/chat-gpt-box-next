import {App, Form, Input, Modal} from "antd";
import {addPrompt, PromptInfo, selectPromptList, updatePrompt} from "@/store/reducers/data/PromptsDataSlice.ts";
import {useAppDispatch, useAppSelector} from "@/store/Hooks.ts";
import {useEffect, useState} from "react";
import _ from "lodash";


interface PromptEditorDialogProps {
  open: boolean;
  editIndex: number | null;
  onClose: () => void;
}

export function PromptEditorDialog({open, editIndex, onClose}: PromptEditorDialogProps) {

  const {message} = App.useApp();
  const [form] = Form.useForm();

  const dispatch = useAppDispatch();
  const promptList = useAppSelector(selectPromptList);
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    if (editIndex !== null && editIndex >= 0 && open) {
      let promptInfo: PromptInfo = _.cloneDeep(promptList[editIndex]);
      form?.setFieldsValue(promptInfo);
    }
  }, [open]);

  const callDialogClose = () => {
    console.log("callDialogClose");
    form?.resetFields();
    onClose();
  };

  const handleOkClick = () => {
    setConfirmLoading(true);
    form.validateFields()
      .then((values) => {
        try {
          console.log("values", values);
          if (editIndex !== null && editIndex >= 0) {
            dispatch(updatePrompt({index: editIndex, promptInfo: values}));
          } else {
            dispatch(addPrompt(values));
          }
          callDialogClose();
        } catch (error) {
          console.error("prompt editor form submit error", error);
        } finally {
          setConfirmLoading(false);
        }
      })
      .catch((error) => {
        console.error("prompt editor form validate error", error);
        message.info("请检查表单填写是否正确");
        setConfirmLoading(false);
      });
  };

  return (
    <Modal
      title="提示词编辑"
      centered
      open={open}
      okText="确定"
      cancelText="取消"
      maskClosable={false}
      width={600}
      confirmLoading={confirmLoading}
      onOk={handleOkClick}
      onCancel={callDialogClose}
    >
      <div className="px-2 py-4">
        <Form form={form} layout="vertical" requiredMark="optional">
          <Form.Item<PromptInfo>
            name="promptName"
            label="提示词名称"
            rules={[{required: true, message: "请输入提示词名称"}]}
          >
            <Input type="text" placeholder="请输入提示词名称"/>
          </Form.Item>
          <Form.Item<PromptInfo>
            name="promptContent"
            label="提示词内容"
            rules={[{required: true, message: "请输入提示词内容"}]}
          >
            <Input.TextArea autoSize={{minRows: 5, maxRows: 10}} placeholder="请输入提示词内容"/>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}