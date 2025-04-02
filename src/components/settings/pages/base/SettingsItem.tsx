import {ReactNode} from "react";

interface SettingsItemProps {
  title?: string;
  label: string;
  right?: boolean;
  width?: number;
  children: ReactNode;
}

export function SettingsItem({title, label, right = false, width, children}: SettingsItemProps) {
  return (
    <div className="flex flex-row items-center justify-between gap-2">
      <div className="flex-1 flex flex-col gap-1">
        {title && (
          <p className="">{title}</p>
        )}
        <span className="mb-1 text-xs text-neutral-700 dark:text-neutral-400">{label}</span>
        {!right && (
          <div className={"flex items-center gap-2" + (width ? ` w-${width}` : "")}>
            {children}
          </div>
        )}
      </div>
      {right && (
        <div className="flex items-center gap-2">
          {children}
        </div>
      )}
    </div>
  );
}