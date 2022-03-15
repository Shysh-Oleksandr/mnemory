import React from "react";
import Input from "./../UI/Input";

type Props = {
  buttonText: string;
  titleContent: any;
};

const SetForm = ({ buttonText, titleContent }: Props) => {
  return (
    <div className="mb-10">
      <div className="flex justify-between items-center my-6">
        {titleContent}
        <button className="btn">{buttonText}</button>
      </div>
      <Input
        placeholder="Enter set name..."
        inputClassName="set-form-input"
        inputId="set-name"
        labelText="Name"
      />
      <Input
        placeholder="Enter description..."
        inputClassName="set-form-input"
        inputId="set-definition"
        labelText="Description"
      />
    </div>
  );
};

export default SetForm;
