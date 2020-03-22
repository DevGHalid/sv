import React, { useState, useContext, useEffect } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import SheetEditAnswer from "./SheetEditAnswer";
import SheetAnswerFiled from "./SheetAnswerField";
import SheetAnswersContext from "../../contexts/SheetAnswersContext";

export default function SheetAnswers({ sheetItemId }) {
  const {
    sheetAnswers,
    fetchSheetAnswersBySheetIdFromApi,
    addSheetAnswerToSheet,
    updateIndexToSheetAnswer
  } = useContext(SheetAnswersContext);

  useEffect(() => {
    fetchSheetAnswersBySheetIdFromApi(sheetItemId);
  }, [sheetItemId]);

  const [editSheetAnswerId, setEditSheetAnswerId] = useState(null);

  return (
    <div>
      {editSheetAnswerId !== null && (
        <SheetEditAnswer
          sheetAnswerId={editSheetAnswerId}
          onClose={() => setEditSheetAnswerId(null)}
        />
      )}

      {/* {sheetAnswers.loading ? (
        <div className="loader w-100 mb-4" />
      ) : ( */}
      <SheetAnswersContainer
        sheetItemId={sheetItemId}
        answers={sheetAnswers.answers}
        onAddSheetAnswerToSheet={addSheetAnswerToSheet}
        onUpdateIndexToSheetAnswer={updateIndexToSheetAnswer}
        onEditSheetAnswer={answerId => {
          setEditSheetAnswerId(answerId);
        }}
      />
      {/* )} */}

      <button className="btn btn-cyan btn-block mt-4">Сохранить</button>
    </div>
  );
}

function SheetAnswersContainer({
  sheetItemId,
  answers,
  onAddSheetAnswerToSheet,
  onUpdateIndexToSheetAnswer,
  onEditSheetAnswer
}) {
  const handleDropSheetAnswer = async ({
    addedIndex,
    removedIndex,
    payload
  }) => {
    if (removedIndex === null && addedIndex !== null) {
      const attributes = {
        ...payload.attributes,
        label: payload.title
      };

      const { data } = await onAddSheetAnswerToSheet(
        payload.id,
        attributes,
        addedIndex,
        sheetItemId
      );

      onEditSheetAnswer(data.id);
    } else if (removedIndex !== null && addedIndex !== null) {
      onUpdateIndexToSheetAnswer(removedIndex, addedIndex, sheetItemId);
    }
  };

  return (
    <Container
      groupName="elements"
      getChildPayload={i => answers[i]}
      onDrop={handleDropSheetAnswer}
    >
      {answers.map(answer => (
        <Draggable className="sheet-answer" key={answer.id}>
          <SheetAnswerFiled
            type={answer.slug}
            attributes={answer.attributes}
            onEditSheetAnswer={() => onEditSheetAnswer(answer.id)}
          />
        </Draggable>
      ))}
    </Container>
  );
}
