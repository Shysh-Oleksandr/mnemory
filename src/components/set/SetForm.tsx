import React, { RefObject, useRef } from "react";
import Input from "./../UI/Input";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreactors } from "../../state";

type Props = {
  buttonText: string;
  titleContent: any;
};

const SetForm = ({ buttonText, titleContent }: Props) => {
  const dispatch = useDispatch();
  const nameRef = useRef() as RefObject<HTMLInputElement>;
  const descriptionRef = useRef() as RefObject<HTMLInputElement>;

  const { setSetInfo } = bindActionCreators(actionCreactors, dispatch);
  return (
    <div className="mb-10">
      <div className="flex justify-between items-center my-6">
        {titleContent}
        <button className="btn">{buttonText}</button>
      </div>
      <Input
        onChange={() =>
          setSetInfo(nameRef.current?.value!, descriptionRef.current?.value!)
        }
        placeholder="Enter set name..."
        inputClassName="set-form-input"
        inputId="set-name"
        labelText="Name"
        reference={nameRef}
      />
      <Input
        onChange={() =>
          setSetInfo(nameRef.current?.value!, descriptionRef.current?.value!)
        }
        placeholder="Enter description..."
        inputClassName="set-form-input"
        inputId="set-definition"
        labelText="Description"
        reference={descriptionRef}
      />
    </div>
  );
};

export default SetForm;
