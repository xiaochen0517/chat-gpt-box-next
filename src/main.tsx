import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {store} from "@/store/Store.ts";
import {Provider} from "react-redux";
import {DevSupport} from "@react-buddy/ide-toolbox";
import ComponentPreviews from "@/dev/previews.tsx";
import {useInitial} from "@/dev";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <DevSupport
        ComponentPreviews={ComponentPreviews}
        useInitialHook={useInitial}
      >
        <App/>
      </DevSupport>
    </Provider>
  </React.StrictMode>,
);
