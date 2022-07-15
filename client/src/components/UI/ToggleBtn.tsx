import React, { Dispatch } from "react";
import { Action } from "redux";

type Props = {
  defaultChecked: boolean;
  firstIcon: string;
  secondIcon: string;
  onChange: () => void;
  id: string;
};

function ToggleBtn({
  defaultChecked,
  firstIcon,
  secondIcon,
  onChange,
  id,
}: Props) {
  return (
    <button className="block mb-6 mt-4 md:mx-auto ml-8">
      <input
        onChange={onChange}
        type="checkbox"
        className="toggle-checkbox"
        defaultChecked={defaultChecked}
        id={id}
      />
      <label htmlFor={id} className="toggle-btn">
        <i className="first-icon">{firstIcon}</i>
        <i className="second-icon">{secondIcon}</i>
        <div className={`ball`}></div>
      </label>
    </button>
  );
}

export default ToggleBtn;
