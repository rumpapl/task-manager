import React, { forwardRef } from "react";

interface OutlineLabelInputProps
  extends React.HTMLAttributes<HTMLInputElement> {
  helperText?: string;
  placeholder?: string;
  label?: string;
  required?: boolean;
  type?: string;
}

const OutlineLabelInput = forwardRef<HTMLInputElement, OutlineLabelInputProps>(
  (
    {
      label = "",
      type = "text",
      placeholder = "Enter here",
      helperText,
      ...other
    },
    ref,
  ) => {
    return (
      <div>
        {Boolean(label) && <p className=" text-sm mb-2">{label}</p>}
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className="w-full p-2 border rounded"
          {...other}
        />
        {Boolean(helperText) && (
          <p className="text-red-500 text-sm mt-1">{helperText}</p>
        )}
      </div>
    );
  },
);

OutlineLabelInput.displayName = "OutlineLabelInput";
export default OutlineLabelInput;
