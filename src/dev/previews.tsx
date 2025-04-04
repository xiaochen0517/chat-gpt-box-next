import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import {PaletteTree} from "./palette";
import App from "@/App.tsx";
import {ChatMainBlock} from "@/components/chat/ChatMainBlock.tsx";
import {ChatListBlock} from "@/components/chat/ChatListBlock.tsx";

const ComponentPreviews = () => {
  return (
    <Previews palette={<PaletteTree/>}>
      <ComponentPreview path="/App">
        <App/>
      </ComponentPreview>
      <ComponentPreview path="/ChatMainBlock">
        <ChatMainBlock/>
      </ComponentPreview>
      <ComponentPreview path="/ChatListBlock">
        <ChatListBlock/>
      </ComponentPreview>
    </Previews>
  );
};

export default ComponentPreviews;