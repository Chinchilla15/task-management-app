import * as React from "react";
import Plus from "@icons/white/Plus.svg?react";
import AvatarIcon from "@icons/white/AvatarIcon.svg?react";
import TagIcon from "@icons/white/Tag.svg?react";
import CalendarIcon from "@icons/white/Calendar.svg?react";
import PlusMinus from "@icons/white/PlusMinus.svg?react";
import Square from "@icons/white/Square.svg?react";
import { AvatarFallback, Avatar, AvatarImage } from "../common/Avatar";
// import { formatDate } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskFormSchema, TaskFormValues } from "@/types/formSchema";
import { Spinner } from "../ui/Spinner";
import { Button } from "@/components/common/Button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/dialog/Dialog";
import Input from "@/components/common/Input";
import { SelectItem } from "@/components/select/Select";
import CustomDatePicker from "../form/DatePicker";
import FormField from "../form/TaskFormField";
import {
  ASSIGNEE_OPTIONS,
  pointEstimateOptions,
  tagOptions,
} from "@/mocks/dialogData";
import { TaskFormData } from "@types";
import {
  PointEstimate,
  Status,
  TaskTag,
  useCreateTaskMutation,
} from "@/graphql/graphql";
import { gql } from "@apollo/client";

//WIP - Implement proper mutation and cache update, error handling, and form submission
export function NativeTaskDialog() {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date>();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [createTask] = useCreateTaskMutation({
    update(cache, { data }) {
      if (!data?.createTask) return;
      cache.modify({
        fields: {
          tasks(existingTasks = []) {
            const newTaskRef = cache.writeFragment({
              data: data.createTask,
              fragment: gql`
                fragment NewTask on Task {
                  id
                  name
                  pointEstimate
                  assignee {
                    id
                    fullName
                  }
                  tags
                  dueDate
                  status
                }
              `,
            });
            return [...existingTasks, newTaskRef];
          },
        },
      });
    },
    onError: (error) => {
      console.error("Task creation error:", error);
    },
  });

  const form = useForm<TaskFormData>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      name: "",
      pointEstimate: undefined,
      assignee: "",
      status: Status.InProgress,
      dueDate: "",
      tags: undefined,
    },
  });

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = form;

  const onSubmit = (data: TaskFormValues) => {
    try {
      console.log("Submitting form with data:", data);
      setIsSubmitting(true);
      createTask({
        variables: {
          input: {
            name: data.name,
            pointEstimate: data.pointEstimate,
            assigneeId: data.assignee,
            tags: [data.tags],
            dueDate: data.dueDate,
            status: Status.InProgress,
          },
        },
      });
      console.log("Form Submitted:", data);
      setOpen(false);
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="primary"
          className="p-[13px]"
          onClick={() => setOpen(true)}
        >
          <Plus width="14px" height="14px" aria-label="Plus Sign" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1"
          onError={(errors) => {
            console.error("Form validation errors:", errors);
          }}
        >
          <div className="pb-4">
            <div className="flex flex-col gap-6">
              <Input
                id="title"
                placeholder="Task Title"
                value={form.watch("name") || ""}
                onChange={(value) => {
                  console.log("Title changed:", value);
                  setValue("name", value);
                }}
                className="bg-transparent text-body-xl font-bold text-white"
                icon={false}
                error={errors.name?.message}
              />
              {errors.name && (
                <span className="text-sm text-red-500">
                  {errors.name.message}
                </span>
              )}
              <div className="flex justify-between">
                <FormField
                  icon={<PlusMinus width="24px" height="24px" aria-label="" />}
                  value={form.watch("pointEstimate")}
                  onValueChange={(value) =>
                    setValue("pointEstimate", value as PointEstimate)
                  }
                  placeholder="Estimate"
                  title="Estimate"
                  options={pointEstimateOptions.map((option) => ({
                    ...option,
                    icon: (
                      <PlusMinus width="24px" height="24px" aria-label="" />
                    ),
                  }))}
                />

                <FormField
                  icon={<AvatarIcon width="24px" height="24px" aria-label="" />}
                  value={form.watch("assignee")}
                  onValueChange={(value) => {
                    setValue("assignee", value),
                      console.log("Assignee changed:", value);
                  }}
                  placeholder="Assignee"
                  title="Assign To..."
                  options={ASSIGNEE_OPTIONS}
                  renderItem={(option) => (
                    <>
                      <Avatar>
                        <AvatarImage alt={option.label} />
                        <AvatarFallback className="bg-secondary-4 font-bold text-white">
                          U
                        </AvatarFallback>
                      </Avatar>
                      {option.label}
                    </>
                  )}
                />

                <FormField
                  icon={<TagIcon width="24px" height="24px" aria-label="" />}
                  value={form.watch("tags")}
                  onValueChange={(value) => {
                    setValue("tags", value as TaskTag),
                      console.log("Label changed:", form.getValues());
                  }}
                  placeholder="Label"
                  title="Tag Title"
                  options={tagOptions.map((option) => ({
                    ...option,
                    icon: <Square width="18px" height="18px" aria-label="" />,
                  }))}
                />

                <FormField
                  icon={
                    <CalendarIcon width="24px" height="24px" aria-label="" />
                  }
                  value={form.watch("dueDate")}
                  onValueChange={(value) => {
                    console.log("Date changed:", value);
                    setValue("dueDate", value);
                  }}
                  placeholder="Due Date"
                  contentClassName="border-none bg-transparent p-0 shadow-none"
                  customContent={
                    <SelectItem
                      value={date ? date.toISOString().split("T")[0] : ""}
                      className="w-full border-none bg-transparent p-0 shadow-none"
                    >
                      <div className="flex flex-col">
                        <CustomDatePicker
                          value={date}
                          onChange={(date: Date | null) => {
                            setDate(date || undefined);
                            if (date) {
                              setValue("dueDate", date.toISOString());
                            }
                          }}
                        />
                        <button
                          className="rounded-b-[4px] border border-neutral-2 bg-neutral-5 p-2 text-primary-4"
                          onClick={() => setDate(new Date())}
                        >
                          Today
                        </button>
                      </div>
                    </SelectItem>
                  }
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="transparent-white"
              onClick={() => {
                setOpen(false);
                reset();
              }}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
            >
              {isSubmitting ? <Spinner size="md" variant="light" /> : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
