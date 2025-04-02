import {Bubble} from "@ant-design/x";
import {CSSProperties} from "react";
import {UserOutlined} from "@ant-design/icons";

export function ChatMessagesBlock() {
  const fooAvatar: CSSProperties = {
    color: "#f56a00",
    backgroundColor: "#fde3cf",
  };

  const barAvatar: CSSProperties = {
    color: "#fff",
    backgroundColor: "#87d068",
  };

  return (
    <div className="relative flex-1 flex flex-col gap-2">
      <div className="absolute left-0 right-0 top-0 bottom-0 overflow-y-auto">
        <div className="px-2">
          {Array.from({length: 20}).map(() => (
            <>
              <Bubble
                placement="start"
                content="Good morning, how are you?"
                avatar={{icon: <UserOutlined/>, style: fooAvatar}}
              />
              <Bubble
                placement="end"
                content="Hi, good morning, I'm fine!"
                avatar={{icon: <UserOutlined/>, style: barAvatar}}
              />
              <Bubble
                placement="start"
                content="What a beautiful day!"
                avatar={{icon: <UserOutlined/>, style: fooAvatar}}
              />
              <Bubble placement="end" content="Thank you!" avatar={{icon: <UserOutlined/>, style: fooAvatar}}/>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}