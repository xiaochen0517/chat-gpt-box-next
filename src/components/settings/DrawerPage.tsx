import {Drawer} from "antd";
import {SettingsPage} from "@/components/settings/pages/SettingsPage.tsx";
import {useAppDispatch, useAppSelector} from "@/store/Hooks.ts";
import {selectCurrentPage, selectDrawerOpen} from "@/store/reducers/SettingsPageSlice.ts";
import {ModelsPage} from "@/components/settings/pages/ModelsPage.tsx";
import {McpPage} from "@/components/settings/pages/McpPage.tsx";
import {PromptsPage} from "@/components/settings/pages/PromptsPage.tsx";

export function DrawerPage() {

  const dispatch = useAppDispatch();
  const drawerOpen = useAppSelector(selectDrawerOpen);
  const currentPage = useAppSelector(selectCurrentPage);

  const title = () => {
    switch (currentPage) {
      case "settings":
        return "设置";
      case "about":
        return "关于";
      case "models":
        return "模型管理";
      case "mcp":
        return "MCP 服务管理";
      case "prompts":
        return "提示词管理";
      default:
        return "未知页面";
    }
  };

  const onClose = () => {
    dispatch({type: "settingsPage/closeDrawer"});
  };

  // 渲染当前页面内容
  const renderCurrentPage = () => {
    switch (currentPage) {
      case "settings":
        return <SettingsPage/>;
      case "about":
        return <div>About</div>;
      case "models":
        return <ModelsPage/>;
      case "mcp":
        return <McpPage/>;
      case "prompts":
        return <PromptsPage/>;
      default:
        return <div>Unknown Page</div>;
    }
  };

  return (
    <Drawer
      title={title()}
      placement="bottom"
      height={"100vh"}
      onClose={onClose}
      open={drawerOpen}
    >
      {renderCurrentPage()}
    </Drawer>
  );
}