import Input from "@components/common/Input";
import type { DialogInputProps } from "@types";

export const DialogInput = ({ form }: DialogInputProps) => {
  const {
    setValue,
    watch,
    formState: { errors },
    clearErrors,
  } = form;

  return (
    <>
      <Input
        id="title"
        placeholder="Task Title"
        value={watch("name") || ""}
        onChange={(value) => {
          const inputValue =
            typeof value === "string" ? value : value.target.value;
          setValue("name", inputValue);
          if (inputValue) {
            clearErrors("name");
          }
        }}
        className="bg-transparent text-body-xl font-bold text-white"
        icon={false}
        error={errors.name?.message}
      />
      {errors?.name && (
        <span className="text-sm text-red-500">{errors.name.message}</span>
      )}
    </>
  );
};
