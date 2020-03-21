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
        <div className="row">
          <div className="col-md-4 order-md-2 mb-4">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">Основные поля</span>
            </h4>
            <ul className="list-group mb-3">
              {formElements.elements.map(element =>
                <li className="list-group-item d-flex justify-content-between list-group-item-action">
                  <div className="d-flex align-items-center">
                    <i className={`${element.icon} mr-3`}></i>
                    <div className="d-flex flex-column">
                      <h6 className="my-0">{element.title}</h6>
                    </div>
                  </div>
                </li>
               )}
            </ul>
          </div>
          <div className="col-md-8 order-md-1">
            <h4 className="mb-3">Billing address</h4>
            <form className="needs-validation" noValidate="">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="lastName">Last name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder=""
                    value=""
                    required=""
                  />
                  <div className="invalid-feedback">
                    Valid last name is required.
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="username">Username</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">@</span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Username"
                    required=""
                  />
                  <div className="invalid-feedback" style={{ width: "100%" }}>
                    Your username is required.
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="address2">
                  Address 2 <span className="text-muted">(Optional)</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address2"
                  placeholder="Apartment or suite"
                />
              </div>

              <button
                className="btn btn-primary btn-lg btn-block"
                type="submit"
              >
                Continue to checkout
              </button>
            </form>
          </div>
        </div>
      </div>
    </Master>
  );
}

function SheetContent({ sheet, elements }) {
  return <div>Hello</div>;
}
