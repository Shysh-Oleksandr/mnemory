import React from "react";

type Props = {
  termsLength: number;
  restart: () => void;
};

const FlashcardsFinished = ({ termsLength, restart }: Props) => {
  return (
    <div className="text-center md:mt-8 mt-2 basis-4/5">
      <h2 className="md:text-5xl text-4xl font-bold">Brilliant!</h2>
      <h4 className="text-xl md:my-4 my-2">You learnt {termsLength} terms!</h4>
      <button onClick={restart} className="btn !py-4 w-10/12 mt-2 mb-6">
        Learn again
      </button>
    </div>
  );
};

export default FlashcardsFinished;
