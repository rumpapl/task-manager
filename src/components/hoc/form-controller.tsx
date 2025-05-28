import React, { ReactElement, cloneElement, isValidElement } from "react";
import { Controller, ControllerProps, FieldValues } from "react-hook-form";

type FormControllerProps<TFieldValues extends FieldValues = FieldValues> = Omit<
  ControllerProps<TFieldValues>,
  "render"
> & {
  children: ReactElement;
};

const FormController = <TFieldValues extends FieldValues = FieldValues>({
  children,
  rules,
  ...controllerProps
}: FormControllerProps<TFieldValues>) => {
  const required = Boolean(rules?.required);
  return (
    <Controller
      {...controllerProps}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        if (!isValidElement(children))
          throw new Error(
            "FormController expects a valid ReactElement as child.",
          );
        const childProps: typeof field & {
          helperText?: string;
          required?: boolean;
        } = {
          ...field,
          helperText: error?.message,
          required,
        };

        childProps.ref = field.ref;
        return cloneElement(children, childProps);
      }}
    />
  );
};

export default FormController;
