import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { ISetStatus } from "../interfaces/set";
import { ITerm } from "../interfaces/term";
import { actionCreactors } from "../state";
import Term from "./termCard/Term";
import TermCardSeparator from "./termCard/TermCardSeparator";
import TermKeywordImageChoice from "./termCard/TermKeywordImageChoice";

type Props = {
  terms: ITerm[];
  currentSet: ISetStatus;
};

const TermsEditList = ({ terms, currentSet }: Props) => {
  const dispatch = useDispatch();
  const { reorderTerms } = bindActionCreators(actionCreactors, dispatch);

  function handleOnDragEnd(result: any) {
    if (!result.destination) return;
    const items = Array.from(currentSet.editingSet.terms);
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
                        <Term
                          term={term}
                          index={index}
                          currentSet={currentSet}
                        />
                        <TermKeywordImageChoice term={term} />
                        <TermCardSeparator
                          currentSet={currentSet}
                          cardId={index}
                        />
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
