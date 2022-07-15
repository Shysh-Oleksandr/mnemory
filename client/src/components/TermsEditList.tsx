import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { ITerm } from "../interfaces/term";
import { actionCreactors, State } from "../state";
import { getCurrentSet } from "./../Helpers/functions";
import Term from "./termCard/Term";
import TermCardSeparator from "./termCard/TermCardSeparator";
import TermKeywordImageChoice from "./termCard/TermKeywordImageChoice";

type Props = {
  terms: ITerm[];
};

const TermsEditList = ({ terms }: Props) => {
  const mnemoryState = useSelector((state: State) => state.mnemory);
  const dispatch = useDispatch();
  const { reorderTerms } = bindActionCreators(actionCreactors, dispatch);

  function handleOnDragEnd(result: any) {
    if (!result.destination) return;
    const items = Array.from(getCurrentSet(mnemoryState).editingSet.terms);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    reorderTerms(items);
  }
  return (
    <div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="terms">
          {(provided) => (
            <ul
              className="draggable_list"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {terms.map((term, index) => {
                return (
                  <Draggable
                    key={term.id}
                    draggableId={term.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <li
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        id={term.id.toString()}
                      >
                        <Term term={term} index={index} />
                        <TermKeywordImageChoice term={term} />
                        <TermCardSeparator cardId={index} />
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TermsEditList;
