import {ModelInfo} from "@/store/reducers/data/ModelsDataSlice.ts";
import {MessageListType} from "@/store/reducers/data/ChatDataSlice.ts";
import {createDeepSeek} from "@ai-sdk/deepseek";
import _ from "lodash";
import {streamText} from "ai";
import {createOllama} from "ollama-ai-provider";
import {createGoogleGenerativeAI} from "@ai-sdk/google";
import {createAnthropic} from "@ai-sdk/anthropic";
import {createOpenAI} from "@ai-sdk/openai";

function parseAiModel(model: ModelInfo) {
  switch (model.apiType) {
    case "deepseek":
      return createDeepSeek({
        apiKey: model.apiKey || "",
        baseURL: model.baseUrl,
      });
    case "openai":
      return createOpenAI({
        apiKey: model.apiKey || "",
        baseURL: model.baseUrl,
      });
    case "ollama":
      return createOllama({
        baseURL: model.baseUrl,
      });
    case "gemini":
      return createGoogleGenerativeAI({
        apiKey: model.apiKey || "",
        baseURL: model.baseUrl,
      });
    case "anthropic":
      return createAnthropic({
        apiKey: model.apiKey || "",
        baseURL: model.baseUrl,
      });
    default:
      console.error("Unsupported model type");
      throw new Error("Unsupported model type");
  }
}

export class ModelService {

  public static async sendMessage(
    model: ModelInfo,
    messages: MessageListType,
    onStream: (message: string) => void,
  ): Promise<void> {
    const modelApi = parseAiModel(model);
    const sendMessages = _.cloneDeep(messages);
    if (!sendMessages || sendMessages.length === 0) {
      console.error("Invalid messages");
      return Promise.reject(new Error("Invalid messages"));
    }
    // Add system message if not present
    const {textStream} = streamText({
      model: modelApi(model.apiModelName),
      messages: sendMessages,
    });
    for await (const textPart of textStream) {
      onStream(textPart);
    }
    return Promise.resolve();
  }
}