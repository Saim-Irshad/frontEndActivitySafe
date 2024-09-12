import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Option {
  label: string;
  value: string;
}

interface Props {
  label?: string;
  name: string;
  options: Option[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: Control<any>;
  errors: FieldErrors;
  placeholder?: string;
  className?: string;
}

const AuthSelect: React.FC<Props> = ({
  label,
  name,
  options,
  control,
  errors,
  placeholder,
  className,
}) => {
  return (
    <div className={`flex flex-col text-safepayBlue ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium">
          {label}
        </label>
      )}

      {/* Use Controller to manage the custom select */}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className="focus:border-none border-blueBlack text-black   bg-transparent outline-0 focus-visible:ring-0 focus-visible:ring-offset-0 ring-0  w-full p-2 border-b  focus:outline-none focus:ring-0 ">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className=" no-focus bg-tertiaryBlue">
              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="hover:background-light800_dark400 cursor-pointer"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />

      {errors[name] && (
        <p className="mt-2 text-xs text-red-500">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default AuthSelect;
