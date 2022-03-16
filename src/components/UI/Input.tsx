import React, { RefObject } from "react";

type Props = {
  defaultValue?: string;
  placeholder: string;
  inputClassName: string;
  labelClassName?: string;
  inputId: string;
  labelText: string;
  reference: RefObject<HTMLInputElement>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({
  defaultValue,
  placeholder,
  inputClassName,
  labelClassName,
  inputId,
  labelText,
  reference,
  onChange,
}: Props) => {
  return (
    <div>
      <input
        onChange={(e) => onChange(e)}
        type="text"
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={`${inputClassName} term-input`}
        id={inputId}
        ref={reference}
      />
      <label htmlFor={inputId} className={`${labelClassName} term-input-label`}>
        {labelText}
      </label>
    </div>
  );
};

export default Input;
