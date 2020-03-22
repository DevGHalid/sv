import React, { useContext, useEffect } from "react";
import FormElementsContext from "../../contexts/FormElementsContext";
import { Container, Draggable } from "react-smooth-dnd";
import Loader from "../../layouts/Loader";

export default function SheetFormElements() {
  const { formElements, fetchFormElementsFromApi } = useContext(
    FormElementsContext
  );

  useEffect(() => {
    fetchFormElementsFromApi();
  }, []);

  return (
    <Container
      groupName="elements"
      behaviour="copy"
      getChildPayload={i => formElements.elements[i]}
    >
      {formElements.loading ? (
        <div className="loader w-100 mb-5" />
      ) : (
        formElements.elements.map(element => (
          <Draggable
            className="list-group-item list-group-element"
            key={element.id}
          >
            <i className={`${element.icon} mr-3`}></i>
            <div className="my-0">{element.title}</div>
          </Draggable>
        ))
      )}
    </Container>
  );
}
