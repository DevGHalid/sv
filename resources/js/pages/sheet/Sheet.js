import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Draggable } from "react-smooth-dnd";
import SheetContext from "../../contexts/SheetContext";
import SheetAnswers from "./SheetAnswers";
import SheetFormElements from "./SheetFormElements";
import Master from "../../layouts/Master";

export default function Sheet() {
  const { id } = useParams();
  const { sheet, fetchSheetItemFromApi } = useContext(SheetContext);

  useEffect(() => {
    fetchSheetItemFromApi(id);
  }, [id]);

  return (
    <Master>
      {sheet.loading ? (
        <div className="loader w-100 mt-9 pt-9" />
      ) : (
        sheet.sheetItem && <SheetContent sheetItem={sheet.sheetItem} />
      )}
    </Master>
  );
}

function SheetContent({ sheetItem }) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <SheetAnswers sheetItemId={sheetItem.id} />
        </div>
        <div className="col-md-4">
          <div className="sheet-elements">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">Основные поля</span>
            </h4>
            <div className="list-group">
              <SheetFormElements />
              <div className="list-group-item list-group-element mt-4">
                <i className="fe fe-edit-2 mr-3"></i>
                Конструктор
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
