import {AssistantContent, CoreAssistantMessage, CoreSystemMessage, CoreUserMessage, UserContent} from "ai";

export class MsgUtil {

  public static createUserMessage(content: UserContent): CoreUserMessage {
    return {
      role: "user",
      content: content,
    };
  }

  public static createAssistantMessage(content: AssistantContent): CoreAssistantMessage {
    return {
      role: "assistant",
      content: content,
    };
  }

  public static createSystemMessage(content: string): CoreSystemMessage {
    return {
      role: "system",
      content: content,
    };
  }
}