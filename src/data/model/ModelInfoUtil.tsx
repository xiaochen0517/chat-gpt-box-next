import {ModelApiType} from "@/store/reducers/data/ModelsDataSlice.ts";

export const getAiIconClassName = (apiType: ModelApiType) => {
  switch (apiType) {
    case "openai":
      return "icon-openai-fill";
    case "deepseek":
      return "icon-u585_mouseOver text-[#4D6BFE]";
    case "gemini":
      return "icon-gemini-ai text-[#448AFF]";
    case "ollama":
      return "icon-ollama";
    case "anthropic":
      return "icon-Anthropic text-[#CA9F7B]";
  }
};