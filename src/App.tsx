import "./App.css";
import {MainView} from "./views/MainView.tsx";
import {ConfigProvider, theme} from "antd";
import {useEffect, useState} from "react";

function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // 监听主题变化事件
  useEffect(() => {
    const handleThemeChange = (e: CustomEvent) => {
      setIsDarkMode(e.detail);
    };

    window.addEventListener("themeChange", handleThemeChange as EventListener);

    // 初始化暗色模式
    document.body.classList.toggle("dark", isDarkMode);

    return () => {
      window.removeEventListener("themeChange", handleThemeChange as EventListener);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <ConfigProvider theme={{algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm}}>
      <MainView/>
    </ConfigProvider>
  );
}

export default App;