import React, { RefObject, useRef } from "react";
import Input from "../UI/Input";
import { ITerm } from "./Term";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreactors } from "../../state";

type Props = { term: ITerm };

const TermInfo = ({ term }: Props) => {
  const dispatch = useDispatch();
  const nameRef = useRef() as RefObject<HTMLInputElement>;
  const descriptionRef = useRef() as RefObject<HTMLInputElement>;

  const { setTermInfo } = bindActionCreators(actionCreactors, dispatch);
  return (
    <div className="term-info">
      <Input
        defaultValue={term.term}
        onChange={() =>
          setTermInfo(
            nameRef.current?.value!,
            descriptionRef.current?.value!,
            term.id
          )
        }
        placeholder="Coche"
        inputClassName="term-title"
        inputId={`term-${term.id}-title`}
        labelText="Term"
        reference={nameRef}
      />
      <Input
        defaultValue={term.definition || ""}
        onChange={() =>
          setTermInfo(
            nameRef.current?.value!,
            descriptionRef.current?.value!,
            term.id
          )
        }
        placeholder="Car"
        inputClassName="term-definition"
        inputId={`term-${term.id}-definition`}
        labelText="Definition"
        reference={descriptionRef}
      />
    </div>
  );
};

export default TermInfo;
