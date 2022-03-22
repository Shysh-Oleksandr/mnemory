import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import KeywordsList from "../components/set/KeywordsList";
import TermCard from "../components/set/TermCard";
import { getCurrentSet, shuffle } from "../Helpers/functions";
import { actionCreactors, State } from "../state";
import "../styles/flashcards.css";

type Props = {};

const MAX_BG_CARDS = 5;

const calcTermsLeft = (
  currentTermIndex: number,
  termsLength: number
): number => {
  const termLeft =
    termsLength - (currentTermIndex + 1) <= MAX_BG_CARDS
      ? termsLength - (currentTermIndex + 1)
      : MAX_BG_CARDS;
  return termLeft;
};

const LearnFlashcardsPage = (props: Props) => {
  const [currentTermIndex, setCurrentTermIndex] = useState<number>(0);
  const [isCurrentSideFront, setIsCurrentSideFront] = useState<boolean>(true);
  const [isStartSideFront, setIsStartSideFront] = useState<boolean>(true);
  const [showDefinition, setShowDefinition] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { copySavedSet, deleteSet } = bindActionCreators(
    actionCreactors,
    dispatch
  );
  const mnemoryState = useSelector((state: State) => state.mnemory);
  const currentSet = getCurrentSet(mnemoryState);
  const savedSet = currentSet.savedSet;
  const [shuffledTerms, setShuffledTerms] = useState([...savedSet.terms]);
  const currentTerm = shuffledTerms[currentTermIndex];
  const termsLength = shuffledTerms.length;
  const cardRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  let termsLeftNumber = calcTermsLeft(currentTermIndex, termsLength);

  const termsLeft = new Array(termsLeftNumber).fill(0);

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
  };

  const changeCurrentTerm = (newTermIndex: number) => {
    setCurrentTermIndex(newTermIndex);
    setIsCurrentSideFront(isStartSideFront);
    setShowDefinition(false);

    setCardTransform(newTermIndex);
  };

  const shuffleTerms = () => {
    setShuffledTerms(shuffle(shuffledTerms));

    setCurrentTermIndex(0);
    isCurrentSideFront || !isStartSideFront
      ? setShowDefinition(!showDefinition)
      : setIsCurrentSideFront(isStartSideFront);

    setCardTransform(0);
  };

  useEffect(() => {
    setCardTransform(0);
  }, []);

  return (
    <div className="learn-cards flex h-full mt-4 justify-between">
      <div className="learn-cards-info basis-1/6 mr-8">
        <Link to={`/set/${savedSet.setId + 1}`} className="text-xl">
          <span className="text-teal-400 mr-2">{`<`}</span>
          Back to the set
        </Link>
        <h4 className="text-xl tracking-widest my-8">
          <span className="mr-2 text-teal-400">ICON</span> Flashcards
        </h4>
        <div>
          <div className="learn-cards-progress-bar h-4 w-full bg-teal-800">
            <div
              style={{
                width: `${(100 / termsLength) * (currentTermIndex + 1)}%`,
              }}
              className="transition-all  bg-teal-400 h-full"
            ></div>
          </div>
          <div className="flex justify-between items-center text-xl mt-1">
            <h5>PROGRESS</h5>
            <span>
              {currentTermIndex + 1}/{termsLength}
            </span>
          </div>
          <div className="mt-80">
            <button onClick={shuffleTerms} className="btn block w-full mb-4">
              Shuffle
            </button>
            <button className="btn block w-full">Settings</button>
          </div>
        </div>
      </div>
      <div className="learn-cards-content basis-5/6 relative">
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
          {termsLeft.map((term, index) => {
            return (
              <div
                key={`${currentTerm.id}-bg-card-${index}`}
                style={{ bottom: `${64 + index * 12}px` }}
                className={`bg-slate-700 h-full w-full rounded-xl absolute left-0 border-solid border-b-4 p-8 border-slate-400 text-5xl flex items-center justify-center`}
              >
                {shuffledTerms[currentTermIndex + 1].term}
              </div>
            );
          })}
        </div>
        <div className="navigation flex items-center justify-center absolute bottom-0 left-1/2 -translate-x-1/2">
          <button
            onClick={() =>
              currentTermIndex !== 0 && changeCurrentTerm(currentTermIndex - 1)
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
              currentTermIndex !== termsLength - 1 &&
                changeCurrentTerm(currentTermIndex + 1);
            }}
            className="mx-4 text-xl rounded-full h-10 w-10 transition-colors hover:bg-slate-700 bg-slate-600"
          >{`>`}</button>
        </div>
      </div>
    </div>
  );
};

export default LearnFlashcardsPage;
