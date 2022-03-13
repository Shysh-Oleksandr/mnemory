import React from "react";
import { ITerm } from "./Term";

type Props = { term: ITerm };

const TermInfo = ({ term }: Props) => {
  return (
    <div className="term-info">
      <input
        type="text"
        defaultValue={term.term}
        placeholder="Coche"
        className="term-title term-input"
        id={`term-${term.id}-title`}
      />
      <label htmlFor={`term-${term.id}-title`} className="term-input-label">
        Term
      </label>
      <input
        type="text"
        defaultValue={term.definition}
        placeholder="Car"
        className="term-definition term-input"
        id={`term-${term.id}-definition`}
      />
      <label
        htmlFor={`term-${term.id}-definition`}
        className="term-input-label"
      >
        Definition
      </label>
    </div>
  );
};

export default TermInfo;
