import {App, Dropdown, MenuProps} from "antd";
import {DownOutlined} from "@ant-design/icons";
import {useAppDispatch, useAppSelector} from "@/store/Hooks.ts";
import {selectDarkMode} from "@/store/reducers/AppSettingSlice.ts";

const chatMenuItems: MenuProps["items"] = [
  {
    key: "manage",
    type: "group",
    label: "功能管理",
    children: [
      {
        key: "manage_models",
        label: "模型管理",
      },
      {
        key: "manage_prompts",
        label: "提示词管理",
      },
    ],
  },
  {
    key: "basic_settings",
    type: "group",
    label: "设置",
    children: [
      {
        key: "basic_settings_basic",
        label: "基础设置",
      },
      {
        key: "basic_settings_language",
        label: "语言设置",
      },
      {
        key: "basic_settings_ui_mode",
        label: "深色模式",
        children: [
          {
            key: "basic_settings_ui_mode_dark",
            label: "深色模式",
          },
          {
            key: "basic_settings_ui_mode_light",
            label: "浅色模式",
          },
        ],
      },
    ],
  },
];

export function ChatMenuButton() {

  const {message} = App.useApp();

  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector(selectDarkMode);

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    console.log("click", e);
    switch (e.key) {
      case "manage_models":
        dispatch({type: "settingsPage/openDrawer", payload: "models"});
        break;
      case "manage_prompts":
        dispatch({type: "settingsPage/openDrawer", payload: "prompts"});
        break;
      case "basic_settings_basic":
        dispatch({type: "settingsPage/openDrawer", payload: "settings"});
        break;
      case "basic_settings_ui_mode_dark":
        if (!isDarkMode) {
          dispatch({type: "appSetting/switchDarkMode", payload: true});
          message.info("已切换到深色模式");
        }
        break;
      case "basic_settings_ui_mode_light":
        if (isDarkMode) {
          dispatch({type: "appSetting/switchDarkMode", payload: false});
          message.info("已切换到浅色模式");
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="p-2">
      <Dropdown menu={{items: chatMenuItems, onClick: handleMenuClick}} trigger={["click"]} placement="top">
        <div className="w-full flex items-center hover:cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800 px-4 py-2 rounded-md">
          <div className="flex-1 flex flex-col gap-0.5">
            <span className="">ChatGPTBox</span>
            <span className="text-xs text-neutral-600 dark:text-neutral-400">sub title</span>
          </div>
          <DownOutlined className="text-xs"/>
        </div>
      </Dropdown>
    </div>
  );
}