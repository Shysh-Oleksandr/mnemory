import React, { RefObject, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { actionCreactors, State } from "../../state";
import { ISetStatus } from "../../state/Reducers/MnemoryReducer";
import ConfirmModal from "../UI/ConfirmModal";
import Input from "./../UI/Input";
import { IMnemory } from "./../../state/Reducers/MnemoryReducer";
import { clearInput, getCurrentSet } from "../../Helpers/functions";

type Props = {
  buttonText: string;
  titleContent: any;
};

const SetForm = ({ buttonText, titleContent }: Props) => {
  const nameRef = useRef() as RefObject<HTMLInputElement>;
  const descriptionRef = useRef() as RefObject<HTMLInputElement>;
  const mnemoryState = useSelector((state: State) => state.mnemory);
  const [stickyClass, setStickyClass] = useState<string>("static");
  const dispatch = useDispatch();
  const { setSetInfo, saveCurrentSet } = bindActionCreators(
    actionCreactors,
    dispatch
  );

  const currentSet: ISetStatus = getCurrentSet(mnemoryState);

  const navigate = useNavigate();

  useEffect(() => {
    clearInput(nameRef, descriptionRef);

    window.addEventListener("scroll", stickNavbar);
    return () => {
      window.removeEventListener("scroll", stickNavbar);
    };
  }, [mnemoryState.currentSetId]);

  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight > 130
        ? setStickyClass("fixed top-0 left-0 z-20 div-padding")
        : setStickyClass("static");
    }
  };

  const saveSet = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("subm");
    console.log(e.currentTarget.id);

    saveCurrentSet();
    navigate(`/set/${mnemoryState.currentSetId + 1}`);
  };

  return (
    <form
      id={`set-form-${mnemoryState.currentSetId + 1}`}
      className="mb-10"
      onSubmit={(e) => saveSet(e)}
    >
      <div
        className={`flex w-full justify-between items-center py-6 bg-slate-800 ${stickyClass}`}
      >
        {titleContent}
        <button
          type="submit"
          form={`set-form-${mnemoryState.currentSetId + 1}`}
          className="btn"
        >
          {buttonText}
        </button>
      </div>
      <Input
        onChange={() =>
          setSetInfo(nameRef.current?.value!, descriptionRef.current?.value!)
        }
        placeholder="Enter set name..."
        defaultValue={currentSet.savedSet.name || ""}
        inputClassName="set-form-input"
        inputId="set-name"
        labelText="Name"
        reference={nameRef}
        required={true}
      />
      <Input
        onChange={() =>
          setSetInfo(nameRef.current?.value!, descriptionRef.current?.value!)
        }
        placeholder="Enter description..."
        defaultValue={currentSet.savedSet.description || ""}
        inputClassName="set-form-input"
        inputId="set-definition"
        labelText="Description"
        reference={descriptionRef}
      />
    </form>
  );
};

export default SetForm;
