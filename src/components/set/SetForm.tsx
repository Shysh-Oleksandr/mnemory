import React, { RefObject, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { actionCreactors, State } from "../../state";
import Input from "./../UI/Input";

type Props = {
  buttonText: string;
  titleContent: any;
};

const SetForm = ({ buttonText, titleContent }: Props) => {
  const dispatch = useDispatch();
  const nameRef = useRef() as RefObject<HTMLInputElement>;
  const descriptionRef = useRef() as RefObject<HTMLInputElement>;
  const mnemoryState = useSelector((state: State) => state.mnemory);

  const { setSetInfo, saveCurrentSet } = bindActionCreators(
    actionCreactors,
    dispatch
  );
  return (
    <div className="mb-10">
      <div className="flex justify-between items-center my-6">
        {titleContent}
        <Link
          to={`/set/${mnemoryState.currentSetId}`}
          className="btn"
          onClick={saveCurrentSet}
        >
          {buttonText}
        </Link>
      </div>
      <Input
        onChange={() =>
          setSetInfo(nameRef.current?.value!, descriptionRef.current?.value!)
        }
        placeholder="Enter set name..."
        defaultValue={
          mnemoryState.sets[mnemoryState.currentSetId].savedSet.name || ""
        }
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
        defaultValue={
          mnemoryState.sets[mnemoryState.currentSetId].savedSet.description ||
          ""
        }
        inputClassName="set-form-input"
        inputId="set-definition"
        labelText="Description"
        reference={descriptionRef}
      />
    </div>
  );
};

export default SetForm;
