import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className="div-padding z-50 fixed top-0 left-0 w-full bg-slate-800 border-b-[1px] border-solid h-16 border-slate-700 flex items-center justify-between">
      <nav className="flex items-end">
        <Link to="/" className="text-4xl block text-white py-4 font-bold mr-6">
          Mnemory
        </Link>
        <Link
          to="/edit"
          className="text-2xl block text-white py-4 font-bold mr-6"
        >
          Edit
        </Link>
      </nav>
      <Link to="/create" className="btn">
        Create set
      </Link>
    </div>
  );
};

export default Navbar;
