import {ReactNode} from "react";
import {Button} from "antd";

interface SettingsItemGroupProps {
  title: string;
  children: ReactNode;
}

export function SettingsItemGroup({title, children}: SettingsItemGroupProps) {
  return (
    <div className="p-4 flex flex-col gap-2 rounded-2xl border dark:border-neutral-700">
      <h2 className="text-base mb-2">{title}</h2>
      <div className="mb-4 flex flex-col gap-6">{children}</div>
      <div className="flex items-center gap-2">
        <Button type="primary">保存</Button>
      </div>
    </div>
  );
}