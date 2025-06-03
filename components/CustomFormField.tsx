"use client";

import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Control, ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form";
import { FormFieldType } from "./forms/SignupForm";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { E164Number } from "libphonenumber-js/core";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";

interface CustomProps<TFieldValues extends FieldValues = FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: ControllerRenderProps<TFieldValues, FieldPath<TFieldValues>>) => React.ReactNode;
  fieldType: FormFieldType;
  type?: string;
}

const RenderField = <TFieldValues extends FieldValues>({
  field,
  props,
}: {
  field: ControllerRenderProps<TFieldValues, FieldPath<TFieldValues>>;
  props: CustomProps<TFieldValues>;
}) => {
  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <FormControl>
            <Input
              type={props.type || "text"}
              placeholder={props.placeholder}
              {...field}
              className="shad-input border-0"
              disabled={props.disabled}
            />
          </FormControl>
        </div>
      );

    case FormFieldType.DATE_PICKER:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <FormControl>
            <DatePicker
              selected={field.value as Date}
              onChange={(date: Date) => field.onChange(date)}
              timeInputLabel="Time:"
              showTimeSelect={props.showTimeSelect ?? false}
              dateFormat={props.dateFormat ?? "MM/dd/yyyy"}
              wrapperClassName="date-picker"
            />
          </FormControl>
        </div>
      );

    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <div className="flex items-center rounded-md border border-dark-500 bg-dark-400">
            <PhoneInput
              defaultCountry="US"
              placeholder={props.placeholder}
              international
              withCountryCallingCode
              value={field.value as E164Number | undefined}
              onChange={field.onChange}
              className="flex-1 shad-input border-0 bg-transparent px-3 py-2"
            />
          </div>
        </FormControl>
      );

    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className="shad-select-trigger">
              <SelectValue placeholder={props.placeholder} />
            </SelectTrigger>
            <SelectContent className="shad-select-content">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      );

    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={props.placeholder}
            {...field}
            className="shad-textArea"
            disabled={props.disabled}
          />
        </FormControl>
      );

    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox
              id={props.name.toString()}
              checked={field.value as boolean}
              onCheckedChange={field.onChange}
            />
            <label htmlFor={props.name.toString()} className="checkbox-label">
              {props.label}
            </label>
          </div>
        </FormControl>
      );

    case FormFieldType.SKELETON:
      return props.renderSkeleton ? props.renderSkeleton(field) : null;

    default:
      return null;
  }
};

const CustomFormField = <TFieldValues extends FieldValues>(
  props: CustomProps<TFieldValues>
) => {
  const { control, fieldType, name, label } = props;

  return (
    <div>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="flex-1">
            {fieldType !== FormFieldType.CHECKBOX && label && (
              <FormLabel>{label}</FormLabel>
            )}
            <RenderField field={field} props={props} />
            <FormMessage className="shad-error" />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CustomFormField;
