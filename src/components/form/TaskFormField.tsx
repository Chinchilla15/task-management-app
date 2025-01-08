import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
} from "../select/index";
import { Tag } from "../common/Tag";
import { cn } from "@/lib/utils";
import { TaskFormFieldProps } from "@types";

export default function TaskFormField<T extends string | number>({
  icon,
  value,
  onValueChange,
  placeholder,
  title,
  options = [],
  customContent,
  contentClassName,
  renderItem,
}: TaskFormFieldProps<T>) {
  return (
    <Tag>
      {icon}
      <SelectRoot
        value={value}
        onValueChange={(val) => onValueChange(val as T)}
      >
        <SelectTrigger className="" placeholder={placeholder} />
        <SelectContent title={title} className={cn(contentClassName)}>
          {customContent
            ? customContent
            : options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {renderItem ? (
                    renderItem(option)
                  ) : (
                    <div className="flex items-center gap-2">
                      {option.icon}
                      <span>{option.label}</span>
                    </div>
                  )}
                </SelectItem>
              ))}
        </SelectContent>
      </SelectRoot>
    </Tag>
  );
}
