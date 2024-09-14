/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Control, Controller } from "react-hook-form";
import { FaUpload } from "react-icons/fa";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Option {
  value: string;
  label: string;
}
interface Props {
  label?: string;
  radioButtons?: boolean;
  step?: string;
  authSelect?: boolean;
  control?: Control<any>;
  radioButtonArray?: any[];
  textArea?: boolean;
  name: string;
  valueAsANumber?: boolean;
  id?: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  className?: string;
  dropZone?: boolean;
  options?: Option[];
  acceptPng?: boolean;
  acceptJpg?: boolean;
  acceptMultiple?: boolean;
}

const AuthInput: React.FC<Props> = ({
  label,
  dropZone,
  step,
  acceptMultiple,
  radioButtons,
  control,
  authSelect,
  textArea,
  acceptPng,
  valueAsANumber,
  acceptJpg,
  radioButtonArray,
  name,
  options,
  type = "text",
  placeholder,
  register,
  errors,
  className = "",
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="mb-1 text-sm font-medium text-safepayBlue"
        >
          {label}
        </label>
      )}
      {!textArea && !dropZone && !radioButtons && !authSelect && (
        <input
          // {...register(name)}
          {...(type === "number" &&
          (valueAsANumber == undefined || valueAsANumber == true)
            ? { ...register(name, { valueAsNumber: true }) }
            : { ...register(name) })}
          type={type}
          id={name}
          step={step}
          placeholder={placeholder}
          className={`focus:ring-primary-600 placeholder:text-gray-600 focus:border-primary-primary1-100 block   w-full rounded-md border border-blueBlack text-black bg-transparent p-2.5 focus-visible:ring-transparent sm:text-sm    ${
            errors[name] ? "border-red-500" : ""
          }`}
        />
      )}
      {textArea && (
        <textarea
          {...register(name)}
          //  { ...type ==='number' ? {...register('myNumberField', { valueAsNumber: true } )} : {...register(name)} }
          id={name}
          placeholder={placeholder}
          className={`focus:border-primary-primary1-100 block h-[7rem]  w-full text-black   resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 focus-visible:ring-transparent sm:text-sm     ${
            errors[name] ? "border-red-500" : ""
          }`}
        />
      )}
      {dropZone && !authSelect && !radioButtons && (
        <>
          <label className="text-dark400_light900 flex h-32 w-32 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400">
            <FaUpload className="text-gray-400" size={24} />
            <input
              {...register(name)}
              type="file"
              id={name}
              multiple={acceptMultiple ? true : false}
              accept={
                acceptPng
                  ? "image/png"
                  : acceptJpg
                    ? "image/jpeg"
                    : "application/pdf"
              }
              className="hidden"
            />
          </label>
        </>
      )}
      {radioButtons && !textArea && !dropZone && !authSelect && (
        <Controller
          name="paymentMethods"
          control={control}
          render={({ field }) => (
            <div className="flex items-center gap-2">
              {radioButtonArray?.map((method: any) => (
                <label key={method}>
                  <input
                    type="radio" // Changed from 'checkbox' to 'radio'
                    className="form-radio text-[#685BBB]"
                    value={method}
                    checked={field.value === method}
                    onChange={(e) => field.onChange(e.target.value)}
                  />{" "}
                  {method}
                </label>
              ))}
            </div>
          )}
        />
      )}
      {authSelect && !radioButtons && !textArea && !dropZone && (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="focus:border-primary-primary1-100 border-gray-300 bg-gray-50 outline-0 focus-visible:ring-transparent">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent className=" no-focus bg-white">
                {options?.map((option) => (
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
      )}
      {errors[name]?.message && (
        <p className="mt-1 text-xs text-red-500">
          {errors[name]?.message as React.ReactNode}
        </p>
      )}
    </div>
  );
};

export default AuthInput;
