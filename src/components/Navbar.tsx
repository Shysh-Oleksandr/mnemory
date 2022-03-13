import React from "react";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className="div-padding fixed top-0 left-0 w-full bg-slate-800 h-16 flex items-center justify-between">
      <h1 className="text-center text-4xl text-white font-bold">Mnemory</h1>
      <button className="bg-orange-400 rounded-md px-8 py-1 text-2xl transition-colors hover:bg-orange-500">
        Save
      </button>
    </div>
  );
};

export default Navbar;
