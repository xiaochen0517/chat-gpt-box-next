import {PromptsBox} from "@/components/chat/main/PromptsBox.tsx";
import {ChatInputBox} from "@/components/chat/main/ChatInputBox.tsx";

export function ChatMainBlock() {

  return (
    <div className="flex-1 flex flex-col p-2">
      <div className="p-2 flex-1 flex flex-col gap-2 justify-center">
        {/*<div className="flex-1"/>*/}
        <PromptsBox/>
        <ChatInputBox/>
      </div>
    </div>
  );
}