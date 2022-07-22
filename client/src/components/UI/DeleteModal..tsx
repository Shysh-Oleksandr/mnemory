import React, { useRef } from "react";
import { useOnClickOutside } from "../../hooks";
import Loading from "./Loading";

type Props = {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  modal: boolean;
  deleting: boolean;
  deleteSet: () => Promise<void>;
};

const DeleteModal = ({ setModal, modal, deleting, deleteSet }: Props) => {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;
  useOnClickOutside(ref, () => setModal(false));

  return (
    <div className="fixed z-[100000] h-full w-full top-0 left-0 flex justify-center items-center bg-black bg-opacity-40">
      <div
        className="bg-slate-800 rounded-xl md:p-10 sm:p-8 p-6 md:pt-6 pt-4 lg:basis-[40vw] sm:basis-[60vw] basis-[90vw] modal mx-4 fixed block shadow-xl"
        ref={ref}
      >
        <h2 className="sm:text-4xl text-3xl sm:leading-8 leading-7 text-center sm:pt-2 pt-1 sm:pb-4 pb-3 font-semibold border-bottom">
          Delete
        </h2>
        {deleting ? (
          <Loading />
        ) : (
          <h3 className="md:mb-8 sm:mb-6 mb-4 sm:text-2xl text-lg sm:mt-2 mt-1 sm:leading-8 leading-7 text-center">
            Are you sure you want to delete this note?
          </h3>
        )}
        <div className="flex justify-center items-center">
          <button
            className="block btn sm:!py-4 !py-3 mr-2 w-full	 shadow-md !text-white !bg-black hover:!bg-zinc-900 hover:shadow-lg"
            onClick={deleteSet}
          >
            Delete
          </button>
          <button
            className="block btn sm:!py-4 !py-3 w-full	 shadow-md"
            onClick={() => {
              setModal(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
