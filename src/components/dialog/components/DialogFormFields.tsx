import FormField from "../../form/TaskFormField";
import PlusMinus from "@icons/white/PlusMinus.svg?react";
import AvatarIcon from "@icons/white/AvatarIcon.svg?react";
import TagIcon from "@icons/white/Tag.svg?react";
import CalendarIcon from "@icons/white/Calendar.svg?react";
import Square from "@icons/white/Square.svg?react";
import SquareChecked from "@icons/white/SquareCheck.svg?react";
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
  pointEstimateOptions,
  assigneeOptions,
  tagOptions,
}: DialogFormFieldsProps) => {
  return (
    <div className="flex flex-col justify-between gap-6 sm:flex-row sm:gap-2">
      <FormField
        error={form.formState.errors.pointEstimate?.message}
        icon={<PlusMinus width="24px" height="24px" aria-label="" />}
        value={
          pointEstimateOptions.find(
            (opt) => opt.value === form.watch("pointEstimate"),
          )?.label || ""
        }
        onValueChange={(value) => {
          form.clearErrors("pointEstimate");
          setValue("pointEstimate", value as PointEstimate);
        }}
        placeholder="Estimate"
        title="Estimate"
        options={pointEstimateOptions.map((option) => ({
          ...option,
          icon: <PlusMinus width="24px" height="24px" aria-label="" />,
        }))}
        {...(form.watch("pointEstimate") && { tagVariant: "none" })}
      />

      <FormField
        error={form.formState.errors.assigneeId?.message}
        icon={
          form.watch("assigneeId") ? (
            <Avatar>
              <AvatarImage
                alt={
                  assigneeOptions.find(
                    (opt) => opt.value === form.watch("assigneeId"),
                  )?.label
                }
              />
              <AvatarFallback className="bg-secondary-4 text-xs font-bold text-white">
                {assigneeOptions
                  .find((opt) => opt.value === form.watch("assigneeId"))
                  ?.label.slice(0, 2)
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
          ) : (
            <AvatarIcon width="24px" height="24px" aria-label="" />
          )
        }
        value={
          assigneeOptions.find((opt) => opt.value === form.watch("assigneeId"))
            ?.label || "Asignee"
        }
        onValueChange={(value) => {
          form.clearErrors("assigneeId");
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
        {...(form.watch("assigneeId") && { tagVariant: "none" })}
      />

      <FormField
        error={form.formState.errors.tags?.message}
        icon={<TagIcon width="24px" height="24px" aria-label="" />}
        value={(() => {
          const selectedTags = tagOptions.filter((opt) =>
            form.watch("tags")?.includes(opt.value as TaskTag),
          );
          if (selectedTags.length === 0) return "";
          if (selectedTags.length === 1) return selectedTags[0].label;
          return `${selectedTags.length} tags`;
        })()}
        onValueChange={(value) => {
          form.clearErrors("tags");
          const currentTags = form.watch("tags") || [];
          let newTags = currentTags.includes(value as TaskTag)
            ? currentTags.filter((tag) => tag !== value)
            : [...currentTags, value as TaskTag];
          if (newTags.length === 0) {
            newTags = [value as TaskTag];
          }
          setValue("tags", newTags as [TaskTag, ...TaskTag[]]);
        }}
        placeholder="Label"
        title="Tag Title"
        options={tagOptions.map((option) => ({
          ...option,
          icon: <Square width="18px" height="18px" aria-label="" />,
        }))}
        renderItem={(option) => (
          <>
            {form.watch("tags")?.includes(option.value as TaskTag) ? (
              <SquareChecked width="18px" height="18px" aria-label="" />
            ) : (
              <Square width="18px" height="18px" aria-label="" />
            )}
            {option.label}
          </>
        )}
      />

      <FormField
        error={form.formState.errors.dueDate?.message}
        icon={<CalendarIcon width="24px" height="24px" aria-label="" />}
        value={dateUtils.toDisplayFormat(form.watch("dueDate")) || ""}
        onValueChange={() => {}}
        placeholder="Due Date"
        contentClassName="border-none bg-transparent p-0 shadow-none"
        customContent={
          <SelectItem
            value={dateUtils.toAPIFormat(form.watch("dueDate"))}
            className="w-full border-none bg-transparent p-0 shadow-none"
          >
            <div className="flex flex-col">
              <CustomDatePicker
                value={
                  form.watch("dueDate") ? new Date(form.watch("dueDate")) : ""
                }
                onChange={(newDate: Date | null) => {
                  if (newDate) {
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
