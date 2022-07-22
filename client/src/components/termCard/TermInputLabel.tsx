import React from "react";

interface TermInputLabelProps {
  inputId: string;
  labelClassName: string;
  labelText: string;
}

const TermInputLabel = ({
  inputId,
  labelClassName,
  labelText,
}: TermInputLabelProps) => {
  return (
    <label
      htmlFor={inputId}
      className={`term-input-label text-left block ${labelClassName}`}
    >
      {labelText}
    </label>
  );
};

export default TermInputLabel;
