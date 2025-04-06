import "./App.css";
import "@/assets/icons/iconfont.css";
import {MainView} from "./views/MainView.tsx";
import {App as AntdApp, ConfigProvider, theme} from "antd";
import {useAppSelector} from "@/store/Hooks.ts";
import {selectDarkMode} from "@/store/reducers/AppSettingSlice.ts";
import {useEffect} from "react";

function App() {

  const isDarkMode = useAppSelector(selectDarkMode);

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
  }, []);

  return (
    <ConfigProvider theme={{algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm}}>
      <AntdApp className="w-full h-full">
        <MainView/>
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;