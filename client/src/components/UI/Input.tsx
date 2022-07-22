import React, { RefObject } from "react";
import TermInputLabel from "../termCard/TermInputLabel";

type Props = {
  defaultValue?: string;
  placeholder: string;
  inputClassName: string;
  labelClassName?: string;
  inputId: string;
  labelText: string;
  required?: boolean;
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
  required,
  onChange,
}: Props) => {
  return (
    <div>
      <input
        tabIndex={0}
        onChange={(e) => onChange(e)}
        type="text"
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={`${inputClassName} term-input`}
        id={inputId}
        ref={reference}
        required={required}
      />
      <TermInputLabel
        inputId={inputId}
        labelClassName={`${labelClassName} fl`}
        labelText={labelText}
      />
    </div>
  );
};

export default Input;
