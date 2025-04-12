import {CoreAssistantMessage, CoreSystemMessage, CoreUserMessage} from "ai";

export class MsgUtil {

  public static createUserMessage(content: string): CoreUserMessage {
    return {
      role: "user",
      content: content,
    };
  }

  public static createAssistantMessage(content: string): CoreAssistantMessage {
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