"use client";
import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Control } from "react-hook-form";
import { FormFieldType } from "./forms/SignupForm";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { E164Number } from "libphonenumber-js/core";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";

interface CustomProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
  fieldType: FormFieldType;
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
    const {
      fieldType,
      iconSrc,
      iconAlt,
      placeholder,
      showTimeSelect,
      dateFormat,
      renderSkeleton,
    } = props;
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
    />
  </FormControl>
          </div>
        );
        break;
  
      case FormFieldType.DATE_PICKER:
        return (
          <div className="flex rounded-md border border-dark-500 bg-dark-400">
           
            <FormControl>
              <DatePicker
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                timeInputLabel="Time:"
                showTimeSelect={props.showTimeSelect ?? false}
                dateFormat={props.dateFormat ?? "MM/dd/yyyy"}
                wrapperClassName="date-picker"
              />
            </FormControl>
          </div>
        );
        break;
      case FormFieldType.PHONE_INPUT:
        return (
          <FormControl>
            <PhoneInput
              defaultCountry="US"
              placeholder={props.placeholder}
              international
              withCountryCallingCode
              value={field.value as E164Number | undefined}
              onChange={field.onChange}
              className="shad-input border-0"
            />
          </FormControl>
        );
        case FormFieldType.SELECT:
            return (
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="shad-select-trigger">
                      <SelectValue placeholder={props.placeholder} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="shad-select-content">
                    {props.children /* Render passed options here */}
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
                  id={props.name}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <label htmlFor={props.name} className="checkbox-label">
                  {props.label}
                </label>
              </div>
            </FormControl>
          );
        case FormFieldType.SKELETON:
        return renderSkeleton ? renderSkeleton(field) : null;
      default:
        break;
    }
  };
const CustomFormField = (props: CustomProps) => {
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
