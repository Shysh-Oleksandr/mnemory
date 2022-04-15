import React, { RefObject, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { clearInput } from "../../Helpers/functions";
import { actionCreactors, State } from "../../state";
import Input from "../UI/Input";
import { termsPlaceholder } from "./../../data/termsPlaceholders";
import { getCurrentSet } from "./../../Helpers/functions";
import { ITerm } from "./Term";
import TermCategoriesForm from "./TermCategoriesForm";

type Props = { term: ITerm };

const TermInfo = ({ term }: Props) => {
  const dispatch = useDispatch();
  const mnemoryState = useSelector((state: State) => state.mnemory);

  const nameRef = useRef() as RefObject<HTMLInputElement>;
  const descriptionRef = useRef() as RefObject<HTMLInputElement>;

  const { setTermInfo } = bindActionCreators(actionCreactors, dispatch);

  useEffect(() => {
    clearInput(nameRef, descriptionRef);
  }, [mnemoryState.currentSetId]);

  useEffect(() => {
    // Don't focus initial inputs.
    if (getCurrentSet(mnemoryState).savedSet.terms.includes(term)) {
      return;
    }
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
          placeholder={termsPlaceholder[term.placeholderId].term}
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
          placeholder={termsPlaceholder[term.placeholderId].definition}
          inputClassName="term-definition"
          inputId={`term-${term.id}-definition`}
          labelText="Definition"
          reference={descriptionRef}
        />
      </div>
      {window.screen.width < 768 && <TermCategoriesForm term={term} />}
    </div>
  );
};

export default TermInfo;
