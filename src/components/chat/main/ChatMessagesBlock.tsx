import {Bubble} from "@ant-design/x";
import {CSSProperties} from "react";
import {UserOutlined} from "@ant-design/icons";

export function ChatMessagesBlock() {
  const fooAvatar: CSSProperties = {
    color: "#f56a00",
    backgroundColor: "#fde3cf",
  };

  return (
    <div className="relative flex-1 flex flex-col gap-2">
      <div className="absolute left-0 right-0 top-0 bottom-0 overflow-y-auto">
        <div className="px-2 flex flex-col gap-4">
          {Array.from({length: 20}).map((_, index) => (
            <Bubble
              key={index}
              placement="start"
              content="Good morning, how are you?"
              avatar={{icon: <UserOutlined/>, style: fooAvatar}}
            />
          ))}
        </div>
      </div>
    </div>
  );
}