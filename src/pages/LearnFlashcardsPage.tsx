import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FlashcardsInfo from "../components/set/FlashcardsInfo";
import KeywordsList from "../components/set/KeywordsList";
import TermCard from "../components/set/TermCard";
import { ITerm } from "../components/termCard/Term";
import { calcTermsLeft, getCurrentSet, shuffle } from "../Helpers/functions";
import { State } from "../state";
import "../styles/flashcards.css";

export const MAX_BG_CARDS = 5;

const LearnFlashcardsPage = () => {
  const learnState = useSelector((state: State) => state.learn);

  const [currentTermIndex, setCurrentTermIndex] = useState<number>(0);
  const [isStartSideFront, setIsStartSideFront] = useState<boolean>(
    learnState.isStartSideFront
  );
  const [isCurrentSideFront, setIsCurrentSideFront] =
    useState<boolean>(isStartSideFront);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [updateState, setUpdateState] = useState<boolean>(false);
  const [showDefinition, setShowDefinition] = useState<boolean>(
    learnState.showDefinition
  );
  const mnemoryState = useSelector((state: State) => state.mnemory);
  const currentSet = getCurrentSet(mnemoryState);
  const savedSet = currentSet.savedSet;
  const [shuffledTerms, setShuffledTerms] = useState<ITerm[]>([
    ...savedSet.terms,
  ]);
  const currentTerm = shuffledTerms[currentTermIndex];
  const termsLength = shuffledTerms.length;
  const cardRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  let termsLeftNumber = calcTermsLeft(currentTermIndex, termsLength);

  const termsLeft =
    termsLeftNumber > 0 ? new Array(termsLeftNumber).fill(0) : null;

  const setCardTransform = (newTermIndex: number) => {
    termsLeftNumber = calcTermsLeft(newTermIndex, termsLength);

    const rotateDegrees =
      termsLeftNumber >= MAX_BG_CARDS
        ? 10
        : 10 + (MAX_BG_CARDS - termsLeftNumber);
    const bottomPx =
      termsLeftNumber >= MAX_BG_CARDS
        ? 137
        : 137 - (MAX_BG_CARDS - termsLeftNumber) * 11;

    if (cardRef.current) {
      cardRef.current.style.transform =
        currentTermIndex < newTermIndex
          ? `translateX(50%) rotateY(-50deg) rotateX(${rotateDegrees}deg) translateZ(0)`
          : `translateX(-50%) rotateY(50deg) rotateX(${rotateDegrees}deg) translateZ(0)`;
      cardRef.current.style.transition = "transform 0.05s ease";
      cardRef.current.style.bottom = `${bottomPx}px`;

      setTimeout(() => {
        cardRef.current.style.transition = "transform 0.24s ease";
        cardRef.current.style.transform = `rotateX(${rotateDegrees}deg)`;
      }, 100);
    }
  };

  const changeCurrentTerm = (newTermIndex: number) => {
    setCurrentTermIndex(newTermIndex);
    setIsCurrentSideFront(isStartSideFront);
    setShowDefinition(learnState.showDefinition);

    setCardTransform(newTermIndex);
  };

  const shuffleTerms = () => {
    setShuffledTerms(shuffle(shuffledTerms));

    setCurrentTermIndex(0);
    setUpdateState(!updateState);
    setIsCurrentSideFront(isStartSideFront);

    setCardTransform(0);
  };

  const restart = () => {
    setIsStartSideFront(learnState.isStartSideFront);
    setCardTransform(0);
    setCurrentTermIndex(0);
    setIsFinished(false);
    setShuffledTerms([...savedSet.terms]);
  };

  useEffect(() => {
    restart();
  }, []);

  if (termsLength === 0) {
    return (
      <div className="flex justify-center flex-col">
        <h2 className="text-3xl my-4 text-center">
          There's no terms in this set.
        </h2>
        <Link
          to={`/set/${savedSet.setId + 1}`}
          className="btn text-center !py-4"
        >
          Back to the set
        </Link>
      </div>
    );
  }

  return (
    <div className="learn-cards flex h-full mt-4 justify-between">
      <FlashcardsInfo
        shuffleTerms={shuffleTerms}
        currentTermIndex={currentTermIndex}
        shuffledTerms={shuffledTerms}
        isFinished={isFinished}
      />
      {isFinished ? (
        <div className="text-center mt-8 basis-4/5">
          <h2 className="text-5xl font-bold">Brilliant!</h2>
          <h4 className="text-xl my-4">You learnt {termsLength} terms!</h4>
          <button onClick={restart} className="btn !py-4 w-10/12">
            Learn again
          </button>
        </div>
      ) : (
        <div className="learn-cards-content basis-4/5 relative">
          <div
            className="cards z-40 absolute bottom-[137px] top-0 left-0 right-0"
            ref={cardRef}
          >
            <TermCard
              currentTerm={currentTerm}
              showDefinition={showDefinition}
              setShowDefinition={setShowDefinition}
              setIsCurrentSideFront={setIsCurrentSideFront}
              isCurrentSideFront={isCurrentSideFront}
            />
          </div>
          <div className="bg-cards absolute bottom-20 top-0 left-0 right-0">
            {termsLeft &&
              termsLeft.map((term, index) => {
                return (
                  <div
                    key={`${currentTerm.id}-bg-card-${index}`}
                    style={{ bottom: `${64 + index * 12}px` }}
                    className={`bg-slate-700 h-full w-full rounded-xl absolute left-0 border-solid border-b-4 p-8 border-slate-400 text-5xl flex items-center justify-center`}
                  >
                    {isCurrentSideFront ? (
                      <div>{shuffledTerms[currentTermIndex + 1].term}</div>
                    ) : (
                      <div className="term-images justify-center flex p-4 grow items-start">
                        <KeywordsList term={currentTerm} isBigSize={true} />
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
          <div className="navigation flex items-center justify-center absolute bottom-0 left-1/2 -translate-x-1/2">
            <button
              onClick={() =>
                currentTermIndex !== 0 &&
                changeCurrentTerm(currentTermIndex - 1)
              }
              className="mx-4 text-xl rounded-full h-10 w-10 transition-colors hover:bg-slate-700 bg-slate-600"
            >{`<`}</button>
            <button
              onClick={() => {
                setIsStartSideFront(!isStartSideFront);
                setIsCurrentSideFront(!isStartSideFront);
              }}
              className="mx-4 text-xl rounded-full h-10 w-10 transition-colors hover:bg-slate-700 bg-slate-600"
            >{`<->`}</button>
            <button
              onClick={() => {
                currentTermIndex !== termsLength - 1
                  ? changeCurrentTerm(currentTermIndex + 1)
                  : setIsFinished(true);
              }}
              className="mx-4 text-xl rounded-full h-10 w-10 transition-colors hover:bg-slate-700 bg-slate-600"
            >{`>`}</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearnFlashcardsPage;
