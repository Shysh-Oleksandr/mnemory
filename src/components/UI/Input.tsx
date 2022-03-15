import React from "react";

type Props = {
  defaultValue?: string;
  placeholder: string;
  inputClassName: string;
  labelClassName?: string;
  inputId: string;
  labelText: string;
};

const Input = ({
  defaultValue,
  placeholder,
  inputClassName,
  labelClassName,
  inputId,
  labelText,
}: Props) => {
  return (
    <div>
      <input
        type="text"
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={`${inputClassName} term-input`}
        id={inputId}
      />
      <label htmlFor={inputId} className={`${labelClassName} term-input-label`}>
        {labelText}
      </label>
    </div>
  );
};

export default Input;
