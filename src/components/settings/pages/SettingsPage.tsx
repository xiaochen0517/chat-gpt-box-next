import {SettingsItem} from "@/components/settings/pages/base/SettingsItem.tsx";
import {Input, Switch} from "antd";
import {SettingsItemGroup} from "@/components/settings/pages/base/SettingsItemGroup.tsx";

export function SettingsPage() {
  return (
    <div className="max-w-[50rem] mx-auto flex flex-col gap-6">
      <h1 className="text-3xl leading-tight">Settings</h1>
      <SettingsItemGroup title="基础设置">
        <SettingsItem label="设置项1" width={80}>
          <Input placeholder="Settings Page"/>
        </SettingsItem>
        <SettingsItem title="标题1" label="设置项2">
          <Switch/>
        </SettingsItem>
      </SettingsItemGroup>
      <SettingsItemGroup title="基础设置">
        <SettingsItem label="设置项1">
          <Input placeholder="Settings Page"/>
        </SettingsItem>
        <SettingsItem title="标题1" label="设置项2" right>
          <Switch/>
        </SettingsItem>
      </SettingsItemGroup>
    </div>
  );
}