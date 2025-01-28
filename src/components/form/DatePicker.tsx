import React from "react";
import DatePicker from "react-datepicker";
import Arrow from "@icons/white/ArrowRigth.svg?react";
import { cn } from "@/lib/utils";
import type { CustomDatePickerProps } from "@types";

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  value,
  onChange,
}) => {
  return (
    <DatePicker
      selected={typeof value === "string" ? new Date(value) : value}
      onChange={onChange}
      className={cn(
        "w-full cursor-pointer bg-transparent",
        "text-body-l text-neutral-1",
      )}
      calendarClassName="bg-neutral-3  rounded-t-[4px] border-l border-t border-r border-neutral-2"
      inline
      dayClassName={(date) =>
        cn(
          "rounded-md hover:bg-primary-4 mx-0.5 p-2 ",
          date.toDateString() === new Date().toDateString() &&
            "text-primary-1 font-bold",
          date.toDateString() ===
            (value instanceof Date ? value.toDateString() : "") &&
            "bg-neutral-4",
        )
      }
      dateFormat="MMMM d, yyyy"
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
      monthClassName={() => "text-neutral-1"}
      weekDayClassName={() => "text-neutral-2"}
      renderCustomHeader={({
        date,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div className="my-1 flex items-center justify-between px-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              decreaseMonth();
            }}
            disabled={prevMonthButtonDisabled}
            className="rounded-lg p-2 hover:bg-neutral-4 disabled:opacity-50"
          >
            <Arrow className="h-4 w-4 rotate-180 transform" />
          </button>
          <div className="text-body-l font-semibold text-neutral-1">
            {date.toLocaleString("default", { month: "long", year: "numeric" })}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              increaseMonth();
            }}
            disabled={nextMonthButtonDisabled}
            className="rounded-lg p-2 hover:bg-neutral-4 disabled:opacity-50"
          >
            <Arrow className="h-4 w-4" />
          </button>
        </div>
      )}
      wrapperClassName="w-full"
      popperClassName="bg-neutral-3 rounded-lg shadow-lg"
      popperPlacement="bottom"
    />
  );
};

export default CustomDatePicker;
