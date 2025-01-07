import FormField from "../../form/TaskFormField";
import PlusMinus from "@icons/white/PlusMinus.svg?react";
import AvatarIcon from "@icons/white/AvatarIcon.svg?react";
import TagIcon from "@icons/white/Tag.svg?react";
import CalendarIcon from "@icons/white/Calendar.svg?react";
import Square from "@icons/white/Square.svg?react";
import { SelectItem } from "@components/select";
import CustomDatePicker from "@components/form/DatePicker";
import { PointEstimate, TaskTag } from "@/graphql/graphql";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/common/Avatar";
import { dateUtils } from "@/lib/utils";
import type { DialogFormFieldsProps } from "@types";

export const DialogFormFields = ({
  form: { setValue },
  form,
  date,
  setDate,
  pointEstimateOptions,
  assigneeOptions,
  tagOptions,
}: DialogFormFieldsProps) => {
  return (
    <div className="flex justify-between gap-2">
      <FormField
        icon={<PlusMinus width="24px" height="24px" aria-label="" />}
        value={
          pointEstimateOptions.find(
            (opt) => opt.value === form.watch("pointEstimate"),
          )?.label || ""
        }
        onValueChange={(value) =>
          setValue("pointEstimate", value as PointEstimate)
        }
        placeholder="Estimate"
        title="Estimate"
        options={pointEstimateOptions.map((option) => ({
          ...option,
          icon: <PlusMinus width="24px" height="24px" aria-label="" />,
        }))}
      />

      <FormField
        icon={<AvatarIcon width="24px" height="24px" aria-label="" />}
        value={
          assigneeOptions.find((opt) => opt.value === form.watch("assigneeId"))
            ?.label || "Asignee"
        }
        onValueChange={(value) => {
          setValue("assigneeId", value as string);
        }}
        placeholder="Assignee"
        title="Assign To..."
        options={assigneeOptions}
        renderItem={(assigneeOptions) => (
          <>
            <Avatar>
              <AvatarImage alt={assigneeOptions.avatar || undefined} />
              <AvatarFallback className="bg-secondary-4 font-bold text-white">
                {assigneeOptions.label.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {assigneeOptions.label}
          </>
        )}
      />

      <FormField
        icon={<TagIcon width="24px" height="24px" aria-label="" />}
        value={
          tagOptions.find((opt) =>
            form.watch("tags")?.includes(opt.value as TaskTag),
          )?.label || ""
        }
        onValueChange={(value) => {
          setValue("tags", [value as TaskTag]);
        }}
        placeholder="Label"
        title="Tag Title"
        options={tagOptions.map((option) => ({
          ...option,
          icon: <Square width="18px" height="18px" aria-label="" />,
        }))}
      />

      <FormField
        icon={<CalendarIcon width="24px" height="24px" aria-label="" />}
        value={dateUtils.toDisplayFormat(date)}
        onValueChange={(value) => {
          setValue("dueDate", value);
        }}
        placeholder="Due Date"
        contentClassName="border-none bg-transparent p-0 shadow-none"
        customContent={
          <SelectItem
            value={dateUtils.toAPIFormat(date)}
            className="w-full border-none bg-transparent p-0 shadow-none"
          >
            <div className="flex flex-col">
              <CustomDatePicker
                value={date}
                onChange={(newDate: Date | null) => {
                  if (newDate) {
                    setDate(newDate);
                    setValue("dueDate", dateUtils.toAPIFormat(newDate));
                  }
                }}
              />
              <button
                type="button"
                className="rounded-b-[4px] border border-neutral-2 bg-neutral-5 p-2 text-primary-4"
                onClick={(e) => {
                  e.preventDefault();
                  const today = new Date();
                  setDate(today);
                  setValue("dueDate", dateUtils.toAPIFormat(today));
                }}
              >
                Today
              </button>
            </div>
          </SelectItem>
        }
      />
    </div>
  );
};
