import React, { RefObject, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  const [stickyClass, setStickyClass] = useState<string>("relative");

  const { setSetInfo, saveCurrentSet } = bindActionCreators(
    actionCreactors,
    dispatch
  );

  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);

    return () => {
      window.removeEventListener("scroll", stickNavbar);
    };
  }, []);

  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight > 64
        ? setStickyClass("fixed top-0 left-0 z-50 div-padding")
        : setStickyClass("relative");
    }
  };

  const saveSet = () => {
    saveCurrentSet();
    navigate(`/set/${mnemoryState.currentSetId}`);
  };

  return (
    <form
      id={`set-form-${mnemoryState.currentSetId}`}
      className="mb-10"
      onSubmit={saveSet}
    >
      <div
        className={`flex w-full justify-between items-center py-6 bg-slate-800 ${stickyClass}`}
      >
        {titleContent}
        <button
          type="submit"
          form={`set-form-${mnemoryState.currentSetId}`}
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
        defaultValue={
          mnemoryState.sets[mnemoryState.currentSetId].savedSet.name || ""
        }
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
        defaultValue={
          mnemoryState.sets[mnemoryState.currentSetId].savedSet.description ||
          ""
        }
        inputClassName="set-form-input"
        inputId="set-definition"
        labelText="Description"
        reference={descriptionRef}
      />
    </form>
  );
};

export default SetForm;
