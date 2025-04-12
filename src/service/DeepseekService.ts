import {MessageListType} from "@/store/reducers/data/ChatDataSlice.ts";
import {ModelInfo} from "@/store/reducers/data/ModelsDataSlice.ts";
import {createDeepSeek} from "@ai-sdk/deepseek";
import {streamText} from "ai";
import _ from "lodash";

export class DeepseekService {
  public static async sendMessage(
    model: ModelInfo,
    messages: MessageListType,
    onStream: (message: string) => void,
  ): Promise<void> {
    const deepseek = createDeepSeek({
      apiKey: model.apiKey || "",
      baseURL: model.baseUrl,
    });
    const sendMessages = _.cloneDeep(messages);
    if (!sendMessages || sendMessages.length === 0) {
      console.error("Invalid messages");
      return Promise.reject(new Error("Invalid messages"));
    }
    // Add system message if not present
    const {textStream} = streamText({
      model: deepseek("deepseek-chat"),
      messages: sendMessages,
    });
    for await (const textPart of textStream) {
      onStream(textPart);
    }
    return Promise.resolve();
  }
}