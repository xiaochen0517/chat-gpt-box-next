import "./App.css";
import {MainView} from "./views/MainView.tsx";
import {ConfigProvider, theme} from "antd";
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
      <MainView/>
    </ConfigProvider>
  );
}

export default App;