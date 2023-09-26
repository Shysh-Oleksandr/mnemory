import React, { RefObject, useEffect, useMemo, useRef } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { clearInput } from "../../Helpers/functions";
import { ISetStatus } from "../../interfaces/set";
import { ITerm } from "../../interfaces/term";
import { actionCreactors } from "../../state";
import Input from "../UI/Input";
import { termsPlaceholder } from "./../../data/termsPlaceholders";
import TermCategoriesForm from "./TermCategoriesForm";

type Props = { term: ITerm; currentSet: ISetStatus };

const TermInfo = ({ term, currentSet }: Props) => {
  const dispatch = useDispatch();

  const nameRef = useRef() as RefObject<HTMLInputElement>;
  const descriptionRef = useRef() as RefObject<HTMLInputElement>;

  const { setTermInfo } = bindActionCreators(actionCreactors, dispatch);

  const randomTermPlaceholder = useMemo(() => termsPlaceholder[
    term.placeholderId ??
    Math.floor(Math.random() * termsPlaceholder.length)
  ], [term.placeholderId])

  useEffect(() => {
    clearInput(nameRef, descriptionRef);
  }, [currentSet.savedSet.setId]);

  useEffect(() => {
    // Don't focus initial inputs.
    if (currentSet.savedSet.terms.includes(term)) return;

    setTimeout(() => {
      nameRef.current?.focus();
    }, 0.1);
  }, []);

  return (
    <div className="term-info basis-1/4 shrink flex flex-col justify-between">
      <div>
        <Input
          defaultValue={term.term}
          onChange={() =>
            setTermInfo(
              nameRef.current?.value!,
              descriptionRef.current?.value!,
              term.id
            )
          }
          placeholder={randomTermPlaceholder.term}
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
          placeholder={randomTermPlaceholder.definition}
          inputClassName="term-definition"
          inputId={`term-${term.id}-definition`}
          labelText="Definition"
          reference={descriptionRef}
        />
      </div>
      {document.documentElement.clientWidth < 768 && (
        <TermCategoriesForm term={term} currentSet={currentSet} />
      )}
    </div>
  );
};

export default TermInfo;
