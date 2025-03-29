import {ChatMainBlock} from "@/components/chat/ChatMainBlock.tsx";
import {ChatListBlock} from "@/components/chat/ChatListBlock.tsx";

export function MainView() {

  return (
    <div className="flex h-full transition-colors duration-300">
      <ChatListBlock/>
      <ChatMainBlock/>
    </div>
  );
}