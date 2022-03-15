import React from "react";
import Input from "../UI/Input";
import { ITerm } from "./Term";

type Props = { term: ITerm };

const TermInfo = ({ term }: Props) => {
  return (
    <div className="term-info">
      <Input
        defaultValue={term.term}
        placeholder="Coche"
        inputClassName="term-title"
        inputId={`term-${term.id}-title`}
        labelText="Term"
      />
      <Input
        defaultValue={term.definition || ""}
        placeholder="Car"
        inputClassName="term-definition"
        inputId={`term-${term.id}-definition`}
        labelText="Definition"
      />
    </div>
  );
};

export default TermInfo;
