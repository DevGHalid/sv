import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Master from "../../layouts/Master";
import SheetContext from "../../contexts/SheetContext";
import FormElementsContext from "../../contexts/FormElementsContext";

export default function Sheet() {
  const { id } = useParams();
  const { sheet, fetchSheetItemFromApi } = useContext(SheetContext);

  useEffect(() => {
    fetchSheetItemFromApi(id);
  }, [id]);

  const { formElements, fetchFormElementsFromApi } = useContext(
    FormElementsContext
  );

  useEffect(() => {
    fetchFormElementsFromApi();
  }, []);

  return (
    <Master>
      <div className="container">
        <SheetContent
          sheet={sheet.sheetItem}
          elements={formElements.elements}
        />
      </div>
    </Master>
  );
}

function SheetContent({ sheet, elements }) {
  return <div>Hello</div>;
}
