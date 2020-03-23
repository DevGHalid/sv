import React, { useState, useContext, useEffect } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import SheetAnswersContext from "../../contexts/SheetAnswersContext";
import SheetAnswerEdit from "./SheetAnswerEdit";
import SheetAnswerFiled from "./SheetAnswerField";

export default function SheetAnswers({ sheetItemId }) {
  const {
    sheetAnswers,
    fetchSheetAnswersBySheetIdFromApi,
    setSheetAnswersSuccess,
    addSheetAnswerToSheet,
    updateAllSheetAnswers,
    updateSheetAnswer,
    updateIndexToSheetAnswer
  } = useContext(SheetAnswersContext);

  useEffect(() => {
    fetchSheetAnswersBySheetIdFromApi(sheetItemId);
  }, [sheetItemId]);

  const [
    selectedSheetAnswerIdForEdit,
    setSelectedSheetAnswerIdForEdit
  ] = useState(null);

  const handleChangeSheetAnswers = idx => ({ target }) => {
    const answers = sheetAnswers.answers.slice();
    const { attributes } = answers[idx];
    attributes.value = target.value;
    setSheetAnswersSuccess(answers);
  };

  const handleSaveContentSheetAnswers = () => {
    updateAllSheetAnswers({ answers: sheetAnswers.answers }).then(response => {
      if (response.data.updated) {
        alert("Успешно сохранено");
      }
    });
  };

  return (
    <div>
      {selectedSheetAnswerIdForEdit !== null && (
        <SheetAnswerEdit
          sheetAnswerId={selectedSheetAnswerIdForEdit}
          onClose={() => setSelectedSheetAnswerIdForEdit(null)}
        />
      )}

      <SheetAnswersContainer
        sheetItemId={sheetItemId}
        answers={sheetAnswers.answers}
        onAddSheetAnswerToSheet={addSheetAnswerToSheet}
        onUpdateIndexToSheetAnswer={updateIndexToSheetAnswer}
        onChangeSheetAnswers={handleChangeSheetAnswers}
        onEditSheetAnswer={answerId => {
          setSelectedSheetAnswerIdForEdit(answerId);
        }}
      />

      {sheetAnswers.answers.length !== 0 && (
        <button
          className="btn btn-cyan btn-block mt-4"
          onClick={handleSaveContentSheetAnswers}
        >
          Сохранить
        </button>
      )}
    </div>
  );
}

function SheetAnswersContainer({
  sheetItemId,
  answers,
  onAddSheetAnswerToSheet,
  onUpdateIndexToSheetAnswer,
  onChangeSheetAnswers,
  onEditSheetAnswer
}) {
  const handleDropSheetAnswer = ({ addedIndex, removedIndex, payload }) => {
    if (removedIndex === null && addedIndex !== null) {
      const attributes = {
        ...payload.attributes,
        label: payload.title
      };

      onAddSheetAnswerToSheet(
        payload.id,
        attributes,
        addedIndex,
        sheetItemId
      ).then(({ data }) => onEditSheetAnswer(data.id));
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
      {answers.map((answer, idx) => (
        <Draggable className="sheet-answer" key={answer.id}>
          <SheetAnswerFiled
            type={answer.slug}
            attributes={answer.attributes}
            onChangeSheetAnswer={onChangeSheetAnswers(idx)}
            onEditSheetAnswer={() => onEditSheetAnswer(answer.id)}
          />
        </Draggable>
      ))}
    </Container>
  );
}
