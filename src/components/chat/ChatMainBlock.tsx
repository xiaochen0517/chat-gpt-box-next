import {PromptsBox} from "@/components/chat/main/PromptsBox.tsx";
import {ChatInputBox} from "@/components/chat/main/ChatInputBox.tsx";
import {ChatMessagesBlock} from "@/components/chat/main/ChatMessagesBlock.tsx";
import {useAppSelector} from "@/store/Hooks.ts";
import {StrUtil} from "@/utils/StrUtil.ts";
import {selectCurrentChatId} from "@/store/reducers/data/ChatDataSlice.ts";

export function ChatMainBlock() {

  const currentChatId = useAppSelector(selectCurrentChatId);
  const hasChatId = StrUtil.isNotBlank(currentChatId);

  return (
    <div className="flex-1 flex flex-col p-2">
      <div className="p-2 flex-1 flex flex-col gap-2 justify-center">
        {hasChatId && (<ChatMessagesBlock/>)}
        {!hasChatId && (<PromptsBox/>)}
        <ChatInputBox/>
      </div>
    </div>
  );
}