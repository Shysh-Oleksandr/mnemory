import React, { RefObject, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { clearInput } from "../../Helpers/functions";
import { useCurrentSetState } from "../../hooks";
import { actionCreactors } from "../../state";
import SaveBtn from "../UI/SaveBtn";
import Input from "./../UI/Input";

type Props = {
  buttonText: string;
  titleContent: any;
};

const SetForm = ({ buttonText, titleContent }: Props) => {
  const nameRef = useRef() as RefObject<HTMLInputElement>;
  const descriptionRef = useRef() as RefObject<HTMLInputElement>;
  const [stickyClass, setStickyClass] = useState<string>("static");
  const dispatch = useDispatch();
  const { setSetInfo, saveCurrentSet } = bindActionCreators(
    actionCreactors,
    dispatch
  );

  const currentSet = useCurrentSetState();
  const navigate = useNavigate();

  useEffect(() => {
    clearInput(nameRef, descriptionRef);
    if (nameRef.current) {
      nameRef.current.value = currentSet.savedSet.name;
    }
    if (descriptionRef.current) {
      descriptionRef.current.value = currentSet.savedSet.description || "";
    }

    window.addEventListener("scroll", stickNavbar);
    return () => {
      window.removeEventListener("scroll", stickNavbar);
    };
  }, [currentSet.savedSet.setId]);

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
    if (nameRef.current?.value.trim() === "") return;
    saveCurrentSet();
    navigate(`/set/${currentSet.savedSet.setId + 1}`);
  };

  return (
    <form
      id={`set-form-${currentSet.savedSet.setId + 1}`}
      className="md:mb-10 mb-6"
      onSubmit={(e) => saveSet(e)}
    >
      <div
        className={`flex w-full justify-between items-center md:py-6 py-3 bg-slate-800 ${stickyClass}`}
      >
        {titleContent}
        <SaveBtn
          currentSet={currentSet}
          buttonText={buttonText}
          isCreatePage={window.location.pathname.includes("/create")}
        />
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
