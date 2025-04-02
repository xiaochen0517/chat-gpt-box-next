import {PromptsBox} from "@/components/chat/main/PromptsBox.tsx";
import {ChatInputBox} from "@/components/chat/main/ChatInputBox.tsx";
import {useState} from "react";
import {ChatMessagesBlock} from "@/components/chat/main/ChatMessagesBlock.tsx";

export function ChatMainBlock() {

  const [isNewChat, _] = useState(false);

  return (
    <div className="flex-1 flex flex-col p-2">
      <div className="p-2 flex-1 flex flex-col gap-2 justify-center">
        {!isNewChat && (<ChatMessagesBlock/>)}
        {isNewChat && (<PromptsBox/>)}
        <ChatInputBox/>
      </div>
    </div>
  );
}