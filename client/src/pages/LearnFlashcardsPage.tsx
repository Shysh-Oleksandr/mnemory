import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FlashcardsInfo from "../components/set/FlashcardsInfo";
import FlashcardsNavigation from "../components/set/FlashcardsNavigation";
import KeywordsList from "../components/set/KeywordsList";
import TermCard from "../components/set/TermCard";
import { ITerm } from "../components/termCard/Term";
import { calcTermsLeft, getCurrentSet, shuffle } from "../Helpers/functions";
import { State } from "../state";
import "../styles/flashcards.css";
import FlashcardsFinished from "./../components/set/FlashcardsFinished";

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
    setShuffledTerms([...savedSet.terms]);
  }, [currentSet]);

  useEffect(() => {
    restart();
  }, []);

  if (termsLength === 0) {
    return (
      <div className="flex justify-center flex-col">
        <h2 className="sm:text-3xl text-2xl my-4 text-center">
          There's no terms in this set.
        </h2>
        <Link
          to={`/set/${savedSet.setId + 1}`}
          className="btn text-center sm:!py-4 !py-3"
        >
          Back to the set
        </Link>
      </div>
    );
  }

  return (
    <div className="learn-cards relative flex md:flex-row flex-col h-full mt-4 justify-between md:pb-0 sm:pb-28 pb-48">
      <FlashcardsInfo
        shuffleTerms={shuffleTerms}
        currentTermIndex={currentTermIndex}
        shuffledTerms={shuffledTerms}
        isFinished={isFinished}
      />
      {isFinished ? (
        <FlashcardsFinished termsLength={termsLength} restart={restart} />
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
          <div className="bg-cards absolute bottom-20 top-0 sm:left-0 sm:right-0 left-[4.5%] right-[4.5%]">
            {termsLeft &&
              termsLeft.map((term, index) => {
                return (
                  <div
                    key={`${currentTerm.id}-bg-card-${index}`}
                    style={{ bottom: `${64 + index * 12}px` }}
                    className={`bg-slate-700 h-full w-full rounded-xl overflow-hidden absolute left-0 border-solid border-b-4 p-8 border-slate-400 text-5xl flex items-center justify-center`}
                  >
                    {isCurrentSideFront ? (
                      <div>{shuffledTerms[currentTermIndex + 1].term}</div>
                    ) : (
                      <div className="term-images justify-center flex p-4 grow items-start mb-[30%] -z-10">
                        <KeywordsList
                          term={shuffledTerms[currentTermIndex + 1]}
                          isBigSize={true}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
          <FlashcardsNavigation
            currentTermIndex={currentTermIndex}
            changeCurrentTerm={changeCurrentTerm}
            isStartSideFront={isStartSideFront}
            setIsStartSideFront={setIsStartSideFront}
            termsLength={termsLength}
            setIsCurrentSideFront={setIsCurrentSideFront}
            setIsFinished={setIsFinished}
          />
        </div>
      )}
    </div>
  );
};

export default LearnFlashcardsPage;
