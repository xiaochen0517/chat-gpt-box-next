import {App, Form, Input, InputNumber, Modal, Select} from "antd";
import {ReactNode, useState} from "react";
import {ModelApiType, ModelCapabilitiesType, ModelInfo, ModelType} from "@/store/reducers/data/ModelsDataSlice.ts";
import {useAppDispatch} from "@/store/Hooks";

interface ModelEditorDialogProps {
  open: boolean;
  onClose: () => void;
}

type ModelTypeSelectDataType = {
  value: ModelType;
  label: ReactNode;
};

const ModelTypeSelectData: ModelTypeSelectDataType[] = [
  {value: "text-generation", label: <span>纯文本</span>},
  {value: "multimodality", label: <span>多模态</span>},
];

type ModelApiTypeSelectDataType = {
  value: ModelApiType;
  label: ReactNode;
}

const ModelApiTypeSelectData: ModelApiTypeSelectDataType[] = [
  {value: "openai", label: <span>OpenAI</span>},
  {value: "deepseek", label: <span>DeepSeek</span>},
  {value: "gemini", label: <span>Gemini</span>},
  {value: "ollama", label: <span>Ollama</span>},
  {value: "anthropic", label: <span>Anthropic</span>},
];

type ModelCapabilitiesSelectDataType = {
  value: ModelCapabilitiesType;
  label: ReactNode;
}

const ModelCapabilitiesSelectData: ModelCapabilitiesSelectDataType[] = [
  {value: "text", label: <span>文本</span>},
  {value: "img-out", label: <span>图像输出</span>},
  {value: "img-in", label: <span>图像输入</span>},
  {value: "audio-out", label: <span>音频输出</span>},
  {value: "audio-in", label: <span>音频输入</span>},
  {value: "video-out", label: <span>视频输出</span>},
  {value: "video-in", label: <span>视频输入</span>},
];

const baseUrlPrefixSelector = (
  <Select
    options={[
      {value: "https", label: <span>https://</span>},
      {value: "http", label: <span>http://</span>},
    ]}
    defaultValue="https"
  />
);

export function ModelEditorDialog({open, onClose}: ModelEditorDialogProps) {

  const {message} = App.useApp();
  const [form] = Form.useForm();

  const dispatch = useAppDispatch();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOkClick = () => {
    setConfirmLoading(true);
    form.validateFields()
      .then((values) => {
        try {
          console.log("values", values);
          dispatch({type: "modelsData/addModel", payload: values});
          onClose();
        } catch (error) {
          console.error("model editor form submit error", error);
        } finally {
          setConfirmLoading(false);
        }
      })
      .catch((error) => {
        console.error("model editor form validate error", error);
        message.info("请检查表单填写是否正确");
        setConfirmLoading(false);
      });
  };

  return (
    <Modal
      title="模型编辑"
      centered
      open={open}
      onOk={handleOkClick}
      onCancel={() => {
        onClose();
      }}
      okText="确定"
      cancelText="取消"
      maskClosable={false}
      width={600}
      confirmLoading={confirmLoading}
    >
      <div className="px-2 py-4">
        <Form form={form} layout="vertical" requiredMark="optional">
          <Form.Item<ModelInfo>
            name="apiType"
            label="接口类型"
            rules={[{required: true, message: "请选择模型Api类型"}]}
          >
            <Select options={ModelApiTypeSelectData}/>
          </Form.Item>
          <Form.Item<ModelInfo>
            name="modelName"
            label="模型名称"
            rules={[{required: true, min: 3, max: 20, message: "请输入模型名称，长度为 3-20。"}]}
          >
            <Input type="text" placeholder="请输入模型名称"/>
          </Form.Item>
          <Form.Item<ModelInfo>
            name="modelType"
            label="模型类型"
            tooltip="选择当前模型的类型（单选）"
            rules={[{required: true, message: "请选择当前模型的类型"}]}
          >
            <Select options={ModelTypeSelectData}/>
          </Form.Item>
          <Form.Item<ModelInfo>
            name="modelCapabilities"
            label="能力标签"
            tooltip="选择当前模型具有能力（多选）"
            rules={[{required: true, message: "请选择当前模型具有能力"}]}
          >
            <Select mode="multiple" options={ModelCapabilitiesSelectData}/>
          </Form.Item>
          <Form.Item<ModelInfo>
            name="contextWindowSize"
            label="上下文大小"
            tooltip="上下文大小是模型可以接收的token大小"
            normalize={(value) => (typeof value === "string" ? Number(value) : value)}
            rules={[{required: true, message: "请输入当前模型的上下文大小限制"}]}
          >
            <div className="w-48">
              <InputNumber addonAfter={<span>K</span>}/>
            </div>
          </Form.Item>
          <Form.Item<ModelInfo>
            name="baseUrl"
            label="请求地址"
            rules={[{required: true, message: "请输入当前模型的请求地址"}]}
          >
            <Input addonBefore={baseUrlPrefixSelector}/>
          </Form.Item>
          <Form.Item<ModelInfo> name="apiKey" label="ApiKey">
            <Input placeholder="请输入请求ApiKey"/>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}